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
import { CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';


const MyProducts = () => {
  const [myProducts, setMyProducts] = useState([]);
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
      const updatedProducts = myProducts.filter((product) => product._id !== productId);
      setMyProducts(updatedProducts);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DashboardLayout>
    <DashboardNavbar />
    <Col sm={12} md={6} lg={4}>
      <Container className="my-3 p-3 bg-light" style={{ marginTop: "200px" }}>
        <h3>My Projects</h3>
        <Link to="/uploadformproduct">
          <MDButton variant="contained" color="secondary" type="submit" className="submit-btn">
            Add New Product
          </MDButton>
        </Link>
        <Container>
          {myProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product._id}>
            <Card elevation={3}>
              <CardMedia component="img" src={product.image} />
              <CardContent>
                <Typography variant="h5" component="h2">
                  {product.name}
                </Typography>
                <Typography variant="body2" component="p">
                  {product.description}
                </Typography>
                <Typography variant="body2" component="p">
                  Current Price: ${product.currentPrice}
                </Typography>
              </CardContent>
              <CardActions>
                <Link to={`/detailproduct/${product._id}`}>
                  <MDButton variant="contained" color="info" type="submit" className="submit-btn">
                    Details
                  </MDButton>
                </Link>
                <Link to={`/updateformproduct/${product._id}`}>
                  <MDButton variant="contained" color="success" type="submit" className="submit-btn">
                    Update Project
                  </MDButton>
                </Link>
                <MDButton
                  variant="contained"
                  color="error"
                  type="submit"
                  className="submit-btn"
                  onClick={() => handleDeleteProduct(product._id)}
                >
                  Delete
                </MDButton>
              </CardActions>
            </Card>
            </Grid>
          ))}
          
        </Container>
      </Container>
    </Col>
  </DashboardLayout>
  
  );
};

export default MyProducts;
