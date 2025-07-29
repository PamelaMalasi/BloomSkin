import React, { useEffect, useState, useContext } from "react";
import { Container, Card, Button } from "react-bootstrap";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import axios from "axios";
import "./Products.css";
import { CartContext } from "../context/CartContext"; 
import { UserContext } from "./UserContext";

const MultiCarousel = Carousel;

const Products = () => {
  const [items, setItems] = useState([]);
  const { addToCart } = useContext(CartContext); 

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 992 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 992, min: 768 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 768, min: 0 },
      items: 1,
    },
  };

  useEffect(() => {
    axios
      .get("http://localhost:5001/item/readAllItem")
      .then((res) => {
        console.log("All items:", res.data);
        setItems(res.data);
      })
      .catch((err) => console.error("Failed to load products:", err));
  }, []);

  return (
    <Container className="products-section">
      <MultiCarousel responsive={responsive} autoPlay={true} infinite={true} arrows={true}>
        {items.map((item) => (
          <Card key={item._id} className="product-card">
            <Card.Img
              variant="top"
              src={`http://localhost:5001/images/${item.photo}`}
              className="product-img"
            />
            <Card.Body className="text-center">
              <Card.Title className="product-title">{item.name}</Card.Title>
              <span className="product-price fw-bold">
                ${item.price?.toFixed(2) || "0.00"}
              </span>
              <div className="d-flex justify-content-center">
                <Button
                  className="add-button  w-50"
                  onClick={(e) => {
                    e.preventDefault();
                    addToCart(item);
                  }}
                >
                  Add to Cart
                </Button>
              </div>
            </Card.Body>
          </Card>
        ))}
      </MultiCarousel>
    </Container>
  );
};

export default Products;
