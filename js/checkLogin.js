$(document).ready(function(){
    let user = window.localStorage.getItem('email');
    if(user){
        $('#checkLog').html('You are logged in');
    }else{
        $('#checkLog').html('Please log in');
        window.location.assign('login.html');
    }
});