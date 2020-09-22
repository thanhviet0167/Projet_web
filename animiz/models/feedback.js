var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://animiz:animiz@cluster0.yfhgm.mongodb.net/Manage', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.on('error', () => {
    console.log("There is an error");
});

mongoose.connection.on('open', () => {
    console.log('Connecting to MongoDB');
});

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

var Feedback = new mongoose.Schema({
    email: String,
    comment: String
});

module.exports = mongoose.model('Feedback', Feedback, 'Feedback');