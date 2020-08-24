let carts = document.querySelectorAll('.add-cart');

for(let i = 0; i < carts.length; i++)
{
    carts[i].addEventListener('click', () => 
    {
        cartNumbers();
    }
    )
}

function onLoadCartNumbers()
{
    let productNumbers = localStorage.getItem('cartNumbers');
    if(productNumbers)
    {
        document.querySelector('.cartNumbers').textContent = productNumbers;
    }
}

function cartNumbers()
{
    let itemNumbers = localStorage.getItem('cartNumbers');
    itemNumbers = parseInt(itemNumbers);
    if(itemNumbers)
    {
        localStorage.setItem('cartNumbers', itemNumbers + 1);
        document.querySelector('.cartNumbers').textContent = itemNumbers + 1;
    }
    else
    {
        localStorage.setItem('cartNumbers',1);
        document.querySelector('.cartNumbers').textContent = 1
    }
}

onLoadCartNumbers();

function checkSecurePassword()
{
    
}


function checkSignUpValid()
{
    var notice = document.getElementById("alert-box");
    var username = document.getElementById("userNameSignUp").value;
    var email = document.getElementById("emailSignUp").value;
    var password = document.getElementById("passwordSignUp").value;
    var re_password = document.getElementById("rePasswordSignUp").value;
    var gender = document.getElementById("genderSignUp").value;

    if(username == null || username ==""){
        notice.textContent = "(*) Username must be entered.";
        document.getElementById("userNameSignUp").style.background="#FFC0CB";
        return false;
    }else{
        notice.textContent = "";
        document.getElementById("userNameSignUp").style.background="";
    }
    if(email == null || email == "")
    {
        notice.textContent = "(*) Email must be entered";
        document.getElementById("emailSignUp").style.background="#FFC0CB";
        return false;
    }else{
        notice.textContent = "";
        document.getElementById("emailSignUp").style.background="";
    }
    if(password == null || password == ""){
        notice.textContent = "(*) Password must be entered.";
        document.getElementById("passwordSignUp").style.background="#FFC0CB";
        return false;
    }else{
        notice.textContent = "";
        document.getElementById("passwordSignUp").style.background="";
    }
    if(re_password == null || re_password == ""){
        notice.textContent = "(*) Re-type to confirm the password.";
        document.getElementById("rePasswordSignUp").style.background="#FFC0CB";
        return false;
    }else{
        notice.textContent = "";
        document.getElementById("rePasswordSignUp").style.background="";
    }

    if(password != re_password)
    {
        notice.textContent = "";
        notice.textContent = "(*) Password do not match. Please try again!"
        document.getElementById("passwordSignUp").style.background="#FFC0CB";
        document.getElementById("rePasswordSignUp").style.background="#FFC0CB";
        return false;
    }
    else
    {
        notice.textContent = "";
        document.getElementById("passwordSignUp").style.background="";
        document.getElementById("rePasswordSignUp").style.background="";
    }

    if( username.length > 15 || username.length < 6){
        notice.textContent = "";
        notice.textContent = "(*) Username and password must be among 6-15 characters.";
        document.getElementById("userNameSignUp").style.background="#FFC0CB";
        return false;
    }
    else{
        notice.textContent = "";
    }
    var count1 = 0;
    var count2 = 0;
    for(var i = 0; i < email.length; i++)
    {
        if(email[i] === "@"){
            count1 += 1;}
        if(email[i] === "."){
            count2 += 1;}
    }
    if(count1 != 1 && count2 != 1)
    {
        notice.textContent = "";
        notice.textContent = "(*) Email is invalid.";
        document.getElementById("emailSignUp").style.background="#FFC0CB";
        return false;
    }else{
        notice.textContent = "";
        document.getElementById("emailSignUp").style.background="";
    }

    if( password.length > 15 || password.length < 6){
        notice.textContent = "";
        notice.textContent = "(*) Password and password must be among 6-15 characters.";
        document.getElementById("passwordSignUp").style.background="#FFC0CB";
        return false;
    }
    else{
        notice.textContent = "";
    }

    var regex = /\w/g; // [A-Z] [a-z] [0-9]
    var result1 = username.match(regex);
    if(result1.length != username.length)
    {
        notice.textContent = "";
        notice.textContent = "(*) Username and password cannot contain special characters."
        document.getElementById("userNameSignUp").style.background="#FFC0CB";
        return false;
    }
    else{
        document.getElementById("userNameSignUp").style.background="";
        notice.textContent = "";
    }

    var result2 = password.match(regex);
    if(result1.length != username.length)
    {
        notice.textContent = "";
        notice.textContent = "(*) Username and password cannot contain special characters."
        document.getElementById("passwordSignUp").style.background="#FFC0CB";
        return false;
    }
    else{
        document.getElementById("passwordSignUp").style.background="";
        notice.textContent = "";
    }

    if( username === password && username.length != 0 && password.length != 0)
    {
        notice.textContent = "";
        notice.textContent = "(*) Username and password must be different.";
        document.getElementById("userNameSignUp").style.background="#FFC0CB";
        document.getElementById("passwordSignUp").style.background="#FFC0CB";
        return false;
    }
    else
    {
        document.getElementById("userNameLogin").style.background="";
        document.getElementById("passwordLogin").style.background="";
        notice.textContent = "";
    }
    document.getElementById("userNameLogin").style.background="#c7ffa8";
    document.getElementById("passwordLogin").style.background="#c7ffa8";
    return true;
    
}
function checkLoginValid()
{
    var notice = document.getElementById("alertLogin");
    var username = document.getElementById("userNameLogin").value;
    var password = document.getElementById("passwordLogin").value;
    if((password == null || password =="")&&(username == null || username == ""))
    {
        notice.textContent = "(*) Username and password must be entered";
        document.getElementById("userNameLogin").style.background="#FFC0CB";
        document.getElementById("passwordLogin").style.background="#FFC0CB";
        return false;
    }
    else{
        notice.textContent = "";
        document.getElementById("userNameLogin").style.background="";
        document.getElementById("passwordLogin").style.background="";
    }
    if((username == null || username =="")&&(password != "" || password != "")){
        notice.textContent = "(*) Username must be entered.";
        document.getElementById("userNameLogin").style.background="#FFC0CB";
        return false;
    }
    else{
        notice.textContent = "";
        document.getElementById("userNameLogin").style.background="";
    }
    if((password == null || password == "")&&(username != null || username != "")){
        notice.textContent = "(*) Password must be entered.";
        document.getElementById("passwordLogin").style.background="#FFC0CB";
        return false;
    }
    else{
        notice.textContent = "";
        document.getElementById("passwordLogin").style.background="";
    }
    if( username.length > 15 || username.length < 6){
        notice.textContent = "";
        notice.textContent = "(*) Username and password must be among 6-15 characters.";
        document.getElementById("userNameLogin").style.background="#FFC0CB";
        return false;
    }
    else{
        notice.textContent = "";
    }

    if( password.length > 15 || password.length < 6){
        notice.textContent = "";
        notice.textContent = "(*) Password and password must be among 6-15 characters.";
        document.getElementById("passwordLogin").style.background="#FFC0CB";
        return false;
    }
    else{
        notice.textContent = "";
    }

    var regex = /\w/g; // [A-Z] [a-z] [0-9]
    var result1 = username.match(regex);
    if(result1.length != username.length)
    {
        notice.textContent = "";
        notice.textContent = "(*) Username and password cannot contain special characters."
        document.getElementById("userNameLogin").style.background="#FFC0CB";
        return false;
    }
    else{
        document.getElementById("userNameLogin").style.background="";
        notice.textContent = "";
    }

    var result2 = password.match(regex);
    if(result1.length != username.length)
    {
        notice.textContent = "";
        notice.textContent = "(*) Username and password cannot contain special characters."
        document.getElementById("passwordLogin").style.background="#FFC0CB";
        return false;
    }
    else{
        document.getElementById("passwordLogin").style.background="";
        notice.textContent = "";
    }

    if( username === password && username.length != 0 && password.length != 0)
    {
        notice.textContent = "";
        notice.textContent = "(*) Username and password must be different.";
        document.getElementById("userNameLogin").style.background="#FFC0CB";
        document.getElementById("passwordLogin").style.background="#FFC0CB";
        return false;
    }
    else
    {
        document.getElementById("userNameLogin").style.background="";
        document.getElementById("passwordLogin").style.background="";
        notice.textContent = "";
    }
    document.getElementById("userNameLogin").style.background="#c7ffa8";
    document.getElementById("passwordLogin").style.background="#c7ffa8";
    return true;
}