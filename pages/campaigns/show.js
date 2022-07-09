import Layout from './../../components/Layout'  ;
import Campaign from './../../ethereum/campaign' ;
import ContributeForm from './../../components/ContributeForm' ;

import { Card, Grid } from 'semantic-ui-react' ;
import web3 from './../../ethereum/web3' ;

const showCampaign = (props) => {

	const renderCards = () => {
		const { minimumContribution, balance, numReq, approversCount, manager } = props ;
		const items = [
			{
				header : manager,
				meta : 'Address of the Manager',
				description : 'The manager created this camapaign and maintians it',
				style : { overflowWrap : 'break-word'}
			},
			{
				header : minimumContribution,
				meta : 'Minimum Contribution (Wei)',
				description : 'The very least contribution that can be done in the campaign'
			},
			{
				header : web3.utils.fromWei(balance, 'ether'),
				meta : 'Balance (ether)',
				description : 'The current balance of the campaign'
			},
			{
				header : numReq,
				meta : 'Number of Request',
				description : 'Total number of request for spending money'
			},
			{
				header : approversCount,
				meta : 'Total Contributors',
				description : 'Total number of contributors for the campaign'
			}
		];

		return <Card.Group items={items} /> 
	}

	return (
		<Layout>
			<h3>Show Campaign</h3>
			<Grid>
				<Grid.Column width={10}>
					{ renderCards() }
				</Grid.Column>
				<Grid.Column width={6}>
					<ContributeForm address={props.address}/>
				</Grid.Column>
			</Grid>
			
			
		</Layout>
	)
}

showCampaign.getInitialProps = async (props) => {
	const campaign = Campaign(props.query.address) ;
	const details = await campaign.methods.getDetails().call() ;
	return {
		address : props.query.address,
		minimumContribution : details[0] ,
		balance : details[1],
		numReq : details[2],
		approversCount : details[3],
		manager : details[4]
	}

}

export default showCampaign