import { configure, storiesOf, addDecorator } from '@storybook/react'
import { setIntlConfig, withIntl } from 'storybook-addon-intl'
import { addLocaleData } from 'react-intl'

import messages from '../src/messages'

const getMessages = (locale) => messages[locale]

setIntlConfig({
	locales: ['en', 'ru', 'uk'],
	defaultLocale: 'en',
	getMessages
})

addDecorator(withIntl)

function loadStories() {
	require('../src/stories')
}

configure(loadStories, module)