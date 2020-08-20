/* GET 'user' page */
const account_user = (req, res) => {
    res.render('index_account', { title: 'User' });
};
    
module.exports = {account_user};

