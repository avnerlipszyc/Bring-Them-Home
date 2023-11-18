import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Typography } from '@mui/material';

const Donation = ({ isOpen, onClose }) => {
  const handleDonate = () => {
    // Implement your donation logic here
    console.log('Processing donation...');
    // Close the donation popup after processing
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Support Our Cause</DialogTitle>
      <DialogContent>
        <Typography variant="body1" color="textSecondary"style={{ textAlign: 'center', marginBottom: '1%' }}>
          Using large AI models requires compute resources that are expensive. We are a small team of volunteers and we need your help to keep this project running. Please consider donating to help us continue our work. Note: we are still setting up our donation infrastructure, so this button does not work yet.
        </Typography>

        {/* Donation Form */}
        <TextField
          label="Amount"
          variant="outlined"
          type="number"
          style={{ marginTop: '25px', marginBottom: '15px', width: '100%' }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
        <Button onClick={handleDonate} color="primary">
          Donate
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Donation;