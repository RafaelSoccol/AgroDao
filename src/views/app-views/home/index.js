import Loading from 'components/atom/Loading'
import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { setIsLoading } from 'redux/actions/Gui';
import {APP_NAME, APP_PREFIX_PATH} from "../../../configs/AppConfig";
import {PageHeader} from "antd";

const Home = (props) => {
	const { setIsLoading, isLoading } = props;

	const testarLoading = async () => {
		setIsLoading(true);
		await new Promise(resolve => setTimeout(resolve, 100));
		setIsLoading(false);
	}

	useEffect(() => {
		// Demonstrando como o loading funciona
		testarLoading();
	}, []);

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
				title={"Home"}
			/>
			<div  style={{marginTop: 15}}>
				<div style={{marginTop: 20}}>
					<span style={{fontSize: 50, fontWeight: 600, marginLeft: 10, color: '#1d5207', marginTop:10}}>Bem-vindx à Agrodao 🌿</span>
				</div>
				
				<div style={{display:'flex', justifyContent:'center', marginTop: -90}}>
					<img style={{width: 500 }} src={'/img/agrodaoEscrita.png'} alt={`logo`}/>
				</div>
				<div style={{display:'flex', justifyContent:'center', marginTop:-150, }}>
					<span style={{color:'#1d5207', width:700, fontSize: 20, fontWeight:700,  textAlign: "center"}}>Nós lutamos contra as mudanças climáticas e desmatamento no Brasil através da transparência na indústria alimentícia. Coma de forma mais segura, ajude a salvar o planeta.</span>
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
  
export default connect(mapStateToProps, mapDispatchToProps)(Home);
