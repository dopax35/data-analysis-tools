import React from 'react';
import Head from 'next/head';
import DataSourcesGrid from '../components/DataSourcesGrid';
import { Activity, Database, GitBranch, Cpu, ShieldCheck, ExternalLink, Code, Layers, FileText } from 'lucide-react';

export default function Home() {
  return (
    <>
      <Head>
        <title>dopa-X | Neurodegenerative Digital Biomarker Data Platform</title>
        <meta name="description" content="dopa-X multi-agent platform for Parkinson's & neurodegenerative digital biomarker discovery." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main style={{ padding: '40px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header Section */}
        <header style={{ marginBottom: '48px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div className="badge badge-emerald" style={{ marginBottom: '12px' }}>
              <ShieldCheck size={14} /> Autonomous 9-Agent System Active
            </div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '8px' }}>
              dopa-X <span className="gradient-text">Data Platform</span>
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '650px', lineHeight: 1.6 }}>
              AI-driven multi-agent platform integrating clinical datasets from PhysioNet, PPMI, OpenNeuro, and Zenodo, while engineering mobile app algorithms for neurodegenerative digital biomarkers.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <a 
              href="https://github.com/dopax35/data-analysis-tools" 
              target="_blank" 
              rel="noreferrer" 
              className="btn-primary"
            >
              <GitBranch size={18} /> GitHub Repository <ExternalLink size={14} />
            </a>
            <a 
              href="/research" 
              className="btn-primary"
              style={{ background: 'linear-gradient(135deg, var(--accent-violet), var(--accent-cyan))' }}
            >
              <Layers size={18} /> Research Lab Workspace
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
              <code>agent-pm</code> orchestrating 8 specialized autonomous sub-agents across data hunting, audit, ops, and QA.
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px', color: 'var(--accent-violet)' }}>
              <Database size={24} />
              <h3 style={{ fontSize: '1.2rem' }}>Data Hunter & Scout</h3>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              <code>agent-crawler</code> and <code>agent-scout</code> monitoring PhysioNet, PPMI, Zenodo, and OpenNeuro open repositories.
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px', color: 'var(--accent-emerald)' }}>
              <Activity size={24} />
              <h3 style={{ fontSize: '1.2rem' }}>Executive Compliance</h3>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              <code>agent-auditor</code> verifying de-identification, IRB compliance, and Parkinson's clinical relevance.
            </p>
          </div>
        </section>

        {/* All Data Sources & Mobile App Algorithms */}
        <section style={{ marginBottom: '48px' }}>
          <DataSourcesGrid />
        </section>

        {/* Footer */}
        <footer style={{ borderTop: '1px solid var(--border-card)', paddingTop: '24px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Built with Google Antigravity Python SDK & Vercel hosting. Powered by dopa-X Community.
        </footer>
      </main>
    </>
  );
}
