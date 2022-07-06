import Layout from './../../components/Layout'  ;
import Campaign from './../../ethereum/campaign' ;

const showCampaign = (props) => {

	return (
		<Layout>
			<h3>Show Campaign</h3>
		</Layout>
	)
}

showCampaign.getInitialProps = async (props) => {
	const campaign = Campaign(props.query.address) ;
	const details = await campaign.methods.getDetails().call() ;
	return {
		minimumContribution : details[0] ,
		balance : details[1],
		numReq : details[2],
		approversCount : details[3],
		manager : details[4]
	}

}

export default showCampaign