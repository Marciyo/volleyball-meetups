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

const meetups: Meetup[] = [];

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

app.post('/meetups/:id/attendance', (req, res) => {
  const { id } = req.params;
  const { name, attending } = req.body;
  const meetup = meetups.find(m => m.id === id);
  if (!meetup) return res.status(404).send('Meetup not found');

  if (attending && !meetup.participants.includes(name)) {
    meetup.participants.push(name);
  } else if (!attending) {
    meetup.participants = meetup.participants.filter(p => p !== name);
  }

  res.json(meetup);
});

app.listen(3000, () => {
  console.log('API running on http://localhost:3000');
});
