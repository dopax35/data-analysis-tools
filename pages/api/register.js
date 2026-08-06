import fs from 'fs';
import path from 'path';
import os from 'os';

const tmpDbPath = path.join(os.tmpdir(), 'dopax_community_db.json');
const cwdDbPath = path.join(process.cwd(), 'data', 'community_db.json');

const initialData = {
  users: [
    { name: 'Dr. Elena Rostova', email: 'erostova@lab.org', github: 'erostova-lab', skills: ['Python', 'Signal Processing'], refCode: 'dopax-ref-erostova-lab-8821', referralsCount: 14, badge: 'Pioneer Scout' },
    { name: 'Marcus Chen', email: 'mchen@ml.org', github: 'mchen-ml', skills: ['Machine Learning', 'PyTorch'], refCode: 'dopax-ref-mchen-ml-1029', referralsCount: 9, badge: 'Signal Master' }
  ],
  referrals: []
};

function readDb() {
  try {
    if (fs.existsSync(tmpDbPath)) {
      return JSON.parse(fs.readFileSync(tmpDbPath, 'utf8'));
    }
    if (fs.existsSync(cwdDbPath)) {
      const data = JSON.parse(fs.readFileSync(cwdDbPath, 'utf8'));
      try { fs.writeFileSync(tmpDbPath, JSON.stringify(data, null, 2)); } catch (_) {}
      return data;
    }
  } catch (e) {
    console.error('Error reading registration db:', e);
  }
  return initialData;
}

function writeDb(data) {
  try {
    fs.writeFileSync(tmpDbPath, JSON.stringify(data, null, 2));
  } catch (e) {
    try {
      const dir = path.dirname(cwdDbPath);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(cwdDbPath, JSON.stringify(data, null, 2));
    } catch (e2) {
      console.error('Write DB error:', e2);
    }
  }
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { name, email, github, skills, refCode } = req.body || {};

      if (!name || !email) {
        return res.status(400).json({ status: 'error', message: 'Name and email address are required.' });
      }

      const cleanName = name.trim();
      const cleanEmail = email.trim().toLowerCase();
      const cleanHandle = (github || '').replace('@', '').trim();
      const refSuffix = Math.random().toString(36).substring(2, 6);
      const userHandlePart = cleanHandle ? cleanHandle.toLowerCase() : cleanName.toLowerCase().replace(/[^a-z0-9]/g, '');
      const userRefCode = `dopax-ref-${userHandlePart}-${refSuffix}`;

      const db = readDb();

      // Check if user already exists by email or github handle
      const existingUser = db.users.find(u => 
        (cleanEmail && u.email.toLowerCase() === cleanEmail) ||
        (cleanHandle && u.github && u.github.toLowerCase() === cleanHandle.toLowerCase())
      );

      if (existingUser) {
        const userWithUrl = {
          ...existingUser,
          refUrl: `https://www.dopa-x.org/portal/register?ref=${existingUser.refCode}`
        };
        return res.status(200).json({ status: 'existing', isNew: false, user: userWithUrl });
      }

      const newUser = {
        name: cleanName,
        email: cleanEmail,
        github: cleanHandle,
        skills: skills || [],
        refCode: userRefCode,
        referredBy: refCode || null,
        referralsCount: 0,
        badge: 'Biomarker Scout',
        registeredAt: new Date().toISOString(),
        refUrl: `https://www.dopa-x.org/portal/register?ref=${userRefCode}`
      };

      db.users.push(newUser);

      // Increment referrer count if referredBy matches
      if (refCode) {
        const referrer = db.users.find(u => u.refCode === refCode);
        if (referrer) {
          referrer.referralsCount = (referrer.referralsCount || 0) + 1;
        }
      }

      writeDb(db);

      return res.status(201).json({ status: 'success', isNew: true, user: newUser });
    } catch (err) {
      return res.status(500).json({ status: 'error', message: err.message });
    }
  }

  if (req.method === 'GET') {
    try {
      const db = readDb();
      return res.status(200).json({ users: db.users });
    } catch (err) {
      return res.status(500).json({ status: 'error', message: err.message });
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}


