
fetch('https://veehacks-backend.herokuapp.com/graphql/', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        "Authorization": `JWT ${localStorage.getItem('token')}`
    },
    body: JSON.stringify({
        query: `
        query GetProfile{
            me{
              gameLife
              name
              
            }
          }
           `,

    }),
})
    .then((res) => res.json())
    .then((result) => {
        document.getElementById('lives').innerHTML = result.data.me.gameLife
        console.log(result.data)
        localStorage.setItem('lives', result.data.me.gameLife)

        // localStorage.setItem('token', result.data.tokenAuth.token) //saving token
        // window.location.href = 'home.html';
    });
fetch('https://veehacks-backend.herokuapp.com/graphql/', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        "Authorization": `JWT ${localStorage.getItem('token')}`
    },
    body: JSON.stringify({
        query: `
        query getLeaderBoard{
  
            leaderBoard{
              name
              maxScore
              nutrition
              image
              gameLife
              user{
                username
              }
            }
          }
           `,

    }),
})
    .then((res) => res.json())
    .then((result) => {

        console.log(result.data);
        result.data.leaderBoard.map((item, i) => {
            document.getElementById("leadertable").innerHTML +=
                `
            <tr>
            <th scope='row'>${i + 1}</th>
            <td>
                <img src=${item.image} alt=''>
            </td>
            <td>${item.user.username}</td>
            <td>${item.gameLife}</td>
            <td>${item.maxScore}</td>
          </tr>
            
            `
        })

        // localStorage.setItem('token', result.data.tokenAuth.token) //saving token
        // window.location.href = 'home.html';
    });
function startGame() {
    if (localStorage.getItem('lives') <= 0) {
        alert("Not enough lives please log your food on our app")
    }
    else {
        window.location.href = '../game/game.html';
    }
}
var ctx = document.getElementById('myChart');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});

