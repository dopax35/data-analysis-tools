import React from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import { ShieldCheck, FileText, Lock, Scale, AlertTriangle, EyeOff, CheckCircle2, Code } from 'lucide-react';

export default function Legal() {
  return (
    <>
      <Head>
        <title>Legal Statements, Apache 2.0 & Data Privacy | dopa-X Community</title>
        <meta name="description" content="dopa-X legal statements, data privacy policy, patient data anonymization compliance, and Apache License 2.0 distribution terms." />
      </Head>
      <Navbar />

      <main style={{ padding: '40px 24px', maxWidth: '1100px', margin: '0 auto' }}>
        <header style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div className="badge badge-emerald" style={{ marginBottom: '12px' }}>
            <ShieldCheck size={14} /> Legal & Compliance Framework
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '12px' }}>
            Legal Statements & <span className="gradient-text">Privacy Governance</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '720px', margin: '0 auto', lineHeight: 1.6 }}>
            Official privacy disclosures, patient data anonymization policies, research participant consent agreements, and Apache License 2.0 distribution terms for <strong style={{ color: 'white' }}>https://www.dopa-x.org/portal</strong>.
          </p>
        </header>

        {/* 1. Privacy Policy */}
        <section className="glass-panel" style={{ padding: '28px', marginBottom: '28px' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--accent-cyan)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Lock size={22} /> 1. Data Privacy & Governance Policy
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

        {/* 2. Patient Data Anonymization & Privacy Preservation */}
        <section className="glass-panel" style={{ padding: '28px', marginBottom: '28px', border: '1px solid rgba(16,185,129,0.3)', background: 'linear-gradient(135deg, rgba(16,185,129,0.08), rgba(6,182,212,0.08))' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--accent-emerald)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <EyeOff size={22} /> 2. Strict Patient Data Anonymization & Privacy Compliance
          </h2>
          <div style={{ color: 'var(--text-main)', fontSize: '0.95rem', lineHeight: 1.6, display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <p>
              All clinical datasets, signal timeseries (oculomotor gaze, resting tremor accelerometer/gyroscope, keystroke dynamics), biological specimens, and open-access research repositories integrated into or hosted on the dopa-X platform are strictly subject to mandatory patient privacy protection and anonymization protocols:
            </p>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '20px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '10px', color: 'var(--text-muted)' }}>
                <li>
                  <strong style={{ color: 'white' }}>HIPAA & GDPR De-Identification Standards:</strong> All data distributed on dopa-X must be fully anonymized in compliance with the HIPAA Privacy Rule Safe Harbor standard (45 CFR § 164.514(b)) and GDPR anonymization guidelines (Recital 26). All 18 HIPAA direct and indirect identifiers—including patient names, geographic subdivisions smaller than state, dates, phone numbers, email addresses, medical record numbers (MRNs), device identifiers, and IP addresses—must be permanently stripped.
                </li>
                <li>
                  <strong style={{ color: 'white' }}>Strict Prohibition Against Re-Identification:</strong> Users, researchers, and algorithm developers are legally and contractually prohibited from attempting to re-identify any anonymized research participant, combining dopa-X datasets with external data sources for identification purposes, or un-masking participant identities.
                </li>
                <li>
                  <strong style={{ color: 'white' }}>Zero Un-Redacted PHI / PII Rule:</strong> Contributors must perform mandatory pre-submission privacy checks prior to submitting algorithm code, benchmarking scripts, pull requests, sample files, or discussion comments to ensure no raw Protected Health Information (PHI) or Personally Identifiable Information (PII) is included.
                </li>
                <li>
                  <strong style={{ color: 'white' }}>IRB & Ethical Open-Access Compliance:</strong> All open-access datasets (PhysioNet, PPMI, OpenNeuro, Zenodo) are utilized in accordance with Institutional Review Board (IRB) ethical guidelines and open-access data use agreements.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 3. TBD Data Privacy & Research Participant Consent Agreement */}
        <section className="glass-panel" style={{ padding: '28px', marginBottom: '28px', border: '1px solid rgba(6,182,212,0.3)', background: 'linear-gradient(135deg, rgba(6,182,212,0.08), rgba(139,92,246,0.08))' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'white', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileText size={22} className="gradient-text" /> 3. TBD Research Participant & Volunteer Consent Terms
          </h2>
          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '20px', borderRadius: '10px', fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--text-main)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <p style={{ marginBottom: '10px' }}>
              <strong>[TBD LEGAL CONSENT DISCLOSURE]</strong>
            </p>
            <p style={{ marginBottom: '10px', color: 'var(--text-muted)' }}>
              By completing volunteer registration on the dopa-X portal, you acknowledge and agree that:
            </p>
            <ol style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px', color: 'var(--text-muted)' }}>
              <li>You are voluntarily contributing open-source software code, signal processing algorithms, or clinical feature extraction formulas.</li>
              <li>All raw clinical datasets accessed via open repositories (PhysioNet, PPMI, OpenNeuro, Zenodo) are subject to their respective open-access licenses and IRB data use agreements.</li>
              <li>You will strictly preserve patient privacy and will not attempt to re-identify anonymized patient data or upload un-redacted personal health information (PHI) to GitHub or community channels.</li>
              <li>All code, algorithms, pipelines, and data assets contributed to or distributed by dopa-X are made available under the Apache License, Version 2.0.</li>
            </ol>
          </div>
        </section>

        {/* 4. Copyright & Patent Assignment Agreement (CAA) & Commercial IP Provisions */}
        <section className="glass-panel" style={{ padding: '28px', marginBottom: '28px', border: '1px solid rgba(139,92,246,0.4)', background: 'linear-gradient(135deg, rgba(139,92,246,0.08), rgba(6,182,212,0.08))' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--accent-violet)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Scale size={22} /> 4. Copyright & Patent Assignment Agreement (CAA) & Commercial IP Provisions
          </h2>
          <div style={{ color: 'var(--text-main)', fontSize: '0.95rem', lineHeight: 1.6, display: 'flex', flexDirection: 'column', gap: '14px' }}>
            
            {/* Mission Lock Preamble */}
            <div style={{ background: 'rgba(139,92,246,0.12)', padding: '16px', borderRadius: '10px', border: '1px solid rgba(139,92,246,0.3)' }}>
              <h3 style={{ color: 'white', fontSize: '1rem', fontWeight: 700, marginBottom: '6px' }}>
                Mission Lock Preamble & Purpose of Commercialization
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                dopa-X operates as an open-access research nonprofit organization. We explicitly guarantee that commercial spin-outs and for-profit subsidiary entities will only be deployed when strictly necessary to achieve clinical scale. This is limited to initiatives requiring massive capital, specifically: funding multi-million dollar FDA regulatory device clearances, manufacturing physical medical hardware at scale, and securing specialized federal research or commercialization grants that non-profit research entities cannot access directly.
              </p>
            </div>

            {/* CAA & Assignment Terms */}
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '20px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <strong style={{ color: 'white' }}>1. Copyright and Patent Assignment Agreement (CAA):</strong>
                <p style={{ color: 'var(--text-muted)', marginTop: '4px' }}>
                  By participating as a volunteer contributor, you hereby irrevocably assign, transfer, and convey to dopa-X, its successors, and assigns, all worldwide right, title, and interest in and to all copyrights, patents, patent applications, patentable inventions (including novel digital biomarker algorithms, neural network models, and multimodal sensor integrations), trade secrets, and other intellectual property rights created, authored, or reduced to practice during your volunteer contributions. dopa-X shall be the sole and exclusive owner of such intellectual property, possessing the absolute authority to exclusively license, assign, or monetize the intellectual property to future for-profit subsidiaries or spin-outs without requiring further consent, notice, or compensation to past volunteers.
                </p>
              </div>

              <div>
                <strong style={{ color: 'white' }}>2. Explicit Commercial & Sublicensing Rights:</strong>
                <p style={{ color: 'var(--text-muted)', marginTop: '4px' }}>
                  Contributors explicitly grant to dopa-X the unencumbered, irrevocable, worldwide, royalty-free right to commercialize, sublicense (through multiple tiers), assign, sell, or transfer any contributed intellectual property to third parties. This expressly includes affiliated or newly formed for-profit entities, subsidiaries, corporate spin-outs, and commercial licensing partners. Volunteer contributions are expressly not limited to non-commercial, academic, or research use, but may be utilized for full-scale commercialization.
                </p>
              </div>

              <div>
                <strong style={{ color: 'white' }}>3. Broad Scope of "Inventions":</strong>
                <p style={{ color: 'var(--text-muted)', marginTop: '4px' }}>
                  The scope of this assignment comprehensively covers all software code, digital biomarker algorithms, neural network weights, data structures, hardware designs, schematics (including IMU accelerometers, gyroscopes, optical/gaze sensors, and acoustic microphones), firmware, data processing pipelines, clinical protocols, and technical methodologies conceived, developed, or derived using dopa-X datasets, equipment, platform infrastructure, or volunteer project directives.
                </p>
              </div>

              <div>
                <strong style={{ color: 'white' }}>4. The Quid Pro Quo (Volunteer Protections & Guarantees):</strong>
                <ul style={{ paddingLeft: '20px', marginTop: '6px', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <li><strong style={{ color: 'var(--accent-cyan)' }}>The Open Source Guarantee:</strong> To ensure reciprocal benefit, the core platform infrastructure, baseline algorithm repositories, and foundational dataset schemas will permanently remain open-source and publicly accessible under the Apache License, Version 2.0 (and CC-BY 4.0 for data), irrespective of whether specialized clinical applications, proprietary pipelines, or hardware devices are subsequently commercialized by affiliated spin-outs.</li>
                  <li><strong style={{ color: 'var(--accent-emerald)' }}>Side Project Carve-Out (Scope Delineation):</strong> This intellectual property assignment applies STRICTLY and ONLY to contributions intentionally submitted or pushed to dopa-X repositories, developed directly on dopa-X platforms, or created materially utilizing dopa-X datasets and resources. Any personal side projects, independent startups, or intellectual property developed on your own time without dopa-X resources, or subject to prior external employer IP agreements, are explicitly carved out and excluded from this assignment.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Apache 2.0 Open Source Licensing & Intellectual Property */}
        <section className="glass-panel" style={{ padding: '28px', marginBottom: '28px', border: '1px solid rgba(6,182,212,0.3)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--accent-cyan)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Code size={22} /> 5. Apache License, Version 2.0 Open Source Distribution
          </h2>
          <div style={{ color: 'var(--text-main)', fontSize: '0.95rem', lineHeight: 1.6, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <p>
              All foundational data, source code, component visualizers, algorithms, and documentation published on <code>https://github.com/dopax35/data-analysis-tools</code> and <strong style={{ color: 'white' }}>https://www.dopa-x.org/portal</strong> are distributed under the terms of the <strong style={{ color: 'var(--accent-cyan)' }}>Apache License, Version 2.0</strong>.
            </p>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '18px', borderRadius: '10px', fontSize: '0.88rem', color: 'var(--text-muted)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <h3 style={{ color: 'white', fontSize: '1rem', fontWeight: 700, marginBottom: '8px' }}>Apache License 2.0 Summary & Compliance Provisions:</h3>
              <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <li><strong style={{ color: 'white' }}>Grant of Copyright License:</strong> Subject to the terms of the License, each Contributor grants a perpetual, worldwide, non-exclusive, no-charge, royalty-free, irrevocable copyright license to reproduce, prepare derivative works of, publicly display, sublicense, and distribute the Work.</li>
                <li><strong style={{ color: 'white' }}>Grant of Patent License:</strong> Each Contributor grants a perpetual, worldwide, non-exclusive, royalty-free patent license to make, use, sell, offer to sell, or import the Work, protecting users against patent claims.</li>
                <li><strong style={{ color: 'white' }}>Redistribution Conditions:</strong> You may reproduce and distribute copies of the Work or Derivative Works provided you retain copyright, patent, trademark, and attribution notices, include a copy of the Apache 2.0 License, and indicate modified files.</li>
                <li><strong style={{ color: 'white' }}>Disclaimer of Warranty:</strong> Unless required by applicable law or agreed in writing, Licensor provides the Work on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.</li>
                <li><strong style={{ color: 'white' }}>Limitation of Liability:</strong> In no event shall any Contributor be liable for any direct, indirect, special, incidental, or consequential damages arising out of the use or inability to use the Work.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 6. Medical & Diagnostic Disclaimer */}
        <section className="glass-panel" style={{ padding: '28px', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#f59e0b', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertTriangle size={22} /> 6. Medical & Diagnostic Disclaimer
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
            The algorithms, biomarker extraction pipelines, and signal visualizers developed on the dopa-X platform are intended <strong>exclusively for scientific research and educational evaluation</strong>. They do not constitute formal medical diagnosis, clinical treatment advice, or FDA-cleared medical devices. Clinical decisions regarding Parkinson's or neurodegenerative care should always be made with qualified healthcare professionals.
          </p>
        </section>

      </main>
    </>
  );
}

