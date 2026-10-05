// Main Application JavaScript for "FAYZ" To'yxonasi & Banquet Hall

let currentPage = 1;
const totalPages = 7;

// ==========================================
// 1. PAGE SLIDE NAVIGATION & MOTION ANIMATIONS
// ==========================================
function goToPage(pageNum) {
    if (pageNum < 1) pageNum = 1;
    if (pageNum > totalPages) pageNum = totalPages;

    currentPage = pageNum;

    const targetSection = document.getElementById(`page-${pageNum}`);
    if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    updateNavigationState(pageNum);

    // GSAP Motion Reveal trigger
    if (typeof gsap !== 'undefined') {
        gsap.fromTo(`#page-${pageNum} .font-serif`, 
            { y: 30, opacity: 0 }, 
            { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
        );
    }
}

function nextPage() {
    if (currentPage < totalPages) {
        goToPage(currentPage + 1);
    }
}

function prevPage() {
    if (currentPage > 1) {
        goToPage(currentPage - 1);
    }
}

function updateNavigationState(pageNum) {
    // 1. Update indicator text
    const indicator = document.getElementById('pageNumberIndicator');
    if (indicator) {
        indicator.textContent = `Sahifa ${pageNum} / ${totalPages}`;
    }

    // 2. Update Top Progress Bar
    const progress = document.getElementById('motionProgressBar');
    if (progress) {
        progress.style.width = `${(pageNum / totalPages) * 100}%`;
    }

    // 3. Update Side Dots
    const dots = document.querySelectorAll('.dot-btn');
    dots.forEach(dot => {
        const dotPage = parseInt(dot.getAttribute('data-page'));
        if (dotPage === pageNum) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });

    // 4. Update Header Nav Links
    const navBtns = document.querySelectorAll('.nav-page-btn');
    navBtns.forEach(btn => btn.classList.remove('text-gold-400', 'font-bold'));
    const activeNavBtn = document.querySelector(`.nav-p${pageNum}`);
    if (activeNavBtn) {
        activeNavBtn.classList.add('text-gold-400', 'font-bold');
    }

    // 5. Update Active Section Scale Effect
    const sections = document.querySelectorAll('.page-section');
    sections.forEach((sec, idx) => {
        if (idx + 1 === pageNum) {
            sec.classList.add('active-page-section');
        } else {
            sec.classList.remove('active-page-section');
        }
    });
}

// Mobile Menu Handlers
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}

function closeMobileMenu() {
    if (mobileMenu) mobileMenu.classList.add('hidden');
}

// Scroll Observer to auto update current page indicator on manual scroll
function initScrollObserver() {
    const observerOptions = {
        root: null,
        rootMargin: '-30% 0px -30% 0px',
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                if (id && id.startsWith('page-')) {
                    const pageNum = parseInt(id.replace('page-', ''));
                    currentPage = pageNum;
                    updateNavigationState(pageNum);
                }
            }
        });
    }, observerOptions);

    const sections = document.querySelectorAll('.page-section');
    sections.forEach(sec => observer.observe(sec));
}

// ==========================================
// 2. REEL VIDEO MODAL
// ==========================================
function openReelModal(videoTitle) {
    const modal = document.getElementById('reelModal');
    const nameEl = document.getElementById('reelVideoName');
    if (nameEl && videoTitle) {
        nameEl.textContent = videoTitle;
    }
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }
}

function closeReelModal() {
    const modal = document.getElementById('reelModal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
}

// ==========================================
// 3. PAGE 3: INTERIOR PHOTO CATEGORY FILTER
// ==========================================
function switchInteriorCategory(category) {
    const tabs = document.querySelectorAll('.interior-tab');
    tabs.forEach(t => t.classList.remove('active'));

    if (event && event.currentTarget) {
        event.currentTarget.classList.add('active');
    }

    const cards = document.querySelectorAll('.interior-card');
    cards.forEach(card => {
        if (category === 'all' || card.classList.contains(category)) {
            card.classList.remove('hidden-card');
        } else {
            card.classList.add('hidden-card');
        }
    });
}

// ==========================================
// 4. MENU FILTER
// ==========================================
function filterMenu(category) {
    const tabs = document.querySelectorAll('.menu-tab');
    tabs.forEach(t => {
        t.classList.remove('active', 'bg-gold-500', 'text-black', 'border-gold-500/50');
        t.classList.add('bg-white/5', 'text-gray-300', 'border-white/10');
    });

    if (event && event.currentTarget) {
        event.currentTarget.classList.add('active', 'bg-gold-500', 'text-black', 'border-gold-500/50');
        event.currentTarget.classList.remove('bg-white/5', 'text-gray-300', 'border-white/10');
    }

    const items = document.querySelectorAll('.menu-item');
    items.forEach(item => {
        if (category === 'all' || item.classList.contains(category)) {
            item.classList.remove('hidden-item');
        } else {
            item.classList.add('hidden-item');
        }
    });
}

// ==========================================
// 5. LIGHTBOX & BOOKING MODAL
// ==========================================
function openLightbox(imgSrc) {
    const lb = document.getElementById('lightbox');
    const lbImg = document.getElementById('lightboxImg');
    if (lb && lbImg) {
        lbImg.src = imgSrc;
        lb.classList.remove('hidden');
        lb.classList.add('flex');
    }
}

function closeLightbox() {
    const lb = document.getElementById('lightbox');
    if (lb) {
        lb.classList.add('hidden');
        lb.classList.remove('flex');
    }
}

function submitBooking(e) {
    e.preventDefault();
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }
    e.target.reset();
}

function closeSuccessModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
}

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
    initScrollObserver();
    updateNavigationState(1);
});
