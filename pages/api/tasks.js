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

  // Primary Clinical Projects Tasks (7 active tasks)
  const fallbackTasks = [
    { 
      task_id: 'task_201', 
      name: 'Eye-Tracking Biomarker & Gaze Dynamics Pipeline', 
      skills_required: ['Python', 'Signal Processing', 'Oculomotor'], 
      difficulty: 'Intermediate',
      data_source_url: '/data/eyetracking-sample.csv',
      data_source_name: 'dopa-X Portal Eye-Tracking Dataset (Gaze Speed & Jitter)'
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
      name: 'Keystroke Dynamics Cognitive & Motor Extraction Engine', 
      skills_required: ['Python', 'Kotlin/Swift', 'Mobile Algorithms'], 
      difficulty: 'Advanced',
      data_source_url: 'https://github.com/dopax35/data-analysis-tools/blob/main/algorithms/keystroke_dynamics_pipeline.py',
      data_source_name: 'dopa-X Phone App On-Device Algorithm Engine'
    },
    { 
      task_id: 'task_101', 
      name: 'Implement Gait FFT Feature Pipeline', 
      skills_required: ['Python', 'Signal Processing'], 
      difficulty: 'Intermediate',
      data_source_url: 'https://physionet.org/content/gait-in-parkinsons-disease-1.0.0/',
      data_source_name: 'PhysioNet Gait in Parkinson\'s Database'
    },
    { 
      task_id: 'task_102', 
      name: 'Build PhysioNet Signal Spectrogram Visualizer Component', 
      skills_required: ['React', 'Next.js', 'D3.js'], 
      difficulty: 'Beginner',
      data_source_url: 'https://physionet.org/content/gait-in-parkinsons-disease-1.0.0/',
      data_source_name: 'PhysioNet Gait Signals API'
    },
    { 
      task_id: 'task_103', 
      name: 'PPMI Clinical Metadata Schema Extractor', 
      skills_required: ['Python', 'SQL', 'PostgreSQL'], 
      difficulty: 'Advanced',
      data_source_url: 'https://www.ppmi-info.org/access-data-specimens/download-data',
      data_source_name: 'PPMI Data & Specimens Portal'
    },
    { 
      task_id: 'task_104', 
      name: 'Tremor Spectral Density Algorithm Validation', 
      skills_required: ['Signal Processing', 'Python'], 
      difficulty: 'Advanced',
      data_source_url: 'https://physionet.org/content/gaitndd/1.0.0/',
      data_source_name: 'PhysioNet Gait in Neurodegenerative Disease'
    }
  ];

  return res.status(200).json({ tasks: fallbackTasks, source: 'cached' });
}
