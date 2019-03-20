import React, { Component } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';


class TopBar extends Component {
    state = {
        open: false,
    };
    
    render() {
        return (
        <div>
            <AppBar position="static" color="default">
                <Toolbar>
                <Typography variant="h5">
                    Cloud Service              
                </Typography>
                </Toolbar>
            </AppBar>
        </div>
        );
    }
}

export default TopBar;