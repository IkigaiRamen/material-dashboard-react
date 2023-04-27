import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
// import './projectIdeas.css';
import { Link } from 'react-router-dom';
import ideaImage from "./idea.jpg";
import './projectIdeas.css'
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAlert from 'components/MDAlert';
import MDButton from 'components/MDButton';
import Divider from "@mui/material/Divider";
import MDSnackbar from 'components/MDSnackbar';
import { CircularProgress } from '@mui/material';
import { MDLinearProgress } from '@mui/icons-material';
import axios from 'axios';
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { Container, Row, Col, Card, Button, ProgressBar, Alert } from 'react-bootstrap';


const ProjectIdeasComponent = () => {
  const [projectIdeas, setProjectIdeas] = useState([]);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [userInfo, setUserInfo] = useState("");

  const navigate = useNavigate()

  const fetchProjectIdeas = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/fundMe/projects`);
      setProjectIdeas(data);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    fetchProjectIdeas();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo) {
      setUserInfo(userInfo);
    }

  }, []);

  const handleDeleteProject = async (projectId) => {
    try {
      await axios.delete(`http://localhost:5000/api/fundMe/deleteProjects/${projectId}`);
      navigate('/fundMe/project-ideas')
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox className="container">
        <div className="d-flex align-items-center">
          <Link to="/fundMe/create-idea">
            <MDButton variant="contained" color="primary" className="my-3 mr-3">
              Add New Project Idea
            </MDButton>
          </Link>
          <Link to="/fundMe/myProjects">
            <MDButton variant="contained" color="primary" className="my-3 ml-3">
              My Projects
            </MDButton>
          </Link>
        </div>
        <main role="main" className="col-md-9 ml-sm-auto col-lg-9 px-4">
          <MDTypography variant="h6" gutterBottom>
            Fund Me :
          </MDTypography>
          <MDTypography variant="h6" fontWeight="medium" gutterBottom>
            FundMe is a feature offered by Efarm that allows young farmers and entrepreneurs to share their project ideas and ask for funding.
          </MDTypography>
          <MDTypography variant="h6" gutterBottom>
            Many great ideas go out without trying for lack of funding. Your contribution can make one of these the next big thing! You can even be one of them!
          </MDTypography>
          {showSuccessAlert && (
            <MDSnackbar open={showSuccessAlert} autoHideDuration={6000} onClose={() => setShowSuccessAlert(false)}>
              <MDAlert severity="success" onClose={() => setShowSuccessAlert(false)}>
                {successMessage}
              </MDAlert>
            </MDSnackbar>
          )}
          {showErrorAlert && (
            <MDSnackbar open={showErrorAlert} autoHideDuration={6000} onClose={() => setShowErrorAlert(false)}>
              <MDAlert severity="error" onClose={() => setShowErrorAlert(false)}>
                {errorMessage}
              </MDAlert>
            </MDSnackbar>
          )}
          <MDBox>
            {projectIdeas.map((projectIdea) => (
              <MDBox key={projectIdea._id} mb={4}>
                <MDBox style={{ margin: '0.5rem', padding: '1rem' }}>
                  <MDBox component="img" width="150px" src={ideaImage} className="card-img-top" />
                  <MDBox>
                    <MDTypography variant="h6">{projectIdea.title}</MDTypography>
                    <MDTypography>{projectIdea.description.slice(0, 100)}{projectIdea.description.length > 100 ? '...' : ''}</MDTypography>
                    <MDTypography>Funding Goal: ${projectIdea.fundingGoal}</MDTypography>
                    <br />
                    <div>
                      <CircularProgress
                        variant="determinate"
                        value={(projectIdea.currentAmountRaised / projectIdea.fundingGoal) * 100}
                        size={50}
                        thickness={5}
                      />
                    </div>
                    <Link to={`/fundMe/project_detail/${projectIdea._id}`}>
                      <MDButton variant="contained" color="primary">View Details</MDButton>
                    </Link>
                  </MDBox>
                </MDBox>
              </MDBox>
              
            ))}
          </MDBox>
          <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
          
        </main>
      </MDBox>
    </DashboardLayout>
  );
};

export default ProjectIdeasComponent;
