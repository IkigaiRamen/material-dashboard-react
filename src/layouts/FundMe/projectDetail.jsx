import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Card, Row, Col, Form, Button, ProgressBar, Table } from "react-bootstrap";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import ideaImage from "./idea.jpg";
import paymentImage from "./methods.png";
import './detail.css'

const ProjectIdeaDetailComponent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [projectIdea, setProjectIdea] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentAmountRaised, setCurrentAmountRaised] = useState(0);
  const [topDonations, setTopDonations] = useState([]);

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userInfo.token}`,
    },
  };

  const fetchProjectIdea = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/fundMe/projects/${id}`);
      setProjectIdea(data);
      setCurrentAmountRaised(data.currentAmountRaised);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const fetchTopDonations = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/fundMe/topDonations/${id}`);
      setTopDonations(data);
      console.log(data)
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchProjectIdea();
    fetchTopDonations();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    const donor = userInfo;
    console.log(donor);
    try {
      const { data } = await axios.post(`http://localhost:5000/api/fundMe/createDonation/${id}`, {
        amount,
        donor,
        projectIdea: projectIdea._id,
      }, config);
      console.log(data); // or do something else with the response

      setAmount("");
      navigate("/fundMe/project-ideas");
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
    <Container fluid style={{ marginTop: "100px" }}>
    <h1>You can donate to this project idea. Remember that every donation counts!</h1>
    {loading && <p>Loading project idea...</p>}
    {error && <p>{error}</p>}
    {!loading && !error && projectIdea && (
  <MDBox display="flex">
  <MDBox mr={6}>
      <MDBox className="project-idea-img-container" mb={4}>
          <img src={ideaImage} alt="Project Idea Image" className="project-idea-image" />
      </MDBox>
      <MDBox className="project-idea-details">
          <MDTypography variant="h4">{projectIdea.title}</MDTypography>
          <MDTypography variant="body1">{projectIdea.description}</MDTypography>
          <MDBox className="project-idea-stats" mt={4}>
              <MDTypography variant="body1">Funding Goal: {projectIdea.fundingGoal}</MDTypography>
              <MDTypography variant="body1">
                  Current Amount Raised: ${currentAmountRaised} out of {projectIdea.fundingGoal}
              </MDTypography>
              <ProgressBar
                  now={projectIdea.currentAmountRaised}
                  max={projectIdea.fundingGoal}
                  label={`$${projectIdea.currentAmountRaised}`}
              />
          </MDBox>
          <MDBox className="top-donations" mt={4}>
              <MDTypography variant="h5">Top 5 Donations:</MDTypography>
              <MDBox className="table-responsive">
                  <table className="table table-striped">
                      <thead>
                          <tr>
                              <th>Amount</th>
                          </tr>
                      </thead>
                      <tbody>
                          {topDonations.slice(0, 5).map((donation) => (
                              <tr key={donation._id}>
                                  <td>${donation.amount}</td>
                              </tr>
                          ))}
                      </tbody>
                  </table>
              </MDBox>
          </MDBox>
      </MDBox>
  </MDBox>
  <MDBox flex={1}>
      <MDBox className="donation-form-container" mb={4}>
          <form onSubmit={submitHandler}>
              <MDBox mb={3}>
                  <MDTypography variant="h5">Donate</MDTypography>
              </MDBox>
              <MDBox mb={3}>
                  <MDInput
                      label="Amount"
                      type="number"
                      placeholder="Enter amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                  />
              </MDBox>
              <MDBox>
              <MDButton variant="contained" color="primary" type="submit">
            Donate
          </MDButton>
              </MDBox>
          </form>
      </MDBox>
      <MDBox className="payment_image-container">
          <img className="payment_image" src={paymentImage} alt="Project Idea Image" />
      </MDBox>
  </MDBox>
</MDBox>
)}

    
  </Container>
  
  </DashboardLayout>


  );
};

export default ProjectIdeaDetailComponent;
