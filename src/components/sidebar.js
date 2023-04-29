import React,{ useState ,useCallback} from "react";
import { styled, createTheme, ThemeProvider,useTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon  from '@mui/icons-material/Home';
import SettingsIcon  from '@mui/icons-material/Settings';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AssignmentIcon from '@mui/icons-material/Assignment';

// import { mainListItems,secondaryListItems } from './listItems';

import {
  Link,
  useNavigate
} from "react-router-dom";

const drawerWidth = 200;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    //padding: theme.spacing(1),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  //padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function Sidebar({ user,username }){
    const theme = useTheme();
    const [open, setOpen] =useState(true);
    const navigate = useNavigate();
    const handle_render =useCallback((url) => navigate(url, {replace: true}), [navigate]);

    const handleDrawerOpen = () => {
      setOpen(true);
    };
  
    const handleDrawerClose = () => {
      setOpen(false);
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
      <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Adam Full Stack Website
          </Typography>
		  <Typography variant="h6" noWrap component="div">
		  </Typography>
		  <Link className="link" to="/">
		  {/* <img src={adam} style={{ height: "40px",cursor:"pointer" }} alt="My logo"></img> */}
		 </Link>
        </Toolbar>
      </AppBar>
      <MuiDrawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
      <DrawerHeader>
		  {user ? <><Tooltip title="登出" arrow>
		  <Button ><AccountCircleIcon/></Button></Tooltip><Typography>{username}</Typography></>:<Button color="inherit"><Link className="link" to="login">登入</Link></Button>}
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        {user ?
		<List>
          {['首頁', 'PDF'].map((text, index) => (
            <ListItem button key={text}  onClick={(e) => handle_sidebar_button(e,index) }>
              <ListItemIcon>
				{index==0 ? <HomeIcon /> : null  }
				{index==1 ? <PictureAsPdfIcon /> : null  }
				{/* {index==2 ? <ShoppingBasketIcon /> : null  }
				{index==3 ? <HistoryIcon /> : null  } */}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List> : null }
        <Divider />
		{user ?
        <List>
          {['設定'].map((text, index) => (
            <ListItem  button key={text} onClick={(e) => handle_sidebar_button_down(e,index) }>
              <ListItemIcon>
			     {index==0 ? <SettingsIcon />: null}
			     {/* {index==1 ? <SettingsIcon />: null} */}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List> :  null }
      </MuiDrawer>
      <Main open={open}>
      <DrawerHeader />	
    </Main>
    </Box>
    );

  }