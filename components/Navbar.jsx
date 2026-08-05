import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Activity, LayoutGrid, UserPlus, Share2, Video, Layers, BookOpen } from 'lucide-react';

export default function Navbar() {
  const router = useRouter();

  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutGrid },
    { name: 'Projects & Tasks', path: '/projects', icon: Activity },
    { name: 'Data Tutorials & Demos', path: '/tutorials', icon: Video },
    { name: 'Volunteer Register', path: '/register', icon: UserPlus },
    { name: 'Community Hub', path: '/referral', icon: Share2 },
    { name: 'Research Lab', path: '/research', icon: Layers },
    { name: 'Docs & Guide', path: '/docs', icon: BookOpen },
  ];

  return (
    <nav style={{ borderBottom: '1px solid var(--border-card)', background: 'rgba(11, 15, 25, 0.92)', backdropFilter: 'blur(12px)', position: 'sticky', top: 0, zIndex: 100 }}>
      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '14px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-violet))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '1.2rem' }}>
            dX
          </div>
          <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)' }}>
            dopa-<span className="gradient-text">X</span> Community
          </span>
        </Link>

        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
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
                  gap: '6px',
                  padding: '7px 12px',
                  borderRadius: '8px',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  textDecoration: 'none',
                  color: isActive ? 'var(--accent-cyan)' : 'var(--text-muted)',
                  background: isActive ? 'rgba(6, 182, 212, 0.12)' : 'transparent',
                  border: isActive ? '1px solid rgba(6, 182, 212, 0.3)' : '1px solid transparent',
                  transition: 'all 0.2s ease'
                }}
              >
                <Icon size={14} />
                {item.name}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
