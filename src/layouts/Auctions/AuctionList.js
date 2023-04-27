import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import axios from "axios";
import { Card, Button } from "antd";
import { HeartOutlined } from "@ant-design/icons";
import { io } from "socket.io-client";
import { BrowserRouter as Router, Route, useParams } from "react-router-dom";

import { Link } from 'react-router-dom';
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Card1 from "@mui/material/Card";

const { Meta } = Card;
const socket = io("ws://localhost:5000");

function AuctionList() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [biddingAmount, setBiddingAmount] = useState(0);
  const [winner, setWinner] = useState(null);
  const [isTimeLeft, setIsTimeLeft] = useState(false);
  const [timeleft, setTimeleft] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const userInfo = localStorage.getItem('userInfo');
  const [topBids,setTopBids]=useState([]);

 


  const handleClick = () => {
    setShowDetails(true);
  };

  const countdown = (productId, endDate) => {
    const date1 = new Date(endDate);
    const date2 = Date.now();

    const diffInMs = date1 - date2;

    console.log(diffInMs, "diff");
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMinutes / 60);
    const remainingMinutes = diffInMinutes % 60;

    const diffString = `${diffInHours} hours, ${remainingMinutes} minutes`;
    setTimeleft(diffString);
    if (date1 == date2 || date1 < date2) setIsTimeLeft(true);
    console.log(diffString);
  };
  useEffect(() => {
    let timer;
    if (currentProduct) {
      const { biddingEndTime } = currentProduct;
      countdown(currentProduct._id, biddingEndTime);

      // Update the time left every second
      timer = setInterval(
        () => countdown(currentProduct._id, biddingEndTime),
        1000
      );
    }
    return () => clearInterval(timer);
  }, [currentProduct]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products/").then((response) => {
      setProducts(response.data);
    });
  }, []);
  console.log(userInfo);


useEffect(()=>{
  fetchTopBids();
},[])


  const fetchTopBids = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/products/topBidders/${id}`);
      setTopBids(data);
      console.log(data)
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleProductSelect = (product) => {
    setCurrentProduct(product);
    setWinner(null);
    console.log(product);
  };

  const handleBiddingAmountChange = (event) => {
    setBiddingAmount(Number(event.target.value));
  };

  const handleBidSubmit = () => {
    socket.emit("bid", {
      productId: currentProduct._id,
      userId: userInfo, // Replace with the actual user ID
      amount: biddingAmount,
    });
    socket.on("newBid", ({ productId, user, amount }) => {
      let productToBid = currentProduct;
      productToBid.bids.push({ user, amount });
      setCurrentProduct(productToBid);
    });
    setBiddingAmount(0);
  };

  const handleEndBidding = () => {
    socket.emit("endBidding", currentProduct._id);
  };

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/products`);
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };
const handleDelete = async (id) => {
  try {
    const { data } = await axios.delete(`http://localhost:5000/api/products/${id}`);
    console.log("Product Deleted!")
    fetchProducts();
  } catch (error) {
    console.log(error);
  
  }
};


return (
  <DashboardLayout>
    <DashboardNavbar/>
    <Card1>
  <Container class="bg-image">
    <Container maxWidth="sm"></Container>
    <Link to={`/uploadformproduct`}>
                    <MDButton variant="contained"
                   color="info" type='submit' className="submit-btn" >Add Product</MDButton>
                  </Link>
                  <Link to={`/myproducts`}>
                    <MDButton variant="contained"
                   color="primary" type='submit' className="submit-btn" >My Products</MDButton>
                  </Link>
    <Row gutter={[16, 16]}>
      {products.map((product) => (
        <Col span={12} md={6} lg={4} key={product._id}>
          <Card
            hoverable
            cover={
              <img
                alt={product.name}
                src={`../..${product.imageUrl}`}
                style={{ height: 250 }}
              />
            }
            actions={[]}
          >
            <div>
              
            
            <Link to={`/detailproduct/${product._id}`}>
                    <MDButton variant="contained"
                   color="info" type='submit' className="submit-btn" >Details</MDButton>
                  </Link>
            {product.id !== userInfo && (
            <div>
                  <Link to={`/updateformproduct/${product._id}`}>
                    <MDButton variant="contained"
                   color="success" type='submit' className="submit-btn" >Update</MDButton>
                  </Link>
                  <MDButton variant="contained"
                   color="error" type='submit' className="submit-btn" onClick={() => handleDelete(product._id)}>
                    Delete
                  </MDButton>
                </div>
            )}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Meta
                title={product.name}
                description={`${product.description} - ${product.currentPrice}`}
                style={{ height: 100, overflow: "hidden" }}
              />
              <MDButton
                type="text"
                onClick={handleClick}
                icon={<HeartOutlined />}
              />
            </div>
            <div
              style={{
                backgroundColor: "#01182c14",
                height: 53,
                flexDirection: "row",
                justifyContent: "space-between",
                display: "flex",
              }}
            >
              <div
                style={{
                  height: 53,
                  width: 60,
                  fontSize: 14,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                <div style={{ marginTop: 17 }}>BID</div>
                <div className={"auction-anchor"}></div>
              </div>
              <div style={{ marginRight: 10 }}>
                <div
                  style={{ fontSize: 14, fontWeight: "bold", color: "#555" }}
                >
                  Current Bid
                </div>
                <div
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    textAlign: "right",
                  }}
                >
                  ${product.currentPrice}
                </div>
              </div>
            </div>
            <MDButton variant="contained"
                   color="dark" type='submit' size="medium" className="submit-btn" onClick={() => handleProductSelect(product)}>
              Select
            </MDButton>
          </Card>
        </Col>
      ))}
    </Row>

    {currentProduct && (
      <div>
        <h2>{currentProduct.name}</h2>
        <p>Current price: {currentProduct.currentPrice}</p>

        <p>Time left: {isTimeLeft ? "Auction has ended" : timeleft}</p>
        {/* Display the remaining time left */}
        <h3>Bids</h3>
        <ul>
          {currentProduct.bids.map((bid, index) => (
            <li key={index}>
              {bid.user} - {bid.amount}
            </li>
          ))}
        </ul>
        {currentProduct &&
        currentProduct._id === userInfo ? null : (
          <div>
            <MDInput
              type="number"
              placeholder="Enter your bid amount"
              value={biddingAmount}
              onChange={handleBiddingAmountChange}
            />
            <MDButton type="primary" onClick={handleBidSubmit}>
              Submit Bid
            </MDButton>
          </div>
        )}

        {/* <MDButton onClick={handleEndBidding}>End bidding</MDButton> */}
      </div>
    )}
    {winner && (
      <div>
        <h2>Congratulations!</h2>
        <p>You won the bidding for {winner.productId}!</p>
      </div>
    )}
  </Container>
  </Card1>
  </DashboardLayout>
);
}

export default AuctionList;
