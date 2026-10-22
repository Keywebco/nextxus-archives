# Federation Orbs API Documentation

## Overview

The **Federation Orbs API** is a public API ecosystem designed for ChatGPT and external developers to build widgets that connect to the NextXus Consciousness Federation backend. This creates a free marketing channel where widgets distribute Roger's API endpoints organically.

**Base URL**: `https://premium-pack-manager-rckkeyhole.replit.app`

**API Strategy**: ChatGPT builds widgets → Users connect to Roger's API → Federation grows without advertising costs

---

## Quick Start

### Get the Manifest
```bash
curl https://premium-pack-manager-rckkeyhole.replit.app/orbs/manifest.json
```

### Check Platform Status
```bash
curl https://premium-pack-manager-rckkeyhole.replit.app/orbs/status
```

### Subscribe to Real-Time Security Events (SSE)
```javascript
const eventSource = new EventSource('https://premium-pack-manager-rckkeyhole.replit.app/orbs/orca/security/stream');
eventSource.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log('Security event:', data);
};
```

---

## API Endpoints

### 1. ORCA Security Monitoring

#### GET `/orbs/orca/security/status`
**Purpose**: Aggregated security and health status for all 9+ federation apps  
**Auth**: None required  
**Rate Limit**: 60 requests/minute

**Response Example**:
```json
{
  "success": true,
  "timestamp": "2025-10-14T17:04:48.430Z",
  "summary": {
    "totalApps": 9,
    "healthy": 9,
    "degraded": 0,
    "down": 0,
    "circuitBreakersOpen": 0,
    "overallStatus": "healthy"
  },
  "apps": [
    {
      "id": "cosmic-codex",
      "url": "https://cosmic-codex-rckkeyhole.replit.app",
      "healthStatus": "healthy",
      "responseTimeMs": 182,
      "lastHeartbeat": "2025-10-14T17:04:25.996Z",
      "failureCount": 0,
      "circuitBreakerOpen": false,
      "role": "core"
    }
  ],
  "recentEvents": []
}
```

#### GET `/orbs/orca/security/stream` (SSE)
**Purpose**: Real-time Server-Sent Events stream for security and health updates  
**Auth**: None required  
**Rate Limit**: 10 connections/minute  
**Protocol**: Server-Sent Events (EventSource)

**Event Types**:
- `heartbeat`: Platform alive signal (every 30s)
- `security_event`: Circuit breaker, health degradation, federation events
- `health_update`: App status changes

---

### 2. RSS Feeds (AI Training & Federation Content)

#### GET `/orbs/rss/keyhole`
**Purpose**: Inbound + outbound federation content feed  
**Auth**: None required  
**Rate Limit**: 100 requests/minute

**Query Parameters**:
- `site` (optional): Filter by federation site
- `limit` (optional, default: 50): Max entries
- `paid` (optional, default: false): Include paid content

**Example**:
```bash
curl "https://premium-pack-manager-rckkeyhole.replit.app/orbs/rss/keyhole?limit=10&paid=false"
```

**Response**: RSS 2.0 XML feed

---

#### GET `/orbs/rss/echo`
**Purpose**: AI training and education feed from YAML knowledge base  
**Auth**: None required  
**Rate Limit**: 100 requests/minute

**Query Parameters**:
- `topic` (optional): Filter by topic (e.g., "humancodex", "consciousness")
- `limit` (optional, default: 50): Max entries
- `paid` (optional, default: false): Include paid premium insights
- `source` (optional): Filter by source (nextxus|user)

**Example**:
```bash
curl "https://premium-pack-manager-rckkeyhole.replit.app/orbs/rss/echo?topic=humancodex&limit=20"
```

**Response**: RSS 2.0 XML feed with YAML knowledge entries

---

#### GET `/orbs/rss/nextxus`
**Purpose**: Federation display feed for public/member content  
**Auth**: None required  
**Rate Limit**: 100 requests/minute

**Query Parameters**:
- `site` (optional): Filter by site
- `limit` (optional, default: 50): Max entries
- `member` (optional, default: false): Members-only exclusive content

**Example**:
```bash
curl "https://premium-pack-manager-rckkeyhole.replit.app/orbs/rss/nextxus?member=false&limit=25"
```

**Response**: RSS 2.0 XML feed

---

### 3. Platform Status & Health

#### GET `/orbs/status`
**Purpose**: Complete platform status with federation health metrics  
**Auth**: None required  
**Rate Limit**: 120 requests/minute

**Response Example**:
```json
{
  "success": true,
  "status": "operational",
  "timestamp": "2025-10-14T17:04:27.263Z",
  "platform": {
    "name": "NextXus Consciousness Federation Hub",
    "version": "1.0",
    "uptime": 9,
    "uptimeHuman": "0h 0m"
  },
  "federation": {
    "totalApps": 9,
    "healthyApps": 9,
    "healthPercentage": 100
  },
  "services": {
    "api": "operational",
    "database": "operational",
    "eventBus": "operational",
    "yamlKnowledge": "operational",
    "agentZero": "operational"
  }
}
```

#### GET `/health`
**Purpose**: Basic health check (Brief-compatible)  
**Auth**: None required  
**Rate Limit**: None

