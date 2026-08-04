/*==================================================
ATP BUSINESS PORTAL
GLOBAL WEBSITE SETTINGS
==================================================*/

"use strict";

let websiteSettings = null;

/*==================================================
LOAD WEBSITE SETTINGS
==================================================*/

async function loadWebsiteSettings() {

    const { data, error } = await supabaseClient

        .from("settings")

        .select("*")

        .eq("id", 3)

        .single();

    if (error) {

        console.error("Settings Error:", error);

        return;

    }

    websiteSettings = data;

    applyWebsiteSettings();

    /*==================================================
WEBSITE IMAGES
==================================================*/

const imageMap = {

    hero_banner: ".hero-banner",

    about_image: ".about-image",

    category_bike: ".category-bike",

    category_car: ".category-car",

    category_coolant: ".category-coolant",

    category_tractor: ".category-tractor",

    category_hcv: ".category-hcv",

    category_grease: ".category-grease",

    brand_logo: ".brand-logo" , 

    footer_logo_1: ".footer-logo-1",

    footer_logo_2: ".footer-logo-2"

};

Object.entries(imageMap).forEach(([key, selector]) => {

    document.querySelectorAll(selector).forEach(img => {

        if (websiteSettings[key]) {

            img.src = websiteSettings[key];

        }

    });

});

}

/*==================================================
APPLY SETTINGS TO WEBSITE
==================================================*/

function applyWebsiteSettings() {

    if (!websiteSettings) return;

    /*==============================
    LOGO
    ==============================*/

    document

    .querySelectorAll(".site-logo")

    .forEach(img => {

        if (websiteSettings.company_logo) {

            img.src = websiteSettings.company_logo;

        }

    });

    /*==============================
    COMPANY NAME
    ==============================*/

    document

    .querySelectorAll(".company-name")

    .forEach(el => {

        el.textContent =

        websiteSettings.company_name || "";

    });

    /*==============================
    PHONE
    ==============================*/

    document

    .querySelectorAll(".company-phone")

    .forEach(el => {

        el.textContent =

        websiteSettings.company_phone || "";

    });

    /*==============================
    PHONE 2
    ==============================*/

    document

    .querySelectorAll(".company-phone-2")

    .forEach(el => {

        el.textContent =

        websiteSettings.company_phone_2 || "";

    });

    /*==============================
    EMAIL
    ==============================*/

    document

    .querySelectorAll(".company-email")

    .forEach(el => {

        el.textContent =

        websiteSettings.company_email || "";

    });

    /*==============================
    ADDRESS
    ==============================*/

    document

    .querySelectorAll(".company-address")

    .forEach(el => {

        el.textContent =

        websiteSettings.company_address || "";

    });

    /*==============================
    ABOUT COMPANY
    ==============================*/

    document

    .querySelectorAll(".about-company")

    .forEach(el => {

        el.innerHTML =

        websiteSettings.about_company || "";

    });

    /*==============================
    WHATSAPP BUTTONS
    ==============================*/

    document

    .querySelectorAll(".company-whatsapp")

    .forEach(btn => {

        if (!websiteSettings.company_whatsapp) return;

        btn.href =

        `https://wa.me/91${websiteSettings.company_whatsapp}`;

    });

}