import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { PaginationItem, PaginationLink } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DeleteIcon from '@material-ui/icons/Delete';


import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  IconButton,
  Pagination,
} from "@material-ui/core";
import { Edit, Delete, Check, Clear } from "@material-ui/icons";
import { LinkContainer } from "react-router-bootstrap";


const VisitList = ({ navigate }) => {
    // const visitList = useSelector((state) => state.visitList);
    // const { loading, error, users } = visitList;
	    const [searchText, setSearchText] = useState('');
      const [currentPage, setCurrentPage] = useState(1);

      const [pageNumber, setPageNumber] = useState(0);
      const visitPerPage = 5;
      const pageVisited = pageNumber * visitPerPage;


 const handleSearchSubmit = async (e) => {
      e.preventDefault();
      try {
        const res = await axios.get(`http://localhost:5000/api/visits/search?query=${searchText}`);
        setVisites(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    const [visites, setVisites] = useState([]);
    const navigateto =useNavigate();
    
    async function getUsers(){
            fetch(`http://localhost:5000/api/visits/all`, {
              
        })
      .then((response) => response.json())
      .then((data) => setVisites(data));
    }

    useEffect(()=>{getUsers()},[]);

   
    const deleteVisit = async (id) => {
      //const result = window.confirm("Are you sure you want to delete?");
     
      await axios.delete(`http://localhost:5000/api/visits/delete/${id}`, {
       
      })
      .then((res) => {
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
          }
        })
       navigate("/Visit")
      });
      getUsers();

    }

    const editOffer =  (id)=>{
     navigate(`/admin/editOffer/?id=${id}`);
    }
    const useStyles = makeStyles((theme) => ({
        root: {
          "& .MuiTextField-root": {
            margin: theme.spacing(1),
            width: "25ch",
          },
        },
        container: {
          marginTop: theme.spacing(4),
          marginBottom: theme.spacing(4),
        },
        searchContainer: {
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: theme.spacing(2),
        },
        table: {
          minWidth: 650,
        },
        editButton: {
          marginRight: theme.spacing(1),
        },
      }));
      const classes = useStyles();

//---------------------- Pagination ------------------------------------------//
const pageSize = 5;
  const pageCount1 = Math.ceil(visites.length / pageSize);
  const pages = Array.from({ length: pageCount1 }, (_, i) => i + 1);
  const handlePageClick = (page) => {
    setCurrentPage(page);
  };
  const paginatedVisites = visites.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );


      //------------------------------ PDF ------------------------------------------//
    //   const generatePDF = () => {
    //      // Créer un nouveau document PDF
    // const doc = new jsPDF();
    


    // Définir les en-têtes de colonne pour le tableau
    // const headers = [["Title", "Category", "Description", "Availability", "Duration", "Location", "Languages"]];

    // // Obtenir les données du tableau
    // const data = offers.map(offer => [offer.title, offer.type_offre, offer.description, offer.availability, offer.duration, offer.location, offer.languages]);


    // // Ajouter le tableau au document PDF avec la fonction autotable de jsPDF
    // doc.autoTable({
    //   head: headers,
    //   body: data
    // });


    // // Sauvegarder le document PDF
    // doc.save("offers.pdf");
    // }
      
   
    //   const pageCount = Math.ceil(offers.length / offersPerPage);
    //   const changePage = ({ selected }) => {
    //     setPageNumber(selected);
    // };

 

    const handleSearchChange = (e) => {
      setSearchText(e.target.value);
    };

  return (
    <DashboardLayout>
    <Container className={classes.container}>
   
    <div className={classes.searchContainer}>
   
      <TextField
        id="standard-search"
        label="Search field"
        type="search"
        value={searchText}
        onChange={handleSearchChange}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSearchSubmit}
        className={classes.editButton}
      >
        Search
      </Button>
      <Link to="/AddVisit">
        <Button variant="contained" color="primary">
          ADD Visit
        </Button>
      </Link>    
    </div>
    
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>TITLE</TableCell>
            <TableCell>CITY</TableCell>
            <TableCell>ADDRESS</TableCell>
            <TableCell>DISTANCE</TableCell>
            <TableCell>PHOTO</TableCell>
            <TableCell>DESCRIPTION</TableCell>
            <TableCell>PRICE</TableCell>
            <TableCell>MAXGROUPSIZE</TableCell>
            <TableCell>FEATURED</TableCell>
            <TableCell>ACTIONS</TableCell>
            <TableCell>STATUS</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedVisites.map((visit) => (
            <TableRow key={visit._id}>
              <TableCell >
                {visit.title}
              </TableCell>
              <TableCell>{visit.city}</TableCell>
              <TableCell>{visit.address}</TableCell>
              <TableCell>{visit.distance}</TableCell>
              <TableCell>{visit.photo}</TableCell>
              <TableCell>{visit.desc}</TableCell>
              <TableCell>{visit.price}</TableCell>
              <TableCell>{visit.maxGroupSize}</TableCell>
              <TableCell>
                <Checkbox
                  icon={<Clear />}
                  checkedIcon={<Check />}
                  checked={visit.featured}
                  disabled
                />
              </TableCell>
              <TableCell>
                <LinkContainer to={`/admin/visite/${visit._id}/editvisit`}>
                  <IconButton
                    color="primary"
                    className={classes.editButton}
                  >
                    <Edit />
                  </IconButton>

                </LinkContainer>
                <IconButton
            color="secondary"
            onClick={() => deleteVisit(visit._id)}
          >
            <DeleteIcon />
          </IconButton>
              </TableCell>
          
        <TableCell>
          {visit.state ? "CONFIRME" : "NON CONFIRME"}
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
</TableContainer>

</Container>
</DashboardLayout>

    
    );
  
};

export default VisitList;
