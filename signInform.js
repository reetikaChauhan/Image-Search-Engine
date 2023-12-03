const forminfo = document.getElementById('personalinfo')

console.log("hiiii")
forminfo.addEventListener("submit",(e)=>{
    e.preventDefault()
    const fullname = document.getElementById("firstname").value + " " + document.getElementById("lastname").value
    console.log(fullname)
    const emailEle = document.getElementById("Email").value
    const passwordEle = document.getElementById("Password").value
    const username = document.getElementById("username").value
    const personalinfo = {
        name : fullname,
        email:emailEle,
        passwordEle: passwordEle,
    }
    console.log("hello")
    localStorage.setItem(username,JSON.stringify(personalinfo))
    forminfo.submit()
})


