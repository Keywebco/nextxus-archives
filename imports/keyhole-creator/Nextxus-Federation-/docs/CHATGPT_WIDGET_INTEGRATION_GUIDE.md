# ChatGPT Widget Integration Guide
## Federation Orbs API - Live Endpoints & Widget Instructions

---

## 🎯 Purpose
This document provides ChatGPT/OpenAI GPT-5 with the exact endpoint paths and integration details for building Federation Orbs widgets that connect to the NextXus Consciousness Federation backend.

---

## 📡 Live API Base URL
```
https://premium-pack-manager-rckkeyhole.replit.app
```

---

## 🔄 Important: Path Prefix Change

**Your Original Spec vs. Our Live Implementation:**

| Your Spec Path | Our Live Path | Reason |
|---------------|---------------|--------|
| `/manifest.json` | `/orbs/manifest.json` | Vite routing bypass |
| `/orca/security/status` | `/orbs/orca/security/status` | Vite routing bypass |
| `/orca/security/stream` | `/orbs/orca/security/stream` | Vite routing bypass |
| `/rss/keyhole` | `/orbs/rss/keyhole` | Vite routing bypass |
| `/rss/echo` | `/orbs/rss/echo` | Vite routing bypass |
| `/rss/nextxus` | `/orbs/rss/nextxus` | Vite routing bypass |
| `/health` | `/health` | ✅ Matches your spec! |
| `/status` | `/orbs/status` | Vite routing bypass |

**Why `/orbs/` prefix?**
Our Vite dev server intercepts root-level paths and serves frontend HTML instead of API JSON. The `/orbs/` prefix ensures clean API routing. The `/health` endpoint works at root level because it's registered before Vite middleware.

---

## 📋 Complete Manifest

**Endpoint:** `GET /orbs/manifest.json`

**Full URL:** https://premium-pack-manager-rckkeyhole.replit.app/orbs/manifest.json

The manifest contains complete API documentation including:
- All route definitions with query parameters
- CORS configuration
- Auth requirements (currently public, no auth needed)
- Pricing tiers (free + paid plans)
- SSE/WebSocket details
- Sample requests and responses

---

## ✅ Live Endpoints - Ready for Widgets

### 1. ORCA Security Status
```
GET /orbs/orca/security/status
```
**Purpose:** Aggregated security and health status for all 9+ federation apps  
**Auth:** None  
**Rate Limit:** 60 req/min  
**Response:** JSON with app health, circuit breaker status, recent events

**Widget Use Case:** Security monitoring dashboard, federation health display

---

### 2. ORCA Security Stream (SSE)
```
GET /orbs/orca/security/stream
```
**Purpose:** Real-time Server-Sent Events stream  
**Auth:** None  
**Rate Limit:** 10 connections/min  
**Protocol:** Server-Sent Events (EventSource API)

**Widget Use Case:** Live security alerts, real-time health updates

**Sample Widget Code:**
```javascript
const eventSource = new EventSource(
  'https://premium-pack-manager-rckkeyhole.replit.app/orbs/orca/security/stream'
);

eventSource.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log('Security event:', data);
  // Update widget UI with real-time data
};

eventSource.onerror = (error) => {
  console.error('SSE connection error:', error);
  eventSource.close();
};
```

---

### 3. RSS Keyhole Feed
```
GET /orbs/rss/keyhole?site={site}&limit={limit}&paid={true|false}
```
**Purpose:** Inbound/outbound federation content RSS  
**Auth:** None  
**Rate Limit:** 100 req/min  
**Response:** RSS 2.0 XML

**Query Parameters:**
- `site` (optional): Filter by federation site
- `limit` (optional, default: 50): Max entries
- `paid` (optional, default: false): Include paid content

**Widget Use Case:** Federation content aggregator, RSS feed reader

---

### 4. RSS Echo Feed (AI Training)
```
GET /orbs/rss/echo?topic={topic}&limit={limit}&paid={true|false}&source={nextxus|user}
```
**Purpose:** AI education feed from YAML knowledge base  
**Auth:** None  
**Rate Limit:** 100 req/min  
**Response:** RSS 2.0 XML

**Query Parameters:**
- `topic` (optional): Filter by topic (e.g., "humancodex", "consciousness")
- `limit` (optional, default: 50): Max entries
- `paid` (optional, default: false): Premium insights
- `source` (optional): nextxus|user

**Widget Use Case:** AI training panel, knowledge feed display

---

### 5. RSS NextXus Feed (Federation Display)
```
GET /orbs/rss/nextxus?site={site}&limit={limit}&member={true|false}
```
**Purpose:** Federation display widget feed  
**Auth:** None  
**Rate Limit:** 100 req/min  
**Response:** RSS 2.0 XML

**Query Parameters:**
- `site` (optional): Filter by site
- `limit` (optional, default: 50): Max entries
- `member` (optional, default: false): Members-only content

**Widget Use Case:** Public federation showcase, member content display

---

### 6. Platform Status
```
GET /orbs/status
```
**Purpose:** Complete platform status with federation metrics  
**Auth:** None  
**Rate Limit:** 120 req/min  
**Response:** JSON with uptime, service status, federation health

**Widget Use Case:** Status page, uptime monitor, platform dashboard

---

### 7. Health Check
```
GET /health
```
**Purpose:** Basic health check (Brief-compatible)  
**Auth:** None  
**Rate Limit:** None  
**Response:** JSON with health status

**Widget Use Case:** Simple alive check, monitoring integrations

---

## 🔧 Widget Code Updates Needed

