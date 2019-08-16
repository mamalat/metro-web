import React, { Component } from 'react'
import device from '../media/device.svg'
import styles from './DevicePreview.module.scss'

export default class DevicePreview extends Component {
	render() {
		const { children } = this.props

		return (
			<div className={styles.device}>
				<div className={styles.deviceScreen}>{children}</div>
				<img loading="lazy" src={device} className={styles.deviceBody} alt="IPhone frame" />
			</div>
		)
	}
}