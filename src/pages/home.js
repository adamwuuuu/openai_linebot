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

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
    
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
              首頁
          </Typography>
        </Grid>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
           {/* Top */}
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} >
           {Array.from(Array(3)).map((_, index) => (
            <Grid item xs={2} sm={4} md={4} key={index}>
             <Item>{index}</Item>
            </Grid>))}
          </Grid>
          <br />
          <br />
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
            {/* Second */}
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
             {/* Bottom */}
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