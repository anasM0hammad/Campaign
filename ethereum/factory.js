import web3 from './web3'
const address = require('./../ADDRESS.json') ;
const CampaignFactory = require('./build/CampaignFactory.json') ;

const factory = new web3.eth.Contract(CampaignFactory.abi , address.FACTORY) ;

export default factory ;