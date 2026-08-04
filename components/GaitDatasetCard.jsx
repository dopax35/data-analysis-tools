import React from 'react';
import { Activity, Users, Download, Shield } from 'lucide-react';

export const GaitDatasetCard = () => {
  return (
    <div className="glass-panel" style={{ padding: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
        <div>
          <span className="badge badge-cyan" style={{ marginBottom: '8px' }}>PhysioNet Open Access</span>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 700 }}>Gait in Parkinson's Disease</h3>
        </div>
        <a 
          href="https://physionet.org/content/gait-in-parkinsons-disease-1.0.0/" 
          target="_blank" 
          rel="noreferrer"
          className="btn-primary"
          style={{ fontSize: '0.85rem', padding: '8px 14px' }}
        >
          <Download size={14} /> Download Raw Signals
        </a>
      </div>

      <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '20px', lineHeight: 1.6 }}>
        Database containing vertical ground reaction force (VGRF) recordings from 93 Parkinson's patients and controls walking at their usual pace for 2 minutes.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px', background: 'rgba(0, 0, 0, 0.25)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
        <div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Subject Count</span>
          <strong style={{ fontSize: '1.1rem', color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Users size={16} /> 93 Subjects
          </strong>
        </div>
        <div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Sensor Type</span>
          <strong style={{ fontSize: '1.1rem', color: 'var(--accent-violet)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Activity size={16} /> Force Sensors
          </strong>
        </div>
        <div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>License</span>
          <strong style={{ fontSize: '1.1rem', color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Shield size={16} /> CC-BY-4.0
          </strong>
        </div>
      </div>
    </div>
  );
};

export default GaitDatasetCard;
