document.addEventListener('DOMContentLoaded', function() {
  
  // NAVBAR ACTIVE STATE & MOBILE TOGGLE
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  
  // Navbar scroll effect
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    // Smooth highlight active section link
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= (sectionTop - 200)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').includes(current)) {
        link.classList.add('active');
      }
    });
  });
  
  // Mobile toggle
  navToggle.addEventListener('click', function() {
    navMenu.classList.toggle('active');
    
    // Improve mobile experience: prevent body scroll when menu is open
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
  });
  
  // Close menu on link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      document.body.style.overflow = 'auto';
    });
  });

  // FLOATING UP BUTTON
  const floatUp = document.getElementById('floatUp');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      floatUp.classList.add('visible');
    } else {
      floatUp.classList.remove('visible');
    }
  });
  
  floatUp.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // PAKET TABS
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.paket-content');
  
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      tabBtns.forEach(b => b.classList.remove('active'));
      // Add active class to clicked button
      btn.classList.add('active');
      
      // Hide all content
      tabContents.forEach(content => content.classList.add('hidden'));
      
      // Show target content
      const target = btn.getAttribute('data-tab');
      document.getElementById('tab-' + target).classList.remove('hidden');
    });
  });

  // NUMBER ANIMATION (for Stats)
  const statsSection = document.querySelector('.stats-section');
  if (statsSection) {
    let animated = false;
    
    const animateStats = () => {
      const statNumbers = document.querySelectorAll('.stat-number');
      
      statNumbers.forEach(stat => {
        const target = +stat.getAttribute('data-target');
        const count = +stat.innerText;
        const increment = target / 100; // Adjust speed here
        
        if (count < target) {
          stat.innerText = Math.ceil(count + increment);
          setTimeout(animateStats, 20); // Speed of animation loop
        } else {
          stat.innerText = target;
        }
      });
    };
    
    window.addEventListener('scroll', () => {
      const sectionPosition = statsSection.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.5;
      
      if (sectionPosition < screenPosition && !animated) {
        animateStats();
        animated = true;
      }
    });
  }

  // BLOG SEARCH & FILTER
  const blogSearch = document.getElementById('blogSearch');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const blogCards = document.querySelectorAll('.blog-card-page');
  const noResults = document.getElementById('noResults');
  
  if (blogSearch) {
    // Search Function
    blogSearch.addEventListener('input', (e) => {
      const text = e.target.value.toLowerCase();
      let hasResults = false;
      
      blogCards.forEach(card => {
        const title = card.getAttribute('data-title').toLowerCase();
        
        if (title.includes(text)) {
          card.classList.remove('hidden');
          hasResults = true;
        } else {
          card.classList.add('hidden');
        }
      });
      
      if (hasResults) {
        noResults.classList.add('hidden');
      } else {
        noResults.classList.remove('hidden');
      }
    });
    
    // Filter Function
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Active state
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const category = btn.getAttribute('data-cat');
        let hasResults = false;
        
        blogCards.forEach(card => {
          const cardCat = card.getAttribute('data-cat');
          
          if (category === 'all' || cardCat === category) {
            card.classList.remove('hidden');
            hasResults = true;
          } else {
            card.classList.add('hidden');
          }
        });
        
        if (hasResults) {
          noResults.classList.add('hidden');
        } else {
          noResults.classList.remove('hidden');
        }
      });
    });
  }

  // SMOOTH SCROLL FOR ANCHOR LINKS
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    });
  });

});
