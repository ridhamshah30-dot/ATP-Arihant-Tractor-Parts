/*==================================================
ATP BUSINESS PORTAL
ALL PRODUCTS
==================================================*/

"use strict";

const db = supabaseClient;

let products = [];
let filteredProducts = [];

/*==================================================
LOAD PAGE
==================================================*/

document.addEventListener("DOMContentLoaded", async () => {

    await loadProducts();

    document
        .getElementById("searchInput")
        ?.addEventListener("keyup", filterProducts);

    document
        .getElementById("categoryFilter")
        ?.addEventListener("change", filterProducts);

    document
        .getElementById("brandFilter")
        ?.addEventListener("change", filterProducts);

    document
        .getElementById("sortProducts")
        .addEventListener("change",filterProducts);

});

/*==================================================
LOAD PRODUCTS
==================================================*/

async function loadProducts(){

    const { data, error } = await db

        .from("products")

        .select("*")

        .order("id",{ascending:false});

    if(error){

        console.error(error);

        return;

    }

    products = data || [];

    filteredProducts = [...products];

    renderProducts();

}

/*==================================================
FILTER PRODUCTS
==================================================*/

function filterProducts() {

    const search = document
        .getElementById("searchInput")
        ?.value
        .toLowerCase() || "";

    const category = document
        .getElementById("categoryFilter")
        ?.value || "";

    const brand = document
        .getElementById("brandFilter")
        ?.value || "";

    const sort =
         document
        .getElementById("sortProducts")
        .value;

    filteredProducts = products.filter(product=>{

        const matchSearch =
            product.product_name
            .toLowerCase()
            .includes(search);

        const matchCategory =
            category === "" ||
            product.category === category;

        const matchBrand =
            brand === "" ||
            product.brand === brand;

        return (
            matchSearch &&
            matchCategory &&
            matchBrand
        );

    });

    renderProducts();
    if(sort==="low"){

        filteredProducts.sort(
        
        (a,b)=>
        
        a.selling_price-b.selling_price
        
        );
        
        }
        
        if(sort==="high"){
        
        filteredProducts.sort(
        
        (a,b)=>
        
        b.selling_price-a.selling_price
        
        );
        
        }
        
        if(sort==="name"){
        
        filteredProducts.sort(
        
        (a,b)=>
        
        a.product_name.localeCompare(
        
        b.product_name
        
        )
        
    )
    
}

}

/*==================================================
RENDER PRODUCTS
==================================================*/

function renderProducts(){

    const container =
        document.getElementById("allProducts");

        document.getElementById(

            "productCount"
            
            ).innerHTML=
            
            filteredProducts.length;

    if(!container)return;

    if(filteredProducts.length===0){

        container.innerHTML=`

        <div class="col-12 text-center">

            <h3>No Products Found</h3>

        </div>

        `;

        return;

    }

    container.innerHTML =

    filteredProducts.map(product=>`

    <div class="col-lg-3 col-md-4 col-sm-6 mb-4 d-flex">

        <div class="product-card w-100">

            <div class="product-image">

                <img

                src="${
                product.image_url ||
                "images/placeholder-product.png"
                }"

                class="img-fluid"

                alt="${product.product_name}">

            </div>

            <div class="product-body">

                <h5>

                    ${product.product_name}

                </h5>

                <p class="product-spec">

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

    window.location =
    `product.html?id=${id}`;

}