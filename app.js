/*==================================================
ATP BUSINESS PORTAL
Final Production JavaScript
==================================================*/

"use strict";

/*==================================================
DOM ELEMENTS
==================================================*/

const navbar = document.querySelector(".navbar");

const backTop = document.getElementById("backToTop");

const dealerForm = document.getElementById("dealerForm");

const searchInput = document.querySelector(".search-section input");

const searchCategory = document.querySelector(".search-section select");

const productCards = document.querySelectorAll(".product-card");

const navLinks = document.querySelectorAll(".nav-link");

/*==================================================
SMOOTH SCROLL
==================================================*/

navLinks.forEach(link=>{

link.addEventListener("click",function(e){

const href=this.getAttribute("href");

if(href.startsWith("#")){

e.preventDefault();

document.querySelector(href).scrollIntoView({

behavior:"smooth"

});

}

});

});

/*==================================================
NAVBAR SHADOW
==================================================*/

window.addEventListener("scroll",()=>{

if(window.scrollY>30){

navbar.classList.add("shadow");

}else{

navbar.classList.remove("shadow");

}

});

/*==================================================
BACK TO TOP
==================================================*/

window.addEventListener("scroll",()=>{

if(window.scrollY>500){

backTop.style.display="flex";

}else{

backTop.style.display="none";

}

});

backTop.addEventListener("click",()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

});

/*==================================================
ENQUIRY FORM
==================================================*/

dealerForm.addEventListener("submit", async function(e){

    e.preventDefault();
    
    const button=this.querySelector("button");
    
    button.disabled=true;
    
    button.innerHTML="Submitting...";
    
    const enquiry={
    
    customer_name:
    document.getElementById("customerName").value.trim(),
    
    mobile:
    document.getElementById("customerMobile").value.trim(),
    
    email:
    document.getElementById("customerEmail").value.trim(),
    
    business_name:
    document.getElementById("businessName").value.trim(),
    
    message:
    document.getElementById("customerMessage").value.trim(),
    
    status:"Pending"
    
    };
    
    const {error}=await supabaseClient
    
    .from("enquiries")
    
    .insert([enquiry]);
    
    if(error){
    
    console.error(error);
    
    alert(error.message);
    
    button.disabled=false;
    
    button.innerHTML="Submit Enquiry";
    
    return;
    
    }
    
    alert("Thank you! Your enquiry has been received.");
    
    dealerForm.reset();
    
    button.disabled=false;
    
    button.innerHTML="Submit Enquiry";
    
    });

/*==================================================
SEARCH PRODUCTS
==================================================*/

function searchProducts(){

const text=searchInput.value.toLowerCase();

productCards.forEach(card=>{

const title=card.querySelector("h5").innerText.toLowerCase();

const body=card.querySelector("p").innerText.toLowerCase();

if(title.includes(text)||body.includes(text)){

card.parentElement.style.display="block";

}else{

card.parentElement.style.display="none";

}

});

}

searchInput.addEventListener("keyup",searchProducts);

searchCategory.addEventListener("change",searchProducts);

/*==================================================
BUTTON RIPPLE
==================================================*/

document.querySelectorAll(".btn").forEach(btn=>{

btn.addEventListener("click",function(e){

const ripple=document.createElement("span");

const size=Math.max(this.clientWidth,this.clientHeight);

ripple.style.width=size+"px";

ripple.style.height=size+"px";

ripple.style.left=e.offsetX-size/2+"px";

ripple.style.top=e.offsetY-size/2+"px";

ripple.classList.add("ripple");

this.appendChild(ripple);

setTimeout(()=>{

ripple.remove();

},600);

});

});
/*==================================================
PRODUCT QUICK VIEW
==================================================*/

document.querySelectorAll(".product-card .btn").forEach(button=>{

    button.addEventListener("click",function(){
    
    const card=this.closest(".product-card");
    
    const name=card.querySelector("h5").innerText;
    
    const price=card.querySelector("strong").innerText;
    
    const description=card.querySelector("p").innerText;
    
    alert(
    
    name+
    
    "\n\nPrice : "+price+
    
    "\n\n"+description+
    
    "\n\n(Product Details Page will open after Firebase Integration.)"
    
    );
    
    });
    
    });
    
    /*==================================================
    CATEGORY FILTER
    ==================================================*/
    
    document.querySelectorAll(".category-card").forEach(card=>{
    
    card.addEventListener("click",function(){
    
    const category=this.querySelector("h5").innerText;
    
    searchCategory.value=category;
    
    searchProducts();
    
    window.scrollTo({
    
    top:document.querySelector(".featured-products").offsetTop-100,
    
    behavior:"smooth"
    
    });
    
    });
    
    });
    
    /*==================================================
    COUNTER ANIMATION
    ==================================================*/
    
    const counters=document.querySelectorAll(".stat-card h2");
    
    const observer=new IntersectionObserver(entries=>{
    
    entries.forEach(entry=>{
    
    if(entry.isIntersecting){
    
    animateCounter(entry.target);
    
    observer.unobserve(entry.target);
    
    }
    
    });
    
    });
    
    counters.forEach(counter=>{
    
    observer.observe(counter);
    
    });
    
    function animateCounter(element){
    
    const value=element.innerText;
    
    const number=parseInt(value);
    
    if(isNaN(number)) return;
    
    let current=0;
    
    const speed=Math.ceil(number/60);
    
    const suffix=value.replace(number,"");
    
    const timer=setInterval(()=>{
    
    current+=speed;
    
    if(current>=number){
    
    current=number;
    
    clearInterval(timer);
    
    }
    
    element.innerText=current+suffix;
    
    },20);
    
    }
    
    /*==================================================
    IMAGE LAZY LOAD
    ==================================================*/
    
    const images=document.querySelectorAll("img");
    
    const imageObserver=new IntersectionObserver(entries=>{
    
    entries.forEach(entry=>{
    
    if(entry.isIntersecting){
    
    const img=entry.target;
    
    if(img.dataset.src){
    
    img.src=img.dataset.src;
    
    }
    
    imageObserver.unobserve(img);
    
    }
    
    });
    
    });
    
    images.forEach(img=>{
    
    imageObserver.observe(img);
    
    });
    
    /*==================================================
    CONTACT BUTTONS
    ==================================================*/
    
    document.querySelectorAll(".btn").forEach(button=>{
    
    const text=button.innerText.trim().toLowerCase();
    
    if(text==="contact us"){
    
    button.addEventListener("click",()=>{
    
    document.querySelector("#contact").scrollIntoView({
    
    behavior:"smooth"
    
    });
    
    });
    
    }
    
    });
    
    /*==================================================
    WHATSAPP
    ==================================================*/
    
    const whatsapp=document.querySelector(".whatsapp-btn");
    
    if(whatsapp){
    
    whatsapp.addEventListener("click",function(){
    
    const message=encodeURIComponent(
    
    "Hello, I would like to know more about G-Energy Lubricants."
    
    );
    
    this.href=
    
    "https://wa.me/919876543210?text="+message;
    
    });
    
    }
    
    /*==================================================
    PAGE LOADED
    ==================================================*/
    
    window.addEventListener("load",()=>{
    
    document.body.classList.add("loaded");
    
    console.log(
    
    "ATP Business Portal Loaded Successfully."
    
    );
    
    });
    