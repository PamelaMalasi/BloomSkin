import React from 'react'
import './Skinguide.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Products from "./Products";
import { useNavigate } from "react-router-dom";



const Skinguide = () => {
  const navigate = useNavigate();
  return (
    <div className="container">

      <div className="section-concern">

        <div className="guide-text">

          <div className="title">
            SKINCARE TIPS & ADVICE
          </div>

          <div>

            Discover expert skincare tips and advice, including the latest in skincare research for key skin concerns including acne, eczema, anti-aging, sensitive skin and more.</div>

        </div>

      </div>


      <div className="section-test">

        <div className="test-text">
          <div className="test-title">
            <div>skincare</div>
          </div>
          <div className="finder">Solution Finder</div>
          <Button className="test-button" href='https://workspace.google.com/products/forms/'>Let's go!</Button>


          <p>*This Solution Finder is offered for informational purposes only. The content is not intended to substitute for professional medical advice, diagnoses, or suggested treatments. Please consult your dermatologist or doctor if you have any skin issues or concerns.</p>

        </div>

      </div>

      <div className='section-chat'>
        <div className='chat-text'>
          <div className='chat-title'>
            Have a question? Get personalized beauty tips and advice. Our Consultants are expertly equipped to guide you on your journey to great skin.
          </div>

          <div className='d-flex gap-3 mt-3'>
            <Button className='chat-button' onClick={() => navigate("/contact")}>
              Live Chat with an Expert
            </Button>

            <Button className='chat-button' onClick={() => navigate("/contact")}>
              In-Store Consultations
            </Button>

          </div>
        </div>
      </div>

      < Products />
    </div>
  )
}

export default Skinguide;
