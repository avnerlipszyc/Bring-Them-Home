st express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

app.get('/api/politicians', async (req, res) => {
  try {
    const response = await axios.get(
      'https://api.propublica.org/congress/v1/117/senate/members.json',
      {
        headers: {
          'X-API-Key': '',
        },
      }
    );

    const politicians = response.data.results[0]?.members.map((member) => ({
      name: `${member.first_name} ${member.last_name}`,
      location: member.state,
      party: member.party,
      phone: member.phone,
    }));

    res.json({ politicians });
  } catch (error) {
    console.error('Error fetching politicians:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});