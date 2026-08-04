"use strict";

const db = supabaseClient;

document.addEventListener("DOMContentLoaded",()=>{

document

.getElementById("loginForm")

.addEventListener(

"submit",

loginUser

);

});
async function loginUser(e){

    e.preventDefault();
    
    const email=
    
    document
    
    .getElementById("email")
    
    .value
    
    .trim();
    
    const password=
    
    document
    
    .getElementById("password")
    
    .value;
    
    document
    
    .getElementById("loadingLogin")
    
    .classList.remove("d-none");
    
    const{
    
    data,
    
    error
    
    }=await db.auth.signInWithPassword({
    
    email,
    
    password
    
    });
    document

.getElementById("loadingLogin")

.classList.add("d-none");

if(error){

showMessage(

error.message,

"danger"

);

return;

}

showMessage(

"Login Successful",

"success"

);

setTimeout(()=>{

window.location="index.html";

},1000);

}
function showMessage(message,type){

    const box=
    
    document.getElementById(
    
    "loginMessage"
    
    );
    
    box.className=
    
    `alert alert-${type}`;
    
    box.innerHTML=message;
    
    }
    