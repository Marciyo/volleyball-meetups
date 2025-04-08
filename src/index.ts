import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

type Meetup = {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  participants: string[]; // user IDs or names
};

const meetups: Meetup[] = [
    {
        id: '1',
        title: 'Beach Volleyball Meetup',
        description: 'Casual beach volleyball games for all skill levels.',
        price: 1000,
        location: 'Odaiba Beach, Tokyo',
        participants: ['Alice', 'Bob'],
    },
    {
        id: '2',
        title: 'Indoor Volleyball Tournament',
        description: 'Competitive indoor volleyball tournament.',
        price: 2500,
        location: 'Tokyo Metropolitan Gymnasium',
        participants: ['Charlie', 'Dave'],
    },
    {
        id: '3',
        title: 'Beach Volleyball Training Camp',
        description: 'Intensive training camp for beach volleyball enthusiasts.',
        price: 5000,
        location: 'Shonan Beach, Kanagawa',
        participants: ['Eve', 'Frank'],
    },
    {
        id: '4',
        title: 'Beach Volleyball Social Event',
        description: 'Social event for beach volleyball players to meet and mingle.',
        price: 1500,
        location: 'Enoshima Beach, Kanagawa',
        participants: ['Grace', 'Heidi'],
    },
];

app.get('/meetups', (req, res) => {
  res.json(meetups);
});

app.post('/meetups', (req, res) => {
  const newMeetup: Meetup = {
    id: Date.now().toString(),
    ...req.body,
    participants: [],
  };
  meetups.push(newMeetup);
  res.status(201).json(newMeetup);
});

const PORT = process.env.PORT;
const HOST = process.env.RENDER_EXTERNAL_URL;

app.listen(PORT, () => {
  console.log(`API running on ${HOST}:${PORT}`);
});