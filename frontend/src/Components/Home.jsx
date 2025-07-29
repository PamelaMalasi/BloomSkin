import React, { useState } from "react";
import { Button, Container, Card } from 'react-bootstrap';
import "react-multi-carousel/lib/styles.css";
import imghome from '../images/bhome28.png';
import "./Home.css";
import Products from "./Products";
import Section7 from "./Sectionse";
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import img1 from '../images/bhomes.png';
import { useNavigate } from "react-router-dom";



const Home = () => {
    const [active, setActive] = useState('values');
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const navigate = useNavigate();

    // const handleMouse = (e) => {
    //     const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    //     const x = ((e.clientX - left) / width - 0.5) * 20;
    //     const y = ((e.clientY - top) / width - 0.5) * 20;
    //     setPosition({ x, y });
    // };

    // const handleMouseLeave = () => {
    //     setPosition({ x: 0, y: 0 });
    // }
    return (
        <>
            <div className="container">
                <div className="section1-background">
                    <div className="left-div home-text text-center">
                        <p className="tagline">NEW ✦ with SPF +30</p>
                        <h2 className="subhead">Moisture Surge</h2>
                        <p className="new-text">Introducing our newest skin obsession — lightweight, deeply hydrating, and designed for glow.</p>


                    </div>

                    <div className="right-div">
                        <img
                            src={img1}
                            alt="Product"
                            className="mobile-product-img"
                        />
                    </div>
                </div>
                <div className="products-section-wrapper">
                    <Products />
                </div>



                {/* SECTION 4 */}
                <div className="section4-mist">
                    <div className="section4-1-mist">
                        <h1>
                            Glow Bloom Mist
                        </h1>
                        <p className="section4-p-mist">Refreshing facial mist designed to hydrate, soothe, and instantly revive dull skin. Infused with botanical extracts, it leaves your skin dewy, balanced, and radiant—perfect for a midday glow-up or post-skincare boost.</p>

                        <h3 className="section4-comingsoon">Cooming Soon</h3>
                    </div>

                    <div className="section4-2"></div>
                </div>



                {/* SECTION 5 */}
                <div className="section5">

                    <div className="sfive-text">
                        Show Love To Your Skin
                        <Button className="sfive-button" onClick={() => navigate("/readAllItem")}>Shop BloomSkin</Button>
                    </div>

                </div>



                <div className="section4-mission">
                    <div className="section4-2-mission"></div>
                    <div className="section4-1-mission">
                        <Tabs activeKey={active} onSelect={setActive} mountOnEnter className="about-mission">
                            <Tab eventKey="values" title="Values">
                                <p>
                                    At BloomSkin, we believe skincare should be gentle, honest, and inclusive. Every product is crafted with care to nurture all skin types — no compromise, just love.
                                </p>
                            </Tab>

                            <Tab eventKey="science" title="Science" className="about-mission">
                                <p>
                                    Powered by proven ingredients and backed by dermatology, our formulas blend nature and science to bring visible, lasting glow to your skin.
                                </p>
                            </Tab>

                            <Tab eventKey="footprint" title="Footprint" className="about-mission">
                                <p>
                                    From sustainable packaging to cruelty-free testing, we're committed to reducing our impact while amplifying care — for your skin and the planet.
                                </p>
                            </Tab>

                        </Tabs>
                    </div>



                </div>




                < Section7 />

            </div >


        </>
    );
}

export default Home;
