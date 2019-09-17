$(document).ready(function(){
    $('#regForm').submit(function(e){
        e.preventDefault();
        const email = $('#email').val();
        const password = $('#password').val(); 
        if (!email || !password) {
            ('#regMsg').html('Fill in all fields');
        }
        $.ajax({
            method: 'GET',
            url: `http://localhost:3000/voters?email=${email}`,
            data:{
                email,
            },
            success: function(res){
                if(res.length){
                    $('#regMsg').html('User already exists');
                }else{
                    $.ajax({
                        method: 'POST',
                        url: 'http://localhost:3000/voters',
                        data: {
                            email,
                            password,
                        },
                        success: function(){
                            ('#regMsg').html('Registration Successful')
                        }
                    });
                }
            }
        });
    });
    $('#canForm').submit(function (e) {
        e.preventDefault();
        const fullname = $('#fullname').val();
        const party = $('#party').val(); 
        if (!email || !password) {
            ('#canMsg').html('Fill in all fields');
        }
        $.ajax({
            method: 'GET',
            url: `http://localhost:3000/candidates?party=${party}`,
            data: {
                party,
            },
            success: function (res) {
                if (res.length) {
                    $('#canMsg').html('Candidate from this party already registered');
                } else {
                    $.ajax({
                        method: 'POST',
                        url: 'http://localhost:3000/candidates',
                        data: {
                            fullname,
                            party,
                        },
                        success: function () {
                            ('#canMsg').html('Candidate added successfully')
                        }
                    });
                }
            }
        });
    });
});
