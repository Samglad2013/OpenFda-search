import React, { useState } from 'react';
import axios from 'axios';
import { TextField, List, ListItem, ListItemText, Button, Typography, Box, Paper, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import homebg from '../images/homebg.jpg';

const MedicationSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isMediumScreen = useMediaQuery('(min-width:600px) and (max-width:900px)');

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://api.fda.gov/drug/label.json?search=${query}`);
      if (response.data.results && Array.isArray(response.data.results)) {
        setResults(response.data.results);
        setError(null);
      } else {
        setResults([]);
        setError('No results found');
      }
    } catch (error) {
      console.error('Error fetching search results', error);
      setError('An error occurred while fetching the search results. Please try again.');
    }
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${homebg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        width: "100%",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Paper sx={{
        padding: isSmallScreen ? '10px' : isMediumScreen ? '20px' : '40px',
        width: isSmallScreen ? '90%' : isMediumScreen ? '80%' : '60%',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
      }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Medication Search
        </Typography>
        <TextField
          label="Search Medications"
          variant="outlined"
          fullWidth
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          sx={{ marginBottom: '20px' }} 
        />
        <Box display="flex" justifyContent="center" sx={{ marginTop: '20px' }}>
          <Button
            variant="contained"
            onClick={handleSearch}
            sx={{
              width: isSmallScreen ? '100%' : isMediumScreen ? '50%' : '40%'
            }}
          >
            Search
          </Button>
        </Box>
        {error && (
          <Typography color="error" align="center" sx={{ marginTop: '20px' }}>
            {error}
          </Typography>
        )}
        <List sx={{ marginTop: '20px' }}>
          {results.length > 0 && results.map((medication) => (
            <ListItem
              key={medication.id}
              onClick={() => navigate(`/medication/${medication.id}`)}
            >
              <ListItemText
                primary={medication.openfda?.brand_name?.[0] || 'Unknown Brand'}
                secondary={medication.openfda?.manufacturer_name?.[0] || 'Unknown Manufacturer'}
                sx={{
                  '&:hover': {
                    color: 'blue',
                  },
                  cursor: "pointer"
                }}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default MedicationSearch;
