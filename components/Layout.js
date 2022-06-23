import Header from './Header' ;
import { Container } from 'semantic-ui-react' ;
import Head from 'next/head' ; 


const Layout  = (props) => {
	return (
		<Container>
			<Head>
				<link async rel="stylesheet" href="https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css"/>
			</Head>
			<Header />
			{props.children}
			<h1>I'm Footer</h1>
		</Container>
	)
}

export default Layout ;