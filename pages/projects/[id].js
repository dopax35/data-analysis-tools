import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar';
import ProjectDiscussion from '../../components/ProjectDiscussion';
import ScheduleTutorialModal from '../../components/ScheduleTutorialModal';
import { Download, ShieldCheck, GitBranch, Video, CheckCircle2, ArrowLeft, Code, ExternalLink } from 'lucide-react';

const projectsMap = {
  task_201: {
    task_id: 'task_201',
    name: 'Eye-Tracking Biomarker & Gaze Dynamics Pipeline',
    category: 'Oculomotor Biomarkers',
    description: 'Clean raw eye-tracking signals and extract gaze stability (BCEA), gaze speed (deg/sec), micro-saccadic jitter (20-50Hz power), fixation duration, and blinking rate features.',
    data_download_url: '/data/eyetracking-sample.csv',
    data_download_name: 'eyetracking-sample.csv (Hosted on dopa-X Portal)',
    steps: [
      'Step 1: Clean raw timestamps & filter out blink artifacts (0mm pupil diameter)',
      'Step 2: Calculate gaze stability index (variance & BCEA during fixation)',
      'Step 3: Compute gaze speed (angular velocity in deg/sec across consecutive gaze samples)',
      'Step 4: Extract micro-saccadic gaze jitter (high-frequency noise in 20-50Hz band)',
      'Step 5: Compute blinking rate (blinks per minute) and average duration'
    ]
  },
  task_202: {
    task_id: 'task_202',
    name: 'dopa-X Mobile App Sensor Biomarkers',
    category: 'Kinematic Sensor Biomarkers',
    description: 'Clean 100Hz accelerometer and gyroscope time-series streams from the dopa-X mobile application and extract gait stride timing asymmetry, stance phase duration, and 3-8Hz resting tremor spectral power.',
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
    name: 'Keystroke Dynamics Cognitive & Motor Extraction Engine',
    category: 'Mobile Phone App Algorithm Engine',
    description: 'Algorithm development project to build an on-device feature engine embedded directly into the dopa-X Android & iOS Mobile Application. Extracts dwell time, flight time, backspace correction hesitancy index, and cognitive slowing during everyday keyboard usage.',
    data_download_url: 'https://github.com/dopax35/data-analysis-tools/blob/main/algorithms/keystroke_dynamics_pipeline.py',
    data_download_name: 'keystroke_dynamics_pipeline.py (Mobile App Source Code)',
    is_external_or_code: true,
    steps: [
      'Step 1: Capture Android/iOS system keyboard events (KeyDown, KeyUp, KeyCode)',
      'Step 2: Calculate dwell time (press-to-release) & flight time (release-to-press)',
      'Step 3: Extract backspace correction frequency as an index of cognitive hesitancy',
      'Step 4: Embed lightweight feature extraction pipeline inside dopa-X mobile application'
    ]
  },
  task_101: {
    task_id: 'task_101',
    name: 'Implement Gait FFT Feature Pipeline',
    category: 'Gait Kinematics',
    description: 'Build Fast Fourier Transform (FFT) signal processing algorithms on PhysioNet VGRF force sensor recordings to extract stride cadences and postural instability markers.',
    data_download_url: 'https://physionet.org/content/gait-in-parkinsons-disease-1.0.0/',
    data_download_name: 'PhysioNet Gait in Parkinson\'s Disease Database',
    is_external_or_code: true,
    steps: [
      'Step 1: Ingest 8 vertical ground reaction force (VGRF) sensor streams',
      'Step 2: Compute Fast Fourier Transform (FFT) spectral power density',
      'Step 3: Extract peak stride frequencies and power distribution ratios',
      'Step 4: Validate stride time variability against clinical UPDRS gait sub-scores'
    ]
  },
  task_102: {
    task_id: 'task_102',
    name: 'Build PhysioNet Signal Spectrogram Visualizer Component',
    category: 'React Data Visualization',
    description: 'Develop interactive React components using Canvas / D3.js to render short-time Fourier transform (STFT) spectrograms of gait force sensor recordings.',
    data_download_url: 'https://physionet.org/content/gait-in-parkinsons-disease-1.0.0/',
    data_download_name: 'PhysioNet Gait Signals API',
    is_external_or_code: true,
    steps: [
      'Step 1: Fetch raw VGRF sensor arrays from PhysioNet backend',
      'Step 2: Compute STFT spectrogram matrix over rolling 2-second windows',
      'Step 3: Render responsive HTML5 Canvas heatmap with HSL color scaling',
      'Step 4: Integrate zoom and temporal pan controls for clinical researchers'
    ]
  },
  task_103: {
    task_id: 'task_103',
    name: 'PPMI Clinical Metadata Schema Extractor',
    category: 'Clinical Metadata & Genomics',
    description: 'Design automated SQL & Python schema extractors for the Parkinson\'s Progression Markers Initiative (PPMI) database covering SPECT imaging, CSF biomarkers, and genetic variants.',
    data_download_url: 'https://www.ppmi-info.org/access-data-specimens/download-data',
    data_download_name: 'PPMI Data & Specimens Portal (Michael J. Fox Foundation)',
    is_external_or_code: true,
    steps: [
      'Step 1: Parse PPMI longitudinal clinical CSV & DICOM imaging metadata',
      'Step 2: Normalize UPDRS motor scores, DaTSCAN SPECT binding ratios, and CSF alpha-synuclein',
      'Step 3: Build relational schema mapping for PostgreSQL integration',
      'Step 4: Output standardized JSON-LD clinical metadata records'
    ]
  },
  task_104: {
    task_id: 'task_104',
    name: 'Tremor Spectral Density Algorithm Validation',
    category: 'Tremor Analysis',
    description: 'Cross-validate spectral density estimation algorithms against PhysioNet Gait in Neurodegenerative Disease database (ALS, Parkinson\'s, Huntington\'s cohorts).',
    data_download_url: 'https://physionet.org/content/gaitndd/1.0.0/',
    data_download_name: 'PhysioNet Gait in Neurodegenerative Disease Database',
    is_external_or_code: true,
    steps: [
      'Step 1: Preprocess multi-cohort force sensor stride signals',
      'Step 2: Apply Welch periodogram spectral estimation',
      'Step 3: Measure peak power ratio in 3-8Hz resting tremor vs 8-12Hz action tremor bands',
      'Step 4: Compute diagnostic sensitivity & specificity across disease groups'
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

          {/* Raw Data Download / Code Link Box */}
          <div style={{ background: 'rgba(6, 182, 212, 0.08)', border: '1px solid rgba(6, 182, 212, 0.2)', padding: '20px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <span style={{ fontSize: '0.85rem', color: 'var(--accent-cyan)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ShieldCheck size={16} /> {project.is_external_or_code ? 'Source Resource / Code Link:' : 'Raw Clinical Dataset Download (Portal Hosted):'}
              </span>
              <strong style={{ display: 'block', fontSize: '1rem', color: 'white', marginTop: '4px' }}>
                {project.data_download_name}
              </strong>
            </div>

            <a 
              href={project.data_download_url} 
              target={project.data_download_url.startsWith('/') ? '_self' : '_blank'}
              rel="noreferrer"
              download={project.data_download_url.startsWith('/')} 
              className="btn-primary"
            >
              {project.data_download_url.startsWith('/') ? <Download size={16} /> : <ExternalLink size={16} />} 
              {project.data_download_url.startsWith('/') ? 'Download Raw File' : 'Access Data / Code Resource'}
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
