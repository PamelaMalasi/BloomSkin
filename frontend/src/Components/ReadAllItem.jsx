import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { UserContext } from "./UserContext";
import { useLocation } from "react-router-dom";
import "./ReadAllItem.css";

const items = [
  { id: 1, name: "Serum", category: "bestsellers" },
  { id: 2, name: "Hand Cream", category: "skin" },
  { id: 3, name: "Holiday Set", category: "sets" },
];

const ReadAllItem = () => {

    const [addedItem, setAddedItem] = useState({});
    const [allItem, setItem] = useState([]);
    const { addToCart } = useContext(CartContext);
    const { userInfo } = useContext(UserContext);
    const location = useLocation();                        
    const params = new URLSearchParams(location.search);  
    const categoryFromURL = params.get("category") || "all";  
    const [selectedCategory, setSelectedCategory] = useState(categoryFromURL); 


    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get("http://localhost:5001/item/readAllItem")
            .then((res) => setItem(res.data))
            .catch((err) => console.log("Not Show " + err));
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            try {
                await axios.delete(`http://localhost:5001/item/deleteItem/${id}`);
                setItem((prev) => prev.filter((item) => item._id !== id));
            } catch (err) {
                console.error("Delete failed", err);
            }
        }
    };

    const filteredItems = items
    .filter(item => selectedCategory === "all" || item.category === selectedCategory)
    .map(item => (
      <div key={item.id}>{item.name}</div>
    ));



    useEffect(() => {
  const updatedCategory = new URLSearchParams(location.search).get("category") || "all";
  setSelectedCategory(updatedCategory);
}, [location.search]);



    return (
        <div className="shop container">



            <div className="text-center mb-5">
                {["all", "skin", "sets", "bestsellers"].map((cat) => (
                    <Button
                        key={cat}
                        variant={selectedCategory === cat ? "dark" : "outline-dark"}
                        className="mx-2 px-4 py-2 rounded-pill text-capitalize"
                       onClick={() => navigate(`?category=${cat}`)}
                    >
                        {cat}
                    </Button>
                ))}
            </div>

            <Row className="g-4">
                {allItem
                    .filter((item) =>
                        selectedCategory === "all" ? true : item.category === selectedCategory
                    )
                    .map((item) => (
                        <Col xs={12} sm={6} lg={4} key={item._id}>
                            <Link to={`/readOneItem/${item._id}`} className="text-decoration-none text-reset">
                                <Card className="h-100 border-0 shadow-sm rounded-4 custom-card">
                                    <Card.Img
                                        variant="top"
                                        src={`http://localhost:5001/images/${item.photo}`}
                                        className="rounded-top-4"
                                        style={{ height: "300px", objectFit: "cover" }}
                                    />
                                    <Card.Body className="d-flex flex-column justify-content-between bodycolor">
                                        <div>
                                            <Card.Title className="fw-bold text-dark">
                                                {item.name}
                                            </Card.Title>
                                            <Card.Text className="text-muted small">
                                                {item.description}
                                            </Card.Text>

                                            <Card.Text className="fw-bold">
                                                ${item.price?.toFixed(2) || "0.00"}
                                            </Card.Text>
                                        </div>

                                        <div className="mt-3 d-grid gap-2">
                                            {userInfo?.role === "admin" && (
                                                <>
                                                    <Button variant="outline-warning" as={Link} to={`/updateItem/${item._id}`} onClick={(e) => e.stopPropagation()}>
                                                        Edit
                                                    </Button>
                                                    <Button variant="outline-danger" onClick={(e) => { e.stopPropagation(); handleDelete(item._id); }}>
                                                        Delete
                                                    </Button>
                                                </>
                                            )}

                                            <Button
                                                className="add-button"
                                                onClick={(e) => {
                                                    e.preventDefault(); 
                                                    addToCart(item);
                                                }}
                                            >
                                                Add to Cart
                                            </Button>

                                            {addedItem[item._id] && (
                                                <div className="alert alert-info text-center p-2 m-0">
                                                    {addedItem[item._id]}
                                                </div>
                                            )}
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Link>
                        </Col>

                    ))}
            </Row>

        </div>
    );
};

export default ReadAllItem;
