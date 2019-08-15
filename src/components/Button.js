import React, { Component } from 'react'
import classnames from 'classnames'
import styles from './Button.module.scss'

export default class Button extends Component {
	render() {
		const { children, className, ...rest } = this.props

		return (
			<button className={classnames(styles.button, className)} {...rest}>
				{children}
			</button>
		)
	}
}