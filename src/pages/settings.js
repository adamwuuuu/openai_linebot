import React,{ useState ,useEffect} from "react";
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

export default function Setting(){
    return(
      <Box sx={{ display: 'flex' }}>
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
              設定
          </Typography>
        </Grid>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
         <Grid container spacing={3}>
            <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 600,
                  }}
                >  
                </Paper>
              </Grid>
          </Grid>
        </Container>
       </Box>
      </Box>
    )
}