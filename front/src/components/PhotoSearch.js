import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';

class PhotoSearch extends Component {
    constructor(props){
        super(props);
        this.state = {};
    }
    render(){
        return(
            <div>
                <Dialog
                open={this.props.open}
                disableBackdropClick = {true}
                fullWidth = {true}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                >
                TEST!!
                </Dialog>
            </div>
        );
    }
}

export default PhotoSearch;