import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Button, Form, Card } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";

const UpdateItem = () => {
    const { id } = useParams();
    const nav = useNavigate();

    const [updateItem, setUpdateItem] = useState({
        name: "",
        description: "",
        category: "",
        photo: "",
        price: "",
    });

    const [imageShow, setImageShow] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axios.get("http://localhost:5001/item/readOneItem/" + id);
                setUpdateItem(res.data);
                setImageShow(`http://localhost:5001/images/${res.data.photo}`);
            } catch (err) {
                console.error("Failed to fetch item:", err);
            }
        };
        getData();
    }, [id]);

    const handleChange = (e) => {
        setUpdateItem({ ...updateItem, [e.target.name]: e.target.value });
    };

    const handleImage = (e) => {
        setUpdateItem({ ...updateItem, photo: e.target.files[0] });
        setImageShow(URL.createObjectURL(e.target.files[0]));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", updateItem.name);
        formData.append("description", updateItem.description);
        formData.append("category", updateItem.category);
        if (updateItem.photo instanceof File) {
            formData.append("photo", updateItem.photo);
        }

        try {
            await axios.patch("http://localhost:5001/item/updateItem/" + id, formData);
            nav("/readAllItem");
        } catch (err) {
            console.error("Failed to update item:", err);
        }
    };

    return (
        <div style={{ paddingTop: "120px", minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
            <Container>
                <Row className="justify-content-center">
                    <Col xs={12} md={8}>
                        <Card className="shadow-sm p-4">
                            <h2 className="text-center mb-4">Update Item</h2>
                            <Form onSubmit={handleSubmit} encType="multipart/form-data">
                                <Form.Group className="mb-3" controlId="itemTitle">
                                    <Form.Label>Item Title</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={updateItem.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="itemCategory">
                                    <Form.Label>Category</Form.Label>
                                    <Form.Select
                                        name="category"
                                        value={updateItem.category}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Select Category</option>
                                        <option value="skin">Skin</option>
                                        <option value="sets">Sets</option>
                                        <option value="bestsellers">Bestsellers</option>
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="itemPhoto">
                                    <Form.Label>Item Photo</Form.Label>
                                    <Form.Control
                                        type="file"
                                        name="photo"
                                        accept="image/*"
                                        onChange={handleImage}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="itemDescription">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        name="description"
                                        value={updateItem.description}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="price"
                                        value={updateItem.price}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>


                                <Button type="submit" variant="warning" className="w-100">
                                    Update Item
                                </Button>
                            </Form>


                            {imageShow && (
                                <div className="text-center mt-4">
                                    <img
                                        src={imageShow}
                                        className="img-fluid rounded"
                                        alt="Preview"
                                        style={{ maxHeight: "300px", objectFit: "contain", borderRadius: "20px" }}
                                    />
                                </div>
                            )}
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default UpdateItem;
