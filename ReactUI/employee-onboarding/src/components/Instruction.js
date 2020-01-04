import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Checkbox from '@material-ui/core/Checkbox';
import ButtonMat from '@material-ui/core/Button';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide() {
  const [open, setOpen] = React.useState(false);
  const [checked, setChecked] = React.useState(false);

  const handleChange = event => {
    setChecked(event.target.checked);
  }; 

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" color="Secondary" onClick={handleClickOpen}>
          instruction
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Psiog - Pre Joining formalities"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          
            To facilitate a smooth integration into Psiog, we request you to follow the instructions given below 
            to access our onboarding portal. The portal will allow you to complete all pre-joining formalities like 
            accepting the offer and submitting all new-hire paperwork, online! <br/><br/>

            <b>Note: </b>
            Please complete all the forms, within seven days upon after 
            receipt of this email.
          </DialogContentText>

        </DialogContent>
        <DialogActions>
        <Checkbox
        checked={checked}
        onChange={handleChange}
        value="primary"
        inputProps={{ 'aria-label': 'primary checkbox' }} style= {{position:'relative',right:'12em',bottom:'0.275em'}}
        /> <p style= {{position:'relative',right:'18em'}}>I agree the terms and conditions.</p>
        </DialogActions>
      </Dialog>
    </div>
  );
}