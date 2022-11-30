import Loading from 'components/atom/Loading'
import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { setIsLoading } from 'redux/actions/Gui';
import {Button, Col, DatePicker, Form, Input, PageHeader, Row} from "antd";
import {APP_PREFIX_PATH} from "../../../configs/AppConfig";
import {useHistory, useParams} from "react-router-dom";

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

    const onFinish = async (values) => {

        history.push(`${APP_PREFIX_PATH}/lista-daninhas`) ;
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
                onBack={() => history.push(`${APP_PREFIX_PATH}/edicao`)}
                title={"Adicionar informações ao bovino"}
            />
            <div className="code-box" style={{marginTop: 15}}>
                <section className="code-box-demo">
                    <Form form={form} labelCol={{span: 8}} wrapperCol={{span: 24}} layout={'vertical'} onFinish={onFinish}>
                        
                        <Row gutter={16}>
                            <Col xs={24} md={12}>
                                <Form.Item
                                    label="Local onde o bovino esta"
                                    name="nome_cientifico"
                                    rules={[{required: true, message: 'Esse campo é obrigatório'}]}>
                                    <Input/>
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12}>
                                <Form.Item
                                    label="Peso atual"
                                    name="nome_cientifico"
                                    rules={[{required: true, message: 'Esse campo é obrigatório'}]}>
                                    <Input/>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col xs={24} md={12}>
                                <Form.Item
                                    label="Observações"
                                    name="nome_cientifico"
                                    rules={[{required: true, message: 'Esse campo é obrigatório'}]}>
                                    <DatePicker style={{width:"100%"}}/>
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12}>
                                <Form.Item
                                    label="Data de abate"
                                    name="nome_cientifico"
                                    rules={[{required: true, message: 'Esse campo é obrigatório'}]}>
                                    <DatePicker style={{width:"100%"}}/>
                                </Form.Item>
                            </Col>
                        </Row>


                        <Form.Item style={{alignItems: 'flex-end'}}>
                            <Button type="primary" htmlType="submit" >
                                Adicionar informações
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
