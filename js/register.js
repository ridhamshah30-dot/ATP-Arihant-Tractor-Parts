/*====================================================
ATP BUSINESS PORTAL
CUSTOMER REGISTRATION
====================================================*/

"use strict";

const db = supabaseClient;

document.addEventListener("DOMContentLoaded", () => {

    document

        .getElementById("registerForm")

        .addEventListener("submit", registerUser);

});
async function registerUser(e){  

    e.preventDefault();

    const fullName =
    document.getElementById("fullName").value.trim();

    const business =
    document.getElementById("businessName").value.trim();

    const mobile =
    document.getElementById("mobile").value.trim();

    const email =
    document.getElementById("email").value.trim();

    const password =
    document.getElementById("password").value;

    const confirm =
    document.getElementById("confirmPassword").value;

    const gst =
    document.getElementById("gst").value.trim();

    const state =
    document.getElementById("state").value.trim();

    const city =
    document.getElementById("city").value.trim();

    const pincode =
    document.getElementById("pincode").value.trim();

    const address =
    document.getElementById("address").value.trim();
}
    if(password!==confirm){

        showMessage(
        
        "Passwords do not match",
        
        "danger"
        
        );
        
        return;
        
        }
        
        if(mobile.length!==10){
        
        showMessage(
        
        "Enter valid mobile number",
        
        "danger"
        
        );
        
        return;
        
        }
        
        document
        
        .getElementById("loadingRegister")
        
        .classList.remove("d-none");
        const {

            data,
            
            error
            
            }=await db.auth.signUp({
            
            email,
            
            password,
            
            options:{
            
            data:{
            
            full_name:fullName
            
            }
            
            }
            
            });
            
            if(error){
            
            document
            
            .getElementById("loadingRegister")
            
            .classList.add("d-none");
            
            showMessage(
            
            error.message,
            
            "danger"
            
            );
            
            return;
            
            }
            const customer = {

                id: data.user.id,
            
                full_name: fullName,
            
                business_name: business,
            
                mobile: mobile,
            
                email: email,
            
                gst_number: gst,
            
                address: address,
            
                city: city,
            
                state: state,
            
                pincode: pincode
            
            };
            
            const { error: customerError } = await db
            
            .from("customers")
            
            .insert(customer);
            
            document
            
            .getElementById("loadingRegister")
            
            .classList.add("d-none");
            
            if(customerError){
            
                showMessage(
            
                    customerError.message,
            
                    "danger"
            
                );
            
                return;
            
            }
            
            showMessage(
            
            "Registration Successful. Please check your email before logging in.",
            
            "success"
            
            );
            
            setTimeout(()=>{
            
            window.location="login.html";
            
            },3000);
            function showMessage(message,type){

                const box=
                
                document.getElementById(
                
                "registerMessage"
                
                );
                
                box.className=
                
                `alert alert-${type}`;
                
                box.innerHTML=message;
                
                }     