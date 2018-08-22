import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CreateIcon from '@material-ui/icons/Create'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import './CreateCardDialog.css';
import {saveCard} from '../../databaseConnection/databaseConnection';

export default class FormDialog extends React.Component {

  state = {
    open: false,
    value: '1',
    title: "",
    content: "",
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  
  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  handleSave= () =>{
     saveCard(this.state);
     this.setState({open: false});
  }
  
  handleTitle =(e)=>{
    this.setState({ title: e.target.value});
  }

  handleContent =(e)=>{
   this.setState({ content: e.target.value});
  }
  
  render() {
    return (
      <div className = "formroot">
        <Button variant="fab" onClick={this.handleClickOpen}size = "small" color="primary" aria-label="Create"><CreateIcon/></Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Tema</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Ingrese el tema deseado
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="title"
              label="Título del Tema"
              type="input"
              onChange = {this.handleTitle}
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="content"
              label="Contenido del tema"
              onChange = {this.handleContent}
              type="input"
              fullWidth
            />
          </DialogContent>
          <FormControl component="fieldset" className = "formControl">
          <FormLabel component="legend">Privacidad</FormLabel>
          <RadioGroup
            aria-label="privacy"
            name="privacy"
            value={this.state.value}
            onChange={this.handleChange}
          >
            <FormControlLabel value="1" control={<Radio />} label="Público" />
            <FormControlLabel value="2" control={<Radio />} label="Privado" />
            <FormControlLabel value="3" control={<Radio />} label="Mis Seguidores" />
          </RadioGroup>
          <FormHelperText>Elija la privacidad del la publicación</FormHelperText>
        </FormControl>
          <DialogActions>
            <Button  onClick={this.handleSave} color="primary">
              Crear
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Cancelar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}