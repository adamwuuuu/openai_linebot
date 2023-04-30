import React,{ useState ,useEffect} from "react";
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';

import { Loader, Placeholder } from 'rsuite'; 
    
export default function Home(){
  
  const [load,setLoad]=useState(false)
  const [loadtitle,setLoadtitle]=useState("")
    
  return (
      <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      { load ? (<Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      ><Placeholder.Paragraph rows={8} />
      <Loader backdrop content={loadtitle} vertical /></Box>) : 
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Grid container  justifyContent="center" alignItems="center">
          <Typography variant="h5">
              PDF
          </Typography>
        </Grid>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4} lg={3}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 500,
                }}
              >
              </Paper>
            </Grid>
            {/* Recent Deposits */}
            <Grid item xs={12} md={8} lg={6}>
              <Paper
                sx={{
                  p: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 500,
                }}
              >
              </Paper>
            </Grid>
            {/* Recent Orders */}
            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                
              </Paper>
            </Grid>
          </Grid>
          {/* <Copyright sx={{ pt: 4 }} /> */}
        </Container>
      </Box> }
    </Box>
  );
}