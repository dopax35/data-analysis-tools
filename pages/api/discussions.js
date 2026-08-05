import fs from 'fs';
import path from 'path';

const discussionsDbPath = path.join(process.cwd(), 'data', 'discussions_db.json');

function ensureDb() {
  const dir = path.dirname(discussionsDbPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(discussionsDbPath)) {
    const initialData = {
      task_201: [
        {
          id: 'disc_101',
          author: 'Dr. Elena Rostova',
          handle: 'erostova-lab',
          type: 'question',
          content: 'What algorithm is best suited for filtering micro-saccades vs blinks in raw eye-tracking signals?',
          timestamp: '2026-08-05T14:20:00Z',
          replies: [
            { author: 'Marcus Chen', handle: 'mchen-ml', content: 'We found Savitzky-Golay filtering with a window of 15ms works best for isolating gaze jitter.', timestamp: '2026-08-05T15:10:00Z' }
          ]
        },
        {
          id: 'disc_102',
          author: 'Sofia Al-Mansoor',
          handle: 'sofia-bio',
          type: 'result',
          title: 'Gaze Speed Feature Extraction Benchmark',
          content: 'Extracted gaze speed (deg/sec) across 50 Parkinson subjects. Achieved 94.2% correlation with MDS-UPDRS motor scores.',
          metric: 'AUC: 0.942',
          timestamp: '2026-08-05T16:00:00Z',
          replies: []
        }
      ],
      task_202: [],
      task_203: []
    };
    fs.writeFileSync(discussionsDbPath, JSON.stringify(initialData, null, 2));
  }
}

export default async function handler(req, res) {
  ensureDb();
  const { taskId } = req.query;

  if (req.method === 'GET') {
    try {
      const raw = fs.readFileSync(discussionsDbPath, 'utf8');
      const db = JSON.parse(raw);
      const items = db[taskId] || [];
      return res.status(200).json({ discussions: items });
    } catch (err) {
      return res.status(500).json({ status: 'error', message: err.message });
    }
  }

  if (req.method === 'POST') {
    try {
      const { taskId, author, handle, type, title, content, metric } = req.body;
      const raw = fs.readFileSync(discussionsDbPath, 'utf8');
      const db = JSON.parse(raw);

      if (!db[taskId]) {
        db[taskId] = [];
      }

      const newPost = {
        id: `disc_${Date.now()}`,
        author: author || 'Volunteer Researcher',
        handle: handle || 'anonymous',
        type: type || 'question', // 'question', 'result', 'inquiry'
        title: title || '',
        content,
        metric: metric || '',
        timestamp: new Date().toISOString(),
        replies: []
      };

      db[taskId].unshift(newPost);
      fs.writeFileSync(discussionsDbPath, JSON.stringify(db, null, 2));

      return res.status(201).json({ status: 'success', post: newPost });
    } catch (err) {
      return res.status(500).json({ status: 'error', message: err.message });
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
