import Loading from 'components/atom/Loading'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { setIsLoading } from 'redux/actions/Gui';
import {Button, PageHeader} from "antd";
import { ethers } from 'ethers';
import Agrodao from "../../../artifacts/contracts/Agrodao.sol/Agrodao.json";

const greetAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

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


	const [message, setMessage] = useState("teste");

	async function requestAccount() {
		await window.ethereum.request( {method: 'eth_requestAccounts'} );
	}

	async function fetchGreeting() {
		if (typeof window.ethereum !== "undefined") {
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const contract = new ethers.Contract(greetAddress, Agrodao.abi, provider)

			try {
				const data = await contract.greet();
				console.log("data: ", data);
			} catch (error) {
				console.log("Error: ", error);
			}
		}
	}

	async function setGreeting() {
		if (!message) return;

		if (typeof window.ethereum !== 'undefined') {
			await requestAccount();

			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const signer = provider.getSigner();

			const contract = new ethers.Contract(greetAddress, Agrodao.abi, signer)
			const transaction = await contract.setGreeting(message);
			setMessage("");
			await transaction.wait();
			fetchGreeting();
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
				<div>
					<Button onClick={fetchGreeting}>
						Fetch greet
					</Button>

					<Button onClick={setGreeting}>
						Set greet
					</Button>
					<input
						placeholder="set lock message"
						onChange={(e) => setMessage(e.target.value)}
						value={message}>
					</input>
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
