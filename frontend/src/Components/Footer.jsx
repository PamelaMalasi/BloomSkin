import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import logo from '../images/blogo5.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faYoutube, faTiktok, faFacebook } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (email.trim()) {
      alert("You subscribed with: " + email);
      setEmail("");
    } else {
      alert("Please enter a valid email address.");
    }
  };

  return (
    <div className='container'>
      <div className='footer'>

        <div className='logo'>
          <img src={logo} alt="logo" width="100px" height="80px" />
          <div className="subscribe-container">
            <input
              type="email"
              className="subscribe-input"
              placeholder="super-email@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="subscribe-button" onClick={handleSubscribe}>
              Subscribe
            </button>
          </div>
        </div>

        <div className='list1'>
          <ul className='list'>
            <li style={{ fontWeight: 'bold' }}>NAVIGATE</li>
            <li><Link to="/readAllItem" className="footer-link">Shop</Link></li>
            <li><Link to="/about" className="footer-link">About BloomSkin</Link></li>
            <li><Link to="/contact" className="footer-link">Contact Us</Link></li>
          </ul>
        </div>

        <div className='socials'>
          <ul className='socials-list'>
            <li style={{ fontWeight: 'bold' }}>SOCIAL</li>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <li>
                <FontAwesomeIcon icon={faInstagram} className="me-2" />
                Instagram
              </li>
            </a>

            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
              <li>
                <FontAwesomeIcon icon={faFacebook} className="me-2" />
                Facebook
              </li>
            </a>

            <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer">
              <li>
                <FontAwesomeIcon icon={faTiktok} className="me-2" />
                Tik Tok
              </li>
            </a>

          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
