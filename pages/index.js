import { useState } from 'react' ;
import factory from './../ethereum/factory' ;
import { Card, Button } from 'semantic-ui-react' ;
import Layout from './../components/Layout' ;
import { Router, Link } from './../routes' ;

const CampaignIndex = (props) => {

	const renderCampaigns = () => {
		const campaigns = props.campaigns.map(address => {
			return {
				header : address,
				description : <Link route={`/campaigns/${address}`}><a>View Campaign</a></Link> ,
				fluid : true
			};
		}) ;

		return <Card.Group items={campaigns} />
	}

	const addCampaignHandler = () => {
		Router.pushRoute('/campaigns/new') ;
	}

	return (
		<Layout>
			<Button primary onClick={addCampaignHandler} content="Add Campaign" icon="add circle" floated="right"/>
			{renderCampaigns()}
		</Layout>
	)
}

CampaignIndex.getInitialProps = async (ctx) => {
	const campaigns = await factory.methods.getDeployedCampaigns().call() ;
	return { campaigns }
}

export default CampaignIndex ;