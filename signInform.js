const forminfo = document.getElementById('personalinfo')
let username = ''
console.log("hiiii")
forminfo.addEventListener("submit",(e)=>{
    e.preventDefault()
    const fullname = document.getElementById("firstname").value + " " + document.getElementById("lastname").value
    console.log(fullname)
    const emailEle = document.getElementById("Email").value
    const passwordEle = document.getElementById("Password").value
    username = document.getElementById("username").value
    const personalinfo = {
        name : fullname,
        email:emailEle,
        passwordEle: passwordEle,
        SignIn: true
    }
    console.log("hello")
    sessionStorage.setItem('username',username)
    localStorage.setItem(username,JSON.stringify(personalinfo))
    forminfo.submit()
})
const getusername = function (){
    console.log("in signin username",username)
    return username
}


