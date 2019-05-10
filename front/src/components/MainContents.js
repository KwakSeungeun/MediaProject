import React, { Component } from 'react';
import '../index.css'
import Button from '@material-ui/core/Button';

class MainConents extends Component {
    constructor(props){
        super(props);
        this.state = {
        };
    }

    addFiles = ()=>{

    }

    addDir = ()=>{
        console.log("user : ", this.props.loggedUser);
    }

    render() {
    return (
        <div  style={{background: "white"}}>
        {/* 상단 메뉴 */}
        <div className="row-container" style={{width: "50%"}}>
            <Button variant="contained" onClick={this.addDir} className="flex-1">폴더추가</Button>
            <Button variant="contained" onClick={this.addFiles} 
                className="flex-1" style={{marginLeft: "16px"}}>파일추가</Button>
        </div>
        </div>
    );
    }
}

export default MainConents;
