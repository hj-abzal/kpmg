import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App/App';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './App/store';

ReactDOM.render(
  <HashRouter>
	<React.StrictMode>
		<Provider store={store}>
		<App />
		</Provider>
	</React.StrictMode>
  </HashRouter>,
  document.getElementById('root')
);

