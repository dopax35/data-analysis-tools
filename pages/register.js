import React, { useState } from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import { UserPlus, CheckCircle, Share2, Copy, Github, Mail, User, Sparkles } from 'lucide-react';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    github: '',
    skills: ['Python', 'Signal Processing'],
    refCode: ''
  });

  const [registeredUser, setRegisteredUser] = useState(null);
  const [copied, setCopied] = useState(false);

  const availableSkills = [
    'Python', 'Signal Processing', 'React', 'Next.js', 'Machine Learning', 
    'PyTorch', 'SQL', 'PostgreSQL', 'Biostatistics'
  ];

  const handleSkillToggle = (skill) => {
    if (formData.skills.includes(skill)) {
      setFormData({ ...formData, skills: formData.skills.filter(s => s !== skill) });
    } else {
      setFormData({ ...formData, skills: [...formData.skills, skill] });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const handleClean = formData.github.replace('@', '').trim();
    const mockRef = `dopax-ref-${handleClean.toLowerCase()}-9921`;
    setRegisteredUser({
      name: formData.name,
      github: handleClean,
      refCode: mockRef,
      refUrl: `https://dopa-x.vercel.app/register?ref=${mockRef}`
    });
  };

  const copyRefLink = () => {
    if (registeredUser) {
      navigator.clipboard.writeText(registeredUser.refUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <>
      <Head>
        <title>Volunteer Registration | dopa-X Community</title>
      </Head>
      <Navbar />

      <main style={{ padding: '40px 24px', maxWidth: '800px', margin: '0 auto' }}>
        <header style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div className="badge badge-cyan" style={{ marginBottom: '12px' }}>
            <Sparkles size={14} /> Join 250+ Research Volunteers
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '12px' }}>
            Volunteer <span className="gradient-text">Registration</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>
            Register your technical skills to get matched with Monday.com biomarker tasks & invite fellow researchers.
          </p>
        </header>

        {!registeredUser ? (
          <form onSubmit={handleSubmit} className="glass-panel" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', fontWeight: 600, marginBottom: '8px', color: 'var(--text-main)' }}>
                <User size={16} /> Full Name
              </label>
              <input 
                type="text" 
                required 
                placeholder="Dr. Alex Rivera"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                style={{ width: '100%', padding: '12px 16px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-card)', borderRadius: '8px', color: 'white', fontSize: '1rem' }}
              />
            </div>

            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', fontWeight: 600, marginBottom: '8px', color: 'var(--text-main)' }}>
                <Mail size={16} /> Email Address
              </label>
              <input 
                type="email" 
                required 
                placeholder="alex.rivera@research.org"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                style={{ width: '100%', padding: '12px 16px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-card)', borderRadius: '8px', color: 'white', fontSize: '1rem' }}
              />
            </div>

            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', fontWeight: 600, marginBottom: '8px', color: 'var(--text-main)' }}>
                <Github size={16} /> GitHub Username
              </label>
              <input 
                type="text" 
                required 
                placeholder="arivera-bio"
                value={formData.github}
                onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                style={{ width: '100%', padding: '12px 16px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-card)', borderRadius: '8px', color: 'white', fontSize: '1rem' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '12px', color: 'var(--text-main)' }}>
                Select Your Technical Skills
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {availableSkills.map((skill) => {
                  const isSelected = formData.skills.includes(skill);
                  return (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => handleSkillToggle(skill)}
                      style={{
                        padding: '8px 14px',
                        borderRadius: '20px',
                        border: isSelected ? '1px solid var(--accent-cyan)' : '1px solid rgba(255,255,255,0.1)',
                        background: isSelected ? 'rgba(6, 182, 212, 0.2)' : 'rgba(0,0,0,0.2)',
                        color: isSelected ? 'var(--accent-cyan)' : 'var(--text-muted)',
                        cursor: 'pointer',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {isSelected ? 'âœ“ ' : ''}{skill}
                    </button>
                  );
                })}
              </div>
            </div>

            <button type="submit" className="btn-primary" style={{ marginTop: '12px', justifyContent: 'center', padding: '14px' }}>
              <UserPlus size={18} /> Complete Registration & Generate Referral Link
            </button>
          </form>
        ) : (
          <div className="glass-panel" style={{ padding: '40px', textAlign: 'center' }}>
            <CheckCircle size={56} style={{ color: 'var(--accent-emerald)', marginBottom: '16px' }} />
            <h2 style={{ fontSize: '1.8rem', marginBottom: '8px' }}>Welcome, {registeredUser.name}!</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
              Your profile is registered with <code>agent-guide</code>. You are ready to claim Monday.com tasks!
            </p>

            <div style={{ background: 'rgba(0,0,0,0.4)', padding: '20px', borderRadius: '12px', border: '1px solid var(--border-card)', marginBottom: '24px' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>
                Your Unique Community Referral Link
              </span>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <input 
                  type="text" 
                  readOnly 
                  value={registeredUser.refUrl}
                  style={{ flex: 1, padding: '10px 14px', background: 'transparent', border: 'none', color: 'var(--accent-cyan)', fontFamily: 'monospace', fontSize: '0.9rem' }}
                />
                <button onClick={copyRefLink} className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
                  <Copy size={14} /> {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>

            <a href="/projects" className="btn-primary" style={{ textDecoration: 'none' }}>
              View Open Monday Projects & Claim Tasks
            </a>
          </div>
        )}
      </main>
    </>
  );
}
