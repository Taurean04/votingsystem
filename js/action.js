$(document).ready(function() {
  $('#regForm').submit(function(e) {
    e.preventDefault();
    const email = $('#email').val();
    const password = $('#password').val();
    if (email.length < 1 || password.length < 1) {
      $('#regMsg').html('Fill in all fields');
      return;
    }
    $.ajax({
      method: 'GET',
      url: `http://localhost:3000/voters?email=${email}`,
      data: {
        email,
      },
      success: function(res) {
        if (res.length) {
          $('#regMsg').html('User already exists');
        } else {
          $.ajax({
            method: 'POST',
            url: 'http://localhost:3000/voters',
            data: {
              email,
              password,
            },
            success: function() {
              $('#regMsg').html('Registration Successful');
            },
          });
        }
      },
    });
  });
  $('#canForm').submit(function(e) {
    e.preventDefault();
    const fullname = $('#fullname').val();
    const party = $('#party').val();
    if (fullname < 1 || party < 1) {
      $('#canMsg').html('Fill in all fields');
      return;
    }
    $.ajax({
      method: 'GET',
      url: `http://localhost:3000/candidates?party=${party}`,
      data: {
        party,
      },
      success: function(res) {
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
            success: function() {
              $('#canMsg').html('Candidate added successfully');
            },
          });
        }
      },
    });
  });
  $('#logForm').submit(function(e) {
    e.preventDefault();
    const logEmail = $('#email').val();
    const logPass = $('#password').val();
    if (!logEmail || !logPass) {
      $('#logMsg').html('Fill in Login Details');
      return;
    }
    $.ajax({
      method: 'GET',
      url: `http://localhost:3000/voters?email=${logEmail}&&password=${logPass}`,
      data: {
        logEmail,
        logPass,
      },
      success: function(res) {
        if (res.length) {
          $('#logMsg').html('Successfully Logged In');
          $('#checkLog').html('Voter Logged in');
          localStorage.setItem('email', logEmail);
          window.location.assign('index.html');
        } else {
          $('#logMsg').html('Invalid Email or Password');
        }
      },
    });
  });
  $('.logoutBtn').click(function() {
    localStorage.clear();
    $('#checkLog').html('Logged out');
    window.location.assign('login.html');
  });
  $.ajax({
    method: 'GET',
    url: 'http://localhost:3000/candidates',
    success: function(res) {
      res.forEach(candidate => {
        const fullname = $('<h5>')
          .addClass('card-title')
          .text(candidate.fullname);
        const party = $('<p>').addClass('card-text').text(candidate.party);
        const vote = $('<button>')
          .addClass('voteBtn')
          .addClass('btn btn-primary')
          .text('Vote');
        $('#card1')
          .append(fullname)
          .append(party)
          .append(vote)
      });
      $('.voteBtn').click(function() {
        let name = $(this)
          .prev()
          .prev();
        let fName = name[0].innerHTML;
        $.ajax({
            method: 'GET',
            url: `http://localhost:3000/votes?candidate=${fName}`,
            data:{fName},
            success: function(res){
                if(res.length){
                    let id = res[0].id;
                    let addVotes = parseInt(res[0].votes) + 1;
                    $.ajax({
                        type: 'PATCH',
                        url: `http://localhost:3000/votes/${id}`,
                        data: {
                            votes: addVotes
                        }
                    })
                }else{
                    $.ajax({
                        method: 'POST',
                        url: 'http://localhost:3000/votes',
                        data: {
                            candidate: fName,
                            votes: 1
                        }
                    })
                }
            }
        })
      });
    },
  });
  $.ajax({
    method: 'GET',
    url: 'http://localhost:3000/candidates',
    success: function(res) {
      res.forEach(candidate => {
        const fullname = $('<h5>')
          .addClass('card-title')
          .text(candidate.fullname);
        const party = $('<p>').addClass('card-text').text(candidate.party);
        const edit = $('<button>')
          .addClass('editBtn')
          .addClass('btn btn-primary')
          .text('Edit Candidate');
        $('#card2')
          .append(fullname)
          .append(party)
          .append(edit)
      });
      $('.editBtn').click(function() {
        let name = $(this)
          .prev()
          .prev();
        let fName = name[0].innerHTML;
        $.ajax({
          method: 'GET',
          url: `http://localhost:3000/candidates?fullname=${fName}`,
          data:{fName},
          success: function(res){
              if(res.length){
                  let id = res[0].id;
                  let fullname = $('#fullname').val();
                  let party = $('#party').val();
                  let values = {
                    fullname: res[0].fullname,
                    party: res[0].party
                  };
                  // $('editForm').;
                  // $.ajax({
                  //     type: 'PATCH',
                  //     url: `http://localhost:3000/candidates/${id}`,
                  //     data: {
                  //         votes: addVotes
                  //     }
                  // })
              }else{
                  // $.ajax({
                  //     method: 'POST',
                  //     url: 'http://localhost:3000/votes',
                  //     data: {
                  //         candidate: fName,
                  //         votes: 1
                  //     }
                  // })
              }
          }
        })
      })
    }
  })
});
