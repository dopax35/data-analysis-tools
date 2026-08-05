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
          data_source_url: 'https://physionet.org/content/gait-in-parkinsons-disease-1.0.0/',
          data_source_name: 'PhysioNet Gait DB'
        }));
        return res.status(200).json({ tasks: mondayTasks, source: 'monday_api' });
      }
    } catch (e) {
      console.error('Monday API fetch error:', e);
    }
  }

  // Structured Fallback Tasks
  const fallbackTasks = [
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
      skills_required: ['React', 'Next.js'], 
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
