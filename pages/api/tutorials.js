import fs from 'fs';
import path from 'path';
import os from 'os';

const tmpTutorialsDbPath = path.join(os.tmpdir(), 'dopax_tutorials_db.json');
const cwdTutorialsDbPath = path.join(process.cwd(), 'data', 'tutorials_db.json');

const initialData = {
  sessions: [
    {
      id: 'tut_101',
      topic: 'Eye-Tracking Data Format & Gaze Stability Extraction',
      speaker: 'dopa-X Lead Neuroscientist',
      date: '2026-08-10',
      time: '15:00 UTC',
      attendeesCount: 28,
      zoomUrl: 'https://www.dopa-x.org/portal/tutorials/zoom-tut-101'
    },
    {
      id: 'tut_102',
      topic: 'Mobile Accelerometer & Gyroscope Signal Preprocessing',
      speaker: 'dopa-X Senior SRE',
      date: '2026-08-14',
      time: '16:00 UTC',
      attendeesCount: 19,
      zoomUrl: 'https://www.dopa-x.org/portal/tutorials/zoom-tut-102'
    }
  ],
  bookings: []
};

function readDb() {
  try {
    if (fs.existsSync(tmpTutorialsDbPath)) {
      return JSON.parse(fs.readFileSync(tmpTutorialsDbPath, 'utf8'));
    }
    if (fs.existsSync(cwdTutorialsDbPath)) {
      const data = JSON.parse(fs.readFileSync(cwdTutorialsDbPath, 'utf8'));
      try { fs.writeFileSync(tmpTutorialsDbPath, JSON.stringify(data, null, 2)); } catch (_) {}
      return data;
    }
  } catch (e) {
    console.error('Error reading tutorials db:', e);
  }
  return initialData;
}

function writeDb(data) {
  try {
    fs.writeFileSync(tmpTutorialsDbPath, JSON.stringify(data, null, 2));
  } catch (e) {
    try {
      const dir = path.dirname(cwdTutorialsDbPath);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(cwdTutorialsDbPath, JSON.stringify(data, null, 2));
    } catch (e2) {
      console.error('Write tutorials db error:', e2);
    }
  }
}

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const db = readDb();
      return res.status(200).json({ sessions: db.sessions, bookings: db.bookings });
    } catch (err) {
      return res.status(500).json({ status: 'error', message: err.message });
    }
  }

  if (req.method === 'POST') {
    try {
      const { name, email, topic, preferredDate, preferredTime, question } = req.body || {};
      const db = readDb();

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
      writeDb(db);

      return res.status(201).json({ status: 'success', booking: newBooking });
    } catch (err) {
      return res.status(500).json({ status: 'error', message: err.message });
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}

