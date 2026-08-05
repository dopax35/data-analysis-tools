export default async function handler(req, res) {
  const api_key = process.env.MONDAY_API_KEY;
  const board_id = process.env.MONDAY_BOARD_ID;

  if (api_key && board_id) {
    try {
      const response = await fetch('https://api.monday.com/v2', {
        method: 'POST',
        headers: {
          'Authorization': api_key,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: `
            query ($boardId: [ID!]) {
              boards (ids: $boardId) {
                items_page {
                  items {
                    id
                    name
                    state
                  }
                }
              }
            }
          `,
          variables: { boardId: [board_id] }
        })
      });

      const data = await response.json();
      if (response.ok && !data.errors) {
        const items = data.data.boards[0]?.items_page?.items || [];
        const mondayTasks = items.map(item => ({
          task_id: item.id,
          name: item.name,
          skills_required: ['Python', 'Signal Processing'],
          difficulty: 'Intermediate',
          data_source_url: '/data/eyetracking-sample.csv',
          data_source_name: 'dopa-X Portal Clinical Data'
        }));
        return res.status(200).json({ tasks: mondayTasks, source: 'monday_api' });
      }
    } catch (e) {
      console.error('Monday API fetch error:', e);
    }
  }

  // Primary Clinical Projects Tasks
  const fallbackTasks = [
    { 
      task_id: 'task_201', 
      name: 'Eye-Tracking Biomarker & Gaze Dynamics Pipeline', 
      skills_required: ['Python', 'Signal Processing', 'Oculomotor'], 
      difficulty: 'Intermediate',
      data_source_url: '/data/eyetracking-sample.csv',
      data_source_name: 'dopa-X Eye-Tracking Dataset (Gaze Speed, Jitter & Blinking Rate)'
    },
    { 
      task_id: 'task_202', 
      name: 'dopa-X Mobile App Sensor Biomarkers', 
      skills_required: ['Python', 'Signal Processing', 'Kinematics'], 
      difficulty: 'Intermediate',
      data_source_url: '/data/mobile-sensors-sample.json',
      data_source_name: 'dopa-X Mobile App Accelerometer & Gyroscope Streams'
    },
    { 
      task_id: 'task_203', 
      name: 'Keystroke Dynamics Cognitive & Motor Extraction', 
      skills_required: ['Python', 'Machine Learning', 'Cognitive Sciences'], 
      difficulty: 'Advanced',
      data_source_url: '/data/keystroke-dynamics-sample.json',
      data_source_name: 'Android & iOS Keyboard Timing Logs (Dwell & Flight Time)'
    },
    { 
      task_id: 'task_101', 
      name: 'Implement Gait FFT Feature Pipeline', 
      skills_required: ['Python', 'Signal Processing'], 
      difficulty: 'Intermediate',
      data_source_url: 'https://physionet.org/content/gait-in-parkinsons-disease-1.0.0/',
      data_source_name: 'PhysioNet Gait in Parkinson\'s Database'
    }
  ];

  return res.status(200).json({ tasks: fallbackTasks, source: 'cached' });
}
