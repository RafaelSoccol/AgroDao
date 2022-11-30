import Loading from 'components/atom/Loading'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { setIsLoading } from 'redux/actions/Gui';
import {Button, Col, DatePicker, Form, Input, PageHeader, Row} from "antd";
import {APP_PREFIX_PATH} from "../../../configs/AppConfig";
import {useHistory, useParams} from "react-router-dom";

const VisualizarHistorico = (props) => {
    const { setIsLoading, isLoading } = props;

    let {id} = useParams();
    
    let history = useHistory();

    const [dadosById, setDadosById] = useState([]);

    const setarDadosById = () => {

        // let dados = await consultorService.getById(id);
        
        let dados = {
            nome: "Teste",
            numero_brinco: 12436,
            data_nascimento: "13/04/2020",
            pesos: [279, 323, 432],
            local_origem: "Fazenda São João",
            observacao: "Teste teste teste teste",
            data_abate: "17/11/2022",
            sustentavel: true,
        }
        setDadosById(dados);
    };

    useEffect(() => {
        setarDadosById();
        testarLoading();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    const testarLoading = async () => {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 100));
        setIsLoading(false);
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
                onBack={() => history.push(`${APP_PREFIX_PATH}/historico`)}
                title={"Visualizar informações"}
            />
            <div className="code-box" style={{marginTop: 15, padding:30}}>
                <Row style={{marginTop: 5}} gutter={30}>
                    <Col xs={24} md={12}>
                        <div>
                            <span style={{ fontSize: 17, fontWeight:"bold",}}>Nome</span>
                        </div>
                        <div>
                            <span>{dadosById?.nome ?? 'Não cadastrado'}</span>
                        </div>
                    </Col>

                    <Col xs={24} md={12}>
                        <div>
                            <span style={{ fontSize: 17, fontWeight:"bold",}}>Número do brinco</span>
                        </div>
                        <div style={{marginTop: 5, textAlign: 'justify'}}>
                            <span style={{}}>{dadosById?.numero_brinco ?? 'Não cadastrada'}</span>
                        </div>
                    </Col>
                </Row>

                <Row style={{marginTop: 35}} gutter={30}>
                    <Col xs={24} md={12}>
                        <div>
                            <span style={{ fontSize: 17, fontWeight:"bold",}}>Data nascimento</span>
                        </div>
                        <div>
                            <span>{dadosById?.data_nascimento ?? 'Não cadastrado'}</span>
                        </div>
                    </Col>

                    <Col xs={24} md={12}>
                        <div>
                            <span style={{ fontSize: 17, fontWeight:"bold",}}>Data de abate</span>
                        </div>
                        <div style={{marginTop: 5, textAlign: 'justify'}}>
                            <span style={{}}>{dadosById?.data_abate ?? 'Não cadastrada'}</span>
                        </div>
                    </Col>
                </Row>

                <Row style={{marginTop: 35}} gutter={30}>
                    <Col xs={24} md={12}>
                        <div>
                            <span style={{ fontSize: 17, fontWeight:"bold",}}>Local de origem</span>
                        </div>
                        <div>
                            <span>{dadosById?.local_origem ?? 'Não cadastrado'}</span>
                        </div>
                    </Col>

                    <Col xs={24} md={12}>
                        <div>
                            <span style={{ fontSize: 17, fontWeight:"bold",}}>Observações</span>
                        </div>
                        <div style={{marginTop: 5, textAlign: 'justify'}}>
                            <span style={{}}>{dadosById?.observacoes ?? 'Não cadastrada'}</span>
                        </div>
                    </Col>
                </Row>

                <Row style={{marginTop: 35}} gutter={30}>
                    <Col xs={24} md={12}>
                        <div>
                            <span style={{ fontSize: 17, fontWeight:"bold",}}>Primeiro peso cadastrado</span>
                        </div>
                        <div>
                            <span>275 kg</span>
                        </div>
                    </Col>

                    <Col xs={24} md={12}>
                        <div>
                            <span style={{ fontSize: 17, fontWeight:"bold",}}>Último peso cadastrado</span>
                        </div>
                        <div style={{marginTop: 5, textAlign: 'justify'}}>
                            <span>475 kg</span>
                        </div>
                    </Col>
                </Row>

                <Row style={{marginTop: 35}} gutter={30}>
                    <Col xs={24} md={12}>
                        <div>
                            <span style={{ fontSize: 17, fontWeight:"bold",}}>A fazenda em que o animal viveu toma medidas sustentáveis?</span>
                        </div>
                        <div>
                            <span>{dadosById.sustentavel ? "Sim" : "Não"}</span>
                        </div>
                    </Col>
                </Row>
                
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

export default connect(mapStateToProps, mapDispatchToProps)(VisualizarHistorico);
