const feedback = require('../models/feedback');

const get_feedback = (req, res, next) => {
    feedback.create({
        email: req.body.email_user,
        comment: req.body.message_user
    },function(err, newfeedback){
        if(err){
            throw err
        };
        console.log("Create new feedback with id ", newfeedback._id);
        res.redirect('/');
    });
}

module.exports = {get_feedback};