import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function ResponsiveDialog({
  buttonText,
  dialogTitle,
  dialogContent,
  agreeText,
  disagreeText,
  onAgree,
  onDisagree,
  open, // state to control dialog open/close
  setOpen, // function to set dialog open/close
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClose = () => {
    setOpen(false); // Close the dialog when the close button is clicked
  };

  return (
    <React.Fragment>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose} // Close the dialog when backdrop is clicked
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {dialogTitle || "Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {dialogContent ||
              `Let Google help apps determine location. This means sending anonymous
              location data to Google, even when no apps are running.`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={onDisagree}>
            {disagreeText || 'Disagree'}
          </Button>
          <Button onClick={onAgree} autoFocus>
            {agreeText || 'Agree'}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
