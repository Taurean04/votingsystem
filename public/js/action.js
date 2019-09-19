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
      data: { party },
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
          .addClass('box-title')
          .text(candidate.fullname);
        const party = $('<p>')
          .addClass('box-text')
          .text(candidate.party);
        const vote = $('<button>')
          .addClass('voteBtn')
          .addClass('btn btn-primary box-btn')
          .text('Vote');
        $('#card1')
          .append(fullname)
          .append(party)
          .append(vote)
          .append('<hr>');
      });
      $('.voteBtn').click(function() {
        let name = $(this)
          .prev()
          .prev();
        let fName = name[0].innerHTML;
        $.ajax({
          method: 'GET',
          url: `http://localhost:3000/candidates?fullname=${fName}`,
          data: { fName },
          success: function(res) {
            let id = res[0].id;
            if (res[0].votes) {
              let addVotes = parseInt(res[0].votes) + 1;
              $.ajax({
                type: 'PATCH',
                url: `http://localhost:3000/candidates/${id}`,
                data: {
                  votes: addVotes,
                },
              });
            } else {
              $.ajax({
                type: 'PATCH',
                url: `http://localhost:3000/candidates/${id}`,
                data: {
                  votes: 1,
                },
              });
            }
          },
        });
      });
    },
  });
  $.ajax({
    method: 'GET',
    url: 'http://localhost:3000/candidates',
    success: function(res) {
      res.forEach(candidate => {
        const fullname = $('<h5>')
          .addClass('box-title')
          .text(candidate.fullname);
        const party = $('<p>')
          .addClass('box-text')
          .text(candidate.party);
        const edit = $('<button>')
          .addClass('editBtn')
          .addClass('box-btn')
          .addClass('btn btn-primary')
          .text('Edit Candidate');
        const del = $('<button>')
          .addClass('delBtn')
          .addClass('box-btn')
          .addClass('btn btn-danger')
          .text('Delete');
        $('#card2')
          .append(fullname)
          .append(party)
          .append(edit)
          .append(del)
          .append('<hr>');
      });
      $('.editBtn').click(function() {
        let name = $(this)
          .prev()
          .prev();
        let fName = name[0].innerHTML;
        $.ajax({
          method: 'GET',
          url: `http://localhost:3000/candidates?fullname=${fName}`,
          data: { fName },
          success: function(res) {
            if (res.length) {
              let id = res[0].id;
              // let fullname = $('#fullname').val();
              // let party = $('#party').val();
              let nameIn = `<input
                  type="text"
                  name="fullname"
                  id="fullname"
                  class="fadeIn second"
                  placeholder="Candidate Name"
                  value="${res[0].fullname}"
                />`;
              let partyIn = `<input
                  type="text"
                  name="party"
                  id="party"
                  placeholder="Party"
                  class="fadeIn third"
                  value="${res[0].party}"
                />`;
              let edit = `<input
                  type="submit"
                  value="Edit"
                  id="edit"
                  class="fadeIn fourth"
                />`;
              $('#editForm')
                .append(nameIn)
                .append(partyIn)
                .append(edit);
              $('#edit').click(function(e) {
                e.preventDefault();
                let fullname = $('#fullname').val();
                let party = $('#party').val();
                $.ajax({
                  type: 'PATCH',
                  url: `http://localhost:3000/candidates/${id}`,
                  data: {
                    fullname,
                    party,
                  },
                  success: function() {
                    $('#editMsg').html('Candidated Updated');
                  },
                });
              });
            }
          },
        });
      });
      $('#cancel').click(function() {
        window.location.reload();
      });
      $('.delBtn').click(function() {
        let card = $(this)
          .prev()
          .prev();
        let party = card[0].innerHTML;
        $.ajax({
          method: 'GET',
          url: `http://localhost:3000/candidates?party=${party}`,
          data: { party },
          success: function(res) {
            if (res.length) {
              let id = res[0].id;
              console.log(id);
              $.ajax({
                type: 'DELETE',
                url: `http://localhost:3000/candidates/${id}`,
                success: function() {
                  $('#delCheck').html('Candidate deleted successfully');
                },
              });
            }
          },
        });
      });
    },
  });
  $.ajax({
    method: 'GET',
    url: 'http://localhost:3000/candidates',
    success: function(res) {
      res.forEach(candidate => {
        let fullname = candidate.fullname;
        let votes = candidate.votes;
      });
    },
  });
});
