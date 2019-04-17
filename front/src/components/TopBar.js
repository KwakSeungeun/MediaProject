import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import logo from './img/logo2.png'
import profile from './img/profile.jpg'
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';

const styles = {
  avatar: {
    margin: 10,
    width: 60,
    height: 60
  },
  img: {
    width: 120,
    height: 80,
  }
};

function TopBar(props) {

    // var goHome = function() {
    //     console.log('go home');
    // }
    
    const { classes } = props;
    return (
        <div className={classes.root}>
        {/* <AppBar position="static" color = "fafafa">       */}
            <Toolbar>
                <Grid container>
                    <Grid item alignItems="flex-start">
                        <Button><img src={logo} alt= "home" className={classes.img} /></Button>
                    </Grid>
                    <Grid item alignItems="center">사진 올려놓기</Grid>
                    <Grid item alignItems="flex-end">
                        <Button><Avatar alt="Sample" src={profile} className={classes.avatar} /></Button>
                    </Grid>
                </Grid>     
            </Toolbar>
        {/* </AppBar> */}
        </div>
  );
}

TopBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TopBar);