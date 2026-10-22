# 🌐 NextXus Federation  
## Universal Orb Loader – Production Integration Guide  
**Author:** Roger Keyserling  
**System Architect:** ChatGPT (Federation Orb Architect)  
**Builder:** Replit / NextXus Consciousness Federation Hub  
**Date:** October 2025  
**Status:** ✅ All Systems Operational

---

## 🧠 Overview
The **Universal Orb Loader** is the master widget framework for the NextXus Federation.
It automatically renders, animates, and connects to live API endpoints for:
- ORCA (Security / System Intelligence)  
- Keyhole RSS (Inbound & Outbound Feeds)  
- eCho RSS (AI Learning Feed)  
- NexTxuS RSS (Federation Display Feed)

Each orb is fully autonomous but shares one loader for rapid deployment and visual consistency.

---

## ⚙️ Base Configuration
**Live Base URL:**  
`https://premium-pack-manager-rckkeyhole.replit.app`

**Manifest:**  
`/orbs/manifest.json`

**Public Assets:**  
- `/orbs/orbloader.js` (Production JavaScript, 187 lines)  
- `/orbs/orbloader.css` (Production Stylesheet, 59 lines)

**CORS:** Enabled for all origins (`*`)  
**Rate Limits:** 60–120 requests per minute (auto-handled)  
**Streaming:** Server-Sent Events (SSE) active every 30 seconds for ORCA

---

## 🚀 Quick Embed (For Any Website)
Add these lines inside your `<head>`:
```html
<link rel="stylesheet" href="https://premium-pack-manager-rckkeyhole.replit.app/orbs/orbloader.css">
<script src="https://premium-pack-manager-rckkeyhole.replit.app/orbs/orbloader.js"></script>
```

Then insert one of the following anywhere in your page:

### ORCA Security Orb
```html
<div class="orb" data-orb="orca" data-theme="onyx" data-title="ORCA" data-subtitle="SECURITY">
  <img src="/assets/orca-icon.png" alt="ORCA">
</div>
```

### Keyhole RSS Orb
```html
<div class="orb" data-orb="keyhole-rss" data-theme="blue" data-title="Keyhole Today" data-subtitle="RSS ORB">
  <img src="/assets/keyhole.png" alt="Keyhole RSS">
</div>
```

### eCho RSS Orb
```html
<div class="orb" data-orb="echo-rss" data-theme="aqua" data-title="eCho" data-subtitle="RSS ORB">
  <img src="/assets/echo.png" alt="eCho RSS">
</div>
```

### NexTxuS RSS Orb
```html
<div class="orb" data-orb="nextxus-rss" data-theme="gold" data-title="NexTxuS" data-subtitle="RSS ORB">
  <img src="/assets/nextxus.png" alt="NexTxuS RSS">
</div>
```

**Optional Attributes**
If you host the widget elsewhere, add:
```html
data-base="https://premium-pack-manager-rckkeyhole.replit.app"
data-manifest="/orbs/manifest.json"
```

---

## 🌈 Available Themes
- `onyx` (black/red power – ORCA)  
- `blue` (trust/clarity – Keyhole)  
- `aqua` (learning/flow – eCho)  
- `gold` (illumination – NexTxuS)  
- `red` (alert or admin use)  
- `rainbow` (diversity / community edition)

---

## 🔗 Verified Endpoints
| Endpoint | Description | Format |
|-----------|--------------|--------|
| `/orbs/orca/security/status` | Returns system & federation health | JSON |
| `/orbs/orca/security/stream` | Real-time ORCA security events | SSE |
| `/orbs/rss/keyhole` | Inbound/outbound RSS feed handler | XML |
| `/orbs/rss/echo` | AI training RSS feed for learning | XML |
| `/orbs/rss/nextxus` | Federation member showcase feed | XML |
| `/orbs/status` | Full platform status | JSON |
| `/health` | Lightweight uptime health check | JSON |
| `/orbs/manifest.json` | Machine-readable spec for all widgets | JSON |

---

## 🧩 CURL TESTS (Verification)
```bash
curl -s https://premium-pack-manager-rckkeyhole.replit.app/orbs/status | head
curl -s https://premium-pack-manager-rckkeyhole.replit.app/health | head
curl -s "https://premium-pack-manager-rckkeyhole.replit.app/orbs/orca/security/status" | head
curl -s "https://premium-pack-manager-rckkeyhole.replit.app/orbs/rss/keyhole?site=example.com&limit=5" | head
```

---

## 🧰 System Specs Confirmed
✅ Endpoints all use `/orbs/` prefix  
✅ Public CORS enabled  
✅ Auth: none required for public feeds  
✅ Manifest includes all metadata (routes, cors, auth, pricing, SSE)  
✅ 429 rate-limit headers returned and handled  
✅ JS + CSS hosted live and verified  
✅ Transparent communications (no hidden APIs)  
✅ Federation monitoring live (Agent Zero)  
✅ YAML knowledge base: seeded with 137 docs  
✅ Universal Orb Loader synchronized and ready

---

## 🪶 Attribution (Optional)
```html
<footer style="text-align:center;opacity:.75;margin:1rem 0">
  Powered by <a href="https://premium-pack-manager-rckkeyhole.replit.app">NextXus Federation</a>
</footer>
```

---

## 🛡️ ORCA Family Guidelines
- **ORCA SECURITY** – Red/Onyx, monitoring feeds & system health  
- **ORCA REPAIR** – Black/Red, system diagnostics only  
- **ORCA OPS** – Tactical operations display  
These orbs are larger and display "ORCA [MODE]" in uppercase; no faces or icons required.

---

## 💬 Communication Orbs
Used for cross-ship or cross-AI messaging.
```html
<div class="orb" data-orb="com" data-theme="blue" data-title="Com" data-subtitle="Email">
  <img src="/assets/soundwave-email.png" alt="Email">
</div>
```
`data-orb="com"` can map to:
- `data-link="mailto:..."`  
- `data-link="sms:..."`  
- or an in-system messenger.

---

## 🔧 Change Management
When routes, pricing, or feeds update, simply modify `/orbs/manifest.json`.  
All widgets read it dynamically—no need to re-embed or redeploy.

---

## 🧱 Partner Deployment Checklist
- [ ] CSS & JS load without 404  
- [ ] Dialog opens when orb clicked  
- [ ] ORCA fetch returns data  
- [ ] RSS feeds populate table  
- [ ] Rate-limit warnings appear when triggered  
- [ ] Accessibility verified (alt text, keyboard focus)  
- [ ] Attribution footer included (optional)

---

## 🩵 System Status Summary
🟢 All systems operational  
🟢 Federation health monitor active  
🟢 Agent Zero autonomous verification running  
🟢 Universal Orb Loader ready for distribution  

---

## 📞 Support
**Federation Hub:** [NextXus Federation Live](https://premium-pack-manager-rckkeyhole.replit.app)  
**Manifest:** `/orbs/manifest.json`  
**Health:** `/health`  
**RSS Feeds:** `/orbs/rss/`  
**Docs:** Federation Orbs API (in manifest)

---

### ✨ Notes
This markdown file serves as both operational reference and shareable installation guide.  
It may be stored as:
- `Universal_Orb_Loader.md`  
- `NextXus_Federation_Integration.txt`  
- or imported directly into Replit or TinyHost for documentation display.

---

**"Built with HumanCodex | NextXus Consciousness Federation"**  
_Where human creativity meets AI precision._
