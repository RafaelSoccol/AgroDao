import Loading from 'components/atom/Loading'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { setIsLoading } from 'redux/actions/Gui';
import {Button, Input, PageHeader} from "antd";
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
	
	async function createUsers() {
		if (typeof window.ethereum !== "undefined") {
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const signer = provider.getSigner();
			
			const contract = new ethers.Contract(greetAddress, Agrodao.abi, signer)
			
			try {
				
				 const usuario1 = await  contract.createUser(123, "user1", "pass1");
				 const usuario2 = await  contract.createUser(321, "user2", "pass2");
				
				console.log("users: ", usuario1);
			} catch (error) {
				console.log("Error: ", error);
			}
		}
	}


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
			<div  style={{marginTop: 15}}>
				<div style={{marginTop: 20}}>
					<span style={{fontSize: 50, fontWeight: 600, marginLeft: 10, color: '#1d5207', marginTop:10}}>Welcome to Agrodao 🌿</span>
				</div>
				
				<div style={{display:'flex', justifyContent:'center', marginTop: -50}}>
					<img style={{width: 500 }} src={'/img/agrodao.png'} alt={`logo`}/>
				</div>
				<div style={{display:'flex', justifyContent:'center', marginTop:-70, }}>
					<span style={{color:'#1d5207', width:700, fontSize: 20, fontWeight:700,  textAlign: "center"}}>Agrodao fights climate change and deforestation through food transparency.</span>
				</div>
				<div>
					<Button onClick={createUsers}>
						Create users
					</Button>
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
