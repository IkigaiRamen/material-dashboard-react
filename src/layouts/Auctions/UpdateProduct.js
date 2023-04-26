import { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link } from 'react-router-dom';
import {useParams} from 'react-router-dom';
import axios from "axios";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

function UpdateProduct() {
  const {id} = useParams()

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  
  const [startingPrice, setStartingPrice] = useState(0);
 
  const [biddingEndTime, setBiddingEndTime] = useState("");
  const [errorMessage, setErrorMessage] = useState('');
  
  

  const handleSubmit = (event) => {
    event.preventDefault();

    const updateproductData = {
      name: name,
      description: description,
      startingPrice: startingPrice,
    };

    axios.put(`http://localhost:5000/api/products/${id}`, updateproductData 
      )
      .then(response => {
        alert('Product updated successfully!');
      })
      .catch(error => {
        console.error(error);
        alert("Failed to update product.");
      });
    }
  return (
    <Container style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
    <h2 style={{ textAlign: 'center', marginTop: '100px' }}>
      Update your project idea and let others fund it!
    </h2>
    <Form onSubmit={handleSubmit} className="update-form">

      <Row>
        <Col md={6}>
          <Form.Group controlId='name'>
            <MDInput>
              Name <span style={{ color: 'red' }}>*</span>
            </MDInput>
            <Form.Control
              type='text'
              placeholder='Enter name'
              value={name}
              required
              onChange={(event) => setName(event.target.value)}
            />
          </Form.Group>
          <Form.Group controlId='description'>
            <MDInput>
              Description <span style={{ color: 'red' }}>*</span>
            </MDInput>
            <Form.Control
              as='textarea'
              rows={3}
              type='description'
              placeholder='Enter description'
              value={description}
              required
              onChange={(event) => setDescription(event.target.value)}
            />
          </Form.Group>
          <Form.Group controlId='amount'>
            <MDInput>
            Starting Price <span style={{ color: 'red' }}>*</span>
            </MDInput>
            <Form.Control
              type='number'
              placeholder='Enter starting Price'
              value={startingPrice}
              required
              onChange={(event) => setStartingPrice(event.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="productBiddingEndTime">
          <MDInput>Bidding End Time</MDInput>
          <Form.Control
            type="datetime-local"
            placeholder="Enter bidding end time"
            value={biddingEndTime}
            onChange={(event) => setBiddingEndTime(event.target.value)}
          />
        </Form.Group>
          <MDButton variant='success' type='submit' className="submit-btn">
            Update Product
          </MDButton>
          <Link to={`/auctionList/`}>
          <MDButton variant='success' type='submit' className="submit-btn">
            Back to List 
          </MDButton>
          </Link>
        </Col>
      </Row>
    </Form>
  </Container>
  );
}

export default UpdateProduct;        
