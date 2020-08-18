/* GET 'about' page */
const account_user = (req, res) => {
    res.render('index_account', { title: 'About' });
};
    
module.exports = {account_user};
