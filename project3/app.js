document.addEventListener("DOMContentLoaded", function () {
    // Smooth Scrolling for Navigation
    document.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            let targetId = this.getAttribute("href").substring(1);
            let targetElement = document.getElementById(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 50,
                    behavior: "smooth"
                });
            }
        });
    });

    // Form Validation
    document.querySelector("form").addEventListener("submit", function (e) {
        let inputs = this.querySelectorAll("input[required]");
        let valid = true;

        inputs.forEach(input => {
            if (input.value.trim() === "") {
                valid = false;
                input.style.border = "2px solid red";
            } else {
                input.style.border = "1px solid #ccc";
            }
        });

        if (!valid) {
            e.preventDefault();
            alert("Please fill in all required fields.");
        }
    });

    // Testimonial Rotation
    let testimonials = [
        { text: "Fantastic service! My house has never been cleaner.", author: "Sarah M." },
        { text: "Highly recommend! They were on time and very professional.", author: "David L." },
        { text: "A game-changer for my busy schedule. Worth every penny!", author: "Emma R." }
    ];
    
    let index = 0;
    function updateTestimonial() {
        let testimonialBox = document.querySelector(".final-box .boxes:first-child");
        testimonialBox.querySelector("h3").innerText = testimonials[index].text;
        testimonialBox.querySelector("strong").innerText = testimonials[index].author;
        index = (index + 1) % testimonials.length;
    }
    
    setInterval(updateTestimonial, 5000); // Rotate every 5 seconds
});
