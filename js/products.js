/*==================================================
ATP BUSINESS PORTAL
CUSTOMER PRODUCTS
==================================================*/

"use strict";

const db = supabaseClient;

let products = [];

document.addEventListener(

"DOMContentLoaded",

async ()=>{

await loadProducts();

}

);

/*==================================================
LOAD PRODUCTS
==================================================*/

async function loadProducts(){

    console.log("Loading products...");

    const { data, error } = await db
        .from("products")
        .select("*")
        .order("id", { ascending: false })
        .limit(4);

    console.log("Supabase Data:", data);

    console.log("Supabase Error:", error);

    if(error){

        console.error(error);

        return;

    }

    products = data || [];

    console.log("Products Array:", products);

    renderProducts();

}
/*==================================================
RENDER PRODUCTS
==================================================*/

function renderProducts(){

    const container=
    
    document.getElementById(
    
    "productContainer"
    
    );
    
    if(!container)return;
    
    if(products.length===0){
    
    container.innerHTML=`
    
    <div class="col-12 text-center">
    
    <h4>
    
    No Products Available
    
    </h4>
    
    </div>
    
    `;
    
    return;
    
    }
    
    container.innerHTML=
    
    products.map(product=>`
    
    <div class="col-lg-3 col-md-4 col-sm-6">
    
    <div class="product-card">
    
    <img
    
    src="${
    product.image_url||
    
    'images/placeholder-product.png'
    
    }"
    
    class="img-fluid"
    
    alt="${product.product_name}">
    
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

    window.location=
    
    `product.html?id=${id}`;
    
    }
