import React from 'react';
import { GitPullRequest, Code, Tag, ExternalLink } from 'lucide-react';

export default function ProjectTaskCard({ task }) {
  const { task_id, name, skills_required = [], difficulty = 'Intermediate' } = task;

  const prTemplateUrl = `https://github.com/dopax35/data-analysis-tools/compare/main...feature/${task_id}?quick_pull=1&template=PULL_REQUEST_TEMPLATE.md&title=${encodeURIComponent(name)}`;

  return (
    <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '16px' }}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)', fontFamily: 'monospace', fontWeight: 600 }}>
            {task_id}
          </span>
          <span className={`badge ${difficulty === 'Beginner' ? 'badge-emerald' : 'badge-cyan'}`}>
            {difficulty}
          </span>
        </div>
        
        <h3 style={{ fontSize: '1.15rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '12px', lineHeight: 1.4 }}>
          {name}
        </h3>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
          {skills_required.map((skill, idx) => (
            <span key={idx} style={{ fontSize: '0.75rem', padding: '3px 8px', borderRadius: '4px', background: 'rgba(255,255,255,0.05)', color: 'var(--text-muted)', border: '1px solid rgba(255,255,255,0.08)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <Tag size={10} /> {skill}
            </span>
          ))}
        </div>
      </div>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Code size={14} /> Monday Sync Active
        </span>

        <a 
          href={prTemplateUrl} 
          target="_blank" 
          rel="noreferrer" 
          className="btn-primary" 
          style={{ fontSize: '0.85rem', padding: '6px 12px' }}
        >
          <GitPullRequest size={14} /> Claim Task & Open PR <ExternalLink size={12} />
        </a>
      </div>
    </div>
  );
}
