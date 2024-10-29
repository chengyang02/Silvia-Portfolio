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
    // Smooth scrolling for header links
    const navLinks = document.querySelectorAll("header nav a");

    navLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();

            const targetId = this.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);

            const targetPosition = targetSection.offsetTop;
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;
            const duration = 1000;
            let start = null;

            function step(timestamp) {
                if (!start) start = timestamp;
                const progress = timestamp - start;
                const ease = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
                const scrollAmount = ease(progress / duration) * distance + startPosition;

                window.scrollTo(0, scrollAmount);

                if (progress < duration) {
                    window.requestAnimationFrame(step);
                } else {
                    window.scrollTo(0, targetPosition);
                }
            }

            window.requestAnimationFrame(step);
        });
    });

    // General Slideshow functionality with seamless wrapping
    const slideshows = document.querySelectorAll(".slideshow-container");

    slideshows.forEach(slideshow => {
        let currentSlide = 0;
        const images = slideshow.querySelectorAll(".slideshow-image");
        const slidesWrapper = slideshow.querySelector(".slides-wrapper");
        const totalSlides = images.length;

        slidesWrapper.style.width = `${100 * totalSlides}%`;
        images.forEach(image => {
            image.style.width = `${100 / totalSlides}%`;
        });

        function showSlide(index) {
            const offset = -index * 100 / totalSlides;
            slidesWrapper.style.transition = "transform 0.5s ease-in-out";
            slidesWrapper.style.transform = `translateX(${offset}%)`;
            currentSlide = index;
        }

        function nextSlide() {
            if (currentSlide < totalSlides - 1) {
                showSlide(currentSlide + 1);
            } else {
                showSlide(0); // Wrap to the first slide
            }
        }

        function previousSlide() {
            if (currentSlide > 0) {
                showSlide(currentSlide - 1);
            } else {
                showSlide(totalSlides - 1); // Wrap to the last slide
            }
        }

        slideshow.querySelector(".next").addEventListener("click", () => {
            clearInterval(autoplay);
            nextSlide();
            autoplay = setInterval(nextSlide, 3000);
        });

        slideshow.querySelector(".prev").addEventListener("click", () => {
            clearInterval(autoplay);
            previousSlide();
            autoplay = setInterval(nextSlide, 3000);
        });

        let autoplay = setInterval(nextSlide, 3000);
    });

    // Independent Photography Slideshow functionality
    function initializePhotographySlideshow(slideshowContainer) {
        let currentPhoto = 0;
        const photoWrapper = slideshowContainer.querySelector(".slides-wrapper");
        const photoImages = Array.from(slideshowContainer.querySelectorAll(".slideshow-image"));
        const totalPhotos = photoImages.length;

        photoWrapper.style.width = `${100 * totalPhotos}%`;
        photoImages.forEach(image => image.style.width = `100%`);

        function showPhoto(index) {
            const offset = -index * 100;
            photoWrapper.style.transition = "transform 0.5s ease-in-out";
            photoWrapper.style.transform = `translateX(${offset}%)`;
            currentPhoto = index;
        }

        function nextPhoto() {
            showPhoto((currentPhoto + 1) % totalPhotos);
        }

        function previousPhoto() {
            showPhoto((currentPhoto - 1 + totalPhotos) % totalPhotos);
        }

        slideshowContainer.querySelector(".next").addEventListener("click", () => {
            clearInterval(photoAutoplay);
            nextPhoto();
            photoAutoplay = setInterval(nextPhoto, 3000);
        });

        slideshowContainer.querySelector(".prev").addEventListener("click", () => {
            clearInterval(photoAutoplay);
            previousPhoto();
            photoAutoplay = setInterval(nextPhoto, 3000);
        });

        let photoAutoplay = setInterval(nextPhoto, 3000);
    }

    // Initialize each photography slideshow independently
    const photographySlideshows = document.querySelectorAll(".photography-slideshow");
    photographySlideshows.forEach(slideshowContainer => initializePhotographySlideshow(slideshowContainer));

    // Open Portfolio PDF in Modal
    function openPortfolio(pdfFile) {
        document.getElementById("portfolioFrame").src = pdfFile;
        document.getElementById("portfolioModal").style.display = "flex";
        document.body.classList.add("modal-open");
    }

    function closePortfolio() {
        document.getElementById("portfolioModal").style.display = "none";
        document.getElementById("portfolioFrame").src = "";
        document.body.classList.remove("modal-open");
    }

    // Video Modal Controls
    function openVideoModal() {
        document.getElementById("videoModal").style.display = "flex";
        const video = document.getElementById("modalVideo");
        video.play();
    }

    function closeVideoModal() {
        const video = document.getElementById("modalVideo");
        video.pause();
        video.currentTime = 0;
        document.getElementById("videoModal").style.display = "none";
    }

    // Expose open and close functions to the global scope if needed
    window.openPortfolio = openPortfolio;
    window.closePortfolio = closePortfolio;
    window.openVideoModal = openVideoModal;
    window.closeVideoModal = closeVideoModal;
});
