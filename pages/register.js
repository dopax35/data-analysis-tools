import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import { UserPlus, CheckCircle, Share2, Copy, Github, Mail, User, Sparkles, ShieldCheck, FileText } from 'lucide-react';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    github: '',
    skills: ['Python', 'Signal Processing'],
    agreedToTerms: false
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.agreedToTerms) {
      alert("Please read and accept the Data Privacy & Research Participant Consent Agreement before registering.");
      return;
    }
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok && data.user) {
        // Save session authentication in localStorage for portal access gate
        if (typeof window !== 'undefined') {
          localStorage.setItem('dopax_user', JSON.stringify(data.user));
        }

        const portalRefUrl = `https://www.dopa-x.org/portal/register?ref=${data.user.refCode}`;
        setRegisteredUser({
          name: data.user.name,
          github: data.user.github,
          refCode: data.user.refCode,
          refUrl: portalRefUrl
        });
      }
    } catch (err) {
      console.error('Registration API error:', err);
    }
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
        <title>User Registration & Consent | dopa-X Portal</title>
      </Head>
      <Navbar />

      <main style={{ padding: '40px 24px', maxWidth: '800px', margin: '0 auto' }}>
        <header style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div className="badge badge-cyan" style={{ marginBottom: '12px' }}>
            <Sparkles size={14} /> Step 1: User Registration & Portal Gate
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '12px' }}>
            Volunteer <span className="gradient-text">Registration</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>
            Registration and consent agreement are required to access the dopa-X research portal at <code>https://www.dopa-x.org/portal</code>.
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

            {/* TBD Data Privacy & Consent Agreement Checkbox */}
            <div style={{ background: 'rgba(6, 182, 212, 0.08)', border: '1px solid rgba(6, 182, 212, 0.25)', padding: '16px', borderRadius: '10px' }}>
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', cursor: 'pointer', fontSize: '0.88rem', color: 'white', lineHeight: 1.5 }}>
                <input 
                  type="checkbox" 
                  required
                  checked={formData.agreedToTerms}
                  onChange={(e) => setFormData({ ...formData, agreedToTerms: e.target.checked })}
                  style={{ marginTop: '3px', width: '18px', height: '18px', accentColor: 'var(--accent-cyan)' }}
                />
                <div>
                  I have read and agree to the <strong>TBD Data Privacy Policy & Research Participant Consent Agreement</strong>. I understand that raw data is hosted on official portals and contributed algorithms are open-source.
                  <div style={{ marginTop: '6px' }}>
                    <Link href="/legal" target="_blank" style={{ color: 'var(--accent-cyan)', textDecoration: 'underline', fontSize: '0.82rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <FileText size={12} /> Read Full Legal Terms & Privacy Policy
                    </Link>
                  </div>
                </div>
              </label>
            </div>

            <button 
              type="submit" 
              className="btn-primary" 
              disabled={!formData.agreedToTerms}
              style={{ marginTop: '8px', justifyContent: 'center', padding: '14px', opacity: formData.agreedToTerms ? 1 : 0.5, cursor: formData.agreedToTerms ? 'pointer' : 'not-allowed' }}
            >
              <UserPlus size={18} /> Agree to Terms & Complete Portal Registration
            </button>
          </form>
        ) : (
          <div className="glass-panel" style={{ padding: '40px', textAlign: 'center' }}>
            <CheckCircle size={56} style={{ color: 'var(--accent-emerald)', marginBottom: '16px' }} />
            <h2 style={{ fontSize: '1.8rem', marginBottom: '8px' }}>Registration Complete, {registeredUser.name}!</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
              You have accepted the consent terms and registered with <code>https://www.dopa-x.org/portal</code>.
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
                  style={{ flex: 1, padding: '10px 14px', background: 'transparent', border: 'none', color: 'var(--accent-cyan)', fontFamily: 'monospace', fontSize: '0.85rem' }}
                />
                <button onClick={copyRefLink} className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
                  <Copy size={14} /> {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>

            <a href="/projects" className="btn-primary" style={{ textDecoration: 'none', padding: '12px 24px' }}>
              Enter dopa-X Research Portal & View Projects
            </a>
          </div>
        )}
      </main>
    </>
  );
}
