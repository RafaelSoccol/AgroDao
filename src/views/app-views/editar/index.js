import Loading from 'components/atom/Loading'
import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { setIsLoading } from 'redux/actions/Gui';
import {Button, Col, DatePicker, Divider, Form, Input, InputNumber, PageHeader, Row} from "antd";
import {APP_PREFIX_PATH} from "../../../configs/AppConfig";
import {useHistory, useParams} from "react-router-dom";
import {ethers} from "ethers";
import Agrodao from "../../../artifacts/contracts/Agrodao.sol/Agrodao.json";

const agroDaoAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

const Editar = (props) => {
    const { setIsLoading, isLoading } = props;

    let history = useHistory();

    let {id} = useParams();
    
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

    const onFinish = async (values) => {
        // values.usuario_fonte
        // values.usuario_recebe
        values.boi_id = id
        if (typeof window.ethereum !== "undefined") {
            await requestAccount();
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(agroDaoAddress, Agrodao.abi, signer)

            try {
                const data = await contract.transferProduct(values.boi_id, values.usuario_fonte, values.usuario_recebe);
                console.log("data: ", data);
                await getProduct(values.boi_id);
            } catch (error) {
                console.log("Error: ", error);
            }
        }
       history.push(`${APP_PREFIX_PATH}/home`) ;
    };
    
   const getProduct = async (id) => {
        if (typeof window.ethereum !== "undefined") {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const contract = new ethers.Contract(agroDaoAddress, Agrodao.abi, provider);
            const prod = await contract.products(id);
            await  console.log("product: ", prod);
        }
    }

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
                onBack={() => history.push(`${APP_PREFIX_PATH}/edicao`)}
                title={"Transfer the bovine"}
            />
            <div className="code-box" style={{marginTop: 15}}>
                <section className="code-box-demo">
                    <Form form={form} labelCol={{span: 8}} wrapperCol={{span: 24}} layout={'vertical'} onFinish={onFinish}>
                        
                        {/*<Row gutter={16}>*/}
                        {/*    <Col xs={24} md={12}>*/}
                        {/*        <Form.Item*/}
                        {/*            label="Where the bovine is?"*/}
                        {/*            name="nome_cientifico"*/}
                        {/*            rules={[{required: false, message: 'Esse campo é obrigatório'}]}>*/}
                        {/*            <Input/>*/}
                        {/*        </Form.Item>*/}
                        {/*    </Col>*/}
                        {/*    <Col xs={24} md={12}>*/}
                        {/*        <Form.Item*/}
                        {/*            label="Current weight (kg)"*/}
                        {/*            name="nome_cientifico"*/}
                        {/*            rules={[{required: false, message: 'Esse campo é obrigatório'}]}>*/}
                        {/*            <Input/>*/}
                        {/*        </Form.Item>*/}
                        {/*    </Col>*/}
                        {/*</Row>*/}
                        
                        {/*<Row gutter={16}>*/}
                        {/*    <Col xs={24} md={12}>*/}
                        {/*        <Form.Item*/}
                        {/*            label="Observation"*/}
                        {/*            name="nome_cientifico"*/}
                        {/*            rules={[{required: false, message: 'Esse campo é obrigatório'}]}>*/}
                        {/*            <Input style={{width:"100%"}}/>*/}
                        {/*        </Form.Item>*/}
                        {/*    </Col>*/}
                        {/*    <Col xs={24} md={12}>*/}
                        {/*        <Form.Item*/}
                        {/*            label="Date of slaughter"*/}
                        {/*            name="nome_cientifico"*/}
                        {/*            rules={[{required: false, message: 'Esse campo é obrigatório'}]}>*/}
                        {/*            <DatePicker style={{width:"100%"}}/>*/}
                        {/*        </Form.Item>*/}
                        {/*    </Col>*/}
                        {/*</Row>*/}
                        
                        <Divider/>

                        <Row gutter={16}>
                            <Col xs={24} md={8}>
                                <Form.Item
                                    label="Usuario fonte"
                                    name="usuario_fonte"
                                    rules={[{required: true, message: 'Esse campo é obrigatório'}]}>
                                    <InputNumber style={{width:"100%"}}/>
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={8}>
                                <Form.Item
                                    label="Usuario recebe"
                                    name="usuario_recebe"
                                    rules={[{required: true, message: 'Esse campo é obrigatório'}]}>
                                    <InputNumber style={{width:"100%"}}/>
                                </Form.Item>
                            </Col>
                            {/*<Col xs={24} md={8}>*/}
                            {/*    <Form.Item*/}
                            {/*        label="Boi"*/}
                            {/*        name="boi_id"*/}
                            {/*        rules={[{required: true, message: 'Esse campo é obrigatório'}]}>*/}
                            {/*        <InputNumber style={{width:"100%"}}/>*/}
                            {/*    </Form.Item>*/}
                            {/*</Col>*/}
                        </Row>


                        <Form.Item style={{alignItems: 'flex-end'}}>
                            <Button type="primary" htmlType="submit" >
                                Add informations
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

export default connect(mapStateToProps, mapDispatchToProps)(Editar);
