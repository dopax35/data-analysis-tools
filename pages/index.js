import React from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import DataSourcesGrid from '../components/DataSourcesGrid';
import { Activity, Database, GitBranch, Cpu, ShieldCheck, ExternalLink, Code, Layers, FileText, Share2, Video, UserPlus } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Head>
        <title>dopa-X | Neurodegenerative Digital Biomarker Data Platform</title>
        <meta name="description" content="dopa-X multi-agent platform for Parkinson's & neurodegenerative digital biomarker discovery." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main style={{ padding: '40px 24px', maxWidth: '1240px', margin: '0 auto' }}>
        {/* Header Section */}
        <header style={{ marginBottom: '48px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div className="badge badge-emerald" style={{ marginBottom: '12px' }}>
              <ShieldCheck size={14} /> Multi-Agent AI Core Active (Frontend, Backend, DevOps, Audit)
            </div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '8px' }}>
              dopa-X <span className="gradient-text">Data & Biomarker Platform</span>
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '680px', lineHeight: 1.6 }}>
              Integrating open access clinical datasets (PhysioNet, PPMI, OpenNeuro, Zenodo), community discussions, live tutorial demos, and mobile phone app algorithm development engines.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <Link href="/research" className="btn-primary" style={{ background: 'linear-gradient(135deg, var(--accent-violet), var(--accent-cyan))' }}>
              <Layers size={18} /> Standalone Research Lab
            </Link>
            <a href="https://github.com/dopax35/data-analysis-tools" target="_blank" rel="noreferrer" className="btn-primary">
              <GitBranch size={18} /> GitHub Repository <ExternalLink size={14} />
            </a>
          </div>
        </header>

        {/* Quick Access Portal Tabs Section */}
        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '48px' }}>
          <Link href="/projects" className="glass-panel" style={{ padding: '20px', textDecoration: 'none', transition: 'all 0.2s ease', border: '1px solid rgba(6,182,212,0.2)' }}>
            <Activity size={24} style={{ color: 'var(--accent-cyan)', marginBottom: '8px' }} />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'white', marginBottom: '4px' }}>Projects Task Board</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Browse active algorithm tasks and dataset pipelines.</p>
          </Link>

          <Link href="/tutorials" className="glass-panel" style={{ padding: '20px', textDecoration: 'none', transition: 'all 0.2s ease', border: '1px solid rgba(139,92,246,0.2)' }}>
            <Video size={24} style={{ color: 'var(--accent-violet)', marginBottom: '8px' }} />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'white', marginBottom: '4px' }}>Tutorial Demos & Q&A</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Schedule live 1-on-1 sessions on data schemas.</p>
          </Link>

          <Link href="/register" className="glass-panel" style={{ padding: '20px', textDecoration: 'none', transition: 'all 0.2s ease', border: '1px solid rgba(16,185,129,0.2)' }}>
            <UserPlus size={24} style={{ color: 'var(--accent-emerald)', marginBottom: '8px' }} />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'white', marginBottom: '4px' }}>Volunteer Registration</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Join as a researcher & get your referral code.</p>
          </Link>

          <Link href="/referral" className="glass-panel" style={{ padding: '20px', textDecoration: 'none', transition: 'all 0.2s ease', border: '1px solid rgba(245,158,11,0.2)' }}>
            <Share2 size={24} style={{ color: '#f59e0b', marginBottom: '8px' }} />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'white', marginBottom: '4px' }}>Community Hub</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>View volunteer leaderboard & referral stats.</p>
          </Link>
        </section>

        {/* All Open Access Data Sources & Mobile App Algorithms */}
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
