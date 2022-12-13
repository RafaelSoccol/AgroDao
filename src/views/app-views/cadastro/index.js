import Loading from 'components/atom/Loading'
import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { setIsLoading } from 'redux/actions/Gui';
import {Button, Col, DatePicker, Form, Input, InputNumber, PageHeader, Row} from "antd";
import {APP_PREFIX_PATH} from "../../../configs/AppConfig";
import {useHistory} from "react-router-dom";
import {ethers} from "ethers";
import Agrodao from "../../../artifacts/contracts/Agrodao.sol/Agrodao.json";

const agroDaoAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

const Cadastro = (props) => {
    const { setIsLoading, isLoading } = props;

    let history = useHistory();
    
    const [form] = Form.useForm();
    
    const testarLoading = async () => {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 100));
        setIsLoading(false);
    }

    useEffect(() => {
        // Demonstrando como o loading funciona
        testarLoading();
    }, []);

    const requestAccount = async () => {
        await window.ethereum.request( {method: 'eth_requestAccounts'} );
    }

    const getProduct = async () => {
        if (typeof window.ethereum !== "undefined") {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const contract = new ethers.Contract(agroDaoAddress, Agrodao.abi, provider)

            try {
                const data = await contract.getProductId();
                debugger
                console.log("data: ", data);
            } catch (error) {
                console.log("Error: ", error);
            }
        }
    };

    const createProduct = async (json) => {
        if (!json) return;

        if (typeof window.ethereum !== 'undefined') {
            await requestAccount();

            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();

            const contract = new ethers.Contract(agroDaoAddress, Agrodao.abi, signer)
            const transaction = await contract.createProductTeste(123, json.name, json.weight, json.birth, json.location, json.observation);
            // setMessage("");
            await transaction.wait();

            getProduct()
        }
    }

    const onFinish = async (values) => {
       await createProduct(values)
       await console.log(values)
       await history.push(`${APP_PREFIX_PATH}/home`) ;
    };
    
    return (
        <Loading isLoading={isLoading}>
            <PageHeader
                style={{
                    borderBottom: '1px solid rgb(235, 237, 240)',
                    background: 'white',
                    marginLeft: -25,
                    marginRight: -25,
                    marginTop: -25,
                }}
                title={"Registration of a new Bovine"}
            />
            <div className="code-box" style={{marginTop: 15}}>
                <section className="code-box-demo">
                    <Form form={form} labelCol={{span: 8}} wrapperCol={{span: 24}} layout={'vertical'} onFinish={onFinish}>

                        <Row gutter={16}>
                            <Col xs={24} md={12}>
                                <Form.Item
                                    label="Name"
                                    name="name">
                                    <Input/>
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12}>
                                <Form.Item
                                    label="Earring Number"
                                    name="earning_number"
                                    rules={[{required: false, message: 'Esse campo é obrigatório'}]}>
                                    <Input/>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col xs={24} md={12}>
                                <Form.Item
                                    label="Age (month)"
                                    name="birth"
                                    rules={[{required: false, message: 'Esse campo é obrigatório'}]}>
                                    <InputNumber style={{width:"100%"}}/>
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12}>
                                <Form.Item
                                    label="Current weight (kg)"
                                    name="weight">
                                    <InputNumber style={{width:"100%"}}/>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col xs={24} md={12}>
                                <Form.Item
                                    label="Where the bovine is?"
                                    name="location"
                                    rules={[{required: false, message: 'Esse campo é obrigatório'}]}>
                                    <Input/>
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12}>
                                <Form.Item
                                    label="Observation"
                                    name="observation">
                                    <Input/>
                                </Form.Item>
                            </Col>
                        </Row>
                        

                        <Form.Item style={{alignItems: 'flex-end'}}>
                            <Button type="primary" htmlType="submit" >
                                Register
                            </Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        </Loading>
    )
}

const mapStateToProps = ({ gui }) => {
    return {
        isLoading: gui.isLoading
    };
};

const mapDispatchToProps = { setIsLoading };

export default connect(mapStateToProps, mapDispatchToProps)(Cadastro);
