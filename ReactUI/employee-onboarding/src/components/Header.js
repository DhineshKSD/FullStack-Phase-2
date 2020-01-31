import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import MoreIcon from '@material-ui/icons/MoreVert';
import '../App.css';  
import logo from '../Assets/OnboardLogo.png';
import { BrowserRouter as Router, Link } from 'react-router-dom'; 
import DarkTheme, { createTheme } from 'react-dark-theme';
import Avatar from '@material-ui/core/Avatar';

var name=localStorage.getItem('User')

const lightTheme = {
  background: '#FFFFFF',
  text:'black',
}
 
const darkTheme = {
  background: '#a9aaa9',
  text: 'black',
}
const myTheme = createTheme(darkTheme, lightTheme)
const useStyles = makeStyles(theme => ({
grow: {
  flexGrow: 1,
},
menuButton: {
  marginRight: theme.spacing(2),
},
title: {
  display: 'none',
  [theme.breakpoints.up('sm')]: {
    display: 'block',
  },
},
search: {
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: fade(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: fade(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
},
searchIcon: {
  width: theme.spacing(7),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
},
inputRoot: {
  color: 'inherit',
},
inputInput: {
  padding: theme.spacing(1, 1, 1, 7),
  transition: theme.transitions.create('width'),
  width: '100%',
  [theme.breakpoints.up('md')]: {
    width: 200,
  },
},
sectionDesktop: {
  display: 'none',
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
},
sectionMobile: {
  display: 'flex',
  [theme.breakpoints.up('md')]: {
    display: 'none',
  },
},
}));

function RemoveToken()
{
localStorage.removeItem('Token');
localStorage.removeItem('User');
localStorage.removeItem('FirstName');
}

export default function PrimarySearchAppBar() {
const classes = useStyles();
const [anchorEl, setAnchorEl] = React.useState(null);
const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

const isMenuOpen = Boolean(anchorEl);
const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

const handleProfileMenuOpen = event => {
  setAnchorEl(event.currentTarget);
};

const handleMobileMenuClose = () => {
  setMobileMoreAnchorEl(null);
};

const handleMenuClose = () => {
  setAnchorEl(null);
  handleMobileMenuClose();
};

const handleMobileMenuOpen = event => {
  setMobileMoreAnchorEl(event.currentTarget);
};

const menuId = 'primary-search-account-menu';
const renderMenu = (
  <Menu
    anchorEl={anchorEl}
    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    id={menuId}
    keepMounted
    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    open={isMenuOpen}
    onClose={handleMenuClose}
  >
    <MenuItem onClick={handleMenuClose}><b>{localStorage.getItem('FirstName')}</b></MenuItem>
    <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    <Link to='/Login' style={{ textDecoration: 'none' }} onClick={event =>window.location.href='/Login'}><MenuItem onClick={event=>RemoveToken()}>Logout</MenuItem></Link></Menu>
); 

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
      >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
          <IconButton
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );
 
  return (
    <div className={classes.grow}>
      <AppBar position="fixed" className="not-scrolled">
        <Toolbar>
        <Router>
        <Link to={'/'} onClick={event =>  window.location.href='/'}><img src={logo} className="App-logo" alt="logo" /></Link>
        </Router>
          <Typography id="Heading" className={classes.title} variant="h6" noWrap>
            On-Board Hub
          </Typography>
          <div style={{ position: 'relative',left:'54.2em',top:'0.25em' }}>
          <DarkTheme light={lightTheme} dark={darkTheme}/>
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={0} color="secondary">
              <a style={{display: "table-cell",color:'white',position:'relative',bottom:'0.13em'}} href="https://mail.google.com/mail/u/0/" target="_blank">
                <MailIcon />
              </a>
              </Badge>
            </IconButton>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={0} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}