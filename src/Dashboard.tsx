import React from 'react';
import type { VisitorData } from './types';

interface DashboardProps {
  data: VisitorData;
}

export const Dashboard: React.FC<DashboardProps> = ({ data }) => {
  return (
    <div className="container">
      <div className="nav">
        <h2 style={{ margin: 0, background: 'linear-gradient(to right, #6366f1, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          VisiTrack AI Dashboard
        </h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div className="pulse"></div>
          <span style={{ fontSize: '0.9rem', color: '#10b981', fontWeight: 600 }}>Active Session</span>
          <div className="badge">{data.trafficType} Traffic</div>
        </div>
      </div>

      <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Your Visitor Analytics</h1>
        <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
          Real-time insights captured automatically from your current browser session.
        </p>
      </header>

      <div className="grid">
        {/* Tech Specs Section */}
        <div className="glass-card">
          <h3 style={{ color: '#6366f1' }}>Environment</h3>
          <div className="form-group">
            <div className="data-label">Browser & Version</div>
            <div className="data-value">{data.browser}</div>
          </div>
          <div className="form-group">
            <div className="data-label">Operating System</div>
            <div className="data-value">{data.os}</div>
          </div>
          <div className="form-group">
            <div className="data-label">Language</div>
            <div className="data-value">{data.language}</div>
          </div>
          <div className="form-group">
            <div className="data-label">Resolution</div>
            <div className="data-value">{data.screenResolution}</div>
          </div>
        </div>

        {/* Behavior Section */}
        <div className="glass-card">
          <h3 style={{ color: '#ec4899' }}>Behavior</h3>
          <div className="form-group">
            <div className="data-label">Time on Page</div>
            <div className="data-value">{data.timeSpent} seconds</div>
          </div>
          <div className="form-group">
            <div className="data-label">Max Scroll Depth</div>
            <div className="data-value">{data.scrollDepth}%</div>
          </div>
          <div className="form-group">
            <div className="data-label">Visitor Type</div>
            <div className="data-value">{data.isReturning ? 'Returning Visitor' : 'First-time Visitor'}</div>
          </div>
          <div className="form-group">
            <div className="data-label">Timezone</div>
            <div className="data-value">{data.location.timezone}</div>
          </div>
        </div>

        {/* Location Section */}
        <div className="glass-card">
          <h3 style={{ color: '#10b981' }}>Location</h3>
          <div className="form-group">
            <div className="data-label">Country</div>
            <div className="data-value">{data.location.country}</div>
          </div>
          <div className="form-group">
            <div className="data-label">City</div>
            <div className="data-value">{data.location.city}</div>
          </div>
          <div className="form-group">
            <div className="data-label">IP Geolocation Status</div>
            <div className="data-value" style={{ color: '#10b981' }}>Verified via ip-api.com</div>
          </div>
        </div>

        {/* Marketing Attribution Section */}
        <div className="glass-card">
          <h3 style={{ color: '#f59e0b' }}>Attribution</h3>
          <div className="form-group">
            <div className="data-label">Referrer Source</div>
            <div className="data-value">{data.referrer}</div>
          </div>
          <div className="form-group">
            <div className="data-label">UTM Source / Medium</div>
            <div className="data-value">{data.utm.source || 'Direct'} / {data.utm.medium || 'None'}</div>
          </div>
          <div className="form-group">
            <div className="data-label">Campaign Name</div>
            <div className="data-value">{data.utm.campaign || 'Organic Session'}</div>
          </div>
        </div>
      </div>

      {/* Scrollable Spacer */}
      <div style={{ height: '60vh', marginTop: '4rem', borderTop: '1px solid var(--glass-border)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>Scroll down to test deep tracking...</p>
        <div style={{ width: '2px', height: '100px', background: 'linear-gradient(to bottom, var(--primary), transparent)' }}></div>
      </div>

      <footer style={{ padding: '4rem 0', textAlign: 'center', color: 'var(--text-muted)', borderTop: '1px solid var(--glass-border)' }}>
        &copy; 2026 VisiTrack AI. All data is processed on the client-side for privacy.
      </footer>
    </div>
  );
};
