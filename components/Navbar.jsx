import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Activity, LayoutGrid, UserPlus, Share2, Video } from 'lucide-react';

export default function Navbar() {
  const router = useRouter();

  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutGrid },
    { name: 'Projects & Tasks', path: '/projects', icon: Activity },
    { name: 'Data Tutorials & Q&A', path: '/tutorials', icon: Video },
    { name: 'Volunteer Register', path: '/register', icon: UserPlus },
    { name: 'Referral Hub', path: '/referral', icon: Share2 },
  ];

  return (
    <nav style={{ borderBottom: '1px solid var(--border-card)', background: 'rgba(11, 15, 25, 0.85)', backdropFilter: 'blur(12px)', sticky: 'top', top: 0, zIndex: 100 }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-violet))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '1.2rem' }}>
            dX
          </div>
          <span style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-main)' }}>
            dopa-<span className="gradient-text">X</span> Community
          </span>
        </Link>

        <div style={{ display: 'flex', gap: '8px' }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = router.pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 14px',
                  borderRadius: '8px',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  textDecoration: 'none',
                  color: isActive ? 'var(--accent-cyan)' : 'var(--text-muted)',
                  background: isActive ? 'rgba(6, 182, 212, 0.1)' : 'transparent',
                  border: isActive ? '1px solid rgba(6, 182, 212, 0.25)' : '1px solid transparent',
                  transition: 'all 0.2s ease'
                }}
              >
                <Icon size={16} />
                {item.name}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
