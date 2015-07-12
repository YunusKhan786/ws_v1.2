var mongoose = require('mongoose');

module.exports = mongoose.model('Todo', {
	name : {type : String, default: ''},
	house_no : {type : String, default: ''},
	street : {type : String, default: ''},
	area : {type : String, default: ''},
	city : {type : String, default: ''},
	country : {type : String, default: ''},
	pincode : {type : Number, default: ''},
	phone_no : {type : Number, default: ''},
	mobile : {type : Number, default: ''},
	selectedValues : {type : Array, default: ''},
	email : {type : String, default: ''},
	workitem1 : {type : String, default: ''},
	workitem2 : {type : String, default: ''},
	workitem3 : {type : String, default: ''}
});
