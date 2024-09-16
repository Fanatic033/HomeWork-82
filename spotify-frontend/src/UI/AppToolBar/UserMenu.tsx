import React, {useState} from 'react';
import {Avatar, Menu, MenuItem} from '@mui/material';
import {User} from '../../types.ts';
import Box from '@mui/material/Box';
import {green} from '@mui/material/colors';
import PersonIcon from '@mui/icons-material/Person';
import {NavLink} from 'react-router-dom';

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({user}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const isOpen = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box>
      <Avatar onClick={handleClick} sx={{bgcolor: green[500]}}><PersonIcon/></Avatar>
      <Menu open={isOpen} anchorEl={anchorEl} keepMounted={true} onClose={handleClose}>
        <MenuItem>Profile</MenuItem>
        <MenuItem>My Account {user.username}</MenuItem>
        <MenuItem component={NavLink} to={'/track-history'}>Track History</MenuItem>
      </Menu>
    </Box>
  );
};

export default UserMenu;