import React, { useState, useEffect } from 'react';
import { MessageSquare, Trophy, HelpCircle, Send, CheckCircle2, Award, User } from 'lucide-react';

export default function ProjectDiscussion({ taskId, taskName }) {
  const [discussions, setDiscussions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'questions', 'results'
  const [form, setForm] = useState({
    author: '',
    handle: '',
    type: 'question', // 'question', 'result'
    title: '',
    content: '',
    metric: ''
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetchDiscussions();
  }, [taskId]);

  async function fetchDiscussions() {
    try {
      const res = await fetch(`/api/discussions?taskId=${taskId}`);
      const data = await res.json();
      if (data.discussions) {
        setDiscussions(data.discussions);
      }
    } catch (e) {
      console.error('Fetch discussions error:', e);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch(`/api/discussions?taskId=${taskId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ taskId, ...form })
      });
      if (res.ok) {
        setSubmitted(true);
        setForm({ author: '', handle: '', type: 'question', title: '', content: '', metric: '' });
        fetchDiscussions();
        setTimeout(() => setSubmitted(false), 3000);
      }
    } catch (e) {
      console.error('Post discussion error:', e);
    }
  }

  const filteredDiscussions = activeTab === 'all'
    ? discussions
    : discussions.filter(d => d.type === activeTab);

  return (
    <div className="glass-panel" style={{ padding: '28px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <span className="badge badge-cyan" style={{ marginBottom: '6px' }}>Community Forum</span>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 700 }}>Discussions & Shared Results</h3>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            onClick={() => setActiveTab('all')}
            style={{ padding: '6px 12px', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 600, border: 'none', background: activeTab === 'all' ? 'var(--accent-cyan)' : 'rgba(255,255,255,0.08)', color: activeTab === 'all' ? 'black' : 'white', cursor: 'pointer' }}
          >
            All Threads ({discussions.length})
          </button>
          <button 
            onClick={() => setActiveTab('question')}
            style={{ padding: '6px 12px', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 600, border: 'none', background: activeTab === 'question' ? 'var(--accent-cyan)' : 'rgba(255,255,255,0.08)', color: activeTab === 'question' ? 'black' : 'white', cursor: 'pointer' }}
          >
            Questions / Q&A
          </button>
          <button 
            onClick={() => setActiveTab('result')}
            style={{ padding: '6px 12px', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 600, border: 'none', background: activeTab === 'result' ? 'var(--accent-cyan)' : 'rgba(255,255,255,0.08)', color: activeTab === 'result' ? 'black' : 'white', cursor: 'pointer' }}
          >
            Benchmark Results
          </button>
        </div>
      </div>

      {/* Post Form */}
      <form onSubmit={handleSubmit} style={{ background: 'rgba(0,0,0,0.3)', padding: '20px', borderRadius: '12px', border: '1px solid var(--border-card)', marginBottom: '28px' }}>
        <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <MessageSquare size={16} className="gradient-text" /> Post a Question or Share Algorithm Benchmark Results
        </h4>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginBottom: '12px' }}>
          <input 
            type="text" 
            placeholder="Your Name (e.g. Dr. Jane Doe)"
            required
            value={form.author}
            onChange={e => setForm({ ...form, author: e.target.value })}
            style={{ padding: '10px 14px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-card)', borderRadius: '6px', color: 'white', fontSize: '0.85rem' }}
          />
          <input 
            type="text" 
            placeholder="GitHub Handle (e.g. jdoe-bio)"
            required
            value={form.handle}
            onChange={e => setForm({ ...form, handle: e.target.value.replace('@', '') })}
            style={{ padding: '10px 14px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-card)', borderRadius: '6px', color: 'white', fontSize: '0.85rem' }}
          />
          <select 
            value={form.type}
            onChange={e => setForm({ ...form, type: e.target.value })}
            style={{ padding: '10px 14px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-card)', borderRadius: '6px', color: 'white', fontSize: '0.85rem' }}
          >
            <option value="question">Ask a Question / Issue</option>
            <option value="result">Share Benchmark Result</option>
          </select>
        </div>

        {form.type === 'result' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
            <input 
              type="text" 
              placeholder="Benchmark Title (e.g. Gaze Speed SVM Classifier)"
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
              style={{ padding: '10px 14px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-card)', borderRadius: '6px', color: 'white', fontSize: '0.85rem' }}
            />
            <input 
              type="text" 
              placeholder="Metric (e.g. AUC: 0.942 / F1: 0.89)"
              value={form.metric}
              onChange={e => setForm({ ...form, metric: e.target.value })}
              style={{ padding: '10px 14px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-card)', borderRadius: '6px', color: 'white', fontSize: '0.85rem' }}
            />
          </div>
        )}

        <textarea 
          placeholder="Share your discussion point, question regarding raw signal formats, or feature extraction results..."
          required
          rows={3}
          value={form.content}
          onChange={e => setForm({ ...form, content: e.target.value })}
          style={{ width: '100%', padding: '10px 14px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-card)', borderRadius: '6px', color: 'white', fontSize: '0.85rem', marginBottom: '12px' }}
        />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {submitted ? (
            <span style={{ color: 'var(--accent-emerald)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <CheckCircle2 size={14} /> Posted to community forum!
            </span>
          ) : <span />}

          <button type="submit" className="btn-primary" style={{ fontSize: '0.85rem', padding: '8px 16px' }}>
            <Send size={14} /> Post Discussion
          </button>
        </div>
      </form>

      {/* Discussion List */}
      {loading ? (
        <p style={{ color: 'var(--text-muted)' }}>Loading discussion threads...</p>
      ) : filteredDiscussions.length === 0 ? (
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>No discussions posted yet for this project. Be the first to start a discussion!</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {filteredDiscussions.map(disc => (
            <div key={disc.id} style={{ background: 'rgba(0,0,0,0.2)', padding: '16px 20px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <User size={16} className="gradient-text" />
                  <strong style={{ fontSize: '0.95rem' }}>{disc.author}</strong>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>@{disc.handle}</span>
                </div>
                
                <span className={`badge ${disc.type === 'result' ? 'badge-cyan' : 'badge-emerald'}`}>
                  {disc.type === 'result' ? 'Benchmark Result' : 'Q&A'}
                </span>
              </div>

              {disc.title && <h5 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--accent-cyan)', marginBottom: '4px' }}>{disc.title}</h5>}
              {disc.metric && <div style={{ fontSize: '0.85rem', color: 'var(--accent-emerald)', fontWeight: 700, marginBottom: '6px' }}>{disc.metric}</div>}
              
              <p style={{ color: 'var(--text-main)', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '10px' }}>{disc.content}</p>

              {disc.replies && disc.replies.length > 0 && (
                <div style={{ borderLeft: '2px solid var(--accent-violet)', paddingLeft: '12px', marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {disc.replies.map((reply, idx) => (
                    <div key={idx} style={{ fontSize: '0.85rem' }}>
                      <strong style={{ color: 'var(--accent-violet)' }}>{reply.author}</strong>: <span style={{ color: 'var(--text-muted)' }}>{reply.content}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
