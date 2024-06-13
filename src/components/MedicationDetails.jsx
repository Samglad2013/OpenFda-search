import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Typography, Container, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, useMediaQuery } from '@mui/material';

const MedicationDetails = () => {
  const { id } = useParams();
  const [medication, setMedication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isMediumScreen = useMediaQuery('(min-width:600px) and (max-width:900px)');


  useEffect(() => {
    const fetchMedication = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://api.fda.gov/drug/label.json?search=id:${id}`);
        if (response.data && response.data.results && response.data.results.length > 0) {
          setMedication(response.data.results[0]);
          setError(null);
        } else {
          setError('Medication not found.');
        }
      } catch (error) {
        console.error("Error fetching medication details", error);
        setError('An error occurred while fetching the medication details.');
      } finally {
        setLoading(false);
      }
    };

    fetchMedication();
  }, [id]);

  if (loading) return <Box display="flex" justifyContent="center" alignItems="center" height="100vh"><CircularProgress /></Box>;
  if (error) return <Typography color="error">{error}</Typography>;

  const {
    openfda = {},
    effective_time,
    inactive_ingredient,
    purpose,
    warnings,
    questions,
    spl_product_data_elements,
    dosage_and_administration,
    pregnancy_or_breast_feeding,
    stop_use,
    storage_and_handling,
    do_not_use,
    indications_and_usage,
    active_ingredient
  } = medication || {};

  return (
    <Container>
      <Typography sx={{textAlign: "center", marginTop:"100px"}} variant="h4" gutterBottom>{openfda.brand_name?.[0]}</Typography>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        padding: isSmallScreen ? '16px' : '24px'
      }}>
        <TableContainer component={Paper} sx={{
          width: isSmallScreen ? '100%' : isMediumScreen ? '80%' : '60%',
        }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{fontWeight:"bold"}}>Field</TableCell>
                <TableCell>Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell sx={{fontWeight:"bold"}}>Generic Name</TableCell>
                <TableCell>{openfda.generic_name?.[0]}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{fontWeight:"bold"}}>Manufacturer</TableCell>
                <TableCell>{openfda.manufacturer_name?.[0]}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{fontWeight:"bold"}}>Effective Time</TableCell>
                <TableCell>{effective_time}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{fontWeight:"bold"}}>Inactive Ingredients</TableCell>
                <TableCell>{inactive_ingredient?.join(', ')}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{fontWeight:"bold"}}>Purpose</TableCell>
                <TableCell>{purpose?.join(', ')}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{fontWeight:"bold"}}>Warnings</TableCell>
                <TableCell>{warnings?.join(' ')}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{fontWeight:"bold"}}>Questions</TableCell>
                <TableCell>{questions?.join(' ')}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{fontWeight:"bold"}}>SPL Product Data Elements</TableCell>
                <TableCell>{spl_product_data_elements?.join(', ')}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{fontWeight:"bold"}}>Dosage and Administration</TableCell>
                <TableCell>{dosage_and_administration?.join(' ')}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{fontWeight:"bold"}}>Pregnancy or Breast Feeding</TableCell>
                <TableCell>{pregnancy_or_breast_feeding?.join(' ')}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{fontWeight:"bold"}}>Stop Use</TableCell>
                <TableCell>{stop_use?.join(' ')}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{fontWeight:"bold"}}>Storage and Handling</TableCell>
                <TableCell>{storage_and_handling?.join(' ')}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{fontWeight:"bold"}}>Do Not Use</TableCell>
                <TableCell>{do_not_use?.join(' ')}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{fontWeight:"bold"}}>Indications and Usage</TableCell>
                <TableCell>{indications_and_usage?.join(' ')}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{fontWeight:"bold"}}>Active Ingredient</TableCell>
                <TableCell>{active_ingredient?.join(', ')}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{fontWeight:"bold"}}>Route</TableCell>
                <TableCell>{openfda.route?.join(', ')}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{fontWeight:"bold"}}>Product NDC</TableCell>
                <TableCell>{openfda.product_ndc?.join(', ')}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{fontWeight:"bold"}}>Package NDC</TableCell>
                <TableCell>{openfda.package_ndc?.join(', ')}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{fontWeight:"bold"}}>UPC</TableCell>
                <TableCell>{openfda.upc?.join(', ')}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{fontWeight:"bold"}}>Substance Name</TableCell>
                <TableCell>{openfda.substance_name?.join(', ')}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default MedicationDetails;
