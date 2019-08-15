import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { IntlProvider } from 'react-intl'

import Home from './pages/Home'
import PrivacyPolicyPage from './pages/PrivacyPolicy'
import LanguagesPage from './pages/Languages'

import './App.module.scss'
import messages from './messages'


let userLanguage = navigator.language.slice(0, 2)

if (['ru', 'uk', 'en'].indexOf(userLanguage) === -1) {
	userLanguage = 'en'
}

function App() {
	return (
		<IntlProvider defaultLocale={userLanguage} key={userLanguage} locale={userLanguage} messages={messages[userLanguage]}>
			<Switch>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/privacy-policy" component={PrivacyPolicyPage} />
					<Route exact path="/languages" component={LanguagesPage} />
					<Redirect to="/" />
				</Switch>
			</Switch>
		</IntlProvider>
	)
}


export default App