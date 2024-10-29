/*
// Track the current slide index for each slideshow
document.addEventListener("DOMContentLoaded", function () {
    const slideshows = document.querySelectorAll(".slideshow-container");

    slideshows.forEach(slideshow => {
        let currentSlide = 0;
        const images = slideshow.querySelectorAll(".slideshow-image");

        // Initially show the first image
        images[currentSlide].classList.add("active");

        function nextSlide() {
            images[currentSlide].classList.remove("active");
            currentSlide = (currentSlide + 1) % images.length;
            images[currentSlide].classList.add("active");
        }

        function previousSlide() {
            images[currentSlide].classList.remove("active");
            currentSlide = (currentSlide - 1 + images.length) % images.length;
            images[currentSlide].classList.add("active");
        }

        slideshow.querySelector(".next").addEventListener("click", nextSlide);
        slideshow.querySelector(".prev").addEventListener("click", previousSlide);
    

        // Attach event listeners for navigation buttons
        slideshow.querySelector(".next").onclick = () => {
            clearInterval(autoplay);
            nextSlide();
            autoplay = setInterval(() => nextSlide(slideshow), 3000); // Restart autoplay
        };

        slideshow.querySelector(".prev").onclick = () => {
            clearInterval(autoplay);
            previousSlide();
            autoplay = setInterval(() => nextSlide(slideshow), 3000); // Restart autoplay
        };
    });
});

// Open Portfolio PDF in Modal with Larger Size
function openPortfolio(pdfFile) {
    document.getElementById("portfolioFrame").src = pdfFile;
    document.getElementById("portfolioModal").style.display = "flex";
    document.body.classList.add("modal-open"); // Add class to body
}

function closePortfolio() {
    document.getElementById("portfolioModal").style.display = "none";
    document.getElementById("portfolioFrame").src = "";
    document.body.classList.remove("modal-open"); // Remove class from body
}

*/





document.addEventListener("DOMContentLoaded", function () {
    // Smooth Scrolling for Header Links
    const navLinks = document.querySelectorAll("header nav a");

    navLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault(); // Prevent default jump to section

            const targetId = this.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);

            // Calculate the top position of the target section
            const targetPosition = targetSection.offsetTop;
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;
            const duration = 1000; // Duration in milliseconds (adjust for speed)
            let start = null;

            // Animation function for scrolling
            function step(timestamp) {
                if (!start) start = timestamp;
                const progress = timestamp - start;

                // Ease-in-out function for smoother effect
                const ease = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
                const scrollAmount = ease(progress / duration) * distance + startPosition;

                window.scrollTo(0, scrollAmount);

                if (progress < duration) {
                    window.requestAnimationFrame(step);
                } else {
                    window.scrollTo(0, targetPosition); // Ensure exact positioning
                }
            }

            window.requestAnimationFrame(step);
        });
    });

    // Slideshow functionality
    const slideshows = document.querySelectorAll(".slideshow-container");

    slideshows.forEach(slideshow => {
        let currentSlide = 0;
        const images = slideshow.querySelectorAll(".slideshow-image");
        const slidesWrapper = slideshow.querySelector(".slides-wrapper");
        const totalSlides = images.length;

        // Set the width of the slides-wrapper to fit all images side-by-side
        slidesWrapper.style.width = `${100 * totalSlides}%`;

        images.forEach(image => {
            image.style.width = `${100 / totalSlides}%`; // Equal width for each image
        });

        function showSlide(index) {
            const offset = -index * 100 / totalSlides;
            slidesWrapper.style.transform = `translateX(${offset}%)`;
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % totalSlides;
            showSlide(currentSlide);
        }

        function previousSlide() {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            showSlide(currentSlide);
        }

        // Add event listeners to next and prev buttons
        slideshow.querySelector(".next").addEventListener("click", () => {
            clearInterval(autoplay);
            nextSlide();
            autoplay = setInterval(nextSlide, 3000); // Restart autoplay
        });

        slideshow.querySelector(".prev").addEventListener("click", () => {
            clearInterval(autoplay);
            previousSlide();
            autoplay = setInterval(nextSlide, 3000); // Restart autoplay
        });

        // Autoplay the slideshow every 3 seconds
        let autoplay = setInterval(nextSlide, 3000);
    });

    // Open Portfolio PDF in Modal with Larger Size
    function openPortfolio(pdfFile) {
        document.getElementById("portfolioFrame").src = pdfFile;
        document.getElementById("portfolioModal").style.display = "flex";
        document.body.classList.add("modal-open"); // Add class to body
    }

    function closePortfolio() {
        document.getElementById("portfolioModal").style.display = "none";
        document.getElementById("portfolioFrame").src = "";
        document.body.classList.remove("modal-open"); // Remove class from body
    }

    // Video Modal Controls
    function openVideoModal() {
        document.getElementById("videoModal").style.display = "flex";
        const video = document.getElementById("modalVideo");
        video.play(); // Start playing the video when the modal opens
    }

    function closeVideoModal() {
        const video = document.getElementById("modalVideo");
        video.pause(); // Pause the video
        video.currentTime = 0; // Reset playback to the beginning
        document.getElementById("videoModal").style.display = "none";
    }

    // Expose open and close functions to the global scope if needed
    window.openPortfolio = openPortfolio;
    window.closePortfolio = closePortfolio;
    window.openVideoModal = openVideoModal;
    window.closeVideoModal = closeVideoModal;
});
