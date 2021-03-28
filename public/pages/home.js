
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