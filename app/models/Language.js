const { Schema } = require('mongoose')

const Language = new Schema({
	name: {
		type: String,
		required: true,
		unique: true,
		trim: true
	},
	code: {
		type: String,
		required: true,
		lowercase: true,
		unique: true,
		trim: true,
		minlength: 2
	},
	voting: {
		type: Number,
		default: 1,
		min: 1
	},
	implemented: {
		type: Boolean,
		default: false
	}
})

module.exports = Language