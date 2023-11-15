import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  TextField,
} from '@mui/material';

const ExamplePhoneCall = ({ isOpen, onClose }) => {
  const [userPhoneNumber, setUserPhoneNumber] = useState('');

  const initiateCall = async () => {
    try {
      // Validate the user's phone number before initiating the call
      if (/^\d{10}$/.test(userPhoneNumber)) {
        console.log('Initiating call...');
        const response = await fetch('http://your-server-url/initiate-call', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userPhoneNumber,
          }),
        });

        if (response.ok) {
          console.log('Call initiated successfully');
          // Add any additional logic you want to perform on success
        } else {
          console.error('Failed to initiate call. Server returned:', response.status, response.statusText);
          // Handle error response
        }
      } else {
        alert('Please enter a valid 10-digit phone number.');
      }
    } catch (error) {
      console.error('Error initiating call:', error.message);
      // Handle network or other errors
    }
  };

  const handleCallMeClick = () => {
    initiateCall();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Example Phone Call</DialogTitle>
      <DialogContent>
        <Typography variant="body1" color="textSecondary"style={{ textAlign: 'center', marginBottom: '1%' }}>
          See what a call between our AI and a prospective politician would sound like!
        </Typography>

        {/* Add a TextField for the user to enter their phone number */}
        <TextField
          label="Your Phone Number"
          variant="outlined"
          fullWidth
          margin="normal"
          value={userPhoneNumber}
          onChange={(e) => setUserPhoneNumber(e.target.value)}
        />
      </DialogContent>

      <DialogActions>
        {/* Change the button to call the handleCallMeClick function */}
        <Button onClick={handleCallMeClick} color="secondary">
          Call Me
        </Button>
        <Button onClick={onClose} color="secondary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ExamplePhoneCall;