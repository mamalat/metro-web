import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import { IntlProvider } from 'react-intl'

import './App.module.scss'
import Home from './pages/Home'
import PrivacyPolicy from './pages/PrivacyPolicy'
import LanguagesPage from './pages/Languages'

import messages from './messages'

let userLanguage = navigator.language.slice(0, 2)

if (['ru', 'uk', 'en'].indexOf(userLanguage) === -1) {
	userLanguage = 'en'
}

function App() {
	return (
		<IntlProvider locale={userLanguage} messages={messages[userLanguage]}>
			<Router>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/privacy-policy" component={PrivacyPolicy} />
					<Route exact path="/languages" component={LanguagesPage} />
					<Redirect to="/" />
				</Switch>
			</Router>
		</IntlProvider>
	)
}

export default App