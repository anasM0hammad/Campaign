import { useState } from 'react' ;
import Layout from './../../components/Layout' ;
import { Form, Button, Input, Message } from 'semantic-ui-react' ;
import factory from './../../ethereum/factory' ;
import web3 from './../../ethereum/web3' ;

const CampaignNew = (props) => {
	const [minimumContribution, setMinContribution] = useState('') ;	
	const [errMsg, setErrMsg] = useState('') ;
	const [isLoading, setIsLoading] = useState(false) ;

	const inputHandler = (event) => {
		setMinContribution(event.target.value)
	}

	const formHandler = async (event) => {
		event.preventDefault() ;
		setIsLoading(true) ;
		setErrMsg('') ;
		try{
			const accounts = await web3.eth.getAccounts() ;
			await factory.methods.createCampaign(minimumContribution).send({
				from : accounts[0]	// METAMASK WILL CALCULATE THE GAS FEE FOR THE USER
			}) ;
		}
		catch(err){
			setErrMsg(err.message) ;
		}

		setIsLoading(false);
	}

	return (
		<Layout>
			<h1>Create Campaign</h1>

			<Form onSubmit={formHandler} error={!!errMsg}>
				<Form.Field>
					<label>Minimum Contributions</label>
					<Input label="WEI" labelPosition="right" value={minimumContribution} onChange={inputHandler}/>
				</Form.Field>
				<Message error header="OOPS!" content={errMsg} />
				<Button primary loading={isLoading}>Create!</Button>
			</Form>
		</Layout>
	);
}

export default CampaignNew ;