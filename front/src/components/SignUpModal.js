import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';

class SignUpModal extends Component {
    state = {
        open: false,
    };
    
    render() {
        return (
        <div>
            <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            disableBackdropClick = {true}
            fullWidth = {true}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            ></Dialog>
        </div>
        );
    }
}

export default SignUpModal;