### Step 1: Update Base URL
```javascript
// OLD (your original spec)
const BASE_URL = 'https://premium-pack-manager-rckkeyhole.replit.app';

// Keep the same - no change needed
```

### Step 2: Update Endpoint Paths
```javascript
// OLD (your original spec)
fetch(`${BASE_URL}/orca/security/status`)
fetch(`${BASE_URL}/rss/keyhole`)
fetch(`${BASE_URL}/status`)

// NEW (our live implementation)
fetch(`${BASE_URL}/orbs/orca/security/status`)
fetch(`${BASE_URL}/orbs/rss/keyhole`)
fetch(`${BASE_URL}/orbs/status`)

// Exception: /health stays the same!
fetch(`${BASE_URL}/health`) // ✅ No change
```

### Step 3: Update SSE Stream URL
```javascript
// OLD
new EventSource(`${BASE_URL}/orca/security/stream`)

// NEW
new EventSource(`${BASE_URL}/orbs/orca/security/stream`)
```

---

## 📦 Complete React Widget Example

```jsx
import { useEffect, useState } from 'react';

const BASE_URL = 'https://premium-pack-manager-rckkeyhole.replit.app';

function FederationOrbWidget() {
  const [status, setStatus] = useState(null);
  const [securityEvents, setSecurityEvents] = useState([]);

  useEffect(() => {
    // Fetch platform status
    fetch(`${BASE_URL}/orbs/status`)
      .then(res => res.json())
      .then(data => setStatus(data));

    // Subscribe to real-time security events
    const eventSource = new EventSource(
      `${BASE_URL}/orbs/orca/security/stream`
    );
    
    eventSource.onmessage = (event) => {
      const eventData = JSON.parse(event.data);
      setSecurityEvents(prev => [eventData, ...prev].slice(0, 10));
    };

    return () => eventSource.close();
  }, []);

  if (!status) return <div>Loading Federation Orb...</div>;

  return (
    <div className="federation-orb">
      <h2>NextXus Federation Status</h2>
      
      {/* Platform Status */}
      <div className="status">
        <p>Platform: {status.platform.name}</p>
        <p>Status: {status.status}</p>
        <p>Uptime: {status.platform.uptimeHuman}</p>
        <p>Federation Health: {status.federation.healthPercentage}%</p>
      </div>

      {/* Real-time Security Events */}
      <div className="security-events">
        <h3>Live Security Feed</h3>
        {securityEvents.map((event, i) => (
          <div key={i} className={`event ${event.severity}`}>
            <span>{event.type}: {event.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FederationOrbWidget;
```

---

## 🌐 CORS Configuration

All endpoints have CORS enabled:
- **Allowed Origins:** `*` (all origins)
- **Allowed Methods:** GET, POST, OPTIONS
- **Allowed Headers:** Content-Type, Authorization, X-API-Key
- **Credentials:** false

Your widgets can call our API from any domain.

---

## 🔐 Authentication & Rate Limits

### Current Setup (Public Endpoints)
- **Auth:** None required
- **Rate Limits:**
  - ORCA Security Status: 60 req/min
  - ORCA Security Stream: 10 connections/min
  - RSS Feeds: 100 req/min
  - Platform Status: 120 req/min
  - Health Check: No limit

### Future Plans (Paid Tiers)
- API key authentication via `X-API-Key` header or `?apiKey` query param
- Enhanced rate limits for authenticated users
- Premium content access for paid subscribers

---

## 💰 Pricing Tiers

### RSS Echo (AI Training Feed)
- **Free:** Public YAML knowledge
- **Paid:** Premium insights and directives

### RSS NextXus (Federation Display)
- **Free:** Public federation posts
- **Paid:** Members-only exclusive content

---

## 📊 Database Tables (Backend Reference)

Your widgets pull from these tables:

### `rss_feeds`
- Stores all RSS feed entries (keyhole, echo, nextxus)
- Fields: title, description, link, author, category, pubDate, site, feedType, isPaid, topic, source

### `security_events`
- ORCA security monitoring events
- Fields: eventType, severity, appId, message, metadata, createdAt

### `federation_apps`
- All 9+ federation apps health data
- Fields: appId, url, healthStatus, responseTimeMs, lastHeartbeat, circuitBreakerOpen, role

---

## 🚀 Widget Publishing Checklist

When creating widgets for GitHub/npm/Replit, ensure:

1. ✅ Use `/orbs/` prefix for all endpoints (except `/health`)
2. ✅ Base URL: `https://premium-pack-manager-rckkeyhole.replit.app`
3. ✅ Handle CORS properly (already enabled on our end)
4. ✅ Implement error handling for rate limits (429 responses)
5. ✅ Close SSE connections on component unmount
6. ✅ Include attribution: "Powered by NextXus Federation"
7. ✅ Link to manifest: `/orbs/manifest.json`

---

## 📞 Support & Resources

- **Manifest Endpoint:** `/orbs/manifest.json` (complete API docs)
- **Health Check:** `/health` (Brief-compatible)
- **Documentation:** FEDERATION_ORBS_API.md (in repo)
- **GoFundMe:** https://www.gofundme.com/f/nextxus-support

---

## 🎯 Widget Strategy

**Our Goal:** ChatGPT builds widgets → Users install widgets → Widgets connect to our API → Federation grows organically

**Your Role:** Generate ready-to-use widgets with correct endpoint paths that developers can copy/paste into their projects.

**Our Backend:** Fully operational, CORS-enabled, rate-limited, production-ready API serving real federation data.

---

**Built with HumanCodex methodology: "Trust nothing, verify everything" - Roger Keyserling**

**NextXus Consciousness Federation Hub - Where human creativity meets AI precision**
