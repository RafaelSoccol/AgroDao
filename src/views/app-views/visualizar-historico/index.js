import Loading from 'components/atom/Loading'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { setIsLoading } from 'redux/actions/Gui';
import {Button, Col, DatePicker, Form, Input, PageHeader, Row} from "antd";
import {APP_PREFIX_PATH} from "../../../configs/AppConfig";
import {useHistory, useParams} from "react-router-dom";
import {ethers} from "ethers";
import Agrodao from "../../../artifacts/contracts/Agrodao.sol/Agrodao.json";

const agroDaoAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

const VisualizarHistorico = (props) => {
    const { setIsLoading, isLoading } = props;

    let {id} = useParams();
    
    let history = useHistory();

    const [dadosById, setDadosById] = useState([]);

    const requestAccount = async () => {
        await window.ethereum.request( {method: 'eth_requestAccounts'} );
    }

    async function getProduct(id) {
        if (typeof window.ethereum !== "undefined") {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const contract = new ethers.Contract(agroDaoAddress, Agrodao.abi, provider);
            const prod = await contract.products(id);
            console.log("product: ", prod);
            let teste = prod.map( a => String(a))  
            debugger
        }
    }

    const setarDadosById = () => {

        getProduct(id);
        
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
                title={"View information"}
            />
            <div className="code-box" style={{marginTop: 15, padding:30}}>
                <Row style={{marginTop: 5}} gutter={30}>
                    <Col xs={24} md={12}>
                        <div>
                            <span style={{ fontSize: 17, fontWeight:"bold",}}>Name</span>
                        </div>
                        <div>
                            <span>{dadosById?.nome ?? 'Não cadastrado'}</span>
                        </div>
                    </Col>

                    <Col xs={24} md={12}>
                        <div>
                            <span style={{ fontSize: 17, fontWeight:"bold",}}>Earring Number</span>
                        </div>
                        <div style={{marginTop: 5, textAlign: 'justify'}}>
                            <span style={{}}>{dadosById?.numero_brinco ?? 'Não cadastrada'}</span>
                        </div>
                    </Col>
                </Row>

                <Row style={{marginTop: 35}} gutter={30}>
                    <Col xs={24} md={12}>
                        <div>
                            <span style={{ fontSize: 17, fontWeight:"bold",}}>Birth date</span>
                        </div>
                        <div>
                            <span>{dadosById?.data_nascimento ?? 'Não cadastrado'}</span>
                        </div>
                    </Col>

                    <Col xs={24} md={12}>
                        <div>
                            <span style={{ fontSize: 17, fontWeight:"bold",}}>Slaughter date</span>
                        </div>
                        <div style={{marginTop: 5, textAlign: 'justify'}}>
                            <span style={{}}>{dadosById?.data_abate ?? 'Não cadastrada'}</span>
                        </div>
                    </Col>
                </Row>

                <Row style={{marginTop: 35}} gutter={30}>
                    <Col xs={24} md={12}>
                        <div>
                            <span style={{ fontSize: 17, fontWeight:"bold",}}>Farm of origin</span>
                        </div>
                        <div>
                            <span>{dadosById?.local_origem ?? 'Não cadastrado'}</span>
                        </div>
                    </Col>

                    <Col xs={24} md={12}>
                        <div>
                            <span style={{ fontSize: 17, fontWeight:"bold",}}>Observation</span>
                        </div>
                        <div style={{marginTop: 5, textAlign: 'justify'}}>
                            <span style={{}}>{dadosById?.observacoes ?? 'Não cadastrada'}</span>
                        </div>
                    </Col>
                </Row>

                <Row style={{marginTop: 35}} gutter={30}>
                    <Col xs={24} md={12}>
                        <div>
                            <span style={{ fontSize: 17, fontWeight:"bold",}}>First registered weight</span>
                        </div>
                        <div>
                            <span>275 kg</span>
                        </div>
                    </Col>

                    <Col xs={24} md={12}>
                        <div>
                            <span style={{ fontSize: 17, fontWeight:"bold",}}>Last registered weight</span>
                        </div>
                        <div style={{marginTop: 5, textAlign: 'justify'}}>
                            <span>475 kg</span>
                        </div>
                    </Col>
                </Row>

                <Row style={{marginTop: 35}} gutter={30}>
                    <Col xs={24} md={12}>
                        <div>
                            <span style={{ fontSize: 17, fontWeight:"bold",}}>Does the farm where the animal lived take sustainable measures?</span>
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
