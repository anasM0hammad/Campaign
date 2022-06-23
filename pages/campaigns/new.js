import { useState } from 'react' ;
import Layout from './../../components/Layout' ;
import { Form, Button, Input } from 'semantic-ui-react' ;

const CampaignNew = (props) => {
	const [minimumContribution, setMinContribution] = useState('') ;	

	const inputHandler = (event) => {
		setMinContribution(event.target.value)
	}

	return (
		<Layout>
			<h1>Create Campaign</h1>

			<Form>
				<Form.Field>
					<label>Minimum Contributions</label>
					<Input label="WEI" labelPosition="right" value={minimumContribution} onChange={inputHandler}/>
				</Form.Field>
				<Button primary>Create!</Button>
			</Form>
		</Layout>
	);
}

export default CampaignNew ;