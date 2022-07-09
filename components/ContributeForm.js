import { Form, Input, Message, Button } from 'semantic-ui-react' ;
import { useState } from 'react' ;
import Campaign from './../ethereum/campaign' ;
import web3 from './../ethereum/web3' ;
import { Router } from './../routes' ;

const ContributeForm = (props) => {

	const [contributionValue, setContributionValue] = useState('') ;
	const [isLoading, setIsLoading] = useState(false) ;
	const [errorMsg, setErrorMsg] = useState('') ;

	const contributionHandler = (event) => {
		setContributionValue(event.target.value) ;
	}

	const submitHandler = async (event) => {
		event.preventDefault() ;
		const campaign = Campaign(props.address) ;
		const accounts = await web3.eth.getAccounts() ;
		setErrorMsg('') ;
		setIsLoading(true) ;
		
		try{
			await campaign.methods.contribute().send({
				value : web3.utils.toWei(contributionValue, 'ether') ,
				from : accounts[0]
			});
			Router.replace(`/campaigns/${props.address}`) ;
		}
		catch(err){
			console.log(err) ;
			setErrorMsg(err.message) ;
		}
		setIsLoading(false) ;
		setContributionValue('') ;
	}

	return (
		<Form onSubmit={submitHandler} success={!errorMsg} error={!!errorMsg}>
			<Form.Field>
				<label>Amount to Contribute</label>
				<Input label="ether" labelPosition="right" value={contributionValue} onChange={contributionHandler}/>
			</Form.Field>
			<Message error header="Oops!!" content={errorMsg} />
			<Message success header="Hurrayy!!" content="Contribution Successful"/>
			<Button primary loading={isLoading}>Contribute!</Button>
		</Form>
	);
}

export default ContributeForm ;