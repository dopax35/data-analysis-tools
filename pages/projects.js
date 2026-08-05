import React, { useState } from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import ProjectTaskCard from '../components/ProjectTaskCard';
import { Activity, Filter, RefreshCw, CheckCircle2, ShieldCheck, Download, GitBranch } from 'lucide-react';

export default function Projects() {
  const [selectedSkill, setSelectedSkill] = useState('All');
  
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

  const [tasks, setTasks] = useState(fallbackTasks);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    async function loadTasks() {
      try {
        const res = await fetch('/api/tasks');
        const data = await res.json();
        if (data.tasks && data.tasks.length >= 4) {
          setTasks(data.tasks);
        }
      } catch (err) {
        console.error('Error fetching tasks:', err);
      } finally {
        setLoading(false);
      }
    }
    loadTasks();
  }, []);

  const skillsList = ['All', 'Python', 'Signal Processing', 'React', 'Oculomotor', 'Kinematics', 'Mobile Algorithms', 'SQL'];

  const filteredTasks = selectedSkill === 'All'
    ? tasks
    : tasks.filter(t => t.skills_required.includes(selectedSkill));

  return (
    <>
      <Head>
        <title>Projects & Tasks Board | dopa-X Community</title>
        <meta name="description" content="Open data science tasks for Parkinson's disease digital biomarker algorithms." />
      </Head>
      <Navbar />

      <main style={{ padding: '40px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        <header style={{ marginBottom: '32px' }}>
          <div className="badge badge-cyan" style={{ marginBottom: '12px' }}>
            <Activity size={14} /> Monday.com Task Workspace
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '8px' }}>
            Clinical Biomarker <span className="gradient-text">Algorithm Projects</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '700px' }}>
            Browse open projects for signal processing, mobile app feature engines, and clinical metadata extractors. Click any card to open its project detail page and discussion forum.
          </p>
        </header>

        {/* Data Governance Banner */}
        <div className="glass-panel" style={{ padding: '20px', marginBottom: '32px', border: '1px solid rgba(16, 185, 129, 0.3)', background: 'rgba(16, 185, 129, 0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-emerald)', fontWeight: 700, fontSize: '1rem', marginBottom: '4px' }}>
            <ShieldCheck size={18} /> Raw Data Access Policy
          </div>
          <p style={{ color: 'var(--text-main)', fontSize: '0.9rem', lineHeight: 1.5 }}>
            To comply with data privacy governance, raw clinical datasets are downloaded directly from open access portals (PhysioNet, PPMI, dopa-X Portal). GitHub is exclusively for sharing developed algorithm source code.
          </p>
        </div>

        {/* Filter Bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600 }}>
            <Filter size={16} /> Filter by Skill:
          </span>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {skillsList.map((skill) => (
              <button
                key={skill}
                onClick={() => setSelectedSkill(skill)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '999px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  border: 'none',
                  cursor: 'pointer',
                  background: selectedSkill === skill ? 'var(--accent-cyan)' : 'rgba(255,255,255,0.06)',
                  color: selectedSkill === skill ? 'black' : 'var(--text-muted)',
                  transition: 'all 0.2s ease'
                }}
              >
                {skill}
              </button>
            ))}
          </div>
        </div>

        {/* Tasks Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
            <RefreshCw size={24} className="animate-spin" style={{ marginBottom: '8px' }} />
            <p>Loading projects from Monday.com board...</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            {filteredTasks.map((task) => (
              <ProjectTaskCard key={task.task_id} task={task} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}
