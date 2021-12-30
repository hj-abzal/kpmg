import './App.css';
import Routes from '../components/routes/Routes';
import { Helmet } from 'react-helmet';
function App() {
	return (
		<div className='App'>
			<Helmet>
				<meta charSet='utf-8' />
				<title>KPMG</title>
				<meta name='description' content='KPMG app' />
			</Helmet>
			<Routes />
		</div>
	);
}

export default App;
