// var firebaseConfig = {
//     apiKey: "AIzaSyDh3GfvH0wSIsMelxEWQr1Fn-dmkulLKGM",
//     authDomain: "veehack-fun-fit.firebaseapp.com",
//     projectId: "veehack-fun-fit",
//     storageBucket: "veehack-fun-fit.appspot.com",
//     messagingSenderId: "27402191932",
//     appId: "1:27402191932:web:8957e08b0f945ccac1af39",
//     measurementId: "G-Q71LV12EKT"
//   };
//   // Initialize Firebase
//   firebase.initializeApp(firebaseConfig);
//   firebase.analytics();
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
        .then((result) => {
            console.log(result)
            window.location.href = 'home.html';
        });
}





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
const Login = (username, password) => {


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

function login() {
    const username = document.getElementById('exampleInputName2').value;
    const password = document.getElementById('exampleInputPassword2').value;
    Login(username, password)

}
