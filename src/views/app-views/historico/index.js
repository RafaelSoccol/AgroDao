import Loading from 'components/atom/Loading'
import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { setIsLoading } from 'redux/actions/Gui';
import {Button, Col, DatePicker, Form, Input, InputNumber, PageHeader, Row} from "antd";
import {useHistory} from "react-router-dom";
import {APP_PREFIX_PATH} from "../../../configs/AppConfig";

const Historico = (props) => {
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

    const onFinish = async (values) => {

        history.push(`${APP_PREFIX_PATH}/visualizar-historico/${values.id}`) ;
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
                title={"Visualizar o histórico do animal"}
            />
            <div className="code-box" style={{marginTop:15}}>
                <div style={{ padding: 25, backgroundImage: `url(/img/fundoInicial.png)`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', height:350, borderTopRightRadius: 12, borderTopLeftRadius: 12}}/>
                <div style={{margin:15, marginTop:40}}>
                    <section>
                        <Form form={form} labelCol={{span: 24}} wrapperCol={{span: 24}} layout={'vertical'} onFinish={onFinish}>
                            <Row gutter={16}>
                                <Col xs={24} md={24}>
                                    <Form.Item
                                        label="Brinco do bovino"
                                        rules={[{required: true, message: 'Esse campo é obrigatório'}]}
                                        name="id">
                                        <InputNumber style={{width:"100%"}}/>
                                    </Form.Item>
                                </Col>
                                <Col xs={24} md={24}>
                                    <Form.Item style={{alignItems: 'center'}}>
                                        <Button type="primary" htmlType="submit" style={{marginTop: 30, width:400}}>
                                            Visualizar
                                        </Button>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                    </section>

                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Historico);
