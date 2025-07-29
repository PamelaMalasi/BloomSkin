import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext.jsx";
import { Container, ListGroup, Image, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import "./Cart.css"

const Cart = () => {
  const [purchase, setPurchase] = useState("");
  const { cart, removeFromCart, removeAllFromCart } = useContext(CartContext);

  useEffect(() => {
    console.log("🛒 Cart context:", cart);
  }, [cart]);

  const total = cart.reduce((sum, item) => {
    if (!item || typeof item !== "object") return sum;
    return sum + (item.price || 0);
  }, 0);

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:5001/cart", {
        items: cart.map((item) => ({
          itemId: item._id,
          quantity: 1,
        })),
      });

      console.log("Cart saved to MongoDB:", response.data);
      setPurchase("Purchase complete!");
      removeAllFromCart();
    } catch (err) {
      console.error("Failed:", err);
      setPurchase("Failed! Please try again.");
    }
  };

  return (
    <div style={{ paddingTop: "120px", background: "#f9f9f9", minHeight: "100vh" }}>
      <Container>
        <h1 className="text-center mb-5">Your Cart</h1>

        {purchase && (
          <div className="alert alert-success text-center mb-4">{purchase}</div>
        )}

        {Array.isArray(cart) && cart.length > 0 ? (
          <>
            <ListGroup className="mb-5">
              {cart.filter(Boolean).map((item, index) => (
                <ListGroup.Item key={index} className="py-4 px-3">
                  <Row className="align-items-center">
                    <Col xs={12} md={2} className="text-center mb-3 mb-md-0">
                      <Image
                        src={`http://localhost:5001/images/${item.photo}`}
                        alt={item.itemName}
                        fluid
                        rounded
                        style={{ maxHeight: "100px", objectFit: "contain" }}
                      />
                    </Col>
                    <Col xs={12} md={6}>
                      <h5 className="mb-1">{item.name}</h5>
                      <p className="text-muted mb-1">{item.itemDescription}</p>
                    </Col>
                    <Col xs={6} md={2} className="text-end">
                      <strong>${item.price?.toFixed(2) || "0.00"}</strong>
                    </Col>
                    <Col xs={6} md={2} className="text-end">
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => removeFromCart(index)}
                      >
                        Remove
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>

            <div className="text-center mb-5">
              <h4>Total: ${total.toFixed(2)}</h4>
              <Button
                className="mt-3 px-5 py-2 buy-button"
                onClick={handleSubmit}
              >
                Buy
              </Button>
            </div>
          </>
        ) : (
          <p className="text-center">Your cart is empty.</p>
        )}
      </Container>

    </div>
  );
};

export default Cart;
