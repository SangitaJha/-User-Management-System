// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
  });
});

// Smooth scrolling with offset for fixed navbar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
  let current = '';
  const sections = document.querySelectorAll('section');
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= (sectionTop - 150)) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').slice(1) === current) {
      link.classList.add('active');
    }
  });
});

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Add animation to cards
const animatedElements = document.querySelectorAll(
  '.project-card, .skill-category, .cert-card, .education-card, .timeline-item'
);

animatedElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = contactForm.querySelector('input[type="text"]').value;
    const email = contactForm.querySelector('input[type="email"]').value;
    const message = contactForm.querySelector('textarea').value;
    
    // Simple validation
    if (name && email && message) {
      alert('Thank you for your message! I will get back to you soon.');
      contactForm.reset();
    } else {
      alert('Please fill in all fields.');
    }
  });
}

// Typing effect for hero subtitle
const subtitleElement = document.querySelector('.hero-subtitle');
if (subtitleElement) {
  const text = subtitleElement.textContent;
  subtitleElement.textContent = '';
  let index = 0;
  
  function typeWriter() {
    if (index < text.length) {
      subtitleElement.textContent += text.charAt(index);
      index++;
      setTimeout(typeWriter, 100);
    }
  }
  
  // Start typing after page load
  window.addEventListener('load', () => {
    setTimeout(typeWriter, 500);
  });
}

// Add cursor pointer effect
document.addEventListener('mousemove', (e) => {
  const cursor = document.createElement('div');
  cursor.style.position = 'fixed';
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
  cursor.style.width = '10px';
  cursor.style.height = '10px';
  cursor.style.borderRadius = '50%';
  cursor.style.background = 'rgba(102, 126, 234, 0.5)';
  cursor.style.pointerEvents = 'none';
  cursor.style.animation = 'cursorFade 1s ease-out forwards';
  cursor.style.zIndex = '9999';
  
  document.body.appendChild(cursor);
  
  setTimeout(() => {
    cursor.remove();
  }, 1000);
});

// Add keyframes for cursor animation dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes cursorFade {
    to {
      opacity: 0;
      transform: scale(2);
    }
  }
  
  .nav-link.active {
    color: var(--primary-color);
  }
  
  .nav-link.active::after {
    width: 100%;
  }
`;
document.head.appendChild(style);

// Skill tags animation on hover
const skillTags = document.querySelectorAll('.skill-tag');
skillTags.forEach(tag => {
  tag.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.1) rotate(2deg)';
  });
  
  tag.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1) rotate(0deg)';
  });
});

// Add scroll progress indicator
const scrollProgress = document.createElement('div');
scrollProgress.style.position = 'fixed';
scrollProgress.style.top = '0';
scrollProgress.style.left = '0';
scrollProgress.style.height = '4px';
scrollProgress.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
scrollProgress.style.zIndex = '10000';
scrollProgress.style.transition = 'width 0.2s';
document.body.appendChild(scrollProgress);

window.addEventListener('scroll', () => {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  scrollProgress.style.width = scrolled + '%';
});

// Add "back to top" button
const backToTop = document.createElement('button');
backToTop.innerHTML = '↑';
backToTop.style.position = 'fixed';
backToTop.style.bottom = '30px';
backToTop.style.right = '30px';
backToTop.style.width = '50px';
backToTop.style.height = '50px';
backToTop.style.borderRadius = '50%';
backToTop.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
backToTop.style.color = 'white';
backToTop.style.border = 'none';
backToTop.style.fontSize = '24px';
backToTop.style.cursor = 'pointer';
backToTop.style.opacity = '0';
backToTop.style.transition = 'opacity 0.3s, transform 0.3s';
backToTop.style.zIndex = '1000';
backToTop.setAttribute('aria-label', 'Back to top');

document.body.appendChild(backToTop);

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    backToTop.style.opacity = '1';
  } else {
    backToTop.style.opacity = '0';
  }
});

backToTop.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

backToTop.addEventListener('mouseenter', function() {
  this.style.transform = 'scale(1.1)';
});

backToTop.addEventListener('mouseleave', function() {
  this.style.transform = 'scale(1)';
});

console.log('Portfolio loaded successfully! ✨');
