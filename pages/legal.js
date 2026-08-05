import React from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import { ShieldCheck, FileText, Lock, Scale, AlertTriangle, CheckCircle2, Globe } from 'lucide-react';

export default function Legal() {
  return (
    <>
      <Head>
        <title>Legal Statements & Privacy Policy | dopa-X Community</title>
        <meta name="description" content="dopa-X legal statements, data privacy policy, research participant consent, and open source licensing." />
      </Head>
      <Navbar />

      <main style={{ padding: '40px 24px', maxWidth: '1100px', margin: '0 auto' }}>
        <header style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div className="badge badge-emerald" style={{ marginBottom: '12px' }}>
            <ShieldCheck size={14} /> Legal & Compliance Framework
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '12px' }}>
            Legal Statements & <span className="gradient-text">Privacy Policy</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '650px', margin: '0 auto', lineHeight: 1.6 }}>
            Official privacy disclosures, research participant consent agreements, data governance policies, and open-source licensing terms for <strong style={{ color: 'white' }}>https://www.dopa-x.org/portal</strong>.
          </p>
        </header>

        {/* 1. Privacy Policy */}
        <section className="glass-panel" style={{ padding: '28px', marginBottom: '28px' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--accent-cyan)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Lock size={22} /> 1. Data Privacy Policy
          </h2>
          <div style={{ color: 'var(--text-main)', fontSize: '0.95rem', lineHeight: 1.6, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <p>
              dopa-X ("we", "our", or "platform") is committed to protecting the privacy of volunteer data scientists, researchers, and community contributors who access our portal at <code>https://www.dopa-x.org/portal</code>.
            </p>
            <div>
              <strong style={{ color: 'white' }}>Information We Collect:</strong>
              <ul style={{ paddingLeft: '20px', marginTop: '6px', color: 'var(--text-muted)' }}>
                <li>Volunteer registration data: Full Name, Email Address, GitHub Handle, and Technical Skill Set.</li>
                <li>Community activity: Task assignments, discussion posts, benchmark result submissions, and tutorial bookings.</li>
                <li>Session & Cookie Data: Local session storage tokens for portal access authentication.</li>
              </ul>
            </div>
            <div>
              <strong style={{ color: 'white' }}>Use of Information:</strong>
              <p style={{ color: 'var(--text-muted)', marginTop: '4px' }}>
                Registration data is strictly used to match volunteer skills with open biomarker projects, issue referral links, and manage contribution credits. We <strong>NEVER sell, rent, or commercialize volunteer personal data</strong> to third parties.
              </p>
            </div>
          </div>
        </section>

        {/* 2. TBD Data Privacy & Research Participant Consent Agreement */}
        <section className="glass-panel" style={{ padding: '28px', marginBottom: '28px', border: '1px solid rgba(6,182,212,0.3)', background: 'linear-gradient(135deg, rgba(6,182,212,0.08), rgba(139,92,246,0.08))' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'white', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileText size={22} className="gradient-text" /> 2. TBD Research Participant & Volunteer Consent Agreement
          </h2>
          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '20px', borderRadius: '10px', fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--text-main)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <p style={{ marginBottom: '10px' }}>
              <strong>[TBD LEGAL DOCUMENT DISCLOSURE]</strong>
            </p>
            <p style={{ marginBottom: '10px', color: 'var(--text-muted)' }}>
              By completing volunteer registration on the dopa-X portal, you acknowledge and agree that:
            </p>
            <ol style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px', color: 'var(--text-muted)' }}>
              <li>You are voluntarily contributing open-source software code, signal processing algorithms, or clinical feature extraction formulas.</li>
              <li>All raw clinical datasets accessed via open repositories (PhysioNet, PPMI, OpenNeuro, Zenodo) are subject to their respective open-access licenses and IRB data use agreements.</li>
              <li>You will not attempt to re-identify anonymized patient data or upload un-redacted personal health information (PHI) to GitHub.</li>
              <li>All algorithm code contributed to the dopa-X repository is made available under the open-source MIT License.</li>
            </ol>
          </div>
        </section>

        {/* 3. Medical & Diagnostic Disclaimer */}
        <section className="glass-panel" style={{ padding: '28px', marginBottom: '28px' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#f59e0b', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertTriangle size={22} /> 3. Medical & Diagnostic Disclaimer
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
            The algorithms, biomarker extraction pipelines, and signal visualizers developed on the dopa-X platform are intended <strong>exclusively for scientific research and educational evaluation</strong>. They do not constitute formal medical diagnosis, clinical treatment advice, or FDA-cleared medical devices. Clinical decisions regarding Parkinson's or neurodegenerative care should always be made with qualified healthcare professionals.
          </p>
        </section>

        {/* 4. Open Source & Intellectual Property */}
        <section className="glass-panel" style={{ padding: '28px', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--accent-violet)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Scale size={22} /> 4. Intellectual Property & Open Source License
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
            All source code, component visualizers, and algorithm feature extraction engines contributed to <code>https://github.com/dopax35/data-analysis-tools</code> are licensed under the open-source MIT License. Contributors retain copyright over their original contributions while granting dopa-X a perpetual, worldwide, non-exclusive license to incorporate algorithms into the dopa-X mobile application and research platform.
          </p>
        </section>

      </main>
    </>
  );
}
