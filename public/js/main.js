
function nextform() {

    document.getElementById('userdetails2').classList.remove('hide');
    document.getElementById('userdetails1').classList.add('hide');
    document.getElementById('userdetails2').classList.add('animate__animated');
    document.getElementById('userdetails2').classList.add('animate__fadeIn');
}
function register() {

    const age = document.getElementById('exampleInputAge1').value
    const weight = document.getElementById('exampleInputWeight1').value
    const height = document.getElementById('exampleInputHeight1').value
    const email = document.getElementById('exampleInputEmail1').value
    const names = document.getElementById('exampleInputName1').value
    const password = document.getElementById('exampleInputPassword1').value
    const username = document.getElementById('exampleInputUserName1').value
    const gender = document.getElementById('exampleInputGender1').value
    try {
        SignUp(age, email, gender, height, names, password, username, weight)

    }
    catch (e) {
        console.log(e.message)
    }
}
function login() {
    const username = document.getElementById('exampleInputName2').value
    const password = document.getElementById('exampleInputPassword2').value
    Login(username, password)

}
const SignUp = async (age, email, gender, height, names, password, username, weight) => {
    console.log(`age:${age},email:${email},gender:${gender},height:${height},name:${names},password:${password},username:${username},
 weight:${weight}`);
    fetch('https://veehacks-backend.herokuapp.com/graphql/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: `
            mutation CreateUser($email:String!,$password:String!,$age:Int,$gender:String,$height:Int,$name:String,
                $username:String!,$weight:Int
                
                ){
                  createUser(age:$age,email:$email,gender:$gender,height:$height,name:$name,password:$password,username:$username,
                  weight:$weight){
                    user{
                      username
                    }
                  }
                }
            `,
            variables: {
                age, email, gender, height, name: names, weight, username, password

            }
        }),
    })
        .then((res) => res.json())
        .then((result) => console.log(result));
}
const Login = async (username, password) => {


    fetch('https://veehacks-backend.herokuapp.com/graphql/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: `
               mutation LoginUser($username:String!,$password:String!){
                tokenAuth(username:$username,password:$password){
                  token
                }
              }
               `,
            variables: {
                username,
                password

            }
        }),
    })
        .then((res) => res.json())
        .then((result) => {
            console.log(result.data.tokenAuth.token);
            localStorage.setItem('token', result.data.tokenAuth.token) //saving token
            window.location.href = 'home.html';
        });
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



