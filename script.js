// Navigation functionality
const navbar = document.getElementById("navbar");
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

// Smooth scrolling for navigation links
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href").substring(1);
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      const offsetTop = targetSection.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }

    // Close mobile menu
    navMenu.classList.remove("active");
    hamburger.classList.remove("active");

    // Update active link
    navLinks.forEach((l) => l.classList.remove("active"));
    link.classList.add("active");
  });
});

// Mobile menu toggle
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Navbar scroll effect
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  // Update active navigation link based on scroll position
  const sections = document.querySelectorAll(".section, .hero");
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").substring(1) === current) {
      link.classList.add("active");
    }
  });
});

// Scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");

      // Animate skill bars
      if (entry.target.classList.contains("skills-grid")) {
        animateSkillBars();
      }
    }
  });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll(".fade-in").forEach((el) => {
  observer.observe(el);
});

// Animate skill bars
function animateSkillBars() {
  const skillBars = document.querySelectorAll(".skill-progress");
  skillBars.forEach((bar) => {
    const width = bar.getAttribute("data-width");
    setTimeout(() => {
      bar.style.width = width + "%";
    }, 200);
  });
}

// Form validation and submission
const contactForm = document.getElementById("contactForm");
const formInputs = contactForm.querySelectorAll(".form-input, .form-textarea");

// Real-time validation
formInputs.forEach((input) => {
  input.addEventListener("blur", () => validateField(input));
  input.addEventListener("input", () => {
    if (input.classList.contains("error")) {
      validateField(input);
    }
  });
});

function validateField(field) {
  const value = field.value.trim();
  let isValid = true;

  // Remove previous error state
  field.classList.remove("error");

  // Validation rules
  switch (field.type) {
    case "email":
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      isValid = emailRegex.test(value);
      break;
    case "text":
    case "textarea":
      isValid = value.length > 0;
      break;
  }

  if (!isValid) {
    field.classList.add("error");
  }

  return isValid;
}

// Form submission
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let isFormValid = true;
  formInputs.forEach((input) => {
    if (!validateField(input)) {
      isFormValid = false;
    }
  });

  if (isFormValid) {
    // Simulate form submission
    const submitBtn = contactForm.querySelector(".btn-submit");
    const originalText = submitBtn.textContent;

    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    setTimeout(() => {
      alert("Thank you for your message! I'll get back to you soon.");
      contactForm.reset();
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }, 2000);
  }
});

// Project modal functionality
const projectDetails = {
  arakkel: {
    title: "Arakkel Driver",
    content: `
      <h4>Project Overview</h4>
      <p>
        <strong>October 2024 - Present</strong><br>
        Arakkel Driver is a platform that enables car owners to earn passive income by displaying tailored advertisements on their vehicles. The app tracks your driving routes and matches you with relevant ad campaigns, helping you offset your lease, fuel, and maintenance expenses.
      </p>
      <h4>Key Features</h4>
      <ul>
        <li>Real-time location tracking and trip analytics</li>
        <li>Ad campaign matching based on driving patterns</li>
        <li>Driver earnings dashboard and payout management</li>
        <li>Push notifications for new campaigns and earnings</li>
        <li>Secure authentication and profile management</li>
      </ul>
      <h4>Technical Highlights</h4>
      <p>
        Built with Flutter and Dart for cross-platform mobile support. Firebase is used for authentication, real-time database, and cloud messaging. Location tracking is implemented with high accuracy and battery optimization.
      </p>
    `,
  },
  smarthub: {
    title: "SmartHub",
    content: `
      <h4>Project Overview</h4>
      <p>
        <strong>Aug 2023 - Sep 2023</strong><br>
        SmartHub is an online tutoring platform that connects students with skilled teachers, breaking down geographical barriers and fostering personalized learning. The platform supports live sessions, scheduling, and progress tracking.
      </p>
      <h4>Key Features</h4>
      <ul>
        <li>Student-teacher matching and messaging</li>
        <li>Session scheduling and calendar integration</li>
        <li>Progress tracking and feedback system</li>
        <li>Secure payment processing</li>
        <li>Admin dashboard for managing users and sessions</li>
      </ul>
      <h4>Technical Highlights</h4>
      <p>
        Developed using PHP and MySQL for backend and database. The platform is optimized for scalability and security, with a responsive frontend for seamless user experience.
      </p>
    `,
  },
  quickstep: {
    title: "Quick Step",
    content: `
      <h4>Project Overview</h4>
      <p>
        <strong>Apr 2023 - May 2023</strong><br>
        Quick Step is a real-time live location tracking app that allows users to view their own and others' locations on Google Maps with custom markers. Designed for groups, families, or teams needing to stay connected on the move.
      </p>
      <h4>Key Features</h4>
      <ul>
        <li>Live location sharing with Google Maps integration</li>
        <li>Custom markers for each user</li>
        <li>Real-time updates using WebSockets</li>
        <li>Group creation and invite system</li>
        <li>Location history and trip playback</li>
      </ul>
      <h4>Technical Highlights</h4>
      <p>
        Built with Flutter and Dart for the mobile app, Node.js and MongoDB for the backend, and WebSockets for real-time communication. The app is optimized for low-latency updates and efficient battery usage.
      </p>
    `,
  },
};

function showModal(projectId) {
  const modal = document.getElementById("projectModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalBody = document.getElementById("modalBody");

  const project = projectDetails[projectId];
  if (project) {
    modalTitle.textContent = project.title;
    modalBody.innerHTML = project.content;
    modal.classList.add("show");

    // Prevent body scroll when modal is open
    document.body.style.overflow = "hidden";
  }
}

function closeModal() {
  const modal = document.getElementById("projectModal");
  modal.classList.remove("show");
  document.body.style.overflow = "auto";
}

// Close modal when clicking outside
document.getElementById("projectModal").addEventListener("click", (e) => {
  if (e.target.classList.contains("modal")) {
    closeModal();
  }
});

// Close modal with Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal();
  }
});

// Parallax effect for hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector(".hero");
  const heroContent = document.querySelector(".hero-content");

  if (hero && scrolled < hero.offsetHeight) {
    heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});

// Add typing effect to hero title
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.textContent = "";

  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

// Initialize typing effect when page loads
window.addEventListener("load", () => {
  const heroTitle = document.querySelector(".hero-title");
  if (heroTitle) {
    const originalText = heroTitle.textContent;
    setTimeout(() => {
      typeWriter(heroTitle, originalText, 100);
    }, 1500);
  }
});

// Add smooth hover effects to project cards
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-15px) scale(1.02)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0) scale(1)";
  });
});

// Add loading animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});