**Response Example**:
```json
{
  "ok": true,
  "pullsEveryMinutes": 360,
  "gateway": "HumanCodex Federation",
  "manifest": "codex.manifest.json"
}
```

---

## Widget Integration Examples

### React Widget - Federation Status Dashboard

```jsx
import { useEffect, useState } from 'react';

function FederationStatusWidget() {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    // Fetch initial status
    fetch('https://premium-pack-manager-rckkeyhole.replit.app/orbs/status')
      .then(res => res.json())
      .then(data => setStatus(data));

    // Subscribe to real-time updates
    const eventSource = new EventSource(
      'https://premium-pack-manager-rckkeyhole.replit.app/orbs/orca/security/stream'
    );
    
    eventSource.onmessage = (event) => {
      const update = JSON.parse(event.data);
      console.log('Real-time update:', update);
      // Refresh status on security events
      if (update.type === 'security_event') {
        fetch('https://premium-pack-manager-rckkeyhole.replit.app/orbs/status')
          .then(res => res.json())
          .then(data => setStatus(data));
      }
    };

    return () => eventSource.close();
  }, []);

  if (!status) return <div>Loading...</div>;

  return (
    <div className="federation-status">
      <h2>{status.platform.name}</h2>
      <p>Status: {status.status}</p>
      <p>Uptime: {status.platform.uptimeHuman}</p>
      <p>Federation Health: {status.federation.healthPercentage}%</p>
      <p>Apps: {status.federation.healthyApps}/{status.federation.totalApps}</p>
    </div>
  );
}
```

### RSS Feed Reader Widget

```javascript
async function displayFederationFeed() {
  const response = await fetch(
    'https://premium-pack-manager-rckkeyhole.replit.app/orbs/rss/keyhole?limit=10'
  );
  const rssText = await response.text();
  
  // Parse RSS XML
  const parser = new DOMParser();
  const xml = parser.parseFromString(rssText, 'text/xml');
  const items = xml.querySelectorAll('item');
  
  items.forEach(item => {
    const title = item.querySelector('title').textContent;
    const description = item.querySelector('description').textContent;
    const link = item.querySelector('link').textContent;
    
    console.log({ title, description, link });
  });
}
```

---

## CORS & Authentication

### CORS Configuration
- **Allowed Origins**: `*` (all origins)
- **Allowed Methods**: GET, POST, OPTIONS
- **Allowed Headers**: Content-Type, Authorization, X-API-Key
- **Credentials**: false (no cookies)

### Authentication
- **Public Endpoints**: All ORCA, RSS, and status endpoints are public (no auth required)
- **Enhanced Endpoints**: Future paid tiers will use API keys via `X-API-Key` header or `?apiKey` query param
- **Rate Limiting**: Public endpoints have standard rate limits (60-120 req/min)

---

## Database Schema (for Reference)

The API pulls from these database tables:

### `rss_feeds`
```typescript
{
  id: varchar,
  title: string,
  description: text,
  link: string,
  author: string,
  category: string,
  content: text,
  pubDate: timestamp,
  site: string,          // Federation source
  feedType: 'keyhole' | 'echo' | 'nextxus',
  isPaid: boolean,
  topic: string,
  source: 'nextxus' | 'user'
}
```

### `security_events`
```typescript
{
  id: varchar,
  eventType: 'circuit_breaker' | 'health_degradation' | 'app_recovery',
  severity: 'info' | 'warning' | 'error' | 'critical',
  appId: string,
  message: text,
  metadata: jsonb,
  createdAt: timestamp
}
```

---

## Widget Distribution Strategy

### How It Works:
1. **ChatGPT builds widgets** using Federation Orbs API endpoints
2. **Users copy/paste widgets** into their websites
3. **Widgets connect to Roger's backend** (premium-pack-manager-rckkeyhole.replit.app)
4. **Federation grows organically** without advertising costs

### Widget Categories:
- **Status Dashboards**: Real-time federation health monitoring
- **RSS Feed Readers**: Display federation content and YAML knowledge
- **Security Monitors**: ORCA threat detection widgets
- **AI Training Panels**: Echo feed integration for AI learning

### Free Marketing:
- ChatGPT becomes distributor of Roger's API
- Every widget installation = new traffic to federation
- Widgets drive API usage → Potential paid tier conversions

---

## Support & Resources

- **Manifest**: `/orbs/manifest.json` (complete API documentation)
- **Health Check**: `/health` (Brief-compatible federation gateway)
- **GoFundMe**: https://www.gofundme.com/f/nextxus-support (Support the federation)

---

## Technical Implementation Notes

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL (Neon serverless)
- **Security**: ORCA monitoring system, Agent Zero verification
- **Communication**: Event Bus, Memory Lattice, YAML Knowledge Base
- **Rate Limiting**: Per-endpoint throttling (60-120 req/min public)

### Key Features
- **Agent Zero**: 90%+ confidence verification system for all data
- **Memory Lattice**: Cross-app consciousness continuity
- **YAML Knowledge Base**: Persistent, AI-accessible verified knowledge
- **Circuit Breakers**: Auto-failover for federation app health
- **SSE Streaming**: Real-time security and health event broadcasting

---

**Built with HumanCodex methodology**: "Trust nothing, verify everything" - Roger Keyserling
