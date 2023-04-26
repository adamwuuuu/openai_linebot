import React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon  from '@mui/icons-material/HomeIcon';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import AssignmentIcon from '@mui/icons-material/Assignment';

export const mainListItems= (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <HomeIcon  />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <PictureAsPdfIcon />
      </ListItemIcon>
      <ListItemText primary="PDF" />
    </ListItemButton>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    {/* <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader> */}
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
  </React.Fragment>
);