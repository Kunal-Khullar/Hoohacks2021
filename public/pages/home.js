
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
              nutrition
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
        localStorage.setItem('nutrition', result.data.me.nutrition)

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

var prot=0,carb=0,vit=0,min=0,fat=0;
    fetch('https://veehacks-backend.herokuapp.com/graphql/', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        "Authorization": `JWT ${localStorage.getItem('token')}`
    },
    body: JSON.stringify({
        query: `
        query getNutrition{
  
            nutrition{
            foodName
              carbs
              protein
              fats
              minerals
              vitamins
              Date
            }
          }
           `,

    })



    
})
    .then((res) => res.json())
    .then(async (result) => {

        console.log(result.data);
      await  result.data.nutrition.map((item, j) => {
            prot+=item.protein;
            carb+=item.carbs;
            fat+=item.fats;
            vit+=item.vitamins;
            min+=item.minerals;
            document.getElementById("nutrients").innerHTML +=
                `
                <tr>
                <th scope='row'>${j+1}</th>
                <td>${item.Date}</td>
                <td>${item.foodName}</td>
                <td>${item.protein}</td>
                <td>${item.carbs}</td>
                <td>${item.fats}</td>
                <td>${item.vitamins}</td>
                <td>${item.minerals}</td>
              </tr>
            
            `
        })
        var ctx2 = document.getElementById('myChart2')
        data = {
           
                labels: [
                  'Protein',
                  'Carbs',
                  'Fats',
                  'Vitamins',
                  'Minerals'
                ],
                datasets: [{
                  label: 'My First Dataset',
                  data: [prot,carb,fat,vit,min],
                  backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)',
                    'green',
                    'orange'
                  ],
     
                       }]
                   }           
        var myPieChart = new Chart(ctx2, {
            type: 'pie',
            data: data,
            
        });
        var ctx = document.getElementById('myChart');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Proteins', 'Carbs', 'Fats', 'Vitamins', 'Minerals'],
        datasets: [{
            label: 'Nutrients',
            data: [prot,carb, fat,vit,min],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                
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
   
        // localStorage.setItem('token', result.data.tokenAuth.token) //saving token
        // window.location.href = 'home.html';
    });
    