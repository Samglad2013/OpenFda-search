import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { MedicalInformationRounded } from '@mui/icons-material';

const Header = () => {
  return (
    <AppBar sx={{ backgroundColor: "blue" }}>
      <Toolbar>
        <Typography
          variant="h4"
          sx={{
            '@media (max-width:600px)': {
              textAlign: 'center',
            },
          }}
        >
          OPENFDA
        </Typography>
        <Box
          sx={{
            '@media (max-width:600px)': {
              textAlign: 'right',
              flexGrow: 1,
            },
          }}
        >
          <MedicalInformationRounded sx={{ color: 'white', fontSize: '40px' }} />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
