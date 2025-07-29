import React, {useState} from 'react';
import { Button, Form } from 'react-bootstrap';
import './Contact.css'
import axios from "axios";

const Contact = () => {
    const[message, setMessage] = useState("");

    const [newCont, setNewCont] = useState({
        name: "", 
        email: "",
        comment: "",
    });

    const handleChange = (e) => {
        setNewCont({...newCont, [e.target.name]: e.target.value})
    };

    const handleSubmit = async(e) => {
        e.preventDefault(); 
        console.log("Submitting:", newCont);

        await axios 
        .post("http://localhost:5001/contact/createContact", newCont)
        .then((res) => {
            console.log(" Success:", res.data); 
            setMessage("Thank you! Message sent!");
            setNewCont({
                name: "",
                email: "",
                comment: "",
            }); 
        })
            .catch((err) => {
                console.log("Error:", err.response?.data || err.message);
                setMessage("Something went wrong.Please try again."); 
            }); 
        
    };  
    return (
        <div className='container'>

            <div className="section-contact">

                <div className="text-contact">
                    <div className="title">
                        Contact Us
                    </div>
                    <p><span style={{fontWeight: 'bold'}}>Need Help? </span>
                        We're here for you — whether you have questions about your order, our products, or just want to share your thoughts.

                        Our BloomSkin support team is available via email Monday to Friday, 9 AM – 5 PM (excluding holidays). We’ll get back to you within 2 business days.

                    </p>
                </div>

                <Form className='form-section' onSubmit={handleSubmit}>

                    <Form.Group className="mb-3 form-group-custom" controlId="name">

                        <Form.Control type="text" placeholder="First and last name*" name= "name" value={newCont.name}
                      onChange={handleChange} required/>
                    </Form.Group>

                    <Form.Group className="mb-3 form-group-custom" controlId="email">

                        <Form.Control type="email" placeholder="Enter email" name="email" value={newCont.email}
                      onChange={handleChange} required/>

                    </Form.Group>

                    <Form.Group className="mb-3 form-group-custom" controlId="comment">

                        <Form.Control as="textarea" rows={3} placeholder="Tell us the details*" name="comment" value={newCont.comment}
                      onChange={handleChange} required/>

                    </Form.Group>


                    <Button type="submit" className="button-contact">
                        Submit
                    </Button>
                </Form>
            </div>
        </div>

    )
}

export default Contact; 
