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
      // Check if userPhoneNumber is a valid 10-digit phone number
      if (/^\d{10}$/.test(userPhoneNumber)) {
        console.log('Initiating call...');
        console.log('User phone number:', userPhoneNumber);

        // Make a POST request to the server to initiate the call
        try {
          const response = await fetch('http://localhost:3001/initiate-call', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userPhoneNumber: userPhoneNumber,
            }),
            credentials: 'include',
          });

          if (response.ok) {
            console.log('Call initiated successfully');
            // Add any additional logic you want to perform on success
            onClose(); // Close the dialog on success
          } else {
            console.error('Failed to initiate call. Server returned:', response.status, response.statusText);
            // Handle error response
          }
        } catch (error) {
          console.error('Error during fetch:', error.message);
          // Handle network or other errors
        }
      } else {
        alert('Please enter a valid 10-digit phone number.');
      }
    } catch (error) {
      console.error('Error initiating call:', error.message);
      // Handle other errors
    }
  };

  const handleCallMeClick = async () => {
    await initiateCall();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Example Phone Call</DialogTitle>
      <DialogContent>
        <Typography variant="body1" color="textSecondary" style={{ textAlign: 'center', marginBottom: '1%' }}>
          See what a call between our AI and a prospective politician would sound like!
        </Typography>

        {/* Add a TextField for the user to enter their phone number */}
        <TextField
          label="Your Phone Number"
          variant="outlined"
          fullWidth
          margin="normal"
          value={userPhoneNumber}
          onChange={(e) => {
            setUserPhoneNumber(e.target.value);
            console.log('User entered phone number:', e.target.value);
          }}
        />
      </DialogContent>

      <DialogActions>
        {/* Change the button to call the handleCallMeClick function */}
        <Button onClick={onClose} color="secondary">
          Close
        </Button>
        <Button onClick={handleCallMeClick} color="secondary">
          Call Me
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ExamplePhoneCall;