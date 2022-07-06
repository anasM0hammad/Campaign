const { environment } = require('./../environments/environment') ;
const HDWalletProvider = require('@truffle/hdwallet-provider') ;
const Web3 = require('web3') ;

const factoryCampaign = require('./build/CampaignFactory.json') ;

const accountMnemonics = environment.accountsMnemonics ;   // Should be passed using env variable in production 
const infuraNet = environment.infuraNode ;

const HdProvider = new HDWalletProvider(accountMnemonics, infuraNet) ;
const web3 = new Web3(HdProvider) ;

const deploy = async () => {
	const accounts = await web3.eth.getAccounts() ;
	console.log("Attempting to deploy account from : " + accounts[0]) ;

	const result = await new web3.eth.Contract(factoryCampaign.abi).deploy({
		data : factoryCampaign.evm.bytecode.object
	}).send({
		from : accounts[0],
		gas : '2000000'
	});

	console.log(result.options.address) ;
	HdProvider.engine.stop() ;
}

deploy() ;
