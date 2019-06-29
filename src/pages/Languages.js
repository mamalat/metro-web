import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { FormattedMessage } from 'react-intl'

import { Button } from '../components'
import styles from './Languages.module.scss'

export default class LanguagesPage extends Component {
	render() {
		return (
			<div className={styles.content}>
				<Helmet>
					<title>Languages</title>
				</Helmet>

				<Link tabIndex="-1" className={styles.back} to="/">
					<Button>
						<FormattedMessage id="app_back" />
					</Button>
				</Link>

				<h1>Languages</h1>

				<p>Adding language suggestions block in coming days...</p>
			</div>
		)
	}
}