// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Add fade-in class to sections
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => {
    section.classList.add('fade-in');
    observer.observe(section);
  });

  // Smooth scrolling for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Parallax effect for hero section
  const hero = document.querySelector('.hero');
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = hero.querySelector('.hero-content');
    parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
    parallax.style.opacity = 1 - scrolled / 600;
  });

  // Typing effect for hero title
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    let index = 0;

    function typeText() {
      if (index < text.length) {
        heroTitle.textContent += text.charAt(index);
        index++;
        setTimeout(typeText, 100);
      }
    }

    setTimeout(typeText, 500);
  }

  // Add hover effect to project cards
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', (e) => {
      card.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', (e) => {
      card.style.transform = 'translateY(0) scale(1)';
    });
  });

  // Skill tags animation
  const skillTags = document.querySelectorAll('.skill-tag');
  skillTags.forEach((tag, index) => {
    tag.style.animationDelay = `${index * 0.1}s`;
    tag.style.animation = 'fadeInUp 0.6s ease forwards';
  });

  // Timeline items animation
  const timelineItems = document.querySelectorAll('.timeline-item');
  timelineItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.2}s`;
    item.style.animation = 'slideIn 0.8s ease forwards';
  });

  // Add floating animation to hero elements
  const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-description');
  heroElements.forEach((el, index) => {
    el.style.animationDelay = `${index * 0.3}s`;
    el.style.animation = 'float 3s ease-in-out infinite';
  });

  // Dynamic background gradient
  let gradientAngle = 0;
  setInterval(() => {
    gradientAngle += 1;
    if (hero) {
      hero.style.background = `linear-gradient(${gradientAngle}deg, #667eea 0%, #764ba2 100%)`;
    }
  }, 50);
});

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(-50px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }

  .skill-tag {
    opacity: 0;
  }

  .timeline-item {
    opacity: 0;
  }

  .project-card {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .project-card:hover .project-image::after {
    transform: translate(-50%, -50%) scale(1.2);
    background: rgba(255, 255, 255, 0.3);
  }
`;

document.head.appendChild(style);

// Add cursor glow effect
const cursor = document.createElement('div');
cursor.style.cssText = `
  position: fixed;
  width: 20px;
  height: 20px;
  background: radial-gradient(circle, rgba(102, 126, 234, 0.3), transparent);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  transition: transform 0.1s ease;
  display: none;
`;

document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX - 10 + 'px';
  cursor.style.top = e.clientY - 10 + 'px';
});

document.addEventListener('mouseenter', () => {
  cursor.style.display = 'block';
});

document.addEventListener('mouseleave', () => {
  cursor.style.display = 'none';
});

// Add glow effect on hover over interactive elements
const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-tag');
interactiveElements.forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'scale(2)';
    cursor.style.background = 'radial-gradient(circle, rgba(251, 191, 36, 0.5), transparent)';
  });

  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'scale(1)';
    cursor.style.background = 'radial-gradient(circle, rgba(102, 126, 234, 0.3), transparent)';
  });
});

// Performance optimization - throttle scroll events
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
  // Add any scroll-based animations here
}, 16)); // ~60fps

// Add loading animation
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';

  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 100);
});

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    // Add any escape key functionality here
  }

  // Arrow key navigation
  if (e.key === 'ArrowDown') {
    const currentSection = document.querySelector('.section.visible');
    if (currentSection) {
      const nextSection = currentSection.nextElementSibling;
      if (nextSection && nextSection.classList.contains('section')) {
        nextSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  if (e.key === 'ArrowUp') {
    const currentSection = document.querySelector('.section.visible');
    if (currentSection) {
      const prevSection = currentSection.previousElementSibling;
      if (prevSection && prevSection.classList.contains('section')) {
        prevSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
});