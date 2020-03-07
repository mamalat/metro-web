import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { injectIntl, FormattedMessage } from 'react-intl'
import { Helmet } from 'react-helmet'
import { ReactSVG } from 'react-svg'

import metro from '../media/metro.svg'
import styles from './Home.module.scss'

import { Button, DevicePreview } from '../components'

export default injectIntl(class HomePage extends Component {
	state = {
		supportsColorScheme: false,
		isDarkMode: false,
		isLightMode: false
	}

	mediaQueryUpdated = mediaQuery => {
		const isDarkMode = mediaQuery.matches

		this.setState({ isDarkMode })
	}

	UNSAFE_componentWillMount() {
		const mobileQuery = window.matchMedia('(prefers-color-scheme: dark)')

		this.mediaQueryUpdated(mobileQuery)
		mobileQuery.addListener(this.mediaQueryUpdated)
	}

	render() {
		const { intl } = this.props
		const { isDarkMode } = this.state

		return (
			<div className={styles.wrapping}>
				<Helmet>
					<title>{intl.formatMessage({ id: 'app_name' })}</title>
					{/*<meta property="og:title" content={intl.formatMessage({ id: 'app_name' })} />
				<meta name="twitter:title" content={intl.formatMessage({ id: 'app_name' })} />
				<meta property="og:description" content={intl.formatMessage({ id: 'app_description' })} />
				<meta name="twitter:description" content={intl.formatMessage({ id: 'app_description' })} />*/}
				</Helmet>

				<div className={styles.content}>
					<DevicePreview>
						<img
							alt="App screenshot"
							src={intl.formatMessage({
								id: isDarkMode
									? 'app_home_screenshot_dark'
									: 'app_home_screenshot'
							})}
						/>
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
							href={intl.formatMessage({
								id: 'app_app_store_link'
							})}
						>
							<img
								width="120"
								height="40"
								src={`/app-store/${intl.locale}.svg`}
								alt={intl.formatMessage({
									id: 'app_app_store_download'
								})}
							/>
						</a>
					</div>
				</div>

				<Link to="/languages" className={styles.languages}>
					<ReactSVG
						width="22"
						height="18"
						src="languages.svg"
						alt={intl.formatMessage({ id: 'app_language' })}
					/>
					<FormattedMessage id="app_language" />
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
