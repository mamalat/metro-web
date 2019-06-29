import React, { Component } from 'react'
import styles from './Button.module.scss'

export default class Button extends Component {
	render() {
		const { children, ...rest } = this.props

		return (
			<button className={styles.button} {...rest}>
				{children}
			</button>
		)
	}
}