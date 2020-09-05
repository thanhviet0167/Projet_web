var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/admin', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.on('error', () => {
    console.log("There is an error");
});

mongoose.connection.on('open', () => {
    console.log('Connecting to MongoDB');
});

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

var User = new mongoose.Schema({
    username: {type: String, index: {unique: true}},
    email: String,
    password: String,
    gender: String
});

module.exports = mongoose.model('User', User, 'User');