function nextform()
{

    document.getElementById('userdetails2').classList.remove('hide');
    document.getElementById('userdetails1').classList.add('hide');
    document.getElementById('userdetails2').classList.add('animate__animated');
    document.getElementById('userdetails2').classList.add('animate__fadeIn');
}
function register()
{
    console.log(document.getElementById('age1').value)
    console.log(document.getElementById('weight1').value)
    console.log(document.getElementById('height1').value)
    console.log(document.getElementById('exampleInputEmail1').value)
    console.log(document.getElementById('exampleInputName1').value)
}
function login(){
    console.log(document.getElementById('exampleInputName2').value)
    console.log(document.getElementById('exampleInputPassword2').value)
    window.location.href ='home.html';
}