import React from 'react'

import { storiesOf, addDecorator, addParameters } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import centered from '@storybook/addon-centered/react'
import { withA11y } from '@storybook/addon-a11y'

import { FormattedMessage, injectIntl } from 'react-intl'

import { Button, Input, DevicePreview } from '../components'

addDecorator(withA11y)
addDecorator(centered)

addParameters({
	backgrounds: [
		{ name: 'default', value: '#edf5fb', default: true }
	]
})

storiesOf('DevicePreview', module)
	.add('empty', injectIntl(({intl}) => (
		<DevicePreview />
	)), {
		notes: 'A very simple example of addon notes'
	})
	.add('with screenshot', injectIntl(({intl}) => (
		<DevicePreview>
			<img loading="lazy" src={intl.formatMessage({ id: 'app_home_screenshot' })} alt="App screenshot" />
		</DevicePreview>
	)))

storiesOf('Button', module)
	.add('with text', () =>
		<Button onClick={action('clicked')}>
			<FormattedMessage id="app_back" />
		</Button>
	)

storiesOf('Input', module)
	.add('empty', () =>
		<Input />
	)
	.add('with placeholder', () =>
		<Input placeholder="Placeholder" />
	)