document.addEventListener('DOMContentLoaded', () => {
    // 1. Dark/Light Mode Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : 'dark';

    // Set tema awal berdasarkan localStorage
    if (currentTheme === 'light') {
        body.classList.add('light-mode');
        themeToggle.querySelector('i').className = 'fas fa-moon';
    } else {
        themeToggle.querySelector('i').className = 'fas fa-sun';
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        let theme = 'dark';
        if (body.classList.contains('light-mode')) {
            theme = 'light';
            themeToggle.querySelector('i').className = 'fas fa-moon';
        } else {
            themeToggle.querySelector('i').className = 'fas fa-sun';
        }
        localStorage.setItem('theme', theme);
    });

    // 2. Scroll Animations (Fade-in saat elemen masuk viewport)
    const fadeInSections = document.querySelectorAll('.fade-in-section');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2 // Trigger saat 20% dari elemen terlihat
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Berhenti mengamati setelah animasi pertama
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    fadeInSections.forEach(section => {
        sectionObserver.observe(section);
    });

    // 3. Simple Carousel (Swipe) - Menggunakan Scroll Snap CSS
    // Untuk interaksi "swipe" di perangkat mobile, kita memanfaatkan CSS Scroll Snap.
    // Tambahkan JavaScript ini jika Anda ingin tombol navigasi (prev/next) di desktop.
    const carouselTrack = document.querySelector('.carousel-track');
    const prevButton = document.querySelector('.carousel-nav.prev');
    const nextButton = document.querySelector('.carousel-nav.next');

    // Cek jika tombol ada
    if (prevButton && nextButton && carouselTrack) {
        // Tampilkan tombol hanya di layar lebar (untuk UX desktop)
        if (window.innerWidth > 900) {
            prevButton.style.display = 'block';
            nextButton.style.display = 'block';
        }

        nextButton.addEventListener('click', () => {
            // Scroll ke posisi kartu berikutnya
            const cardWidth = carouselTrack.querySelector('.project-card').offsetWidth;
            carouselTrack.scrollBy({
                left: cardWidth + 30, // Lebar kartu + gap 30px
                behavior: 'smooth'
            });
        });

        prevButton.addEventListener('click', () => {
            // Scroll ke posisi kartu sebelumnya
            const cardWidth = carouselTrack.querySelector('.project-card').offsetWidth;
            carouselTrack.scrollBy({
                left: -(cardWidth + 30),
                behavior: 'smooth'
            });
        });
    }

});
