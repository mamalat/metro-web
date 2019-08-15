const mongoose = require('mongoose')

mongoose.connect(`mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@${process.env.MONGO_DB_HOST}:${process.env.MONGO_DB_PORT}/metro?authSource=admin`, {
	useNewUrlParser: true,
	useFindAndModify: false,
	useCreateIndex: true
})

mongoose.Promise = Promise


module.exports = {
	Language: mongoose.model('Language', require('app/models/Language'))
}
