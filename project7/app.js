document.addEventListener("DOMContentLoaded", function () {
    const homeLink = document.getElementById("homeLink");
    const aboutLink = document.getElementById("aboutLink");
    const serviceLink = document.getElementById("serviceLink");
    const contactLink = document.getElementById("contactLink");


    if (homeLink) {
        homeLink.addEventListener("click", function () {
            window.location.href = "app.html"; 
        });
    }

    if (aboutLink) {
        aboutLink.addEventListener("click", function () {
            window.location.href = "about.html"; 
        });
    }

    if (serviceLink) {
        serviceLink.addEventListener("click", function () {
            window.location.href = "services.html"; 
        });
    }

    if (contactLink) {
        contactLink.addEventListener("click", function () {
            window.location.href = "contact.html"; 
        });
    }
});