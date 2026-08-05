import React from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import { Share2, Trophy, Users, Award, ExternalLink, ArrowRight } from 'lucide-react';

export default function Referral() {
  const topReferrers = [
    { rank: 1, name: 'Dr. Elena Rostova', handle: 'erostova-lab', count: 14, badge: 'Pioneer Scout' },
    { rank: 2, name: 'Marcus Chen', handle: 'mchen-ml', count: 9, badge: 'Signal Master' },
    { rank: 3, name: 'Sofia Al-Mansoor', handle: 'sofia-bio', count: 7, badge: 'Contributor Leader' },
    { rank: 4, name: 'David Miller', handle: 'dmiller-neuro', count: 5, badge: 'Scout' },
  ];

  return (
    <>
      <Head>
        <title>Referral Hub & Leaderboard | dopa-X Community</title>
      </Head>
      <Navbar />

      <main style={{ padding: '40px 24px', maxWidth: '1000px', margin: '0 auto' }}>
        <header style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div className="badge badge-cyan" style={{ marginBottom: '12px' }}>
            <Share2 size={14} /> Expand Research Impact
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '12px' }}>
            Community <span className="gradient-text">Referral Hub</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '650px', margin: '0 auto' }}>
            Invite fellow data scientists, bioinformaticians, and software engineers to contribute to neurodegenerative digital biomarker discovery.
          </p>
        </header>

        {/* Stats Grid */}
        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '40px' }}>
          <div className="glass-panel" style={{ padding: '24px', textAlign: 'center' }}>
            <Users size={32} style={{ color: 'var(--accent-cyan)', marginBottom: '8px' }} />
            <h3 style={{ fontSize: '2rem', fontWeight: 800 }}>184</h3>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Invited Volunteer Scientists</span>
          </div>

          <div className="glass-panel" style={{ padding: '24px', textAlign: 'center' }}>
            <Trophy size={32} style={{ color: 'var(--accent-violet)', marginBottom: '8px' }} />
            <h3 style={{ fontSize: '2rem', fontWeight: 800 }}>42</h3>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Merged PRs via Referrals</span>
          </div>

          <div className="glass-panel" style={{ padding: '24px', textAlign: 'center' }}>
            <Award size={32} style={{ color: 'var(--accent-emerald)', marginBottom: '8px' }} />
            <h3 style={{ fontSize: '2rem', fontWeight: 800 }}>Top Tier</h3>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Biomarker Scout Badges</span>
          </div>
        </section>

        {/* Leaderboard Table */}
        <section className="glass-panel" style={{ padding: '32px', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Trophy size={22} className="gradient-text" /> Top Community Referrers
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {topReferrers.map((item) => (
              <div 
                key={item.rank}
                style={{
                  display: 'flex',
                  justifyInContent: 'space-between',
                  alignItems: 'center',
                  padding: '16px 20px',
                  borderRadius: '10px',
                  background: 'rgba(0,0,0,0.25)',
                  border: '1px solid rgba(255,255,255,0.05)',
                  flexWrap: 'wrap',
                  gap: '12px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: item.rank === 1 ? 'linear-gradient(135deg, #f59e0b, #ef4444)' : 'rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    color: 'white'
                  }}>
                    #{item.rank}
                  </div>

                  <div>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 600 }}>{item.name}</h4>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>@{item.handle}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span className="badge badge-cyan">{item.badge}</span>
                  <span style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--accent-cyan)' }}>
                    {item.count} Invitations
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="glass-panel" style={{ padding: '32px', textAlign: 'center', background: 'linear-gradient(135deg, rgba(6,182,212,0.1), rgba(139,92,246,0.1))' }}>
          <h3 style={{ fontSize: '1.4rem', marginBottom: '8px' }}>Want to generate your own referral link?</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>
            Register as a volunteer data scientist to get a unique link and earn contributor badges.
          </p>
          <a href="/register" className="btn-primary" style={{ textDecoration: 'none' }}>
            Get Your Referral Link <ArrowRight size={16} />
          </a>
        </div>
      </main>
    </>
  );
}
