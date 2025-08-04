// Ensure the DOM is fully loaded before running scripts
document.addEventListener('DOMContentLoaded', function() {

    // 1. Mobile Navigation Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const mainNavUl = document.querySelector('.main-nav ul');

    if (mobileMenu && mainNavUl) {
        mobileMenu.addEventListener('click', function() {
            mainNavUl.classList.toggle('active');
            this.classList.toggle('active'); // Toggles for the hamburger icon animation
        });

        // Close mobile menu when a nav link is clicked
        mainNavUl.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (mainNavUl.classList.contains('active')) {
                    mainNavUl.classList.remove('active');
                    mobileMenu.classList.remove('active');
                }
            });
        });
    }

    // 2. Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Check if the link is not for the 'Join Now' button (which might have a different action)
            if (!this.classList.contains('btn')) {
                e.preventDefault(); // Prevent default jump

                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth' // Smooth scroll effect
                });
            }
        });
    });

    // 3. Active Navigation Link Highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.main-nav ul li a');

    function highlightActiveNavLink() {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100; // Adjust offset for header height
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active'); // Remove active from all
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active'); // Add active to current section's link
            }
        });
    }

    // Run on scroll and on load
    window.addEventListener('scroll', highlightActiveNavLink);
    window.addEventListener('load', highlightActiveNavLink);


    // 4. Basic Form Submission Handling (for the Contact Us form)
    const contactForm = document.querySelector('.contact-form form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent the default form submission

            const formData = new FormData(contactForm);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });

            console.log('Form Submitted Data:', formObject);

            // In a real-world scenario, you would send this data to a server
            // using fetch() or XMLHttpRequest. Example:
            /*
            fetch('/submit-form-endpoint', { // Replace with your actual backend endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formObject)
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset(); // Clear the form
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('There was an error sending your message. Please try again later.');
            });
            */

            alert('Thank you for contacting Infinity Gym! Your message has been received (check console for data). We will get back to you soon.');
            contactForm.reset(); // Clear the form fields after "submission"
        });
    }

});