/*==================================================
CATEGORY PAGE
==================================================*/

"use strict";

const db = supabaseClient;
console.log("Supabase =", db);

let category = "";
let products = [];

/*==================================================
LOAD PAGE
==================================================*/

document.addEventListener("DOMContentLoaded", async () => {

    const params = new URLSearchParams(window.location.search);

    category = params.get("category");

    console.log("Category =", category);
console.log("Search =", window.location.search);    

if (!category) {

    category = "Bike";

}

let displayName = category;

switch (category) {

    case "Bike":
        displayName = "Bike Engine Oils";
        break;

    case "Car":
        displayName = "Car Engine Oils";
        break;

    case "Tractor":
        displayName = "Tractor Oils";
        break;

    case "HCV":
        displayName = "HCV Oils";
        break;

    case "Grease":
        displayName = "Greases";
        break;

    case "Coolant":
        displayName = "Coolant";
        break;

    case "Gear Oil":
        displayName = "Gear Oil";
        break;

}

document.getElementById("categoryTitle").innerHTML = displayName;

document.getElementById("breadcrumbCategory").innerHTML = displayName;

await loadProducts();

});

/*==================================================
LOAD PRODUCTS
==================================================*/

async function loadProducts(){

    const { data, error } = await db

        .from("products")

        .select("*")

        .eq("category", category)

        .order("id",{ascending:false});

        console.log("Category from URL:", category);
console.log("Products:", data);
console.log("Error:", error);

    if(error){

        console.error(error);

        return;

    }

    products = data || [];

    document.getElementById("categoryCount").innerHTML =
        products.length + " Products Found";

    renderProducts();

}

/*==================================================
RENDER PRODUCTS
==================================================*/

function renderProducts(){

    const container = document.getElementById("categoryProducts");

    if(products.length===0){

        container.innerHTML=`

        <div class="col-12 text-center">

            <h3>No Products Available</h3>

        </div>

        `;

        return;

    }

    container.innerHTML =

    products.map(product=>`

    <div class="col-lg-3 col-md-4 col-sm-6">

        <div class="product-card">

            <img

            src="${product.image_url || 'images/placeholder-product.png'}"

            class="img-fluid"

            alt="${product.product_name}">

            <div class="product-body">

                <h5>

                    ${product.product_name}

                </h5>

                <p>

                    ${product.pack_size || ""}

                    ${product.viscosity || ""}

                </p>

                <div class="price">

                    <span class="mrp">

                        ₹${product.mrp}

                    </span>

                    <span class="selling">

                        ₹${product.selling_price}

                    </span>

                </div>

                <button

                class="btn btn-danger w-100 mt-3"

                onclick="viewProduct(${product.id})">

                View Details

                </button>

            </div>

        </div>

    </div>

    `).join("");

}

/*==================================================
VIEW PRODUCT
==================================================*/

function viewProduct(id){

    window.location = `product.html?id=${id}`;

}