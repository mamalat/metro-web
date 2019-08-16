import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { injectIntl, FormattedMessage } from 'react-intl'
import { Helmet } from 'react-helmet'

import metro from '../media/metro.svg'
import languages from '../media/languages.svg'
import styles from './Home.module.scss'

import { Button, DevicePreview } from '../components'

export default injectIntl(class HomePage extends Component {
	render() {
		const { intl } = this.props

		return (
			<div className={styles.wrapping}>
				<Helmet>
					<title>{intl.formatMessage({ id: 'app_name' })}</title>
				</Helmet>

				<div className={styles.content}>
					<DevicePreview>
						<img loading="lazy" src={intl.formatMessage({ id: 'app_home_screenshot' })} alt="App screenshot" />
					</DevicePreview>

					<div className={styles.info}>
						<img src={metro} alt="Metro icon" />
						<h1 className={styles.heading}>
							<FormattedMessage id="app_name" />
						</h1>

						<p className={styles.description}>
							<FormattedMessage id="app_description" />
						</p>

						<a
							target="_blank"
							rel="noopener noreferrer"
							className={styles.appStore}
							href={intl.formatMessage({ id: 'app_app_store_link' })}
						>
							<img loading="lazy" width="120" height="40" src={`/app-store/${intl.locale}.svg`} alt={intl.formatMessage({ id: 'app_app_store_download' })} />
						</a>
					</div>
				</div>

				<Link
					to="/languages"
					className={styles.languages}
				>
					<img loading="lazy" width="22" height="18" src={languages} alt={intl.formatMessage({ id: 'app_language' })} /> <FormattedMessage id="app_language" />
				</Link>

				<Link
					tabIndex="-1"
					to="/privacy-policy"
					className={styles.privacyPolicy}
				>
					<Button>
						<FormattedMessage id="app_privacy_policy" />
					</Button>
				</Link>
			</div>
		)
	}
})