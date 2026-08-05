import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { 
  ShieldCheck, Download, Code, GitPullRequest, ExternalLink, 
  MessageSquare, UserPlus, Share2, Video, Calendar, Send, 
  CheckCircle2, Users, Copy, Sparkles, Tag, ArrowRight 
} from 'lucide-react';

export default function StandaloneResearchHub() {
  const [selectedTask, setSelectedTask] = useState('task_201');
  const [discussions, setDiscussions] = useState([]);
  const [discTab, setDiscTab] = useState('all');
  const [discForm, setDiscForm] = useState({ author: '', handle: '', type: 'question', title: '', content: '', metric: '' });
  const [discSubmitted, setDiscSubmitted] = useState(false);

  // Volunteer Registration State
  const [regForm, setRegForm] = useState({ name: '', email: '', github: '', skills: ['Python'] });
  const [registeredUser, setRegisteredUser] = useState(null);
  const [copiedRef, setCopiedRef] = useState(false);

  // Tutorial Modal State
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);
  const [tutForm, setTutForm] = useState({ name: '', email: '', topic: 'Eye-Tracking Data Format', preferredDate: '', preferredTime: '15:00 UTC', question: '' });
  const [tutSubmitted, setTutSubmitted] = useState(false);

  const projects = [
    {
      task_id: 'task_201',
      name: 'Eye-Tracking Biomarker & Gaze Dynamics Pipeline',
      category: 'Oculomotor Biomarkers',
      description: 'Clean raw eye-tracking signals and extract gaze stability, gaze speed, gaze jitter, fixation duration, and blinking rate features.',
      data_url: '/data/eyetracking-sample.csv',
      data_name: 'eyetracking-sample.csv (Portal Raw Data)',
      skills: ['Python', 'Signal Processing', 'Oculomotor'],
      steps: [
        'Step 1: Clean raw timestamps & filter out blink artifacts (0mm pupil diameter)',
        'Step 2: Calculate gaze stability index (variance of gaze_x, gaze_y during fixation)',
        'Step 3: Compute gaze speed (angular velocity in deg/sec across consecutive samples)',
        'Step 4: Extract micro-saccadic gaze jitter (high-frequency noise in 20-50Hz band)',
        'Step 5: Compute blinking rate (blinks per minute) and average duration'
      ]
    },
    {
      task_id: 'task_202',
      name: 'dopa-X Mobile App Sensor Biomarkers',
      category: 'Kinematic Sensor Biomarkers',
      description: 'Clean accelerometer and gyroscope time-series streams from the dopa-X mobile application and extract gait stride asymmetry, postural sway, and tapping tremor frequency.',
      data_url: '/data/mobile-sensors-sample.json',
      data_name: 'mobile-sensors-sample.json (Portal Raw Data)',
      skills: ['Python', 'Signal Processing', 'Kinematics'],
      steps: [
        'Step 1: Synchronize accelerometer & gyroscope 100Hz sensor streams',
        'Step 2: Filter high-frequency noise using 4th order Butterworth filter',
        'Step 3: Extract gait stride timing asymmetry & stance phase duration',
        'Step 4: Compute postural sway velocity & 3-8Hz resting tremor spectral power'
      ]
    },
    {
      task_id: 'task_203',
      name: 'Keystroke Dynamics Cognitive & Motor Extraction',
      category: 'Mobile Phone App Algorithm Engine',
      description: 'Algorithm development project to build an on-device feature engine embedded directly into the dopa-X Android & iOS Mobile Application to extract dwell time, flight time, backspace hesitancy index, and cognitive slowing during everyday keyboard usage.',
      data_url: 'https://github.com/dopax35/data-analysis-tools/blob/main/algorithms/keystroke_dynamics_pipeline.py',
      data_name: 'keystroke_dynamics_pipeline.py (Mobile App Algorithm Source Code)',
      is_algorithm_code: true,
      skills: ['Python', 'Kotlin/Swift', 'Mobile Algorithms'],
      steps: [
        'Step 1: Capture Android/iOS system keyboard events (KeyDown, KeyUp, KeyCode)',
        'Step 2: Calculate dwell time (press-to-release) & flight time (release-to-press)',
        'Step 3: Extract backspace correction frequency as an index of cognitive hesitancy',
        'Step 4: Embed lightweight feature extraction pipeline inside dopa-X mobile application'
      ]
    }
  ];

  const activeProject = projects.find(p => p.task_id === selectedTask) || projects[0];

  useEffect(() => {
    fetchDiscussions(selectedTask);
  }, [selectedTask]);

  async function fetchDiscussions(taskId) {
    try {
      const res = await fetch(`/api/discussions?taskId=${taskId}`);
      const data = await res.json();
      if (data.discussions) {
        setDiscussions(data.discussions);
      }
    } catch (e) {
      console.error('Fetch discussions error:', e);
    }
  }

  async function handleDiscSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch(`/api/discussions?taskId=${selectedTask}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ taskId: selectedTask, ...discForm })
      });
      if (res.ok) {
        setDiscSubmitted(true);
        setDiscForm({ author: '', handle: '', type: 'question', title: '', content: '', metric: '' });
        fetchDiscussions(selectedTask);
        setTimeout(() => setDiscSubmitted(false), 3000);
      }
    } catch (e) {
      console.error('Post discussion error:', e);
    }
  }

  async function handleRegSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(regForm)
      });
      const data = await res.json();
      if (res.ok && data.user) {
        setRegisteredUser(data.user);
      }
    } catch (e) {
      console.error('Reg error:', e);
    }
  }

  async function handleTutSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch('/api/tutorials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tutForm)
      });
      if (res.ok) {
        setTutSubmitted(true);
        setTimeout(() => {
          setTutSubmitted(false);
          setIsTutorialOpen(false);
        }, 2500);
      }
    } catch (e) {
      console.error('Tutorial booking error:', e);
    }
  }

  const filteredDiscussions = discTab === 'all' ? discussions : discussions.filter(d => d.type === discTab);

  return (
    <>
      <Head>
        <title>dopa-X | Standalone Clinical Research & Biomarker Hub</title>
      </Head>

      <div style={{ backgroundColor: '#0b0f19', color: '#f8fafc', minHeight: '100vh', fontFamily: 'Inter, sans-serif', padding: '32px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          {/* Header */}
          <header style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 12px', borderRadius: '999px', background: 'rgba(6,182,212,0.15)', color: '#06b6d4', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '12px' }}>
              <ShieldCheck size={14} /> Standalone Clinical Biomarker Workspace
            </div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '12px' }}>
              dopa-X <span style={{ background: 'linear-gradient(135deg, #06b6d4, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Research Lab</span>
            </h1>
            <p style={{ color: '#94a3b8', fontSize: '1.05rem', maxWidth: '700px', margin: '0 auto', lineHeight: 1.6 }}>
              Download raw clinical datasets directly from the portal, develop feature extraction pipelines, discuss findings, and schedule live data structure tutorials.
            </p>
          </header>

          {/* Legal Governance Notice */}
          <div style={{ background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.25)', padding: '20px', borderRadius: '12px', marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981', fontWeight: 700, fontSize: '1rem', marginBottom: '6px' }}>
              <ShieldCheck size={18} /> Data Governance Policy
            </div>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.5 }}>
              Raw patient datasets are hosted on our portal website to comply with medical data governance. GitHub (<a href="https://github.com/dopax35/data-analysis-tools" target="_blank" rel="noreferrer" style={{ color: '#06b6d4', textDecoration: 'underline' }}>dopax35/data-analysis-tools</a>) is used exclusively for sharing developed algorithm source code.
            </p>
          </div>

          {/* Main Grid: Projects Selector & Active Project View */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginBottom: '40px' }}>
            
            {/* Project Cards List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'white' }}>Clinical Projects</h2>
              {projects.map(p => (
                <div 
                  key={p.task_id}
                  onClick={() => setSelectedTask(p.task_id)}
                  style={{
                    padding: '20px',
                    borderRadius: '12px',
                    background: selectedTask === p.task_id ? 'rgba(6, 182, 212, 0.12)' : 'rgba(18, 24, 38, 0.75)',
                    border: selectedTask === p.task_id ? '1px solid #06b6d4' : '1px solid rgba(255,255,255,0.08)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <span style={{ fontSize: '0.75rem', color: '#06b6d4', fontWeight: 700, fontFamily: 'monospace' }}>{p.task_id}</span>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginTop: '4px', marginBottom: '8px' }}>{p.name}</h3>
                  <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.4 }}>{p.description}</p>
                </div>
              ))}

              <button 
                onClick={() => setIsTutorialOpen(true)}
                style={{ padding: '14px', borderRadius: '10px', background: 'linear-gradient(135deg, #06b6d4, #8b5cf6)', color: 'white', fontWeight: 600, border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '8px' }}
              >
                <Video size={16} /> Schedule Live Data Tutorial
              </button>
            </div>

            {/* Active Project Detail & Raw Data Download */}
            <div style={{ background: 'rgba(18, 24, 38, 0.75)', padding: '28px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <span style={{ fontSize: '0.75rem', padding: '4px 10px', borderRadius: '999px', background: 'rgba(139,92,246,0.15)', color: '#8b5cf6', fontWeight: 600 }}>{activeProject.category}</span>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginTop: '8px', marginBottom: '12px' }}>{activeProject.name}</h2>
              
              {/* Raw Data Download Action */}
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '10px', border: '1px solid rgba(6,182,212,0.2)', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <span style={{ fontSize: '0.8rem', color: '#06b6d4', fontWeight: 600, display: 'block' }}>Portal Raw Dataset:</span>
                  <strong style={{ fontSize: '0.9rem', color: 'white' }}>{activeProject.data_name}</strong>
                </div>
                <a href={activeProject.data_url} download style={{ padding: '8px 14px', borderRadius: '8px', background: '#06b6d4', color: 'black', fontWeight: 700, fontSize: '0.85rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <Download size={14} /> Download Raw File
                </a>
              </div>

              {/* Pipeline Steps */}
              <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '10px' }}>Algorithm Pipeline Steps</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
                {activeProject.steps.map((st, i) => (
                  <div key={i} style={{ padding: '10px 14px', background: 'rgba(0,0,0,0.25)', borderRadius: '6px', fontSize: '0.85rem', color: '#cbd5e1', border: '1px solid rgba(255,255,255,0.04)' }}>
                    {st}
                  </div>
                ))}
              </div>

              <a href="https://github.com/dopax35/data-analysis-tools" target="_blank" rel="noreferrer" style={{ padding: '10px 16px', borderRadius: '8px', background: 'rgba(255,255,255,0.08)', color: 'white', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '6px', border: '1px solid rgba(255,255,255,0.1)' }}>
                <GitPullRequest size={14} /> Develop & Submit Code on GitHub <ExternalLink size={12} />
              </a>
            </div>

          </div>

          {/* Project Discussion & Results Sharing Section */}
          <section style={{ background: 'rgba(18, 24, 38, 0.75)', padding: '32px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)', marginBottom: '40px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 700 }}>{activeProject.name} â€” Community Q&A & Results</h3>
                <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Discuss data issues, feature extraction formulas, and benchmark scores</span>
              </div>

              <div style={{ display: 'flex', gap: '6px' }}>
                <button onClick={() => setDiscTab('all')} style={{ padding: '6px 12px', borderRadius: '6px', border: 'none', background: discTab === 'all' ? '#06b6d4' : 'rgba(255,255,255,0.08)', color: discTab === 'all' ? 'black' : 'white', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600 }}>All</button>
                <button onClick={() => setDiscTab('question')} style={{ padding: '6px 12px', borderRadius: '6px', border: 'none', background: discTab === 'question' ? '#06b6d4' : 'rgba(255,255,255,0.08)', color: discTab === 'question' ? 'black' : 'white', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600 }}>Questions</button>
                <button onClick={() => setDiscTab('result')} style={{ padding: '6px 12px', borderRadius: '6px', border: 'none', background: discTab === 'result' ? '#06b6d4' : 'rgba(255,255,255,0.08)', color: discTab === 'result' ? 'black' : 'white', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600 }}>Results</button>
              </div>
            </div>

            {/* Post Form */}
            <form onSubmit={handleDiscSubmit} style={{ background: 'rgba(0,0,0,0.3)', padding: '20px', borderRadius: '10px', marginBottom: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px', marginBottom: '10px' }}>
                <input type="text" placeholder="Your Name" required value={discForm.author} onChange={e => setDiscForm({ ...discForm, author: e.target.value })} style={{ padding: '8px 12px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: 'white', fontSize: '0.85rem' }} />
                <input type="text" placeholder="GitHub Handle" required value={discForm.handle} onChange={e => setDiscForm({ ...discForm, handle: e.target.value })} style={{ padding: '8px 12px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: 'white', fontSize: '0.85rem' }} />
                <select value={discForm.type} onChange={e => setDiscForm({ ...discForm, type: e.target.value })} style={{ padding: '8px 12px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: 'white', fontSize: '0.85rem' }}>
                  <option value="question">Ask Question / Inquiry</option>
                  <option value="result">Share Benchmark Result</option>
                </select>
              </div>

              {discForm.type === 'result' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
                  <input type="text" placeholder="Benchmark Title" value={discForm.title} onChange={e => setDiscForm({ ...discForm, title: e.target.value })} style={{ padding: '8px 12px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: 'white', fontSize: '0.85rem' }} />
                  <input type="text" placeholder="Metric (e.g. AUC: 0.94)" value={discForm.metric} onChange={e => setDiscForm({ ...discForm, metric: e.target.value })} style={{ padding: '8px 12px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: 'white', fontSize: '0.85rem' }} />
                </div>
              )}

              <textarea placeholder="Post question regarding raw signal formats or share your extraction code results..." required rows={3} value={discForm.content} onChange={e => setDiscForm({ ...discForm, content: e.target.value })} style={{ width: '100%', padding: '10px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: 'white', fontSize: '0.85rem', marginBottom: '10px' }} />
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {discSubmitted ? <span style={{ color: '#10b981', fontSize: '0.85rem' }}>Posted successfully!</span> : <span />}
                <button type="submit" style={{ padding: '8px 16px', borderRadius: '6px', background: '#06b6d4', color: 'black', fontWeight: 700, border: 'none', cursor: 'pointer', fontSize: '0.85rem' }}>Post Discussion</button>
              </div>
            </form>

            {/* List */}
            {filteredDiscussions.map(d => (
              <div key={d.id} style={{ background: 'rgba(0,0,0,0.25)', padding: '16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{d.author} <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>@{d.handle}</span></span>
                  <span style={{ fontSize: '0.75rem', padding: '2px 8px', borderRadius: '4px', background: d.type === 'result' ? 'rgba(6,182,212,0.15)' : 'rgba(16,185,129,0.15)', color: d.type === 'result' ? '#06b6d4' : '#10b981' }}>{d.type}</span>
                </div>
                {d.title && <h5 style={{ color: '#06b6d4', marginBottom: '4px' }}>{d.title}</h5>}
                {d.metric && <div style={{ color: '#10b981', fontWeight: 700, fontSize: '0.85rem', marginBottom: '4px' }}>{d.metric}</div>}
                <p style={{ fontSize: '0.85rem', color: '#e2e8f0', lineHeight: 1.4 }}>{d.content}</p>
              </div>
            ))}
          </section>

          {/* Volunteer Registration & Referral Link Generator */}
          <section style={{ background: 'rgba(18, 24, 38, 0.75)', padding: '32px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '8px' }}>Volunteer Data Scientist Registration</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '20px' }}>Register your skills to generate your custom community referral link.</p>

            {!registeredUser ? (
              <form onSubmit={handleRegSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                <input type="text" placeholder="Full Name" required value={regForm.name} onChange={e => setRegForm({ ...regForm, name: e.target.value })} style={{ padding: '10px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: 'white', fontSize: '0.85rem' }} />
                <input type="email" placeholder="Email Address" required value={regForm.email} onChange={e => setRegForm({ ...regForm, email: e.target.value })} style={{ padding: '10px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: 'white', fontSize: '0.85rem' }} />
                <input type="text" placeholder="GitHub Username" required value={regForm.github} onChange={e => setRegForm({ ...regForm, github: e.target.value })} style={{ padding: '10px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: 'white', fontSize: '0.85rem' }} />
                <button type="submit" style={{ padding: '10px 16px', background: 'linear-gradient(135deg, #06b6d4, #8b5cf6)', color: 'white', fontWeight: 700, border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem' }}>Register & Get Link</button>
              </form>
            ) : (
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '20px', borderRadius: '10px', border: '1px solid #10b981' }}>
                <h4 style={{ color: '#10b981', marginBottom: '4px' }}>Registration Complete, {registeredUser.name}!</h4>
                <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '12px' }}>Your referral code: <code>{registeredUser.refCode}</code></p>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input type="text" readOnly value={`https://www.dopa-x.org/portal/register?ref=${registeredUser.refCode}`} style={{ flex: 1, padding: '8px 12px', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: '#06b6d4', fontSize: '0.85rem', fontFamily: 'monospace' }} />
                  <button onClick={() => { navigator.clipboard.writeText(`https://www.dopa-x.org/portal/register?ref=${registeredUser.refCode}`); setCopiedRef(true); setTimeout(() => setCopiedRef(false), 2000); }} style={{ padding: '8px 14px', background: '#06b6d4', color: 'black', fontWeight: 700, border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem' }}>{copiedRef ? 'Copied!' : 'Copy'}</button>
                </div>
              </div>
            )}
          </section>

        </div>
      </div>

      {/* Tutorial Modal */}
      {isTutorialOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ background: '#121826', padding: '32px', borderRadius: '16px', maxWidth: '500px', width: '100%', border: '1px solid rgba(255,255,255,0.1)', position: 'relative' }}>
            <button onClick={() => setIsTutorialOpen(false)} style={{ position: 'absolute', top: '16px', right: '16px', background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '1.2rem' }}>âœ•</button>
            
            {!tutSubmitted ? (
              <form onSubmit={handleTutSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 700 }}>Schedule Data Structure Tutorial</h3>
                <input type="text" placeholder="Your Name" required value={tutForm.name} onChange={e => setTutForm({ ...tutForm, name: e.target.value })} style={{ padding: '10px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: 'white', fontSize: '0.85rem' }} />
                <input type="email" placeholder="Email Address" required value={tutForm.email} onChange={e => setTutForm({ ...tutForm, email: e.target.value })} style={{ padding: '10px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: 'white', fontSize: '0.85rem' }} />
                <select value={tutForm.topic} onChange={e => setTutForm({ ...tutForm, topic: e.target.value })} style={{ padding: '10px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: 'white', fontSize: '0.85rem' }}>
                  <option value="Eye-Tracking Data Format">Eye-Tracking Gaze Stability & Speed</option>
                  <option value="Mobile App Sensor Preprocessing">Mobile App Sensor Streams</option>
                  <option value="Keystroke Dynamics Cognitive Mapping">Keystroke Timing Metrics</option>
                </select>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <input type="date" required value={tutForm.preferredDate} onChange={e => setTutForm({ ...tutForm, preferredDate: e.target.value })} style={{ padding: '10px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: 'white', fontSize: '0.85rem' }} />
                  <select value={tutForm.preferredTime} onChange={e => setTutForm({ ...tutForm, preferredTime: e.target.value })} style={{ padding: '10px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: 'white', fontSize: '0.85rem' }}>
                    <option value="15:00 UTC">15:00 UTC</option>
                    <option value="16:00 UTC">16:00 UTC</option>
                    <option value="18:00 UTC">18:00 UTC</option>
                  </select>
                </div>
                <textarea placeholder="Specific questions for the specialist..." rows={2} value={tutForm.question} onChange={e => setTutForm({ ...tutForm, question: e.target.value })} style={{ padding: '10px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: 'white', fontSize: '0.85rem' }} />
                <button type="submit" style={{ padding: '12px', background: '#06b6d4', color: 'black', fontWeight: 700, border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Confirm Schedule</button>
              </form>
            ) : (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <h4 style={{ color: '#10b981', marginBottom: '8px' }}>Tutorial Scheduled!</h4>
                <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>We sent a Zoom invitation to {tutForm.email}.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
