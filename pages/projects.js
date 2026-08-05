import React, { useState } from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import ProjectTaskCard from '../components/ProjectTaskCard';
import { Activity, Filter, RefreshCw, CheckCircle2 } from 'lucide-react';

export default function Projects() {
  const [selectedSkill, setSelectedSkill] = useState('All');

  const tasks = [
    { task_id: 'task_101', name: 'Implement Gait FFT Feature Pipeline', skills_required: ['Python', 'Signal Processing'], difficulty: 'Intermediate' },
    { task_id: 'task_102', name: 'Build PhysioNet Metadata Visualizer Component', skills_required: ['React', 'Next.js'], difficulty: 'Beginner' },
    { task_id: 'task_103', name: 'PPMI Clinical Metadata Ingestion & Vercel DB Sync', skills_required: ['Python', 'SQL', 'PostgreSQL'], difficulty: 'Advanced' },
    { task_id: 'task_104', name: 'Tremor Spectral Density Algorithm Validation', skills_required: ['Signal Processing', 'Python'], difficulty: 'Advanced' },
    { task_id: 'task_105', name: 'Develop React Gait Signal Spectrogram Viewer', skills_required: ['React', 'Next.js', 'Signal Processing'], difficulty: 'Intermediate' },
    { task_id: 'task_106', name: 'Setup Automated GitHub PR Data Hygiene Linter', skills_required: ['Python', 'Git'], difficulty: 'Beginner' }
  ];

  const skillsList = ['All', 'Python', 'Signal Processing', 'React', 'Next.js', 'SQL', 'PostgreSQL'];

  const filteredTasks = selectedSkill === 'All' 
    ? tasks 
    : tasks.filter(t => t.skills_required.includes(selectedSkill));

  return (
    <>
      <Head>
        <title>Monday.com Projects & Tasks | dopa-X Community</title>
      </Head>
      <Navbar />

      <main style={{ padding: '40px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        <header style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div className="badge badge-emerald" style={{ marginBottom: '12px' }}>
              <CheckCircle2 size={14} /> Monday.com GraphQL Sync Active
            </div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '8px' }}>
              Open <span className="gradient-text">Research Tasks</span>
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '600px' }}>
              Browse unassigned Monday.com tasks, filter by your technical skills, and claim tasks directly via GitHub PR templates.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(0,0,0,0.3)', padding: '8px 16px', borderRadius: '10px', border: '1px solid var(--border-card)' }}>
            <RefreshCw size={14} className="gradient-text" />
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Updated 5m ago by <code>agent-guide</code></span>
          </div>
        </header>

        {/* Skill Filter Bar */}
        <section style={{ marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600 }}>
            <Filter size={16} /> Filter by Skill:
          </span>
          {skillsList.map((skill) => (
            <button
              key={skill}
              onClick={() => setSelectedSkill(skill)}
              style={{
                padding: '6px 14px',
                borderRadius: '20px',
                border: selectedSkill === skill ? '1px solid var(--accent-cyan)' : '1px solid rgba(255,255,255,0.08)',
                background: selectedSkill === skill ? 'rgba(6, 182, 212, 0.2)' : 'rgba(0,0,0,0.2)',
                color: selectedSkill === skill ? 'var(--accent-cyan)' : 'var(--text-muted)',
                cursor: 'pointer',
                fontSize: '0.85rem',
                fontWeight: 600,
                transition: 'all 0.2s ease'
              }}
            >
              {skill}
            </button>
          ))}
        </section>

        {/* Tasks Grid */}
        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px', marginBottom: '48px' }}>
          {filteredTasks.map((task) => (
            <ProjectTaskCard key={task.task_id} task={task} />
          ))}
        </section>
      </main>
    </>
  );
}
