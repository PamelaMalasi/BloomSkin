import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext"; 
import Products from "./Products";
import { CartContext } from "../context/CartContext"; 


const ReadOneItem = () => {
  const [item, setItem] = useState({});
  const [allItems, setAllItems] = useState([]);
  const { id } = useParams();
  const nav = useNavigate();
  const { userInfo } = useContext(UserContext); 
   const { addToCart } = useContext(CartContext);

  useEffect(() => {
    axios
      .get(`http://localhost:5001/item/readOneItem/${id}`)
      .then((res) => setItem(res.data))
      .catch((err) => console.log("Not read: " + err));

    axios
      .get("http://localhost:5001/item/readAllItem")
      .then((res) => {
        const others = res.data.filter((i) => i._id !== id).slice(0, 3);
        setAllItems(others);
      })
      .catch((err) => console.log("Suggestions error: " + err));
  }, [id]);

  const handleDelete = async () => {
    await axios
      .delete(`http://localhost:5001/item/deleteItem/${id}`)
      .then(() => nav("/readAllItem"))
      .catch((err) => console.log("Not deleted: " + err));
  };

 return (
  <div className="read-one">
    <Container className="py-5">
      <Row className="align-items-center g-5 mb-5">
        <Col md={6}>
          <div className="image-container text-center">
            <img
              src={`http://localhost:5001/images/${item.photo}`}
              alt={item.name}
              className="img-fluid rounded-4 shadow-sm"
              style={{ maxHeight: "450px", objectFit: "cover" }}
            />
          </div>
        </Col>

        <Col md={6}>
          <div className="item-info">
            <h2 className="fw-bold mb-3">{item.name}</h2>
            <h5 className="text-secondary mb-4">Category: <span className="fw-semibold">{item.category}</span></h5>
            <p className="text-muted" style={{ fontSize: "1.1rem", lineHeight: "1.6" }}>
              {item.description}
            </p>
            <p className="item-price fw-bold fs-5 mt-4">Price: ${item.price?.toFixed(2) || "0.00"}</p>
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
            {userInfo?.role === "admin" && (
              <div className="d-flex gap-3 mt-4">
                <Button variant="outline-warning" href={`/updateItem/${item._id}`}>
                  Update
                </Button>
                <Button variant="outline-danger" onClick={handleDelete}>
                  Delete
                </Button>
              </div>
            )}
          </div>
        </Col>
      </Row>

      {allItems.length > 0 && (
        <>
          <hr />
          <h4 className="mb-4">You may also like</h4>
          < Products/>
        </>
      )}
    </Container>
  </div>
);

};

export default ReadOneItem;
