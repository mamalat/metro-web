// true: is for curremt env from NODE_ENV
require('custom-env').env(true)
require('app-module-path/register')

const express = require('express')
const http = require('http')
const https = require('https')

const morgan = require('morgan')
const cors = require('cors')
const compression = require('compression')
const bodyParser = require('body-parser')

const { ApolloServer, gql } = require('apollo-server-express')

const { Language } = require('app/models')

const path = require('path')
const fs = require('fs')
const options = {}

if (process.env.NODE_ENV === 'production') {
	const liveCertPath = '/cert/live/www.kyivmetro.com/'

	const keyPath = fs.readlinkSync(__dirname + liveCertPath + 'privkey.pem')
	const certPath = fs.readlinkSync(__dirname + liveCertPath + 'cert.pem')

	options.key = fs.readFileSync(__dirname + liveCertPath + keyPath)
	options.cert = fs.readFileSync(__dirname + liveCertPath + certPath)
}

const typeDefs = gql`
	type Language {
		name: String!,
		code: String!,
		voting: Int,
		implemented: Boolean
	}

	type Query {
		Language(id: String!): Language,
		AllLanguages: [Language]!
	}

	type Mutation {
		addLanguage(name: String!, code: String!): Language
		voteOnLanguage(code: String!): Language
	}
`

const resolvers = {
	Query: {
		Language(parent, args) {
			return Language.findOne({ _id: args.id })
		},
		AllLanguages(parent, args) {
			return Language.find({})
		}
	},

	Mutation: {
		addLanguage(parent, args) {
			const language = new Language(args)
			return language.save()
		},
		async voteOnLanguage(parent, args) {
			return Language.findOneAndUpdate({ code: args.code }, {
				$inc : { voting: 1 }
			})
		}
	}
}

var server = new ApolloServer({
	typeDefs,
	resolvers,
	context: ({req}) => ({ Language })
})

const app = express()
const redirectApp = express()
const publicFolder = path.resolve(__dirname, 'build')

server.applyMiddleware({ app })
app.use(morgan('tiny'))
app.use(cors())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(compression())
app.use(express.static(publicFolder))

app.use((req, res) => {
	res.sendFile('index.html', { root: publicFolder })
})

if (process.env.NODE_ENV === 'production') {
	redirectApp.get('*', (req, res) => {
		res.redirect('https://' + req.headers.host + req.url)
	})

	https.createServer(options, app).listen(5443, () => {
		console.log('https: listening on 5443')
	})
}

http.createServer(redirectApp).listen(5000, () => {
	console.log(`http: listening on 5000 ${server.graphqlPath}`)
})