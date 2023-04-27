import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from 'components/MDInput';
import { CircularProgress } from '@mui/material';
import MDButton from 'components/MDButton';
import axios from 'axios';
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ideaImage from './idea.jpg'
import {
  Container,
  Col,
  Card,
  Button,
  ProgressBar,
} from 'react-bootstrap';


const MyProjectsComponent = () => {
  const { id } = useParams();
  const [myProjects, setMyProjects] = useState([]);
  const [userInfo, setUserInfo] = useState("");

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userInfo.token}`,
    },
  };

    const fetchMyProjects = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (userInfo) {
          setUserInfo(userInfo);
        }
        const { data } = await axios.get(
          `http://localhost:5000/api/fundMe/myProjects/${userInfo._id}`,
          config
        );
        setMyProjects(data);
      } catch (error) {
        console.error(error);
      }
    };

    useEffect(() => {
    
      fetchMyProjects();
    }, []);

  const handleDeleteProject = async (projectId) => {
    try {
      await axios.delete(`http://localhost:5000/api/fundMe/deleteProjects/${projectId}`);
      const updatedProjects = myProjects.filter((project) => project._id !== projectId);
      setMyProjects(updatedProjects);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DashboardLayout>
  <DashboardNavbar />
  <MDBox className="my-3 p-3 bg-light" style={{ marginTop: "50px" }}>
    <MDTypography variant="h1" gutterBottom >
      
      My Projects
      
    </MDTypography>
    <MDTypography variant="h3" gutterBottom style={{marginBottom:"200px"}}>
    Here you can manage your own project ideas.
      You can delete or update.
    </MDTypography>
    <Link to="/fundMe/create-idea">
      <MDButton variant="contained" color="primary" className="my-3">
        Add New Project
      </MDButton>
    </Link>
    <MDBox>
      {myProjects.map((project) => (
        <MDBox key={project._id} mb={4}>
          <MDBox style={{ margin: '0.5rem', padding: '1rem' }}>
            <MDBox component="img" width="150px" src={ideaImage} className="card-img-top" />
            <MDBox>
              <MDTypography variant="h6">{project.title}</MDTypography>
              <MDTypography>{project.description.slice(0, 100)}{project.description.length > 100 ? '...' : ''}</MDTypography>
              <MDTypography>Funding Goal: ${project.fundingGoal}</MDTypography>
              <MDBox>
                <div>
              <CircularProgress
          variant="determinate"
          value={(project.currentAmountRaised / project.fundingGoal) * 100}
          size={50}
          thickness={5}
        />
      </div>
              </MDBox>
              <MDBox>
                <Link to={`/project_detail/${project._id}`}>
                  <MDButton variant="contained" color="primary" className="mr-2">
                    View Details
                  </MDButton>
                </Link>
                <Link to={`/fundMe/updateProjects/${project._id}`}>
                  <MDButton variant="contained" color="info" className="mr-2">
                    Update Project
                  </MDButton>
                </Link>
                <MDButton variant="contained" color="secondary" onClick={() => handleDeleteProject(project._id)}>
                  Delete
                </MDButton>
              </MDBox>
            </MDBox>
          </MDBox>
        </MDBox>
      ))}
    </MDBox>
  </MDBox>
</DashboardLayout>
  );
};

export default MyProjectsComponent;
