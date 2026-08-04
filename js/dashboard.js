/*=====================================================
ATP BUSINESS PORTAL
CUSTOMER DASHBOARD
=====================================================*/

"use strict";

const db = supabaseClient;

let currentUser = null;

document.addEventListener("DOMContentLoaded", async () => {

    await checkLogin();

    initializeMenu();

    initializeLogout();

});
/*=====================================================
CHECK LOGIN
=====================================================*/

async function checkLogin(){

    const { data } = await db.auth.getUser();

    if(!data.user){

        window.location = "login.html";

        return;

    }

    currentUser = data.user;

    await loadProfile();

    await loadEnquiries();

}
/*=====================================================
LOAD PROFILE
=====================================================*/

async function loadProfile(){

    const { data, error } = await db

        .from("customers")

        .select("*")

        .eq("id", currentUser.id)

        .single();

    if(error){

        console.error(error);

        return;

    }

    document.getElementById("profileName").value =
        data.full_name || "";

    document.getElementById("profileBusiness").value =
        data.business_name || "";

    document.getElementById("profileMobile").value =
        data.mobile || "";

    document.getElementById("profileEmail").value =
        data.email || "";

}
/*=====================================================
LOAD ENQUIRIES
=====================================================*/

async function loadEnquiries(){

    const tbody =
        document.getElementById("customerEnquiries");

    const { data, error } = await db

        .from("enquiries")

        .select("*")

        .eq("customer_id", currentUser.id)

        .order("created_at",{ascending:false});

    if(error){

        console.error(error);

        tbody.innerHTML = `
        <tr>
            <td colspan="3">Unable to load enquiries.</td>
        </tr>`;
        return;

    }

    if(data.length===0){

        tbody.innerHTML = `
        <tr>
            <td colspan="3">
                No enquiries found.
            </td>
        </tr>`;

        return;

    }

    tbody.innerHTML = data.map(item=>`

<tr>

<td>

${new Date(item.created_at).toLocaleDateString()}

</td>

<td>

${item.product_name}

</td>

<td>

${item.status}

</td>

</tr>

`).join("");

}
/*=====================================================
MENU
=====================================================*/

function initializeMenu(){

    const buttons =
        document.querySelectorAll("[data-page]");

    buttons.forEach(button=>{

        button.addEventListener("click",()=>{

            buttons.forEach(b=>b.classList.remove("active"));

            button.classList.add("active");

            document
            .getElementById("profilePage")
            .classList.add("d-none");

            document
            .getElementById("enquiryPage")
            .classList.add("d-none");

            if(button.dataset.page==="profile"){

                document
                .getElementById("profilePage")
                .classList.remove("d-none");

            }

            if(button.dataset.page==="enquiries"){

                document
                .getElementById("enquiryPage")
                .classList.remove("d-none");

            }

        });

    });

}
/*=====================================================
LOGOUT
=====================================================*/

function initializeLogout(){

    document

    .getElementById("logoutBtn")

    .addEventListener("click",logout);

}

async function logout(){

    await db.auth.signOut();

    window.location = "login.html";

}
