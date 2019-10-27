import React, { Component } from 'react'
import classnames from 'classnames'
import styles from './Button.module.scss'

export default class Button extends Component {
	render() {
		const { children, color, size, className, ...rest } = this.props

		const styleClass = classnames({
			[styles.buttonPrimary]: color === 'primary',
			[styles.buttonLarge]: size === 'large'
		})

		return (
			<button
				className={classnames(styles.button, styleClass, className)}
				{...rest}
			>
				{children}
			</button>
		)
	}
}
