import React from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import { BookOpen, ShieldCheck, GitBranch, Code, ExternalLink, Download, Layers, FileText, CheckCircle2 } from 'lucide-react';

export default function Documentation() {
  return (
    <>
      <Head>
        <title>Documentation & Algorithm Guide | dopa-X Community</title>
      </Head>
      <Navbar />

      <main style={{ padding: '40px 24px', maxWidth: '1100px', margin: '0 auto' }}>
        <header style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div className="badge badge-cyan" style={{ marginBottom: '12px' }}>
            <BookOpen size={14} /> Developer & Research Documentation
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '12px' }}>
            dopa-X <span className="gradient-text">Algorithm & Data Guide</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '650px', margin: '0 auto', lineHeight: 1.6 }}>
            Technical documentation covering raw dataset downloads, signal cleaning pipelines, mobile app feature extraction engines, and GitHub Pull Request guidelines.
          </p>
        </header>

        {/* Legal & Data Governance Policy */}
        <section className="glass-panel" style={{ padding: '28px', marginBottom: '32px', border: '1px solid rgba(16,185,129,0.3)', background: 'linear-gradient(135deg, rgba(16,185,129,0.08), rgba(6,182,212,0.08))' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--accent-emerald)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldCheck size={22} /> Raw Data Governance & Legal Policy
          </h2>
          <p style={{ color: 'var(--text-main)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '16px' }}>
            To adhere strictly to clinical research privacy and HIPAA/IRB compliance, <strong>raw patient datasets MUST NEVER be hosted in GitHub repositories</strong>.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '10px', fontSize: '0.85rem' }}>
            <div>
              <strong style={{ color: 'var(--accent-cyan)', display: 'block', marginBottom: '4px' }}>dopa-X Portal & Official Sources:</strong>
              Raw clinical data (PhysioNet, PPMI, OpenNeuro, Zenodo, dopa-X portal samples) are downloaded directly from open-access portals.
            </div>
            <div>
              <strong style={{ color: 'var(--accent-violet)', display: 'block', marginBottom: '4px' }}>GitHub (`dopax35/data-analysis-tools`):</strong>
              Exclusively dedicated to sharing open-source algorithm pipelines, signal filtering Python scripts, and feature extraction formulas.
            </div>
          </div>
        </section>

        {/* Algorithm Pipelines Overview */}
        <section className="glass-panel" style={{ padding: '28px', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Code size={22} className="gradient-text" /> Community Algorithm Repositories
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ background: 'rgba(0,0,0,0.25)', padding: '16px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--accent-cyan)', marginBottom: '6px' }}>
                1. Eye-Tracking Gaze Dynamics Pipeline (`algorithms/eyetracking_gaze_pipeline.py`)
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: '10px' }}>
                Computes Bivariate Contour Ellipse Area (BCEA gaze stability), angular velocity (deg/sec), micro-saccadic jitter (20â€“50Hz power), and blinking rate per minute.
              </p>
              <a href="https://github.com/dopax35/data-analysis-tools/blob/main/algorithms/eyetracking_gaze_pipeline.py" target="_blank" rel="noreferrer" style={{ color: 'var(--accent-cyan)', fontSize: '0.85rem', textDecoration: 'underline', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                View Python Source Code <ExternalLink size={12} />
              </a>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.25)', padding: '16px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--accent-violet)', marginBottom: '6px' }}>
                2. Mobile App Motion Sensor Pipeline (`algorithms/mobile_sensor_pipeline.py`)
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: '10px' }}>
                Preprocesses 100Hz accelerometer and gyroscope motion streams using 4th order Butterworth filters. Extracts stride timing asymmetry and 3â€“8Hz resting tremor spectral power.
              </p>
              <a href="https://github.com/dopax35/data-analysis-tools/blob/main/algorithms/mobile_sensor_pipeline.py" target="_blank" rel="noreferrer" style={{ color: 'var(--accent-violet)', fontSize: '0.85rem', textDecoration: 'underline', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                View Python Source Code <ExternalLink size={12} />
              </a>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.25)', padding: '16px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--accent-emerald)', marginBottom: '6px' }}>
                3. Mobile App Keystroke Dynamics Engine (`algorithms/keystroke_dynamics_pipeline.py`)
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: '10px' }}>
                Engineered for embedding into the dopa-X Android & iOS Phone App. Extracts dwell time, flight time, backspace correction hesitancy index, and typing speed decay curves.
              </p>
              <a href="https://github.com/dopax35/data-analysis-tools/blob/main/algorithms/keystroke_dynamics_pipeline.py" target="_blank" rel="noreferrer" style={{ color: 'var(--accent-emerald)', fontSize: '0.85rem', textDecoration: 'underline', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                View Mobile Algorithm Code <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </section>

        {/* Contributing & PR Guide */}
        <section className="glass-panel" style={{ padding: '28px', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <GitBranch size={22} className="gradient-text" /> Pull Request & Contribution Workflow
          </h2>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
            <p style={{ marginBottom: '12px' }}>Follow these steps to submit feature extraction algorithms or React UI improvements:</p>
            <ol style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li>Fork or clone <code>https://github.com/dopax35/data-analysis-tools</code></li>
              <li>Create a feature branch: <code>git checkout -b feature/your-algorithm-name</code></li>
              <li>Write clean Python feature extraction code under <code>algorithms/</code> with docstrings and unit tests</li>
              <li>Submit a Pull Request using the official <a href="https://github.com/dopax35/data-analysis-tools/blob/main/.github/PULL_REQUEST_TEMPLATE.md" target="_blank" rel="noreferrer" style={{ color: 'var(--accent-cyan)', textDecoration: 'underline' }}>PR Template</a></li>
              <li>The <code>agent-code-reviewer</code> sub-agent will automatically lint, verify accessibility, and auto-merge compliant PRs</li>
            </ol>
          </div>
        </section>

      </main>
    </>
  );
}
