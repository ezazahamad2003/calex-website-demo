// GovDash - Government Dashboard JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // Set current year in footer
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Mobile navigation toggle
  const navToggle = document.querySelector('.nav-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  
  if (navToggle && mobileNav) {
    navToggle.addEventListener('click', function() {
      const isExpanded = mobileNav.getAttribute('aria-expanded') === 'true';
      mobileNav.setAttribute('aria-expanded', !isExpanded);
      navToggle.setAttribute('aria-expanded', !isExpanded);
      mobileNav.hidden = isExpanded;
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Reveal animation on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, observerOptions);

  // Observe all elements with reveal class
  document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
  });

  // Contact form handling
  const contactForm = document.querySelector('.contact__form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(this);
      const name = formData.get('name');
      const email = formData.get('email');
      const message = formData.get('message');
      
      // Simple validation
      if (!name || !email || !message) {
        alert('Please fill in all fields.');
        return;
      }
      
      // Simulate form submission
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
      
      setTimeout(() => {
        alert('Thank you for your interest! We will contact you soon.');
        this.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 1000);
    });
  }

  // Dashboard data simulation
  function updateDashboardStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
      const baseValue = parseInt(stat.textContent);
      if (!isNaN(baseValue)) {
        // Add slight random variation to simulate live data
        const variation = Math.floor(Math.random() * 5) - 2;
        stat.textContent = Math.max(0, baseValue + variation);
      }
    });
  }

  // Update dashboard stats every 30 seconds
  setInterval(updateDashboardStats, 30000);

  // Keyboard navigation improvements
  document.addEventListener('keydown', function(e) {
    // Escape key closes mobile menu
    if (e.key === 'Escape' && mobileNav && !mobileNav.hidden) {
      mobileNav.hidden = true;
      mobileNav.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.focus();
    }
  });

  // Focus management for accessibility
  const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
  
  function trapFocus(element) {
    const focusableContent = element.querySelectorAll(focusableElements);
    const firstFocusableElement = focusableContent[0];
    const lastFocusableElement = focusableContent[focusableContent.length - 1];

    document.addEventListener('keydown', function(e) {
      const isTabPressed = e.key === 'Tab';

      if (!isTabPressed) return;

      if (e.shiftKey) {
        if (document.activeElement === firstFocusableElement) {
          lastFocusableElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastFocusableElement) {
          firstFocusableElement.focus();
          e.preventDefault();
        }
      }
    });
  }

  // Video/demo interactions
  const videoButtons = document.querySelectorAll('.video__play');
  videoButtons.forEach(button => {
    button.addEventListener('click', function() {
      const video = this.nextElementSibling;
      if (video && video.tagName === 'VIDEO') {
        this.style.display = 'none';
        video.style.display = 'block';
        video.play();
      }
    });
  });

  // Analytics tracking (placeholder)
  function trackEvent(category, action, label) {
    // Placeholder for analytics tracking
    console.log('Event tracked:', { category, action, label });
  }

  // Track button clicks
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function() {
      trackEvent('Button', 'Click', this.textContent.trim());
    });
  });

  // Track navigation clicks
  document.querySelectorAll('.nav a, .footer__nav a').forEach(link => {
    link.addEventListener('click', function() {
      trackEvent('Navigation', 'Click', this.textContent.trim());
    });
  });
});

// Performance monitoring
if ('performance' in window) {
  window.addEventListener('load', function() {
    setTimeout(function() {
      const perfData = performance.getEntriesByType('navigation')[0];
      if (perfData) {
        console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
      }
    }, 100);
  });
}

// Service worker registration (for future PWA features)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    // Placeholder for service worker registration
    // navigator.serviceWorker.register('/sw.js');
  });
}