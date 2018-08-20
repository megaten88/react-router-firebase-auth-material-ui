import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CreateIcon from '@material-ui/icons/Create'
import DeleteIcon from '@material-ui/icons/Delete';
import './Dashboard.css'


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
    <div >
      <Button variant="fab" size = "small" color="primary" aria-label="Create">
        <CreateIcon/>
      </Button>

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