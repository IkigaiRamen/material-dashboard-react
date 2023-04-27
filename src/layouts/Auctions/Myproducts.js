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
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';


const MyProducts = () => {
  const [myproducts, setMyProducts] = useState([]);
  const [userInfo, setUserInfo] = useState("");
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userInfo.token}`,
    },
  };

  const fetchMyProducts = async () => {
    try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (userInfo) {
          setUserInfo(userInfo);
        }
    const { data } = await axios.get(`http://localhost:5000/api/products/myproducts/${userInfo._id}`, config);
    setMyProducts(data);
} catch (error) {
    console.error(error);
  }
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
    <DashboardLayout>
    <DashboardNavbar/>
    <Col sm={12} md={6} lg={4}>
      <Container className="my-3 p-3 bg-light" style={{ marginTop: "200px" }}>
        <h3>My Projects</h3>
        <Link to="/uploadformproduct">
          <MDButton variant="contained"
                   color="secondary" type='submit' className="submit-btn">
            Add New Product
          </MDButton>
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
                <Link to={`/detailproduct/${product._id}`}>
                    <MDButton variant="contained"
                   color="info" type='submit' className="submit-btn" >Details</MDButton>
                  </Link>
                  
                <Link to={`/updateformproduct/${product._id}`}>
                  <MDButton variant="contained"
                   color="success" type='submit' className="submit-btn">
                    Update Project
                  </MDButton>
                </Link>
                
                  <MDButton variant="contained"
                  color="error" type='submit' className="submit-btn" onClick={() => handleDeleteProduct(product._id)}>Delete</MDButton>
               
              </Card.Body>
            </Card>
            
          ))}
          
          {/* </div> */}
        </Container>
      </Container>
    </Col>
    </DashboardLayout>
  );
};

export default MyProducts;
