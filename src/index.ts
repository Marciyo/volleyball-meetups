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
        title: 'React Meetup',
        description: 'Discussing the latest in React development.',
        price: 20,
        location: 'New York',
        participants: ['Alice', 'Bob'],
    },
    {
        id: '2',
        title: 'Node.js Workshop',
        description: 'Hands-on workshop on Node.js.',
        price: 30,
        location: 'San Francisco',
        participants: ['Charlie'],
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

app.listen(3000, () => {
  console.log('API running on http://localhost:3000');
});
