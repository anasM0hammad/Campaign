const environment = require('./../environments/environment') ;
const Web3 = require('web3') ;

let web3 ;
const infuraNode = environment.infuraNode ;

if(typeof window !== "undefined" && typeof window.ethereum !== "undefined"){
	window.ethereum.request({
		method : 'eth_requestAccounts'
	});

	web3 = new Web3(window.ethereum) ;
}
else{
	const provider = new Web3.providers.HttpProvider(infuraNode) ;
	web3 = new Web3(provider) ;
}

export default web3 ;