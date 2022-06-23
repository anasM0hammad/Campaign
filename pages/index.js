import { useState } from 'react' ;
import factory from './../ethereum/factory' ;
import { Card, Button } from 'semantic-ui-react' ;
import Layout from './../components/Layout' ;

const CampaignIndex = (props) => {

	const renderCampaigns = () => {
		const campaigns = props.campaigns.map(address => {
			return {
				header : address,
				description : <a>View Campaign</a> ,
				fluid : true
			};
		}) ;

		return <Card.Group items={campaigns} />
	}

	return (
		<Layout>
			<Button primary content="Add Campaign" icon="add circle" floated="right"/>
			{renderCampaigns()}
		</Layout>
	)
}

CampaignIndex.getInitialProps = async (ctx) => {
	const campaigns = await factory.methods.getDeployedCampaigns().call() ;
	return { campaigns }
}

export default CampaignIndex ;