const assert = require('assert') ;
const ganache = require('ganache-cli') ;
const Web3 = require('web3') ;

const web3 = new Web3(ganache.provider()) ;

const compiledCampaign = require('./../ethereum/build/Campaign.json') ;
const compiledFactory = require('./../ethereum/build/CampaignFactory.json') ;

let accounts ;
let factory ;
let campaign ;
let campaignAddress ;

beforeEach(async () => {
	accounts = await web3.eth.getAccounts() ;
	factory = await new web3.eth.Contract(compiledFactory.abi).deploy({
		data : compiledFactory.evm.bytecode.object
	}).send({
		from : accounts[0],
		gas : '2000000'
	});

	await factory.methods.createCampaign('100').send({
		from : accounts[0],
		gas : '2000000'
	}) ;

	[campaignAddress] = await factory.methods.getDeployedCampaigns().call() ;
	campaign = await new web3.eth.Contract(
		compiledCampaign.abi,
		campaignAddress
	);
});

describe('Campaigns', () => {
	it('deploys factory and campaign successfully', () => {
		assert.ok(factory.options.address) ;
		assert.ok(campaign.options.address) ;
	});

	it('stores the manager address correctly', async () => {
		const manager = await campaign.methods.manager().call() ;
		assert.equal(accounts[0], manager) ;
	});

	it('allows people to contribute money and marks as approvers', async () => {
		await campaign.methods.contribute().send({
			value : '200',
			from : accounts[1]
		}) ;

		const isContributer = await campaign.methods.approvers(accounts[1]).call() ;
		assert(isContributer) ;
	}); 

	it('has a minimum contribution value', async () => {
		const minValue = await campaign.methods.minimumContribution().call() ;
		if(minValue === undefined || minValue === null){
			assert(false) ;
		}
		else{
			assert(true) ;
		}
	});

	it('do not allow to contribute below minimum value', async () => {
		try{
			await campaign.methods.contribute().send({
				value : '99',
				from : accounts[2]
			}) ;
			assert(false) ;
		}
		catch(err){
			assert(err) ;
		}

		const isContributer = await campaign.methods.approvers(accounts[2]).call() ;
		assert(!isContributer) ;
	});

	it('Finalize the request', async () => {
		await campaign.methods.contribute().send({
			from : accounts[1],
			value : web3.utils.toWei('10', 'ether') 
		}) ;

		await campaign.methods.createRequest('A', web3.utils.toWei('5', 'ether'), accounts[2]).send({
			from : accounts[0],
			gas : '1000000'
		}) ;

		await campaign.methods.approveRequest(0).send({
			from : accounts[1],
			gas : '1000000'
		});

		// const balanceBefore = web3.eth.getBalance(accounts[2]) ;
		await campaign.methods.finalizeRequest(0).send({
			from : accounts[0],
			gas : '1000000'
		}) ;

		let balanceAfter = await web3.eth.getBalance(accounts[2]) ;
		balanceAfter = web3.utils.fromWei(balanceAfter, 'ether') ;
		balanceAfter = parseFloat(balanceAfter) ;

		assert(balanceAfter > 104) ;
	});


	it('gives manager access to create a new request', async () => {
		const description = "Test" ;
		const value = '100' ;
		const recipient = accounts[2] ;

		await campaign.methods.createRequest(description, value, recipient).send({
			from: accounts[0] ,
			gas : '1000000'
		}) ;
		const getReq = await campaign.methods.requests(0).call() ;
		assert.equal(getReq.description, description) ;
		assert.equal(getReq.value, value) ;
		assert.equal(getReq.recipient, accounts[2]) ;
		
	});
})