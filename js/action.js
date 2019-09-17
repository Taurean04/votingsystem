$(document).ready(function(){
    $('#regForm').submit(function(e){
        e.preventDefault();
        const email = $('#email').val();
        const password = $('#password').val();
        $.ajax({
            method: 'POST',
            url: 'http://localhost:3000/voters',
            data: {
                email,
                password,
            }
        })
    });
});

$(document).ready(function () {
    $('#regForm').submit(function (e) {
        e.preventDefault();
        const email = $('#email').val();
        const password = $('#password').val();
        $.ajax({
            method: 'POST',
            url: 'http://localhost:3000/candidates',
            data: {
                email,
                password,
            }
        })
    });
});