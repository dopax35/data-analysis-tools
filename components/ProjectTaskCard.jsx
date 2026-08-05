import React from 'react';
import Link from 'next/link';
import { GitPullRequest, Code, Tag, ExternalLink, Download, ShieldCheck, MessageSquare } from 'lucide-react';

export default function ProjectTaskCard({ task }) {
  const { 
    task_id, 
    name, 
    skills_required = [], 
    difficulty = 'Intermediate', 
    data_source_url = '/data/eyetracking-sample.csv',
    data_source_name = 'dopa-X Portal Clinical Data' 
  } = task;

  const githubRepoUrl = 'https://github.com/dopax35/data-analysis-tools';
  const projectDetailUrl = `/projects/${task_id}`;

  return (
    <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '16px' }}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)', fontFamily: 'monospace', fontWeight: 600 }}>
            {task_id}
          </span>
          <span className={`badge ${difficulty === 'Beginner' ? 'badge-emerald' : 'badge-cyan'}`}>
            {difficulty}
          </span>
        </div>
        
        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '12px', lineHeight: 1.4 }}>
          <Link href={projectDetailUrl} style={{ color: 'inherit', textDecoration: 'none' }}>
            {name}
          </Link>
        </h3>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
          {skills_required.map((skill, idx) => (
            <span key={idx} style={{ fontSize: '0.75rem', padding: '3px 8px', borderRadius: '4px', background: 'rgba(255,255,255,0.05)', color: 'var(--text-muted)', border: '1px solid rgba(255,255,255,0.08)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <Tag size={10} /> {skill}
            </span>
          ))}
        </div>

        {/* Data Source Download Box */}
        <div style={{ background: 'rgba(6, 182, 212, 0.08)', border: '1px solid rgba(6, 182, 212, 0.2)', padding: '12px', borderRadius: '8px', fontSize: '0.85rem', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-cyan)', fontWeight: 600, marginBottom: '4px' }}>
            <ShieldCheck size={14} /> Official Raw Data Source:
          </div>
          <a 
            href={data_source_url} 
            download={data_source_url.startsWith('/data')}
            target={data_source_url.startsWith('/data') ? '_self' : '_blank'}
            rel="noreferrer" 
            style={{ color: 'white', textDecoration: 'underline', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
          >
            {data_source_name} <Download size={12} />
          </a>
          <span style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '4px' }}>
            Download raw clinical signals directly to develop feature algorithms.
          </span>
        </div>
      </div>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
        <Link 
          href={projectDetailUrl}
          className="btn-primary"
          style={{ fontSize: '0.85rem', padding: '8px 14px', background: 'linear-gradient(135deg, var(--accent-violet), var(--accent-cyan))' }}
        >
          <MessageSquare size={14} /> Open Project & Discussion Forum
        </Link>

        <a 
          href={githubRepoUrl} 
          target="_blank" 
          rel="noreferrer" 
          className="btn-primary" 
          style={{ fontSize: '0.85rem', padding: '8px 14px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }}
        >
          <GitPullRequest size={14} /> GitHub Code <ExternalLink size={12} />
        </a>
      </div>
    </div>
  );
}
