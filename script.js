// Custom Cursor
document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.createElement('div');
    cursor.classList.add('cursor');
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
});

// Typing Animation
const typeText = (element, text, speed = 100) => {
    let index = 0;
    element.textContent = '';
    
    return new Promise(resolve => {
        function type() {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
                setTimeout(type, speed);
            } else {
                resolve();
            }
        }
        type();
    });
};

// Hero Section Typing Animation
const heroText = document.querySelector('.typing-text');
typeText(heroText, "Hey, I'm Yash");

// Certifications Carousel Navigation
const certContainer = document.querySelector('.cert-container');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const cardWidth = window.innerWidth > 768 ? 
    certContainer.offsetWidth / 3 : 
    certContainer.offsetWidth;

let currentPosition = 0;
const maxScroll = certContainer.scrollWidth - certContainer.offsetWidth;

const updateNavButtons = () => {
    prevBtn.style.opacity = currentPosition <= 0 ? '0.5' : '1';
    nextBtn.style.opacity = currentPosition >= maxScroll ? '0.5' : '1';
};

prevBtn.addEventListener('click', () => {
    currentPosition = Math.max(currentPosition - cardWidth, 0);
    certContainer.scrollTo({
        left: currentPosition,
        behavior: 'smooth'
    });
    updateNavButtons();
});

nextBtn.addEventListener('click', () => {
    currentPosition = Math.min(
        currentPosition + cardWidth,
        maxScroll
    );
    certContainer.scrollTo({
        left: currentPosition,
        behavior: 'smooth'
    });
    updateNavButtons();
});

// Certificate Modal
const modal = document.getElementById('cert-modal');
const modalImg = document.getElementById('cert-modal-img');
const modalClose = document.querySelector('.modal-close');

document.querySelectorAll('.cert-card img').forEach(img => {
    img.addEventListener('click', () => {
        modal.style.display = 'block';
        modalImg.src = img.src;
        document.body.style.overflow = 'hidden';
    });
});

modalClose.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Skill Bars Animation
const observeSkills = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.dataset.width;
                progressBar.style.width = `${width}%`;
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.progress').forEach(bar => {
        observer.observe(bar);
    });
};

observeSkills();

// Binary Rain Effect
const createBinaryRain = () => {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '-2';
    canvas.style.opacity = '0.1';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const columns = Math.floor(width / 20);
    const drops = new Array(columns).fill(1);

    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, width, height);

        ctx.fillStyle = '#ffd700';
        ctx.font = '15px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = Math.random() > 0.5 ? '1' : '0';
            ctx.fillText(text, i * 20, drops[i] * 20);

            if (drops[i] * 20 > height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    setInterval(draw, 50);

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });
};

createBinaryRain();

// Intersection Observer for Fade-in Animation
const observeElements = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
};

observeElements();

// Glitch Effect for Buttons
document.querySelectorAll('.glitch-btn').forEach(button => {
    button.setAttribute('data-text', button.textContent);
});

// Handle Window Resize
window.addEventListener(' resize', () => {
    const cardWidth = window.innerWidth > 768 ? 
        certContainer.offsetWidth / 3 : 
        certContainer.offsetWidth;
    
    currentPosition = Math.min(currentPosition, maxScroll);
    certContainer.scrollTo({
        left: currentPosition,
        behavior: 'smooth'
    });
    updateNavButtons();
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateNavButtons();
});