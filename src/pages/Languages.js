import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { injectIntl, FormattedMessage } from 'react-intl'
import { gql } from 'apollo-boost'
import { Query, Mutation } from 'react-apollo'

import { Button, Input } from '../components'
import styles from './Languages.module.scss'


const getLanguages = gql('{AllLanguages {name, code, voting } } ')

const addLanguage = gql`
	mutation AddLanguage($name: String!, $code: String!) {
		addLanguage(name: $name, code: $code) {
			name,
			code,
			voting
		}
	}
`

const voteOnLanguage = gql`
	mutation VoteOnLanguage($code: String!) {
		voteOnLanguage(code: $code) {
			name,
			code,
			voting
		}
	}
`

export default injectIntl(class LanguagesPage extends Component {
	state = {
		value: ''
	}

	submitLanguage = (event, addLanguage) => {
		event.preventDefault()

		addLanguage({
			variables: { name: this.state.value, code: this.state.value.slice(0, 2) },
			refetchQueries: [{ query: getLanguages }]
		})
		
		this.setState({ value: '' })
	}

	render() {
		const { intl } = this.props

		return (
			<div className={styles.content}>
				<Helmet>
					<title>{intl.formatMessage({ id: 'app_languages' })}</title>
				</Helmet>

				<Link tabIndex="-1" className={styles.back} to="/">
					<Button>
						<FormattedMessage id="app_back" />
					</Button>
				</Link>

				<h1>
					<FormattedMessage id="app_languages" />
				</h1>

				<p>
					<FormattedMessage id="app_languages_description" />
				</p>

				<Query query={getLanguages}>
					{({ loading, error, data }) => {

						if (loading) return <div>Loading...</div>
						if (error) return <div>Error :(</div>
							// console.log('error',  error, data)

						return (
							<div>
								<Mutation mutation={addLanguage}>
									{(addLanguage, { data, error }) => (
										<form onSubmit={(e) => this.submitLanguage(e, addLanguage)}>
											<div className={styles.form}>
												<Input
													placeholder={intl.formatMessage({ id: 'app_languages_add_placeholder' })}
													className={styles.input}
													value={this.state.value}
													onChange={({ target }) => {
														this.setState({
															value: target.value
														})
													}}
												/>

												<Button>
													<FormattedMessage id="app_languages_add" />
												</Button>
											</div>
										</form>
									)}
								</Mutation>
								
								<Mutation mutation={voteOnLanguage}>
									{(voteOnLanguage) => (
										<Fragment>
											{(data.AllLanguages && data.AllLanguages.length > 0) ? (
												<ul className={styles.languagesList}>
													{data.AllLanguages.map((language) => (
														<li className={styles.language} key={language.code}>
															<div className={styles.languageInfo}>
																<span className={styles.languageName}>{language.name}</span>
																<span className={styles.languageVote}>{language.voting}</span>

															</div>

															<Button
																onClick={() =>
																	voteOnLanguage({
																		variables: { code: language.code },
																		refetchQueries: [{ query: getLanguages }]
																	})
																}
																className={styles.languageButton}
															>
																<FormattedMessage id="app_languages_vote" />
															</Button>
														</li>
													))}
												</ul>
											) : (
												<p className={styles.empty}>
													<FormattedMessage id="app_languages_empty" />
												</p>
											)}
										</Fragment>
									)}
								</Mutation>
							</div>
						)
					}}
				</Query>
			</div>
		)
	}
})