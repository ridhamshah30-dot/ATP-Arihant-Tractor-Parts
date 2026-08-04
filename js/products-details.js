/*==================================================
ATP BUSINESS PORTAL
PRODUCT DETAILS
==================================================*/

"use strict";

const db = supabaseClient;

let productId = null;

document.addEventListener("DOMContentLoaded", async () => {

    const params = new URLSearchParams(window.location.search);

    productId = params.get("id");

    if (!productId) {

        alert("Product Not Found");

        window.location.href = "index.html";

        return;

    }

    await loadProduct();

});
/*==================================================
LOAD PRODUCT
==================================================*/

async function loadProduct(){

    const { data, error } = await db

        .from("products")

        .select("*")

        .eq("id", productId)

        .single();

    if(error){

        console.error(error);

        alert("Product Not Found");

        window.location.href="index.html";

        return;

    }

    renderProduct(data);

}
/*==================================================
RENDER PRODUCT
==================================================*/

async function renderProduct(product){

    document.title = product.product_name + " | ATP Business Portal";
    document.getElementById("breadcrumbProduct").textContent =
    product.product_name;

    document.getElementById("productName").textContent =
        product.product_name;

    document.getElementById("brand").textContent =
        product.brand;

    document.getElementById("category").textContent =
        product.category;

    document.getElementById("viscosity").textContent =
        product.viscosity || "-";

    document.getElementById("packSize").textContent =
        product.pack_size || "-";

    document.getElementById("description").textContent =
        product.description || "-";

    document.getElementById("mrp").textContent =
        Number(product.mrp).toLocaleString("en-IN");

    document.getElementById("sellingPrice").textContent =
        Number(product.selling_price).toLocaleString("en-IN");

    document.getElementById("stockStatus").textContent =
        product.stock_status || "In Stock";

    document.getElementById("mainImage").src =
        product.image_url || "images/placeholder-product.png";

        loadGalleryImages(product.id);

        await setupWhatsapp(product);

        initializeEnquiry(product);
        loadRelatedProducts(

            product.category,
        
            product.id
        
        );  
    }




/*==================================================
WHATSAPP BUTTON
==================================================*/

async function setupWhatsapp(product){

    let whatsappNumber = "918160819831";

    const { data } = await db
        .from("settings")
        .select("company_whatsapp")
        .limit(1)
        .single();

    if(data && data.company_whatsapp){

        whatsappNumber =
        data.company_whatsapp
        .replace(/\D/g,"");

    }

    const message =

`Hello ,

I am interested in the following product.

Product : ${product.product_name}
Brand : ${product.brand}
Pack Size : ${product.pack_size}
Viscosity : ${product.viscosity}

Please provide price, availability and delivery details.

Thank You.`;

    document.getElementById("whatsappButton").href =
`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

}
/*==================================================
RELATED PRODUCTS
==================================================*/

async function loadRelatedProducts(category,id){

    const{
    
    data,
    
    error
    
    }=await db
    
    .from("products")
    
    .select("*")
    
    .eq("category",category)
    
    .neq("id",id)
    
    .limit(4);
    
    if(error){
    
    console.error(error);
    
    return;
    
    }
    
    renderRelatedProducts(data||[]);
    
    }
    
    function renderRelatedProducts(products){
    
    const container=
    
    document.getElementById("relatedProducts");
    
    if(products.length===0){
    
    container.innerHTML=`
    
    <div class="col-12 text-center">
    
    No Related Products Found
    
    </div>
    
    `;
    
    return;
    
    }
    
    container.innerHTML=
    
    products.map(product=>`
    
    <div class="col-lg-3 col-md-6">
    
    <div class="card h-100 shadow-sm">
    
    <img
    
    src="${
    product.image_url||
    
    'images/placeholder-product.png'
    
    }"
    
    class="card-img-top"
    
    style="height:220px;object-fit:contain;">
    
    <div class="card-body">
    
    <h5>
    
    ${product.product_name}
    
    </h5>
    
    <p>
    
    ${product.pack_size||""}
    
    ${product.viscosity||""}
    
    </p>
    
    <h5 class="text-danger">
    
    ₹${product.selling_price}
    
    </h5>
    
    <a
    
    href="product.html?id=${product.id}"
    
    class="btn btn-danger w-100">
    
    View Details
    
    </a>
    
    </div>
    
    </div>
    
    </div>
    
    `).join("");
    
    }
    /*====================================================
PRODUCT ENQUIRY
====================================================*/

function initializeEnquiry(product){

    document
    
    .getElementById("enquiryButton")
    
    .addEventListener(
    
    "click",
    
    ()=>{
    
    submitEnquiry(product);
    
    }
    
    );
    
    }
    async function submitEnquiry(product){

        const{
        
        data:{user}
        
        }=await db.auth.getUser();
        
        if(!user){
        
        alert(
        
        "Please login first."
        
        );
        
        window.location="login.html";
        
        return;
        
        }
        
        const enquiry={
        
        customer_id:user.id,
        
        product_id:product.id,
        
        product_name:product.product_name,
        
        status:"Pending"
        
        };
        const{

            error
            
            }=await db
            
            .from("enquiries")
            
            .insert(enquiry);
            
            const message=
            
            document.getElementById(
            
            "enquiryMessage"
            
            );
            
            if(error){
            
            message.className=
            
            "alert alert-danger";
            
            message.innerHTML=
            
            error.message;
            
            return;
            
            }
            
            message.className=
            
            "alert alert-success";
            
            message.innerHTML=
            
            "Your enquiry has been submitted successfully.";
            
            }
            /*==================================================
LOAD GALLERY IMAGES
==================================================*/

async function loadGalleryImages(productId){

    const { data, error } = await db

    .from("product_images")

    .select("*")

    .eq("product_id", productId)

    .order("display_order",{ascending:true});

    if(error){

        console.error(error);

        return;

    }

    renderGallery(data || []);

}
/*==================================================
RENDER GALLERY
==================================================*/

function renderGallery(images){

    const container =

    document.getElementById("galleryImages");

    if(!container) return;

    container.innerHTML = "";

    images.forEach(image=>{

        container.innerHTML += `

        <div class="col-md-2 col-4">

            <img

            src="${image.image_url}"

            class="img-fluid rounded border gallery-image"

            style="cursor:pointer;height:120px;object-fit:contain"

            onclick="changeMainImage('${image.image_url}')">

        </div>

        `;

    });

}
/*==================================================
CHANGE MAIN IMAGE
==================================================*/

function changeMainImage(url){

    document

    .getElementById("mainImage")

    .src = url;

}
            