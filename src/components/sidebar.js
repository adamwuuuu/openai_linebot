import React,{ useState ,useCallback} from "react";
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon  from '@mui/icons-material/Home';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import AssignmentIcon from '@mui/icons-material/Assignment';

// import { mainListItems,secondaryListItems } from './listItems';

import {useNavigate} from 'react-router-dom';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      '& .MuiDrawer-paper': {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: 'border-box',
        ...(!open && {
          overflowX: 'hidden',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          width: theme.spacing(7),
          [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
          },
        }),
      },
    }),
  );

const mdTheme = createTheme();

export default function Sidebar(){

    const [open, setOpen] =useState(true);
    const navigate = useNavigate();
    const handle_render =useCallback((url) => navigate(url, {replace: true}), [navigate]);

    const toggleDrawer = () => {
      setOpen(!open);
    };

    const handle_sidebar_button=(event,index)=>{

        switch(index){
            case 0:
                  handle_render("/");
                  break;
            case 1:
                  handle_render("/pdf");
                  break;
            case 2:
                  handle_render("/");
                  break;
            case 3:
                  handle_render("/");
                  break;
            default:
        }
    }
    
    const handle_sidebar_button_down=(event,index)=>{
  
        switch(index){
            case 0:
                  handle_render("/");
                  break;
            case 1:
                  handle_render("/");
                  break;
            default:
        }
    }
  
    return (
      <ThemeProvider theme={mdTheme}>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <AppBar position="absolute" open={open}>
            <Toolbar
              sx={{
                pr: '24px', // keep right padding when drawer closed
              }}
            >
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer}
                sx={{
                  marginRight: '36px',
                  ...(open && { display: 'none' }),
                }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
              >
              </Typography>
              <IconButton color="inherit">
                {/* <Badge badgeContent={4} color="secondary">
                  <NotificationsIcon />
                </Badge> */}
              </IconButton>
            </Toolbar>
          </AppBar>
          <Drawer variant="permanent" open={!open}>
            <Toolbar
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                px: [1],
              }}
            >
              <IconButton onClick={toggleDrawer}>
                <ChevronLeftIcon />
              </IconButton>
            </Toolbar>
            <Divider />
            <List component="nav">
            <ListItemButton onClick={(e) => handle_sidebar_button(e,0)}>
              <ListItemIcon>
                <HomeIcon  />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
            <ListItemButton onClick={(e) => handle_sidebar_button(e,1)}>
              <ListItemIcon>
               <PictureAsPdfIcon />
              </ListItemIcon>
              <ListItemText primary="PDF" />
            </ListItemButton>
            <Divider sx={{ my: 1 }} />
            <ListItemButton onClick={(e) => handle_sidebar_button_down(e,0)}>
              <ListItemIcon>
               <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary="Current month" />
            </ListItemButton>
            </List>
          </Drawer>
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
            <Toolbar />
          </Box>
        </Box>
      </ThemeProvider>
    );

  }