// Week 7: Migrating Your Interactive Portfolio to React
// This starter file guides you through migrating your Week 6 vanilla JavaScript portfolio to React

import { useEffect } from 'react'
import './App.css'

function App() {
  // ============================================
  // PART 1: EVENT HANDLER FUNCTIONS
  // ============================================
  // TODO: Move your Week 6 event handler functions here
  // In Week 6, you had functions like:
  // - handleNavClick (for smooth scroll)
  // - filterProjects (for project filtering)
  // - handleFormSubmit (for form validation)
  //

  // HINT: These will be regular JavaScript functions defined inside App component
  // Example from Week 6:
  //   // TODO: Add smooth scroll handler
  // Replace: navLinks.forEach(link => link.addEventListener('click', ...))
  // With: const handleNavClick = (e) => { ... }

  const handleNavClick = (e) => {
    e.preventDefault(); // Prevent default jump behavior

    // Get the target section ID from href attribute
    const targetId = e.currentTarget.getAttribute('href');
    const targetSection = document.querySelector(targetId);

    // Smooth scroll to the target section
    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }

    // Close the mobile menu after a link is clicked
    document.querySelector('.nav-menu').classList.remove('active');
    document.querySelector('.nav-toggle').classList.remove('active');
  };

  // Toggle mobile menu
  const handleMenuToggle = () => {
    document.querySelector('.nav-menu').classList.toggle('active');
    document.querySelector('.nav-toggle').classList.toggle('active');
  };

  // Scroll handler for active nav highlighting
  const handleScroll = () => {
    const sections = document.querySelectorAll('section');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        document.querySelectorAll('.nav-link').forEach(link =>
          link.classList.remove('active')
        );
        const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        if (activeLink) {
          activeLink.classList.add('active');
        }
      }
    });
  };

  // Copy this block as is: attach the listener once on load, remove it on unload
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // TODO: Add filter handler
  // Replace: filterButtons.forEach(button => button.addEventListener('click', ...))
  // With: const handleFilterClick = (category) => { ... }

  const handleFilterClick = (category) => {
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
      card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      const cardCategory = card.getAttribute('data-category');

      if (category === 'all' || cardCategory === category) {
        // Show matching cards with fade-in effect
        card.style.display = 'block';
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'scale(1)';
        }, 10);
      } else {
        // Hide non-matching cards with fade-out effect
        card.style.opacity = '0';
        card.style.transform = 'scale(0.9)';
        setTimeout(() => {
          card.style.display = 'none';
        }, 300);
      }
    });

    

    // Highlight the clicked filter button
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-filter') === category);
    });
  };
  
  // TODO: Add form validation functions
  // You'll need: isValidEmail, showError, clearError, showSuccess
  // These can stay mostly the same!

  // Email validation function
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Clear error message
  const clearError = (input) => {
    const error = input.parentElement.querySelector('.error-message');
    if (error) {
      error.remove();
    }
    input.classList.remove('error');
  };

  // Show error message
  const showError = (input, message) => {
    // Remove any existing error
    clearError(input);

    // Create error element
    const error = document.createElement('span');
    error.className = 'error-message';
    error.textContent = message;

    // Add error class to input
    input.classList.add('error');
    input.classList.remove('success');

    // Append error after input
    input.parentElement.appendChild(error);
  };

  // Show success state
  const showSuccess = (input) => {
    clearError(input);
    input.classList.add('success');
    input.classList.remove('error');
  };

  // Validation rules for each field; each returns true if the field is valid
  const validateName = (input) => {
    if (input.value.trim().length < 2) {
      showError(input, 'Name must be at least 2 characters');
      return false;
    }
    showSuccess(input);
    return true;
  };

  const validateEmail = (input) => {
    if (!isValidEmail(input.value)) {
      showError(input, 'Please enter a valid email address');
      return false;
    }
    showSuccess(input);
    return true;
  };

  const validateMessage = (input) => {
    if (input.value.trim().length < 10) {
      showError(input, 'Message must be at least 10 characters');
      return false;
    }
    showSuccess(input);
    return true;
  };

  // TODO: Add form submit handler
  // Replace: contactForm.addEventListener('submit', ...)
  // With: const handleFormSubmit = (e) => { ... }

  const handleFormSubmit = (e) => {
    e.preventDefault(); // Prevent actual submission
    const contactForm = e.currentTarget;

    // Validate all fields (validate each one so every error shows)
    const nameValid = validateName(contactForm.querySelector('#name'));
    const emailValid = validateEmail(contactForm.querySelector('#email'));
    const messageValid = validateMessage(contactForm.querySelector('#message'));

    // If valid, show success
    if (nameValid && emailValid && messageValid) {
      // Create success message
      const successMsg = document.createElement('div');
      successMsg.className = 'success-message';
      successMsg.textContent = 'Thank you! Your message has been sent successfully.';

      // Append after form
      contactForm.appendChild(successMsg);

      // Clear form after 3 seconds
      setTimeout(() => {
        contactForm.reset();
        successMsg.remove();
        contactForm.querySelectorAll('.success').forEach(input => {
          input.classList.remove('success');
        });
      }, 3000);
    }
  };


  // ============================================
  // PART 2: JSX RETURN STATEMENT
  // ============================================
  // TODO: Copy your Week 6 HTML structure here
  // Remember to convert HTML to JSX:
  // - class → className
  // - onclick → onClick
  // - onsubmit → onSubmit
  // - for → htmlFor
  // - All event attributes use camelCase
  //
  // IMPORTANT: Put EVERYTHING in this one return statement!
  // This week we're building a MONOLITHIC component (one big component)
  // Week 8 will teach you how to break this into smaller pieces

  return (
    <div className="portfolio">
      {/* Navigation Bar */}
      <nav id="navbar">
        <div className="nav-brand">
          <span>Quinton King</span>
        </div>
        <ul className="nav-menu">
          <li><a href="#home" className="nav-link" onClick={handleNavClick}>Home</a></li>
          <li><a href="#about" className="nav-link" onClick={handleNavClick}>About</a></li>
          <li><a href="#skills" className="nav-link" onClick={handleNavClick}>Skills</a></li>
          <li><a href="#projects" className="nav-link" onClick={handleNavClick}>Projects</a></li>
          <li><a href="#contact" className="nav-link" onClick={handleNavClick}>Contact</a></li>
        </ul>
        {/* Mobile menu toggle */}
        <div className="nav-toggle" onClick={handleMenuToggle}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Quinton King</h1>
          <p className="hero-subtitle">Agent Product Manager</p>
          <p className="hero-tagline">Building great agent experiences</p>
          <div className="hero-buttons">
            <a href="#projects" className="btn btn-primary" onClick={handleNavClick}>View Projects</a>
            <a href="#contact" className="btn btn-secondary" onClick={handleNavClick}>Get In Touch</a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section">
        <div className="container">
          <h2>About Me</h2>
          <div className="about-grid">
            <div className="about-text">
              <p>I'm a passionate PM focused on agent experience, from conversational design to core UI elements</p>
              <div className="about-details">
                <div className="detail-item">
                  <span className="detail-icon">📍</span>
                  <span>San Francisco, CA</span>
                </div>
                <div className="detail-item">
                  <span className="detail-icon">✉️</span>
                  <a href="mailto:quintonking@berkeley.edu">quintonking@berkeley.edu</a>
                </div>
                <div className="detail-item">
                  <span className="detail-icon">📱</span>
                  <span>(555) 123-4567</span>
                </div>
              </div>
            </div>
            <div className="about-availability">
              <h3>Currently Available For:</h3>
              <div className="availability-tags">
                <span className="tag tag-available">Freelance</span>
                <span className="tag tag-available">Full-Time</span>
                <span className="tag tag-available">Remote</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section section-alt">
        <div className="container">
          <h2>Skills & Technologies</h2>
          <div className="skills-grid">
            <div className="skill-card">
              <div className="skill-header">
                <span className="skill-icon">🎨</span>
                <h3 className="skill-name">Figma</h3>
              </div>
              <div className="skill-category">TypeScript</div>
              <div className="skill-level">
                <div className="skill-progress" style={{ '--skill-level': '90%' }}></div>
              </div>
              <span className="skill-percentage">90%</span>
            </div>

            <div className="skill-card">
              <div className="skill-header">
                <span className="skill-icon">🎨</span>
                <h3 className="skill-name">Visual Design</h3>
              </div>
              <div className="skill-category">UX Design</div>
              <div className="skill-level">
                <div className="skill-progress" style={{ '--skill-level': '95%' }}></div>
              </div>
              <span className="skill-percentage">95%</span>
            </div>

            <div className="skill-card">
              <div className="skill-header">
                <span className="skill-icon">📱</span>
                <h3 className="skill-name">Responsive Design</h3>
              </div>
              <div className="skill-category">Agent Evals</div>
              <div className="skill-level">
                <div className="skill-progress" style={{ '--skill-level': '88%' }}></div>
              </div>
              <span className="skill-percentage">88%</span>
            </div>

            <div className="skill-card">
              <div className="skill-header">
                <span className="skill-icon">🚀</span>
                <h3 className="skill-name">JavaScript</h3>
              </div>
              <div className="skill-category">Programming</div>
              <div className="skill-level">
                <div className="skill-progress" style={{ '--skill-level': '85%' }}></div>
              </div>
              <span className="skill-percentage">85%</span>
            </div>

            <div className="skill-card">
              <div className="skill-header">
                <span className="skill-icon">🎯</span>
                <h3 className="skill-name">Figma</h3>
              </div>
              <div className="skill-category">Generative AI</div>
              <div className="skill-level">
                <div className="skill-progress" style={{ '--skill-level': '80%' }}></div>
              </div>
              <span className="skill-percentage">80%</span>
            </div>

            <div className="skill-card">
              <div className="skill-header">
                <span className="skill-icon">🌐</span>
                <h3 className="skill-name">Node.js</h3>
              </div>
              <div className="skill-category">Backend</div>
              <div className="skill-level">
                <div className="skill-progress" style={{ '--skill-level': '75%' }}></div>
              </div>
              <span className="skill-percentage">75%</span>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="section">
        <div className="container">
          <h2>Featured Projects</h2>

          <div className="filter-buttons">
            <button className="filter-btn active" data-filter="all" onClick={() => handleFilterClick('all')}>All Projects</button>
            <button className="filter-btn" data-filter="frontend" onClick={() => handleFilterClick('frontend')}>Frontend</button>
            <button className="filter-btn" data-filter="fullstack" onClick={() => handleFilterClick('fullstack')}>Full-Stack</button>
            <button className="filter-btn" data-filter="design" onClick={() => handleFilterClick('design')}>Design</button>
            <button className="filter-btn" data-filter="webapp" onClick={() => handleFilterClick('webapp')}>Web App</button>
          </div>

          <div className="projects-grid">
            <div className="project-card featured" data-category="fullstack">
              <div className="project-image">
                <img src="https://via.placeholder.com/400x250/4f46e5/ffffff?text=E-Commerce+App" alt="E-Commerce Platform" />
                <div className="project-overlay">
                  <div className="project-links">
                    <a href="#" className="project-link"><span>🔗</span> Live Demo</a>
                    <a href="#" className="project-link"><span>💻</span> Code</a>
                  </div>
                </div>
              </div>
              <div className="project-content">
                <div className="project-header">
                  <h3 className="project-title">E-Commerce Platform</h3>
                  <span className="project-category">Full-Stack</span>
                </div>
                <p className="project-description">A modern e-commerce platform built with React and Node.js, featuring shopping cart, payment integration, and admin dashboard.</p>
                <div className="project-tags">
                  <span className="project-tag">React</span>
                  <span className="project-tag">Node.js</span>
                  <span className="project-tag">MongoDB</span>
                  <span className="project-tag">Stripe</span>
                </div>
              </div>
            </div>

            <div className="project-card" data-category="frontend">
              <div className="project-image">
                <img src="https://via.placeholder.com/400x250/059669/ffffff?text=Weather+App" alt="Weather Dashboard" />
                <div className="project-overlay">
                  <div className="project-links">
                    <a href="#" className="project-link"><span>🔗</span> Live Demo</a>
                    <a href="#" className="project-link"><span>💻</span> Code</a>
                  </div>
                </div>
              </div>
              <div className="project-content">
                <div className="project-header">
                  <h3 className="project-title">Weather Dashboard</h3>
                  <span className="project-category">Frontend</span>
                </div>
                <p className="project-description">Clean and intuitive weather dashboard with location search, 7-day forecast, and beautiful animations.</p>
                <div className="project-tags">
                  <span className="project-tag">JavaScript</span>
                  <span className="project-tag">CSS3</span>
                  <span className="project-tag">API</span>
                </div>
              </div>
            </div>

            <div className="project-card" data-category="webapp">
              <div className="project-image">
                <img src="https://via.placeholder.com/400x250/dc2626/ffffff?text=Task+Manager" alt="Task Management App" />
                <div className="project-overlay">
                  <div className="project-links">
                    <a href="#" className="project-link"><span>🔗</span> Live Demo</a>
                    <a href="#" className="project-link"><span>💻</span> Code</a>
                  </div>
                </div>
              </div>
              <div className="project-content">
                <div className="project-header">
                  <h3 className="project-title">Task Management App</h3>
                  <span className="project-category">Web App</span>
                </div>
                <p className="project-description">Productivity app with drag-and-drop functionality, project collaboration, and deadline tracking.</p>
                <div className="project-tags">
                  <span className="project-tag">React</span>
                  <span className="project-tag">TypeScript</span>
                  <span className="project-tag">Firebase</span>
                </div>
              </div>
            </div>

            <div className="project-card" data-category="design">
              <div className="project-image">
                <img src="https://via.placeholder.com/400x250/7c3aed/ffffff?text=Portfolio+Site" alt="Portfolio Website" />
                <div className="project-overlay">
                  <div className="project-links">
                    <a href="#" className="project-link"><span>🔗</span> Live Demo</a>
                    <a href="#" className="project-link"><span>💻</span> Code</a>
                  </div>
                </div>
              </div>
              <div className="project-content">
                <div className="project-header">
                  <h3 className="project-title">Creative Portfolio</h3>
                  <span className="project-category">Design</span>
                </div>
                <p className="project-description">Responsive portfolio website for a graphic designer with interactive galleries and smooth animations.</p>
                <div className="project-tags">
                  <span className="project-tag">HTML5</span>
                  <span className="project-tag">CSS3</span>
                  <span className="project-tag">GSAP</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section id="contact" className="section section-alt">
        <div className="container">
          <h2>Get In Touch</h2>
          <div className="contact-content">
            <p>I'm always interested in hearing about new opportunities and projects. Feel free to reach out!</p>

            <form id="contact-form" className="contact-form" onSubmit={handleFormSubmit} noValidate>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="name">Name *</label>
                  <input type="text" id="name" name="name" required onChange={(e) => validateName(e.target)} />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input type="email" id="email" name="email" required onChange={(e) => validateEmail(e.target)} />
                </div>

                <div className="form-group form-group-full">
                  <label htmlFor="subject">Subject</label>
                  <input type="text" id="subject" name="subject" />
                </div>

                <div className="form-group form-group-full">
                  <label htmlFor="message">Message *</label>
                  <textarea id="message" name="message" rows="5" required onChange={(e) => validateMessage(e.target)}></textarea>
                </div>

                <div className="form-group form-group-full">
                  <button type="submit" className="btn btn-primary">Send Message</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <p>&copy; 2026 Quinton King. All rights reserved.</p>
            <div className="social-links">
              <a href="#" className="social-link">GitHub</a>
              <a href="#" className="social-link">LinkedIn</a>
              <a href="#" className="social-link">Twitter</a>
              <a href="#" className="social-link">Dribbble</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
