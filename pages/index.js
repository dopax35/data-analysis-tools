import React from 'react';
import Head from 'next/head';
import GaitDatasetCard from '../components/GaitDatasetCard';
import { Activity, Database, GitBranch, Cpu, ShieldCheck, ExternalLink, Code } from 'lucide-react';

export default function Home() {
  return (
    <>
      <Head>
        <title>dopa-X | Neurodegenerative Digital Biomarker Data Platform</title>
        <meta name="description" content="dopa-X autonomous multi-agent platform for Parkinson's & neurodegenerative digital biomarker discovery." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main style={{ padding: '40px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header Section */}
        <header style={{ marginBottom: '48px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div className="badge badge-emerald" style={{ marginBottom: '12px' }}>
              <ShieldCheck size={14} /> Autonomous Agent System Active
            </div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '8px' }}>
              dopa-X <span className="gradient-text">Data Platform</span>
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '600px' }}>
              AI-driven multi-agent platform self-provisioning clinical gait datasets, Monday.com operational workflows, and GitHub automated CI/CD.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <a 
              href="https://github.com/dopax35/data-analysis-tools" 
              target="_blank" 
              rel="noreferrer" 
              className="btn-primary"
            >
              <GitBranch size={18} /> View GitHub Repo <ExternalLink size={14} />
            </a>
          </div>
        </header>

        {/* System Architecture Grid */}
        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '48px' }}>
          <div className="glass-panel" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px', color: 'var(--accent-cyan)' }}>
              <Cpu size={24} />
              <h3 style={{ fontSize: '1.2rem' }}>Master Router</h3>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              <code>agent-pm</code> orchestrating 6 specialized autonomous sub-agents without human intervention.
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px', color: 'var(--accent-violet)' }}>
              <Database size={24} />
              <h3 style={{ fontSize: '1.2rem' }}>Data Scout</h3>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              <code>agent-scout</code> monitoring PhysioNet clinical repositories and ingesting gait force signals.
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px', color: 'var(--accent-emerald)' }}>
              <Activity size={24} />
              <h3 style={{ fontSize: '1.2rem' }}>System Reliability</h3>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              <code>agent-maintenance</code> monitoring Vercel hosting health, API rate limits, and audit logs.
            </p>
          </div>
        </section>

        {/* Live Integrated Component Section */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Code size={22} className="gradient-text" /> Integrated Clinical Datasets
          </h2>
          <GaitDatasetCard />
        </section>

        {/* Footer */}
        <footer style={{ borderTop: '1px solid var(--border-card)', paddingTop: '24px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Built with Google Antigravity Python SDK & Vercel hosting. Powered by dopa-X Community.
        </footer>
      </main>
    </>
  );
}
