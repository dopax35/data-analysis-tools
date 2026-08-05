import fs from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'community_db.json');

function ensureDb() {
  const dir = path.dirname(dbPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(dbPath)) {
    const initialData = {
      users: [
        { name: 'Dr. Elena Rostova', email: 'erostova@lab.org', github: 'erostova-lab', skills: ['Python', 'Signal Processing'], refCode: 'dopax-ref-erostova-lab-8821', referralsCount: 14, badge: 'Pioneer Scout' },
        { name: 'Marcus Chen', email: 'mchen@ml.org', github: 'mchen-ml', skills: ['Machine Learning', 'PyTorch'], refCode: 'dopax-ref-mchen-ml-1029', referralsCount: 9, badge: 'Signal Master' }
      ],
      referrals: []
    };
    fs.writeFileSync(dbPath, JSON.stringify(initialData, null, 2));
  }
}

export default async function handler(req, res) {
  ensureDb();

  if (req.method === 'POST') {
    try {
      const { name, email, github, skills, refCode } = req.body;
      const cleanHandle = (github || '').replace('@', '').trim();
      const userRefCode = `dopax-ref-${cleanHandle.toLowerCase()}-${Math.random().toString(36).substring(2, 6)}`;

      const dbRaw = fs.readFileSync(dbPath, 'utf8');
      const db = JSON.parse(dbRaw);

      // Check if user already exists
      const existingUser = db.users.find(u => u.github.toLowerCase() === cleanHandle.toLowerCase() || u.email.toLowerCase() === email.toLowerCase());

      if (existingUser) {
        return res.status(200).json({ status: 'existing', user: existingUser });
      }

      const newUser = {
        name,
        email,
        github: cleanHandle,
        skills: skills || [],
        refCode: userRefCode,
        referredBy: refCode || null,
        referralsCount: 0,
        badge: 'Biomarker Scout',
        registeredAt: new Date().toISOString()
      };

      db.users.push(newUser);

      // Increment referrer count if referredBy matches
      if (refCode) {
        const referrer = db.users.find(u => u.refCode === refCode);
        if (referrer) {
          referrer.referralsCount = (referrer.referralsCount || 0) + 1;
        }
      }

      fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));

      return res.status(201).json({ status: 'success', user: newUser });
    } catch (err) {
      return res.status(500).json({ status: 'error', message: err.message });
    }
  }

  if (req.method === 'GET') {
    try {
      const dbRaw = fs.readFileSync(dbPath, 'utf8');
      const db = JSON.parse(dbRaw);
      return res.status(200).json({ users: db.users });
    } catch (err) {
      return res.status(500).json({ status: 'error', message: err.message });
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
