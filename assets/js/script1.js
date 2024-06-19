var logswitch=document.getElementById("logswitch");
var createacc=document.getElementById("form1")
var login=document.getElementById("login");
var signup=document.getElementById("signup");
logswitch.addEventListener("click", ()=>{
    login.style.display="block";
    createacc.style.display="none";
});

signup.addEventListener("click", ()=>{
    login.style.display="none";
    createacc.style.display="block";
});
