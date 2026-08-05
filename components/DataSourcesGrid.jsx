import React from 'react';
import { Database, ShieldCheck, Download, ExternalLink, Activity, Eye, Smartphone, Keyboard, Layers, Cpu } from 'lucide-react';

export default function DataSourcesGrid() {
  const dataSources = [
    {
      id: 'src_physionet_gait',
      title: "PhysioNet Gait in Parkinson's Disease",
      source: 'PhysioNet Open Access',
      type: 'Raw Clinical Data',
      sensor: 'Vertical Ground Reaction Force (VGRF)',
      subjects: '93 Subjects (Parkinson & Controls)',
      license: 'CC-BY-4.0',
      url: 'https://physionet.org/content/gait-in-parkinsons-disease-1.0.0/',
      description: 'Vertical ground reaction force sensor recordings from 93 subjects walking at usual pace for 2 minutes.'
    },
    {
      id: 'src_physionet_gaitndd',
      title: 'PhysioNet Gait in Neurodegenerative Disease',
      source: 'PhysioNet Open Access',
      type: 'Raw Clinical Data',
      sensor: 'Force Sensors & Stride Timing',
      subjects: '64 Subjects (ALS, Parkinson, Huntington)',
      license: 'CC-BY-4.0',
      url: 'https://physionet.org/content/gaitndd/1.0.0/',
      description: 'Force sensor stride timing signals for assessing gait instability across neurodegenerative cohorts.'
    },
    {
      id: 'src_ppmi',
      title: 'PPMI Data & Specimens Portal',
      source: 'Michael J. Fox Foundation',
      type: 'Raw Clinical & Omics Data',
      sensor: 'SPECT Imaging, CSF, Genomics, UPDRS',
      subjects: '4,000+ Longitudinal Participants',
      license: 'PPMI Data Access Agreement',
      url: 'https://www.ppmi-info.org/access-data-specimens/download-data',
      description: 'Longitudinal clinical, SPECT neuroimaging, biological specimen, and genetic marker database.'
    },
    {
      id: 'src_openneuro',
      title: 'OpenNeuro fMRI & Oculomotor Datasets',
      source: 'OpenNeuro Portal',
      type: 'Raw Clinical & Imaging Data',
      sensor: 'fMRI, EEG & Eye-Tracking Camera',
      subjects: 'Multi-Site Open Access Cohorts',
      license: 'CC0 / Public Domain',
      url: 'https://openneuro.org/datasets/ds003412',
      description: 'Raw neuroimaging, electroencephalography, and oculomotor eye-tracking datasets.'
    },
    {
      id: 'src_zenodo',
      title: 'Zenodo Open Neurodegenerative Repositories',
      source: 'CERN / Zenodo',
      type: 'Raw Clinical Data',
      sensor: 'IMU Wearables & Acoustic Signals',
      subjects: 'Open Scientific Submissions',
      license: 'Creative Commons',
      url: 'https://zenodo.org/search?q=parkinson',
      description: 'Curated open access research datasets for tremor, speech impairment, and kinematic movement.'
    },
    {
      id: 'src_dopax_eyetracking',
      title: 'dopa-X Oculomotor Gaze Dataset',
      source: 'dopa-X Portal Hosted',
      type: 'Raw Clinical Data',
      sensor: 'High-Speed Eye Tracking Camera',
      subjects: 'Gaze Speed, Jitter & Blinking Rate',
      license: 'dopa-X Open Research',
      url: '/data/eyetracking-sample.csv',
      description: 'Gaze coordinates (X, Y), pupil diameter, and blink event time-series for gaze stability extraction.'
    },
    {
      id: 'src_dopax_mobile',
      title: 'dopa-X Mobile App Sensor Streams',
      source: 'dopa-X Portal Hosted',
      type: 'Raw Clinical Data',
      sensor: '100Hz Accelerometer & Gyroscope',
      subjects: 'Resting Tremor & Gait Asymmetry',
      license: 'dopa-X Open Research',
      url: '/data/mobile-sensors-sample.json',
      description: 'Raw 3-axis accelerometer and gyroscope motion streams collected from mobile devices.'
    }
  ];

  const mobileAppAlgorithms = [
    {
      id: 'alg_keystroke_dynamics',
      title: 'Keystroke Dynamics Cognitive & Motor Extraction',
      target: 'dopa-X Android & iOS Phone Application Engine',
      type: 'On-Device Mobile App Algorithm Development',
      inputs: 'Android / iOS System Keyboard Events (Down, Up, Keycode)',
      featuresExtracted: 'Dwell Time, Flight Time, Backspace Hesitancy Index, Typing Speed Decay',
      codeUrl: 'https://github.com/dopax35/data-analysis-tools/blob/main/algorithms/README.md#task-3-keystroke-dynamics-cognitive--motor-engine-task_203',
      description: 'This is an algorithm development project to build an on-device feature engine embedded directly inside the dopa-X Mobile App to capture cognitive slowing and fine motor tremor during everyday typing.'
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* Raw Data Repositories */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <Database size={22} className="gradient-text" />
          <h3 style={{ fontSize: '1.4rem', fontWeight: 700 }}>Open Access Clinical Data Sources</h3>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          {dataSources.map(src => (
            <div key={src.id} className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span className="badge badge-cyan" style={{ fontSize: '0.75rem' }}>{src.source}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)', fontWeight: 600 }}>{src.type}</span>
                </div>

                <h4 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '8px', color: 'var(--text-main)' }}>{src.title}</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '14px', lineHeight: 1.5 }}>{src.description}</p>

                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '16px', background: 'rgba(0,0,0,0.2)', padding: '10px', borderRadius: '6px' }}>
                  <div><strong>Sensor:</strong> <span style={{ color: 'white' }}>{src.sensor}</span></div>
                  <div><strong>Cohort:</strong> <span style={{ color: 'white' }}>{src.subjects}</span></div>
                  <div><strong>License:</strong> <span style={{ color: 'var(--accent-emerald)' }}>{src.license}</span></div>
                </div>
              </div>

              <a 
                href={src.url} 
                target={src.url.startsWith('/') ? '_self' : '_blank'} 
                rel="noreferrer" 
                download={src.url.startsWith('/')}
                className="btn-primary" 
                style={{ fontSize: '0.85rem', padding: '8px 14px', justifyContent: 'center' }}
              >
                {src.url.startsWith('/') ? <Download size={14} /> : <ExternalLink size={14} />} 
                {src.url.startsWith('/') ? 'Download Raw File' : 'Access Data Source'}
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* On-Device Mobile App Algorithm Development Tasks */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <Smartphone size={22} style={{ color: 'var(--accent-violet)' }} />
          <h3 style={{ fontSize: '1.4rem', fontWeight: 700 }}>dopa-X Mobile App Algorithm Development</h3>
        </div>

        {mobileAppAlgorithms.map(alg => (
          <div key={alg.id} className="glass-panel" style={{ padding: '28px', border: '1px solid rgba(139,92,246,0.3)', background: 'linear-gradient(135deg, rgba(139,92,246,0.08), rgba(6,182,212,0.08))' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '12px' }}>
              <div>
                <span className="badge badge-cyan" style={{ marginBottom: '6px' }}>{alg.type}</span>
                <h4 style={{ fontSize: '1.4rem', fontWeight: 800 }}>{alg.title}</h4>
              </div>

              <a 
                href={alg.codeUrl} 
                target="_blank" 
                rel="noreferrer" 
                className="btn-primary"
                style={{ fontSize: '0.85rem', padding: '10px 16px', background: 'linear-gradient(135deg, var(--accent-violet), var(--accent-cyan))' }}
              >
                <Cpu size={16} /> View Algorithm Code <ExternalLink size={12} />
              </a>
            </div>

            <p style={{ color: 'var(--text-main)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '16px' }}>
              {alg.description}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px', background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)', fontSize: '0.85rem' }}>
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block' }}>Target Application:</span>
                <strong style={{ color: 'var(--accent-cyan)' }}>{alg.target}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block' }}>Input Signals:</span>
                <strong style={{ color: 'white' }}>{alg.inputs}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block' }}>Extracted Features:</span>
                <strong style={{ color: 'var(--accent-emerald)' }}>{alg.featuresExtracted}</strong>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
