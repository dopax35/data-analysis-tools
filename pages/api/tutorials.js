import fs from 'fs';
import path from 'path';

const tutorialsDbPath = path.join(process.cwd(), 'data', 'tutorials_db.json');

function ensureDb() {
  const dir = path.dirname(tutorialsDbPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(tutorialsDbPath)) {
    const initialData = {
      sessions: [
        {
          id: 'tut_101',
          topic: 'Eye-Tracking Data Format & Gaze Stability Extraction',
          speaker: 'dopa-X Lead Neuroscientist',
          date: '2026-08-10',
          time: '15:00 UTC',
          attendeesCount: 28,
          zoomUrl: 'https://dopa-x.vercel.app/tutorials/zoom-tut-101'
        },
        {
          id: 'tut_102',
          topic: 'Mobile Accelerometer & Gyroscope Signal Preprocessing',
          speaker: 'dopa-X Senior SRE',
          date: '2026-08-14',
          time: '16:00 UTC',
          attendeesCount: 19,
          zoomUrl: 'https://dopa-x.vercel.app/tutorials/zoom-tut-102'
        }
      ],
      bookings: []
    };
    fs.writeFileSync(tutorialsDbPath, JSON.stringify(initialData, null, 2));
  }
}

export default async function handler(req, res) {
  ensureDb();

  if (req.method === 'GET') {
    try {
      const raw = fs.readFileSync(tutorialsDbPath, 'utf8');
      const db = JSON.parse(raw);
      return res.status(200).json({ sessions: db.sessions, bookings: db.bookings });
    } catch (err) {
      return res.status(500).json({ status: 'error', message: err.message });
    }
  }

  if (req.method === 'POST') {
    try {
      const { name, email, topic, preferredDate, preferredTime, question } = req.body;
      const raw = fs.readFileSync(tutorialsDbPath, 'utf8');
      const db = JSON.parse(raw);

      const newBooking = {
        id: `book_${Date.now()}`,
        name,
        email,
        topic,
        preferredDate,
        preferredTime,
        question,
        status: 'scheduled',
        confirmedAt: new Date().toISOString()
      };

      db.bookings.push(newBooking);
      fs.writeFileSync(tutorialsDbPath, JSON.stringify(db, null, 2));

      return res.status(201).json({ status: 'success', booking: newBooking });
    } catch (err) {
      return res.status(500).json({ status: 'error', message: err.message });
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
