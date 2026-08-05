import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar';
import ProjectDiscussion from '../../components/ProjectDiscussion';
import ScheduleTutorialModal from '../../components/ScheduleTutorialModal';
import { Download, ShieldCheck, GitBranch, Video, CheckCircle2, ArrowLeft, Code } from 'lucide-react';

const projectsMap = {
  task_201: {
    task_id: 'task_201',
    name: 'Eye-Tracking Biomarker & Gaze Dynamics Pipeline',
    category: 'Oculomotor Biomarkers',
    description: 'Clean raw eye-tracking signals and extract gaze stability, gaze speed, jitter, fixation duration, and blinking rate features for Parkinson\'s risk assessment.',
    data_download_url: '/data/eyetracking-sample.csv',
    data_download_name: 'eyetracking-sample.csv (Hosted on dopa-X Portal)',
    steps: [
      'Step 1: Clean raw timestamps & filter out blink artifacts (0mm pupil diameter)',
      'Step 2: Calculate gaze stability index (variance of gaze_x, gaze_y during fixation)',
      'Step 3: Compute gaze speed (angular velocity in deg/sec across consecutive gaze samples)',
      'Step 4: Extract micro-saccadic gaze jitter (high-frequency noise in 20-50Hz band)',
      'Step 5: Compute blinking rate (blinks per minute) and average duration'
    ]
  },
  task_202: {
    task_id: 'task_202',
    name: 'dopa-X Mobile App Sensor Biomarkers',
    category: 'Kinematic Sensor Biomarkers',
    description: 'Clean accelerometer and gyroscope time-series streams from the dopa-X mobile application and extract gait stride asymmetry, postural sway, and tapping tremor frequency.',
    data_download_url: '/data/mobile-sensors-sample.json',
    data_download_name: 'mobile-sensors-sample.json (Hosted on dopa-X Portal)',
    steps: [
      'Step 1: Synchronize accelerometer & gyroscope 100Hz sensor streams',
      'Step 2: Filter high-frequency noise using 4th order Butterworth filter',
      'Step 3: Extract gait stride timing asymmetry & stance phase duration',
      'Step 4: Compute postural sway velocity & 3-8Hz resting tremor spectral power'
    ]
  },
  task_203: {
    task_id: 'task_203',
    name: 'Keystroke Dynamics Cognitive & Motor Extraction',
    category: 'Cognitive & Typing Dynamics',
    description: 'Extract cognitive processing speed and fine motor impairment metrics from Android and iOS keyboard timing logs (dwell time, flight time, backspace error rates).',
    data_download_url: '/data/keystroke-dynamics-sample.json',
    data_download_name: 'keystroke-dynamics-sample.json (Hosted on dopa-X Portal)',
    steps: [
      'Step 1: Parse key press/release timestamps and calculate dwell time (press to release)',
      'Step 2: Compute flight time (release of key N to press of key N+1)',
      'Step 3: Extract backspace correction frequency as an index of cognitive hesitancy',
      'Step 4: Model typing speed decay over 60-second typing sessions'
    ]
  }
};

export default function ProjectDetail() {
  const router = useRouter();
  const { id } = router.query;
  const project = projectsMap[id] || projectsMap['task_201'];
  const [isTutorialModalOpen, setIsTutorialModalOpen] = useState(false);

  return (
    <>
      <Head>
        <title>{project.name} | dopa-X Community</title>
      </Head>
      <Navbar />

      <main style={{ padding: '40px 24px', maxWidth: '1100px', margin: '0 auto' }}>
        <a href="/projects" style={{ color: 'var(--accent-cyan)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '24px', fontSize: '0.9rem' }}>
          <ArrowLeft size={16} /> Back to Projects Task Board
        </a>

        {/* Project Overview Header */}
        <header className="glass-panel" style={{ padding: '32px', marginBottom: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '16px' }}>
            <div>
              <span className="badge badge-cyan" style={{ marginBottom: '8px' }}>{project.category}</span>
              <h1 style={{ fontSize: '2.2rem', fontWeight: 800 }}>{project.name}</h1>
            </div>

            <button onClick={() => setIsTutorialModalOpen(true)} className="btn-primary" style={{ padding: '10px 16px', fontSize: '0.85rem' }}>
              <Video size={16} /> Schedule Tutorial on Data Structure
            </button>
          </div>

          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '24px' }}>
            {project.description}
          </p>

          {/* Raw Data Download Box */}
          <div style={{ background: 'rgba(6, 182, 212, 0.08)', border: '1px solid rgba(6, 182, 212, 0.2)', padding: '20px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <span style={{ fontSize: '0.85rem', color: 'var(--accent-cyan)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ShieldCheck size={16} /> Raw Clinical Dataset Download (dopa-X Portal Hosted)
              </span>
              <strong style={{ display: 'block', fontSize: '1rem', color: 'white', marginTop: '4px' }}>
                {project.data_download_name}
              </strong>
            </div>

            <a href={project.data_download_url} download className="btn-primary">
              <Download size={16} /> Download Raw Data File
            </a>
          </div>
        </header>

        {/* Pipeline Steps */}
        <section className="glass-panel" style={{ padding: '28px', marginBottom: '32px' }}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Code size={20} className="gradient-text" /> Algorithm Pipeline Steps
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {project.steps.map((step, idx) => (
              <div key={idx} style={{ background: 'rgba(0,0,0,0.25)', padding: '12px 16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', fontSize: '0.9rem', color: 'var(--text-main)' }}>
                {step}
              </div>
            ))}
          </div>
        </section>

        {/* Discussion Forum & Shared Results */}
        <ProjectDiscussion taskId={project.task_id} taskName={project.name} />

        <ScheduleTutorialModal 
          isOpen={isTutorialModalOpen}
          onClose={() => setIsTutorialModalOpen(false)}
          defaultTopic={`${project.name} Data Structure`}
        />
      </main>
    </>
  );
}
