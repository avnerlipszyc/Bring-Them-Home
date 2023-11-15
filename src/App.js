import React, { useState, useEffect } from 'react';
import {
  Button,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
  Container,
  Autocomplete,
  TextField,
  Grid,
  Paper,
} from '@mui/material';

import ExamplePhoneCall from './ExamplePhoneCall';

import Donation from './donate';

const App = () => {
  const [selectedPolitician, setSelectedPolitician] = useState(null);
  const [politicians, setPoliticians] = useState([]);
  const [filters, setFilters] = useState({
    All: false,
    Democrats: false,
    Republicans: false,
    Local: false,
  });
  const [isExampleCallOpen, setExampleCallOpen] = useState(false);
  const [isDonationOpen, setDonationOpen] = useState(false);

  const getUSStateFromCoordinates = (latitude, longitude) => {
    const stateBoundingBoxes = {
      AL: { minLat: 30.2200, maxLat: 35.0083, minLng: -88.4732, maxLng: -84.8898 },
      AK: { minLat: 51.2098, maxLat: 71.5388, minLng: -179.1489, maxLng: 179.7785 },
      AZ: { minLat: 31.3322, maxLat: 37.0041, minLng: -114.8188, maxLng: -109.0452 },
      AR: { minLat: 33.0041, maxLat: 36.4996, minLng: -94.6170, maxLng: -89.6446 },
      CA: { minLat: 32.5121, maxLat: 42.0095, minLng: -124.5662, maxLng: -114.1315 },
      CO: { minLat: 36.9931, maxLat: 41.0034, minLng: -109.0452, maxLng: -102.0416 },
      CT: { minLat: 40.9664, maxLat: 42.0504, minLng: -73.7278, maxLng: -71.7868 },
      DE: { minLat: 38.4510, maxLat: 39.8390, minLng: -75.7894, maxLng: -75.0489 },
      FL: { minLat: 24.3963, maxLat: 31.0000, minLng: -87.6348, maxLng: -80.0311 },
      GA: { minLat: 30.3556, maxLat: 35.0000, minLng: -85.6052, maxLng: -80.8397 },
      HI: { minLat: 18.7763, maxLat: 20.4600, minLng: -156.0000, maxLng: -154.8067 },
      ID: { minLat: 41.9882, maxLat: 49.0000, minLng: -117.2430, maxLng: -111.0436 },
      IL: { minLat: 36.9700, maxLat: 42.5083, minLng: -91.5131, maxLng: -87.0199 },
      IN: { minLat: 37.7717, maxLat: 41.7600, minLng: -88.0979, maxLng: -84.7846 },
      IA: { minLat: 40.3754, maxLat: 43.5000, minLng: -96.6397, maxLng: -90.1401 },
      KS: { minLat: 36.9931, maxLat: 40.0034, minLng: -102.0416, maxLng: -94.5886 },
      KY: { minLat: 36.4986, maxLat: 39.1470, minLng: -89.5715, maxLng: -81.9649 },
      LA: { minLat: 28.9286, maxLat: 33.0195, minLng: -94.0430, maxLng: -88.7584 },
      ME: { minLat: 42.9774, maxLat: 47.4599, minLng: -71.0837, maxLng: -66.9346 },
      MD: { minLat: 37.9125, maxLat: 39.7220, minLng: -79.4876, maxLng: -75.0399 },
      MA: { minLat: 41.1865, maxLat: 42.8864, minLng: -73.5081, maxLng: -69.9286 },
      MI: { minLat: 41.6966, maxLat: 48.3033, minLng: -90.4188, maxLng: -82.4131 },
      MN: { minLat: 43.4994, maxLat: 49.3843, minLng: -97.2391, maxLng: -89.4919 },
      MS: { minLat: 30.1748, maxLat: 35.0000, minLng: -91.6519, maxLng: -88.0979 },
      MO: { minLat: 35.9956, maxLat: 40.6136, minLng: -95.7747, maxLng: -89.0988 },
      MT: { minLat: 44.3583, maxLat: 49.0011, minLng: -116.0500, maxLng: -104.0396 },
      NE: { minLat: 39.9999, maxLat: 43.0017, minLng: -104.0535, maxLng: -95.3083 },
      NV: { minLat: 35.0019, maxLat: 42.0022, minLng: -120.0057, maxLng: -114.0396 },
      NH: { minLat: 42.6970, maxLat: 45.3054, minLng: -72.5572, maxLng: -70.5347 },
      NJ: { minLat: 38.9283, maxLat: 41.3574, minLng: -75.5593, maxLng: -73.8939 },
      NM: { minLat: 31.3322, maxLat: 37.0004, minLng: -109.0452, maxLng: -103.0019 },
      NY: { minLat: 40.4774, maxLat: 45.0158, minLng: -79.7626, maxLng: -71.1851 },
      NC: { minLat: 33.7529, maxLat: 36.5880, minLng: -84.3218, maxLng: -75.4606 },
      ND: { minLat: 45.9350, maxLat: 49.0007, minLng: -104.0489, maxLng: -96.5545 },
      OH: { minLat: 38.4034, maxLat: 41.9773, minLng: -85.5856, maxLng: -80.5184 },
      OK: { minLat: 33.6158, maxLat: 37.0022, minLng: -103.0026, maxLng: -94.4307 },
      OR: { minLat: 41.991794, maxLat: 46.292035, minLng: -124.5662, maxLng: -116.4633 },
      PA: { minLat: 39.7198, maxLat: 42.2769, minLng: -80.5184, maxLng: -74.6895 },
      RI: { minLat: 41.1466, maxLat: 42.0188, minLng: -71.8628, maxLng: -71.1205 },
      SC: { minLat: 32.0333, maxLat: 35.2155, minLng: -83.3539, maxLng: -78.5417 },
      SD: { minLat: 42.4796, maxLat: 45.9455, minLng: -104.0577, maxLng: -96.4363 },
      TN: { minLat: 34.9829, maxLat: 36.6781, minLng: -90.3103, maxLng: -81.6469 },
      TX: { minLat: 25.8371, maxLat: 36.5008, minLng: -106.6456, maxLng: -93.5083 },
      UT: { minLat: 36.9971, maxLat: 42.0016, minLng: -114.0529, maxLng: -109.0415 },
      VT: { minLat: 42.7268, maxLat: 45.0160, minLng: -73.4377, maxLng: -71.4651 },
      VA: { minLat: 36.5407, maxLat: 39.4660, minLng: -83.6753, maxLng: -75.2423 },
      WA: { minLat: 45.5435, maxLat: 49.0025, minLng: -124.5662, maxLng: -116.4633 },
      WV: { minLat: 37.2019, maxLat: 40.6374, minLng: -82.6447, maxLng: -77.7195 },
      WI: { minLat: 42.4919, maxLat: 47.3095, minLng: -92.8881, maxLng: -86.8057 },
      WY: { minLat: 40.9946, maxLat: 45.0059, minLng: -111.0569, maxLng: -104.0523 },
    };

  
  // Iterate through state bounding boxes to find the matching state
  for (const [state, { minLat, maxLat, minLng, maxLng }] of Object.entries(stateBoundingBoxes)) {
    if (latitude >= minLat && latitude <= maxLat && longitude >= minLng && longitude <= maxLng) {
      return state;
    }
  }

  // Return null if no matching state is found
  return null;
  };
  

  useEffect(() => {
    const fetchPoliticians = async (location) => {
      try {
        const partyFilter = `&party=${filters.Democrats ? 'D' : ''}${filters.Republicans ? 'R' : ''}`;
        console.log('Location:', location);
        console.log('Party Filter:', partyFilter);

        const response = await fetch(`http://localhost:3001/api/politicians?location=${location}${partyFilter}`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        console.log('Politicians API response:', data);

        let politiciansList = Array.isArray(data.politicians) ? data.politicians : [];

        let uniquePoliticians = [];
        const politicianNames = new Set();

        politiciansList.forEach(politician => {
          if (!politicianNames.has(politician.name)) {
            uniquePoliticians.push(politician);
            politicianNames.add(politician.name);
          }
        });

        if (filters.Local) {
          uniquePoliticians = uniquePoliticians.filter(politician => politician.location === location);
        }
        if (filters.Democrats) {
          uniquePoliticians = uniquePoliticians.filter(politician => politician.party === 'D');
        }
        if (filters.Republicans) {
          uniquePoliticians = uniquePoliticians.filter(politician => politician.party === 'R');
        }

        setPoliticians(uniquePoliticians);
      } catch (error) {
        console.error('Error fetching politicians:', error.message);
      }
    };
  
    const getLocationInfo = async (latitude, longitude) => {
      try {
        const state = getUSStateFromCoordinates(latitude, longitude);
        console.log(`User's state: ${state}`);
  
        if (state) {
          fetchPoliticians(state);
        } else {
          console.error('Unable to determine state from location');
        }
      } catch (error) {
        console.error('Error fetching location information:', error.message);
      }
    };
  
    if (filters.Local) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            console.log(`User's location: ${latitude}, ${longitude}`);
            getLocationInfo(latitude, longitude);
          },
          (error) => {
            console.error('Error getting user location:', error.message);
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser');
      }
    } else {
      fetchPoliticians();
    }
  }, [filters.Local, filters.Democrats, filters.Republicans]);

  const handlePoliticianChange = (event, value) => {
    setSelectedPolitician(value);
    console.log('Selected Politician:', value);
  };

  const handleFilterChange = (filter) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filter]: !prevFilters[filter],
    }));
  };

  const handleInitiateCallOnClick = async () => {
    try {
      if (!selectedPolitician) {
        console.error('Please choose a politician before initiating the call.');
        return;
      }
  
      console.log('Initiating call...');
      const response = await fetch('http://your-server-url/initiate-call', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          politician: {
            name: selectedPolitician.name,
            location: selectedPolitician.location,
            party: selectedPolitician.party,
            number: selectedPolitician.number,
          },
        }),
      });
  
      if (response.ok) {
        console.log('Call initiated successfully');
        // Add any additional logic you want to perform on success
      } else {
        console.error('Failed to initiate call. Server returned:', response.status, response.statusText);
        // Handle error response
      }
    } catch (error) {
      console.error('Error:', error.message);
      // Handle network or other errors
    }
  };


  return (
    <Container style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
    <Paper elevation={3} style={{ padding: '20px', marginTop: '20px', maxWidth: '900px' }}>
        <Typography variant="h4" gutterBottom>
          Help Bring our Hostages Home!
        </Typography>

        <Typography variant="body2" color="textSecondary" marginTop={3} style={{ fontStyle: 'italic' }}>
          We use conversational AI to call your politicians and demand action to bring them home.
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} marginTop={3}>
            <Autocomplete
              options={politicians}
              getOptionLabel={(option) => option.name}
              style={{ width: '100%' }}
              renderInput={(params) => (
                <TextField {...params} label="Choose Politician" />
              )}
              onChange={handlePoliticianChange}
            />
          </Grid>
          <Grid item xs={12}>
          <FormControl component="fieldset" marginTop={3}>
            <FormGroup row>
              {Object.entries(filters).map(([filter, checked]) => (
                <FormControlLabel
                  key={filter}
                  control={
                    <Checkbox
                      checked={checked}
                      onChange={() => handleFilterChange(filter)}
                    />
                  }
                  label={` ${filter.charAt(0).toUpperCase()}${filter.slice(1)}`}
                />
              ))}
            </FormGroup>
          </FormControl>
          </Grid>
        </Grid>


        <Button
          variant="outlined"
          color="primary"
          style={{ marginTop: '20px' }}
          onClick={() => handleInitiateCallOnClick()}
        >
          Initiate Call
        </Button>

        
          {/* Button to open the example phone call component */}
          <Button
            variant="outlined"
            color="secondary"
            style={{ marginTop: '20px', marginLeft: '10px' }}
            onClick={() => setExampleCallOpen(true)}
          >
            Example Call
          </Button>

          {/* Add the ExamplePhoneCall component */}
          <ExamplePhoneCall isOpen={isExampleCallOpen} onClose={() => setExampleCallOpen(false)} />

          <Button
          variant="outlined"
          color="primary"
          style={{ marginTop: '20px', marginLeft: '10px' }}
          onClick={() => setDonationOpen(true)} // Open the Donation popup
        >
          Donate
        </Button>

        <Donation isOpen={isDonationOpen} onClose={() => setDonationOpen(false)} />

      </Paper>
    </Container>
  );
};

export default App;