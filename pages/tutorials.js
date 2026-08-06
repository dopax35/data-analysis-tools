import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import ScheduleTutorialModal from '../components/ScheduleTutorialModal';
import { Video, Calendar, Users, HelpCircle, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function Tutorials() {
  const [sessions, setSessions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState('Eye-Tracking Data Format & Gaze Stability Extraction');

  useEffect(() => {
    fetchTutorials();
  }, []);

  async function fetchTutorials() {
    try {
      const res = await fetch('/api/tutorials');
      const data = await res.json();
      if (data.sessions) {
        setSessions(data.sessions);
      }
    } catch (e) {
      console.error('Fetch tutorials error:', e);
    }
  }

  const openScheduleWithTopic = (topic) => {
    setSelectedTopic(topic);
    setIsModalOpen(true);
  };

  return (
    <>
      <Head>
        <title>Live Data Tutorials & Q&A | dopa-X Community</title>
      </Head>
      <Navbar />

      <main style={{ padding: '40px 24px', maxWidth: '1100px', margin: '0 auto' }}>
        <header style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div className="badge badge-cyan" style={{ marginBottom: '12px' }}>
            <Video size={14} /> Scientific Knowledge Exchange
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '12px' }}>
            Data Structure <span className="gradient-text">Tutorials & Q&A</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '650px', margin: '0 auto' }}>
            Join live technical workshops or schedule 1-on-1 sessions with dopa-X specialists to master raw signal structures, feature extraction formulas, and PR submissions.
          </p>
        </header>

        {/* Action Callout */}
        <div className="glass-panel" style={{ padding: '28px', marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px', background: 'linear-gradient(135deg, rgba(6,182,212,0.12), rgba(139,92,246,0.12))' }}>
          <div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '6px' }}>Need help understanding a specific dataset format?</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Schedule a custom tutorial session with our scientific engineering team.</p>
          </div>

          <button onClick={() => openScheduleWithTopic('Eye-Tracking Data Format & Gaze Stability Extraction')} className="btn-primary" style={{ padding: '12px 20px' }}>
            <Calendar size={16} /> Schedule 1-on-1 Tutorial Session
          </button>
        </div>

        {/* Scheduled Upcoming Tutorials */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Calendar size={22} className="gradient-text" /> Upcoming Community Workshops
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
            {sessions.map(session => (
              <div key={session.id} className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <span className="badge badge-emerald" style={{ marginBottom: '10px' }}>
                    <Calendar size={12} /> {session.date} • {session.time}
                  </span>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '10px' }}>{session.topic}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '16px' }}>
                    Speaker: <strong style={{ color: 'var(--accent-cyan)' }}>{session.speaker}</strong>
                  </p>
                </div>

                <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Users size={14} /> {session.attendeesCount} Researchers Attending
                  </span>

                  <button 
                    onClick={() => openScheduleWithTopic(session.topic)}
                    className="btn-primary" 
                    style={{ fontSize: '0.85rem', padding: '6px 12px' }}
                  >
                    Register / Join <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tutorial Modal */}
        <ScheduleTutorialModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          defaultTopic={selectedTopic}
        />
      </main>
    </>
  );
}
