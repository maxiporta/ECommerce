import React from 'react';
import './footer.css';
import whatsappIcon from '../../assets/socialMediaImg/whatsapp.png';
import instagramIcon from '../../assets/socialMediaImg/instagram.png';
import facebookIcon from '../../assets/socialMediaImg/facebook.png';
import telegramIcon from '../../assets/socialMediaImg/telegram.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="social-icons">
            <a href="https://www.instagram.com/your-instagram-handle" target="_blank" rel="noopener noreferrer">
              <img src={instagramIcon} alt="Instagram" />
            </a>
            <a href="https://www.facebook.com/your-facebook-page" target="_blank" rel="noopener noreferrer">
              <img src={facebookIcon} alt="Facebook" />
            </a>
            <a href="https://t.me/your-telegram-handle" target="_blank" rel="noopener noreferrer">
              <img src={telegramIcon} alt="Telegram" />
            </a>
            <a href="https://wa.me/your-whatsapp-number" target="_blank" rel="noopener noreferrer">
              <img src={whatsappIcon} alt="WhatsApp" />
            </a>
          </div>
          <p>&copy; 2024 Your Website Name. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;