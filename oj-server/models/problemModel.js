var mongoose = require('mongoose');
var ProblemSchema = mongoose.Schema({
    id: Number,
    name: String,
    desc: String,
    difficulty: String
});

var ProblemModel = mongoose.model('ProblemModel', ProblemSchema);

module.exports = ProblemModel;