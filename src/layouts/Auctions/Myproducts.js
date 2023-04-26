import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Col,
  Card,
  Button,
  ProgressBar,
} from 'react-bootstrap';
import MDButton from 'components/MDButton';


const MyProducts = () => {
  const [myproducts, setMyProducts] = useState([]);
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userInfo.token}`,
    },
  };
  const fetchMyProducts = async () => {
    const { data } = await axios.get(`http://localhost:5000/api/products/`, myproducts, config);
    setMyProducts(data);
  };

  useEffect(() => {
    fetchMyProducts();
  }, []);

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${productId}`);
      const updatedProducts = myproducts.filter((product) => product._id !== productId);
      setMyProducts(updatedProducts);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Col sm={12} md={6} lg={4}>
      <Container className="my-3 p-3 bg-light" style={{ marginTop: "200px" }}>
        <h3>My Projects</h3>
        <Link to="/uploadformproduct">
          <Button variant="primary" className="my-3">
            Add New Product
          </Button>
        </Link>
        <Container>
          {myproducts.map((product) => (
            <Card key={product._id} className="mb-4 p-3">
              <Card.Img variant="top" src={product.image} />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
                <Card.Text>
                  Current Price: ${product.currentPrice}
                </Card.Text>
                <Link to={`/project_detail/${product._id}`}>
                  <MDButton variant="primary">View Details</MDButton>
                </Link>
                <Link to={`/updateformproduct/${product._id}`}>
                  <MDButton variant="success">
                    Update Project
                  </MDButton>
                </Link>
                <MDButton variant="danger" onClick={() => handleDeleteProduct(product._id)}>Delete</MDButton>
              </Card.Body>
            </Card>
          ))}
        </Container>
      </Container>
    </Col>
  );
};

export default MyProducts;