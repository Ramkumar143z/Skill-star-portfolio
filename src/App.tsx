import { useEffect, useRef, useState } from 'react';
import './App.css'

const frameModules = import.meta.glob('./assets/skill star/*.jpg', { eager: true, import: 'default' });
const framePaths = Object.keys(frameModules)
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
  .map((key) => frameModules[key] as string);

function App() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    let currentFrame = 0;
    let targetFrame = 0;
    let animationFrameId: number;

    const handleScroll = () => {
      if (!scrollRef.current) return;
      const rect = scrollRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const totalScrollDistance = windowHeight * 0.8;
      const scrolled = windowHeight - rect.top;

      let progress = 0;
      if (scrolled >= 0 && scrolled <= totalScrollDistance) {
        progress = scrolled / totalScrollDistance;
      } else if (scrolled > totalScrollDistance) {
        progress = 1;
      }

      const maxIndex = framePaths.length - 1;
      targetFrame = progress * maxIndex;
    };

    const renderLoop = () => {
      // Smooth interpolation using a lerp factor (lower is smoother/slower)
      currentFrame += (targetFrame - currentFrame) * 0.08;

      const frameToRender = Math.round(currentFrame);
      if (imgRef.current && framePaths[frameToRender]) {
        imgRef.current.src = framePaths[frameToRender];
      }

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    renderLoop();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Reveal animation for hero components
  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });
    reveals.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="app-container">
      <header className="navbar">
        <div className="container nav-content">
          <div className="logo">
            <div className="logo-icon"></div>
            <div className="logo-text">
              <span className="logo-title">SKILL STAR</span>
              <span className="logo-subtitle">Digital Solutions</span>
            </div>
          </div>
          <nav className="nav-links">
            <a href="#" className="active">HOME</a>
            <a href="#">SERVICES</a>
            <a href="#">ABOUT US</a>
            <a href="#">PROJECTS</a>
            <a href="#">CONTACT</a>
          </nav>
          <button className="btn-outline">
            Get In Touch <span>→</span>
          </button>
        </div>
      </header>

      <main className="main-content container">
        <div className="hero-text-section reveal">
          <p className="kicker text-gradient">INNOVATE. ELEVATE. SUCCEED.</p>
          <h1 className="main-headline">
            We Build<br />
            <span className="text-gradient">Digital Future</span><br />
            Together
          </h1>
          <p className="hero-subtext">
            Smart solutions that drive growth,<br />
            engage audiences, and deliver real results.
          </p>
          <div className="hero-actions">
            <button className="btn-primary">
              Explore Our Services <span>→</span>
            </button>
            <div className="hero-stats">
              <span className="stat-number">120+</span>
              <span className="stat-label">Projects Completed</span>
            </div>
          </div>

          <div className="trust-badges">
            <div className="badge"><span className="badge-icon">🫂</span> Client Focused</div>
            <div className="badge"><span className="badge-icon">⏱️</span> On-Time Delivery</div>
            <div className="badge"><span className="badge-icon">🛡️</span> Quality Assured</div>
          </div>
        </div>

        <div className="hero-visual-section reveal">
          <div className="brain-container glass-panel">
            <img src="/brain.png" alt="Glowing Brain" className="brain-image" />

            <div className="feature-card ui-ux glass-panel reveal">
              <div className="card-icon ui-icon">M</div>
              <div>
                <h3>UI/UX Design</h3>
                <p>Creative interfaces<br />that engage and<br />delight users.</p>
              </div>
            </div>

            <div className="feature-card digital-marketing glass-panel reveal">
              <div className="card-icon marketing-icon">📢</div>
              <div>
                <h3>Digital Marketing</h3>
                <p>Strategies that drive<br />visibility, engagement,<br />and real growth.</p>
              </div>
            </div>

            <div className="feature-card web-dev glass-panel reveal">
              <div className="card-icon web-icon">&lt;/&gt;</div>
              <div>
                <h3>Web Development</h3>
                <p>Scalable websites<br />and web applications<br />built for performance.</p>
              </div>
            </div>

            <div className="feature-card seo glass-panel reveal">
              <div className="card-icon seo-icon">📊</div>
              <div>
                <h3>SEO & Analytics</h3>
                <p>Data-driven insights<br />that lead to smarter<br />decisions and growth.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <div className="container bottom-section">
        <div className="bottom-bar glass-panel">
          <div className="stats-row">
            <div className="stat-item">
              <div className="icon-wrap">🚀</div>
              <div>
                <div className="val">120+</div>
                <div className="lbl-bold">Projects Completed</div>
                <div className="lbl">Successful digital<br />solutions delivered.</div>
              </div>
            </div>
            <div className="stat-item">
              <div className="icon-wrap">😊</div>
              <div>
                <div className="val">98%</div>
                <div className="lbl-bold">Client Satisfaction</div>
                <div className="lbl">Happy clients and<br />lasting relationships.</div>
              </div>
            </div>
            <div className="stat-item">
              <div className="icon-wrap">🏆</div>
              <div>
                <div className="val">5+</div>
                <div className="lbl-bold">Years Experience</div>
                <div className="lbl">Delivering excellence<br />since 2019.</div>
              </div>
            </div>
            <div className="stat-item">
              <div className="icon-wrap">🎧</div>
              <div>
                <div className="val">24/7</div>
                <div className="lbl-bold">Support</div>
                <div className="lbl">We're here whenever<br />you need us.</div>
              </div>
            </div>
          </div>
        </div>

        <div className="technologies-section">
          <p>TECHNOLOGIES WE WORK WITH</p>
          <div className="tech-logos">
            <span>⚛️ React</span>
            <span>▲ NEXT.js</span>
            <span>🟩 node.js</span>
            <span>🔺 Laravel</span>
            <span>Ⓜ️ WORDPRESS</span>
            <span>🌊 Tailwind CSS</span>
          </div>
        </div>
      </div>

      <section className="services-section container">
        <div className="services-header">
          <div className="services-title-area">
            <span className="services-kicker">Our Service</span>
            <h2 className="services-headline">
              <span className="text-dim">Digital</span> Solutions <span className="text-dim">for<br />Your</span> Business
            </h2>
          </div>
          <div className="services-desc">
            <p>Our services help you create digital products and solve your problems objectively, strategy, technology and analysis. Our service also has a high appeal because it has a beautiful color combination.</p>
          </div>
        </div>

        <div className="services-list">
          {[
            { title: 'Website Development', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80' },
            { title: 'UIUX Design', img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&q=80' },
            { title: 'App Development', img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&q=80' },
            { title: 'Branding', img: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&q=80' }
          ].map((service, idx) => (
            <div className="service-item" key={idx}>
              <div className="service-info">
                <h3>{service.title}</h3>
                <p>Welcome to our website! We are a professional company that offers a wide range of printing services to meet your needs.</p>
              </div>
              <div className="service-hover-img">
                <img src={service.img} alt={service.title} />
              </div>
              <button className="service-btn">↗</button>
            </div>
          ))}
        </div>
      </section>

      <section className="projects-section container">
        <div className="projects-header">
          <span className="projects-kicker">Our Work</span>
          <div className="projects-headline-area">
            <h2 className="projects-headline">
              <span className="text-dim">Featured</span> Projects
            </h2>
            <button className="btn-outline">View All Projects <span>→</span></button>
          </div>
        </div>

        <div className="projects-grid">
          {[
            { title: 'E-Commerce Platform', category: 'Web Development', img: 'https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=800&q=80' },
            { title: 'Fintech Mobile App', category: 'UI/UX Design', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80' },
            { title: 'Corporate Branding', category: 'Branding', img: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80' },
            { title: 'Healthcare Portal', category: 'Web Application', img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80' }
          ].map((project, idx) => (
            <div className="project-card" key={idx}>
              <div className="project-img-wrapper">
                <img src={project.img} alt={project.title} />
                <div className="project-overlay">
                  <button className="project-link-btn">↗</button>
                </div>
              </div>
              <div className="project-info">
                <span>{project.category}</span>
                <h3>{project.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="about-section container" ref={scrollRef}>
        <div className="about-content-area">
          <div className="about-text-content">
            <span className="about-kicker">Who We Are</span>
            <h2 className="about-headline">
              <span className="text-dim">Meet</span> Our Special<br />
              <span className="text-dim">Service</span>
            </h2>
            <p className="about-desc">
              Our services help you create digital products and solve your problems objectively, strategy, technology and analysis. Our service also has a high.
            </p>

            <div className="mission-vision-grid">
              <div className="mv-item">
                <h4><span className="cyan-star">✦</span> Our Mission</h4>
                <p>Since 2007, ADDIE Soft Ltd. has crafted innovative software solutions.</p>
              </div>
              <div className="mv-item">
                <h4><span className="cyan-star">✦</span> Our Vision</h4>
                <p>Since 2007, ADDIE Soft Ltd. has crafted innovative software solutions.</p>
              </div>
            </div>

            <button className="btn-outline about-btn">
              Read More <span>→</span>
            </button>
          </div>

          <div className="about-image-content">
            <div className="blob-image-wrapper">
              <img ref={imgRef} src={framePaths[0]} alt="Animation frame" className="blob-image" />
              <div className="glow-trace"></div>
            </div>
          </div>
        </div>

        <div className="about-stats-row">
          <div className="about-stat-item">
            <div className="val">95Y</div>
            <div className="lbl">Experience in IT Sector</div>
          </div>
          <div className="about-stat-item">
            <div className="val">1,500+</div>
            <div className="lbl">Project Completed</div>
          </div>
          <div className="about-stat-item">
            <div className="val">10M+</div>
            <div className="lbl">Satisfied Clients</div>
          </div>
          <div className="about-stat-item">
            <div className="val">100+</div>
            <div className="lbl">Dedicated Employee</div>
          </div>
        </div>
      </section>

      <section className="tech-grid-section container">
        <div className="tech-header">
          <span className="tech-kicker">Technology</span>
          <h2 className="tech-headline">
            <span className="text-dim">What technologies</span><br />
            do we use?
          </h2>
        </div>

        <div className="tech-cards-grid">
          {[
            {
              icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/shopify/shopify-original.svg',
              title: 'Shopify',
              desc: 'Shopify to launch your online store quickly and effortlessly, reaching customers everywhere.'
            },
            {
              icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg',
              title: 'Android',
              desc: 'Use Android to build powerful, flexible mobile apps that reach billions of users worldwide!'
            },
            {
              icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg',
              title: 'Flutter',
              desc: 'Use Flutter to create stunning, high-performance apps for multiple platforms with a codebase'
            },
            {
              icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
              title: 'Python',
              desc: 'Python for its simplicity, enabling efficient development in everything from web apps.'
            },
            {
              icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg',
              title: 'Kotlin',
              desc: 'Kotlin for modern, concise, and safe Android app development with seamless Java integration'
            },
            {
              icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg',
              title: 'Swift',
              desc: 'Swift for fast, efficient, and easy-to-read development of iOS and macOS applications'
            }
          ].map((tech, i) => (
            <div className="tech-card" key={i}>
              <div className="tech-icon">
                <img src={tech.icon} alt={tech.title} />
              </div>
              <h3>{tech.title}</h3>
              <p>{tech.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="team-section container">
        <div className="team-header">
          <span className="team-kicker">Our Experts</span>
          <h2 className="team-headline">
            <span className="text-dim">Meet</span> The Team
          </h2>
        </div>

        <div className="team-grid">
          {[
            { name: 'Michael Chen', role: 'CEO & Founder', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80' },
            { name: 'Sarah Jenkins', role: 'Lead Designer', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80' },
            { name: 'David Smith', role: 'Senior Developer', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80' },
            { name: 'Elena Rodriguez', role: 'Marketing Head', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80' }
          ].map((member, idx) => (
            <div className="team-card" key={idx}>
              <div className="team-img-wrapper">
                <img src={member.img} alt={member.name} />
                <div className="team-social">
                  <a href="#">ln</a>
                  <a href="#">tw</a>
                </div>
              </div>
              <div className="team-info">
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="testimonials-section container">
        <div className="testimonials-header">
          <div className="header-left">
            <span className="testimonials-kicker">Testimonials</span>
            <h2 className="testimonials-headline">
              <span className="text-dim">What</span> Clients Say<br />
              <span className="text-dim">About</span> Us
            </h2>
          </div>
          <div className="header-right">
            <p>Explore our diverse range of successful projects and innovative products across various industries. Explore our diverse range of successful projects and innovative products across various industries.</p>
          </div>
        </div>

        <div className="testimonials-marquee-container">
          <div className="marquee-row">
            <div className="marquee-track">
              {[
                { name: 'Harold Tyler', role: 'Product Designer', text: 'I had a fantastic experience with their support. The dashboard they provide is top-notch, and I\'d suggest it to anyone seeking quality and usability.', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&q=80' },
                { name: 'Wade Warren', role: 'Product Designer', text: 'The specialists were extremely knowledgeable and responsive. If you need a great dashboard that\'s both function this is the perfect choice for you.', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80' },
                { name: 'Wade Tyler', role: 'Product Designer', text: 'I received great customer service specialists who helped me. I would recommend to anyone who wants dashboard that has great quality.', avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&q=80' },
                { name: 'Arnold Carter', role: 'Product Designer', text: 'I am thrilled with the assistance I received. This dashboard is a must-have for anyone who prioritizes quality, ease of use, and exceptional service.', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&q=80' },
                { name: 'Ronald Parker', role: 'Product Designer', text: 'The support team was remarkable. This dashboard is perfect for anyone who values professional service, seamless functionality, and quality in their tools.', avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&q=80' },
                { name: 'Gerald Mason', role: 'Product Designer', text: 'I was impressed by the excellent service provided. This dashboard is ideal for anyone who values great design, intuitive functionality, and high-quality performance.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80' },
                // Duplicate for seamless scroll
                { name: 'Harold Tyler', role: 'Product Designer', text: 'I had a fantastic experience with their support. The dashboard they provide is top-notch, and I\'d suggest it to anyone seeking quality and usability.', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&q=80' },
                { name: 'Wade Warren', role: 'Product Designer', text: 'The specialists were extremely knowledgeable and responsive. If you need a great dashboard that\'s both function this is the perfect choice for you.', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80' },
                { name: 'Wade Tyler', role: 'Product Designer', text: 'I received great customer service specialists who helped me. I would recommend to anyone who wants dashboard that has great quality.', avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&q=80' },
                { name: 'Arnold Carter', role: 'Product Designer', text: 'I am thrilled with the assistance I received. This dashboard is a must-have for anyone who prioritizes quality, ease of use, and exceptional service.', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&q=80' },
                { name: 'Ronald Parker', role: 'Product Designer', text: 'The support team was remarkable. This dashboard is perfect for anyone who values professional service, seamless functionality, and quality in their tools.', avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&q=80' },
                { name: 'Gerald Mason', role: 'Product Designer', text: 'I was impressed by the excellent service provided. This dashboard is ideal for anyone who values great design, intuitive functionality, and high-quality performance.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80' }
              ].map((t, i) => (
                <div className="testimonial-card" key={i}>
                  <div className="t-logo">
                    <span className="logo-placeholder">⬡ logoipsum</span>
                  </div>
                  <p className="t-text">{t.text}</p>
                  <div className="t-user">
                    <img src={t.avatar} alt={t.name} />
                    <div className="t-user-info">
                      <h5>{t.name}</h5>
                      <span>{t.role}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="marquee-row">
            <div className="marquee-track reverse">
              {[
                { name: 'Arnold Carter', role: 'Product Designer', text: 'I am thrilled with the assistance I received. This dashboard is a must-have for anyone who prioritizes quality, ease of use, and exceptional service.', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&q=80' },
                { name: 'Ronald Parker', role: 'Product Designer', text: 'The support team was remarkable. This dashboard is perfect for anyone who values professional service, seamless functionality, and quality in their tools.', avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&q=80' },
                { name: 'Gerald Mason', role: 'Product Designer', text: 'I was impressed by the excellent service provided. This dashboard is ideal for anyone who values great design, intuitive functionality, and high-quality performance.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80' },
                { name: 'Harold Tyler', role: 'Product Designer', text: 'I had a fantastic experience with their support. The dashboard they provide is top-notch, and I\'d suggest it to anyone seeking quality and usability.', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&q=80' },
                { name: 'Wade Warren', role: 'Product Designer', text: 'The specialists were extremely knowledgeable and responsive. If you need a great dashboard that\'s both function this is the perfect choice for you.', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80' },
                { name: 'Wade Tyler', role: 'Product Designer', text: 'I received great customer service specialists who helped me. I would recommend to anyone who wants dashboard that has great quality.', avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&q=80' },
                // Duplicate for seamless scroll
                { name: 'Arnold Carter', role: 'Product Designer', text: 'I am thrilled with the assistance I received. This dashboard is a must-have for anyone who prioritizes quality, ease of use, and exceptional service.', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&q=80' },
                { name: 'Ronald Parker', role: 'Product Designer', text: 'The support team was remarkable. This dashboard is perfect for anyone who values professional service, seamless functionality, and quality in their tools.', avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&q=80' },
                { name: 'Gerald Mason', role: 'Product Designer', text: 'I was impressed by the excellent service provided. This dashboard is ideal for anyone who values great design, intuitive functionality, and high-quality performance.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80' },
                { name: 'Harold Tyler', role: 'Product Designer', text: 'I had a fantastic experience with their support. The dashboard they provide is top-notch, and I\'d suggest it to anyone seeking quality and usability.', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&q=80' },
                { name: 'Wade Warren', role: 'Product Designer', text: 'The specialists were extremely knowledgeable and responsive. If you need a great dashboard that\'s both function this is the perfect choice for you.', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80' },
                { name: 'Wade Tyler', role: 'Product Designer', text: 'I received great customer service specialists who helped me. I would recommend to anyone who wants dashboard that has great quality.', avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&q=80' }
              ].map((t, i) => (
                <div className="testimonial-card" key={i}>
                  <div className="t-logo">
                    <span className="logo-placeholder">⬡ logoipsum</span>
                  </div>
                  <p className="t-text">{t.text}</p>
                  <div className="t-user">
                    <img src={t.avatar} alt={t.name} />
                    <div className="t-user-info">
                      <h5>{t.name}</h5>
                      <span>{t.role}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="footer-section">
        <div className="container footer-content">
          <div className="footer-cta">
            <h2>Ready to start your digital journey?</h2>
            <p>Let's collaborate to build something extraordinary together.</p>
            <button className="btn-primary">Get In Touch <span>→</span></button>
          </div>

          <div className="footer-links-grid">
            <div className="footer-col brand-col">
              <div className="logo">
                <div className="logo-icon"></div>
                <div className="logo-text">
                  <span className="logo-title">SKILL STAR</span>
                  <span className="logo-subtitle">Digital Solutions</span>
                </div>
              </div>
              <p>We craft digital experiences that engage audiences and deliver real results for your business.</p>
              <div className="social-links">
                <a href="#" className="social-icon">In</a>
                <a href="#" className="social-icon">Tw</a>
                <a href="#" className="social-icon">Fb</a>
                <a href="#" className="social-icon">Ig</a>
              </div>
            </div>

            <div className="footer-col">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Services</a></li>
                <li><a href="#">Projects</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Services</h4>
              <ul>
                <li><a href="#">Web Development</a></li>
                <li><a href="#">UI/UX Design</a></li>
                <li><a href="#">App Development</a></li>
                <li><a href="#">Digital Marketing</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Contact Info</h4>
              <ul className="contact-info-list">
                <li><span className="icon">✉️</span> hello@skillstar.com</li>
                <li><span className="icon">📞</span> +1 (555) 123-4567</li>
                <li><span className="icon">📍</span> 123 Digital Ave, Tech City, CA 90210</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="container bottom-flex">
            <p>&copy; {new Date().getFullYear()} Skill Star Digital Solutions. All rights reserved.</p>
            <div className="legal-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
