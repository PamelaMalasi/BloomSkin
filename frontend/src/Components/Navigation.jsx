import React, { useState, useContext, useEffect } from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import "./Navigation.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import logo from '../images/blogo5.png';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';
import axios from 'axios';
import { CartContext } from "../context/CartContext"; 



const Navigation = () => {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [showMenu, setMenu] = useState(false);
  const { cart } = useContext(CartContext);


  //logged-in user info 
  useEffect(() => {
    axios.get('http://localhost:5001/user/', {
      withCredentials: true,
    })
      .then(res => {
        setUserInfo(res.data);
      })
      .catch(err => {
        console.error('Error fetching user data:', err);
      });
  }, []);


  //logout 
  const handleLogout = () => {
    axios.post('http://localhost:5001/user/logout', null, { withCredentials: true })
      .then(() => {
        setUserInfo({});
        navigate('/login');
      })
      .catch(error => {
        console.error('Error logging out:', error);
      });
  };

  return (
    <div className="navigation-wrapper container">

      <div className="logo-bar">
        <div className="logo-container">

          <Nav.Link as={Link} to="/" className="nav-text">
            <img src={logo} alt="BloomSkin Logo" className="logo" />
          </Nav.Link>
        </div>
        <ul className="top-items">
          {userInfo.email ? (
            <li onClick={handleLogout} style={{ cursor: "pointer" }}>
              Logout ({userInfo.username || userInfo.email})
            </li>
          ) : (
            <li>
              <Link to="/login" className="nav-link">Sign In</Link>
            </li>
          )}

          <li>
            <Link to="/cart" className="nav-link position-relative">
              <FontAwesomeIcon icon={faShoppingCart} />
              {cart.length > 0 && (
                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                  style={{ fontSize: "0.7rem" }}
                >
                  {cart.length}
                </span>
              )}
            </Link>
          </li>

        </ul>

      </div>

      <Navbar expand="lg" collapseOnSelect className="sticky-top mt-3 navbar-border fw-bold navhome1">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="w-100 d-flex justify-content-between">

              {/* SHOP menu */}
              <div
                className="nav-hover-area"
                onMouseEnter={() => setMenu(true)}
                onMouseLeave={() => setMenu(false)}
              >
                <Nav.Link as={Link} to="/readAllItem" className="nav-text">Shop</Nav.Link>
                {showMenu && (
                  <div className="mega-dropdown">
                    <div className="column">
                      <Nav.Link as={Link} to="/readAllItem?category=all" className="nav-text">Shop All</Nav.Link>
                    </div>
                    <div className="column">
                      <Nav.Link as={Link} to="/readAllItem?category=bestsellers" className="nav-text">Bestsellers</Nav.Link>
                    </div>
                    <div className="column">
                      <Nav.Link as={Link} to="/readAllItem?category=skin" className="nav-text">Skin</Nav.Link>
                    </div>
                    <div className="column">
                      <Nav.Link as={Link} to="/readAllItem?category=sets" className="nav-text">Sets</Nav.Link>
                    </div>
                  </div>
                )}
              </div>



              {userInfo.role === "admin" && (
                <Nav.Link as={Link} to="/createItem" className="nav-text">
                  Create Item
                </Nav.Link>
              )}

              {userInfo.role === "admin" && (
                <Nav.Link as={Link} to="/uploadInfluencer" className="nav-text">
                  Upload Influencer Photo
                </Nav.Link>
              )}


              <Nav.Link as={Link} to="/skinguide" className="nav-text">Skin Care Guide</Nav.Link>
              <Nav.Link as={Link} to="/about" className="nav-text">About</Nav.Link>
              <Nav.Link as={Link} to="/contact" className="nav-text">Contact</Nav.Link>

          
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Navigation;
