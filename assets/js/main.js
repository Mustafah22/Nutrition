/**
* Template Name: EasyFolio
* Template URL: https://bootstrapmade.com/easyfolio-bootstrap-portfolio-template/
* Updated: Feb 21 2025 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();

/**
 * About Section: Initialize and update profile image dynamically
 */
const profileImg = document.getElementById('about-profile-img');

function setAboutImageFromTab(tabButton) {
  const newImg = tabButton.getAttribute('data-img');
  if (newImg) {
    profileImg.setAttribute('src', newImg);
  }
}

// Initialize on page load
window.addEventListener('load', () => {
  const activeTab = document.querySelector('#aboutTab .nav-link.active');
  if (activeTab) {
    setAboutImageFromTab(activeTab);
  }
});

// Update when tabs change
document.querySelectorAll('#aboutTab button[data-bs-toggle="tab"]').forEach(tab => {
  tab.addEventListener('shown.bs.tab', function (event) {
    setAboutImageFromTab(event.target);
  });
});



// Quiz Section
// ============================
// AOS Initialization
// ============================
if (typeof AOS !== "undefined") {
  AOS.init({
    duration: 1000,
    easing: "ease-in-out",
    once: true,
  });
}

// ============================
// Rellax Initialization (Safe)
// ============================
if (typeof Rellax !== "undefined") {
  try {
    var rellax = new Rellax(".rellax");
  } catch (err) {
    console.warn("Rellax failed to init:", err);
  }
}

// ============================
// Quiz Logic
// ============================
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("healthQuiz");
  const resultBox = document.getElementById("quizResult");
  const resultText = document.getElementById("resultText");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const goal = document.getElementById("goal").value;
      const lifestyle = document.getElementById("lifestyle").value;
      const condition = document.getElementById("condition").value;

      let resultMessage = "Based on your answers, we recommend focusing on ";

      // Goal logic
      if (goal === "weight") {
        resultMessage += "a weight management plan with balanced meals and portion control. ";
      } else if (goal === "energy") {
        resultMessage += "energy-boosting foods rich in whole grains, lean protein, and hydration. ";
      } else if (goal === "digestion") {
        resultMessage += "gut-healing foods like probiotics, fiber, and anti-inflammatory nutrition. ";
      } else if (goal === "diabetes") {
        resultMessage += "a diabetic-friendly meal plan with stable blood sugar management. ";
      }

      // Condition logic
      if (condition !== "none") {
        resultMessage += `Special care will be considered for your condition: ${condition}. `;
      }

      // Lifestyle logic
      if (lifestyle === "busy") {
        resultMessage += "Since you’re often busy, we’ll suggest quick and practical meal options.";
      } else if (lifestyle === "sedentary") {
        resultMessage += "A focus on light meals and portion awareness will be key for you.";
      } else if (lifestyle === "active") {
        resultMessage += "We’ll emphasize meals that fuel your activity and recovery.";
      }

      // Update UI
      resultText.textContent = resultMessage;
      resultBox.classList.add("show");
      resultBox.scrollIntoView({ behavior: "smooth" });
    });

    // Show initial state
    resultBox.classList.add("show");
  }
});


// ============================
// Floating Icons Parallax
// ============================
document.addEventListener("mousemove", (e) => {
  document.querySelectorAll(".float-icon").forEach((icon) => {
    const speed = icon.getAttribute("data-speed");
    const x = (window.innerWidth - e.pageX * speed) / 200;
    const y = (window.innerHeight - e.pageY * speed) / 200;
    icon.style.transform = `translate(${x}px, ${y}px)`;
  });
});


// End Quiz

