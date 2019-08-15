import React, { Component } from 'react'
import classnames from 'classnames'
import styles from './Input.module.scss'

export default class Input extends Component {
	render() {
		const { className, ref, ...rest } = this.props

		return (
			<input className={classnames(styles.input, className)} {...rest} />
		)
	}
}
