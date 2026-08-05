import React, { useState } from 'react';
import { Calendar, Clock, Video, CheckCircle2, X, HelpCircle, Send } from 'lucide-react';

export default function ScheduleTutorialModal({ isOpen, onClose, defaultTopic = 'Eye-Tracking Data Structure' }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    topic: defaultTopic,
    preferredDate: '',
    preferredTime: '15:00 UTC',
    question: ''
  });

  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch('/api/tutorials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          onClose();
        }, 2500);
      }
    } catch (e) {
      console.error('Book tutorial error:', e);
    }
  }

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div className="glass-panel" style={{ width: '100%', maxWidth: '550px', padding: '32px', position: 'relative' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: '16px', right: '16px', background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
          <X size={20} />
        </button>

        {!submitted ? (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <span className="badge badge-cyan" style={{ marginBottom: '8px' }}>Live Scientific Support</span>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 700 }}>Schedule Data Structure Tutorial</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '4px' }}>
                Book a 1-on-1 or group Q&A session with dopa-X specialists on data schemas, signal preprocessing, and extraction code.
              </p>
            </div>

            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Your Name</label>
              <input 
                type="text"
                required
                placeholder="Dr. Alex Rivera"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                style={{ width: '100%', padding: '10px 14px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-card)', borderRadius: '6px', color: 'white', fontSize: '0.9rem' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Email Address</label>
              <input 
                type="email"
                required
                placeholder="alex.rivera@research.org"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                style={{ width: '100%', padding: '10px 14px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-card)', borderRadius: '6px', color: 'white', fontSize: '0.9rem' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Tutorial Topic</label>
              <select 
                value={form.topic}
                onChange={e => setForm({ ...form, topic: e.target.value })}
                style={{ width: '100%', padding: '10px 14px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-card)', borderRadius: '6px', color: 'white', fontSize: '0.9rem' }}
              >
                <option value="Eye-Tracking Data Format & Gaze Stability Extraction">Eye-Tracking Gaze Stability & Speed Extraction</option>
                <option value="dopa-X Mobile App Sensor Preprocessing">dopa-X Mobile Accelerometer & Gyroscope Preprocessing</option>
                <option value="Keystroke Dynamics Cognitive Mapping">Android/iOS Keyboard Keystroke Dynamics Cognitive Mapping</option>
                <option value="General Monday.com & GitHub Algorithm Contribution">General Algorithm Contribution & PR Workflow</option>
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Preferred Date</label>
                <input 
                  type="date"
                  required
                  value={form.preferredDate}
                  onChange={e => setForm({ ...form, preferredDate: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-card)', borderRadius: '6px', color: 'white', fontSize: '0.9rem' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Preferred Time</label>
                <select 
                  value={form.preferredTime}
                  onChange={e => setForm({ ...form, preferredTime: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-card)', borderRadius: '6px', color: 'white', fontSize: '0.9rem' }}
                >
                  <option value="14:00 UTC">14:00 UTC</option>
                  <option value="15:00 UTC">15:00 UTC</option>
                  <option value="16:00 UTC">16:00 UTC</option>
                  <option value="18:00 UTC">18:00 UTC</option>
                </select>
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Questions for the Specialist (Optional)</label>
              <textarea 
                placeholder="e.g., Specific questions about gaze jitter formulas or keystroke dwell time calculation..."
                rows={2}
                value={form.question}
                onChange={e => setForm({ ...form, question: e.target.value })}
                style={{ width: '100%', padding: '10px 14px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-card)', borderRadius: '6px', color: 'white', fontSize: '0.85rem' }}
              />
            </div>

            <button type="submit" className="btn-primary" style={{ marginTop: '8px', padding: '12px', justifyContent: 'center' }}>
              <Video size={16} /> Schedule Live Tutorial Session
            </button>
          </form>
        ) : (
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <CheckCircle2 size={56} style={{ color: 'var(--accent-emerald)', marginBottom: '16px' }} />
            <h3 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>Tutorial Scheduled!</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              We have sent a calendar invite and Zoom link to <code>{form.email}</code>.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
