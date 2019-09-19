$(document).ready(function(){
    $('#setBtn').click(function(){
        let time = $('#time').val();
        let newTime = Number(time);
        if(!time){
            $('#count').html('Enter figure to start timer');
        }else{
            const interval = 
        setInterval(function(){
            $('#count').html(newTime--);    
        if(newTime <= 0){
            clearInterval(interval);
            $.ajax({
                method: 'GET',
                url: 'http://localhost:3000/candidates',
                success: function(res){
                    let maxArr = [];
                    let max = 0;
                    res.forEach(candidate => {
                        let numVotes = Number(candidate.votes);
                        votes = candidate.votes
                        maxArr.push(numVotes);
                    })
                    maxArr.forEach(i =>{
                        if(max < i){
                            max = i;
                        }
                    })
                    res.forEach(i =>{
                        if(i.votes == max){
                            $('#count').html(`The winner of the Election is ${i.fullname} with ${i.votes} votes`);
                        }
                    })
                
                }
            })
        }
        
        }, 1000)
        }
    })
});