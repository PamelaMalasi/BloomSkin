import React, { useState } from 'react';
import './About.css'
import { Button, Container, Card } from 'react-bootstrap';
import "react-multi-carousel/lib/styles.css";
import ing1 from '../images/ing-1.png';
import ing2 from '../images/ing-2.png';
import ing3 from '../images/ing-3.png';
import ing4 from '../images/ing-4.png';
import ing5 from '../images/ing-5.png';
import Carousel from "react-multi-carousel";
import "./Products.css";
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { useNavigate } from "react-router-dom";

const MultiCarousel = Carousel;
const About = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState('values');

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 992 },
      items: 4,
      partialVisibilityGutter: 0,
    },
    tablet: {
      breakpoint: { max: 992, min: 768 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 768, min: 0 },
      items: 1,
    },
  }
  return (
    <>

      <div className="container">

        <div className="section-about-background">
          <div className="section5-text">
            <div className="title-about">
              Show Love To Your Skin
            </div>
            <Button className="section5-button" onClick={() => navigate("/readAllItem")}>Shop BloomSkin</Button>
          </div>
        </div>


        <div className="section4">
          <div className="section4-1">
            <h1>
              Long-lasting results
            </h1>
            <p className="section4-p">Refreshing facial mist designed to hydrate, soothe, and instantly revive dull skin. Infused with botanical extracts, it leaves your skin dewy, balanced, and radiant—perfect for a midday glow-up or post-skincare boost.</p>
          </div>

          <div className="section4-2"></div>
        </div>

        

        <Container className="my-5 ingredients">
          <div className='ingredients-title'>
            Powered by Nature & Science
            <p className='p-about'>Packed with skin-loving ingredients like hyaluronic acid, chamomile, and niacinamide to hydrate, calm, and brighten.</p>
          </div>
          <MultiCarousel responsive={responsive} autoPlay={true} infinite={true} arrows={true}>
            <Card className="mx-2 ingredient-card">
              <Card.Img variant="top" src={ing1} className="carousel-card-img" />
              <Card.Body>
                <Card.Title style={{ textAlign: 'center', fontWeight: 'bold' }}>Hyualuronic Acid</Card.Title>
              </Card.Body>
            </Card>

            <Card className="mx-2 ingredient-card">
              <Card.Img variant="top" src={ing2} className="carousel-card-img" />
              <Card.Body>
                <Card.Title style={{ textAlign: 'center', fontWeight: 'bold' }}>Glycerin </Card.Title>
              </Card.Body>
            </Card>

            <Card className="mx-2 ingredient-card">
              <Card.Img variant="top" src={ing3} className="carousel-card-img" />
              <Card.Body>
                <Card.Title style={{ textAlign: 'center', fontWeight: 'bold' }}>Aloe Vera</Card.Title>
              </Card.Body>
            </Card>
            <Card className="mx-2 ingredient-card">
              <Card.Img variant="top" src={ing4} className="carousel-card-img" />
              <Card.Body>
                <Card.Title style={{ textAlign: 'center', fontWeight: 'bold'}}>Niacinamide</Card.Title>
              </Card.Body>
            </Card>
            <Card className="mx-2 ingredient-card">
              <Card.Img variant="top" src={ing5} className="carousel-card-img" />
              <Card.Body>
                <Card.Title style={{ textAlign: 'center', fontWeight: 'bold' }}>Salicylic Acid </Card.Title>
              </Card.Body>
            </Card>

          </MultiCarousel>
        </Container>

        <div className="section4">
          <div className="section4-2-points"></div>
          <div className="section4-1-points">
            <Tabs activeKey={active} onSelect={setActive} mountOnEnter className="about-points">
              <Tab eventKey="values" title="Values">
                <p>
                  At BloomSkin, we believe skincare should be gentle, honest, and inclusive. Every product is crafted with care to nurture all skin types — no compromise, just love.
                </p>
              </Tab>

              <Tab eventKey="science" title="Science" className="about-points">
                <p>
                  Powered by proven ingredients and backed by dermatology, our formulas blend nature and science to bring visible, lasting glow to your skin.
                </p>
              </Tab>

              <Tab eventKey="footprint" title="Footprint" className="about-points">
                <p>
                  From sustainable packaging to cruelty-free testing, we're committed to reducing our impact while amplifying care — for your skin and the planet.
                </p>
              </Tab>

            </Tabs>
          </div>


        </div>

      </div>
    </>
  )
}

export default About; 
