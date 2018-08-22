import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CreateIcon from '@material-ui/icons/Create'
import DeleteIcon from '@material-ui/icons/Delete';
import './Dashboard.css'
import FormDialog from './DashBoardComponents/CreateCardDialog'
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles ={
  
};


class Dashboard extends Component {
  
  classes = {};
  constructor(props){
    super(props)
    this.classes = props.classes;

  }
  
  render() {
    return (
      <div>
        {renderIcons()}
      </div>
    );
  }
}

function renderIcons(){
  return(
    <div className = "buttons">
     <FormDialog/>
      <Button variant="fab" size = "small"  color="secondary" aria-label="Delete">
        <DeleteIcon />
      </Button>
      </div>
  );
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);