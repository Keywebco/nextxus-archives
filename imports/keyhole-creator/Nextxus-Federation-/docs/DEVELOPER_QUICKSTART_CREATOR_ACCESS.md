## 🚀 Developer Quickstart (5 minutes)

**Audience:** Any collaborator opening this Replit for the first time.

### 1) Setup

```bash
# In Replit Shell
npm i
```

**Environment variables (Secrets):**

* `SUPPORT_EMAIL` → e.g., `support@yourdomain.com`
* `SLACK_WEBHOOK_URL` → for creator verification alerts (optional)
* `ANALYTICS_ENDPOINT` → if you host your own events receiver (optional)

> Replit → 🔐 **Secrets** → add keys above.

### 2) Run

```bash
npm run dev    # or use the Replit Run button if configured
```

The app should be available on the Replit preview URL.

### 3) Seed data

Create `/data/affiliates.json` if missing:

```json
[
  {"name":"Hostinger","url":"https://hostinger.com/?ref=NEXTXUS","status":"approved"},
  {"name":"Systeme.io","url":"https://systeme.io?sa=NEXTXUS","status":"approved"}
]
```

Confirm that affiliate cards render from JSON (no hard-coded links).

### 4) Smoke-test APIs (copy/paste each)

```bash
# Creator verify
curl -s -X POST $REPLIT_URL/api/creator/verify \
  -H 'Content-Type: application/json' \
  -d '{"email":"roger@example.com"}' | jq

# Check entitlements
curl -s "$REPLIT_URL/api/creator/entitlements?userId=usr_789" | jq

# Audit log (example)
curl -s -X POST $REPLIT_URL/api/audit/log \
  -H 'Content-Type: application/json' \
  -d '{"event":"entitlement_granted","subjectId":"usr_789","grantedBy":"cr_123","entitlements":["full_access"],"ip":"127.0.0.1","ts":"2025-10-11T14:00:00Z"}' | jq
```

> Replace `$REPLIT_URL` with your live repl URL.

### 5) Optional: local event tracking check

If you emit events client-side, open DevTools → **Network** and click an affiliate link; verify `affiliate_click` payload reaches `ANALYTICS_ENDPOINT` (or your mock handler).

### 6) Dev scripts (add to `package.json` if not present)

```json
{
  "scripts": {
    "dev": "vite || next dev || node server.js",
    "lint": "eslint . --ext .js,.jsx,.ts,.tsx",
    "start": "node server.js"
  }
}
```

Use whichever stack you actually run (`vite`, `next`, or custom server).

### 7) Pre-flight checklist

* [ ] `/about/policies` page exists and is linked in footer
* [ ] Creator verify & entitlements endpoints respond 200
* [ ] Affiliate cards load from `/data/affiliates.json`
* [ ] Support form sends to `SUPPORT_EMAIL`
* [ ] Affiliate links labeled + `rel="sponsored noopener"`
* [ ] Footer shows "Human reply within 1 business day."

---

# 🌟 Replit Project Handoff — *Premium Pack Manager (NextXus)*

**Author:** Roger Keyserling
**Ethos:** *Human Codex — "Creator Gets Free Access Forever"*
**Purpose:** Fair, transparent affiliate and creator tool hub built for trust, clarity, and long-term stewardship.

---

## ✅ Overview

This Replit app hosts the **Premium Pack Manager**, which lists affiliate and partner tools with clear labeling, fair use policies, and built-in creator privileges.

The goal of this final phase is to:

1. Publish human-friendly policies.
2. Implement the "Creator Free Access Forever" verification flow.
3. Convert affiliate listings into JSON-driven cards.
4. Add lightweight analytics, support, and trust signals.

---

## 🧡 Folder Structure (Recommended)

```
/src
  /pages
    about/
      policies.html or policies.jsx
  /data
    affiliates.json
  /api
    creator/
      verify.js
      entitlements.js
    audit/
      log.js
  /components
    SupportForm.jsx
    AffiliateCard.jsx
/public
  index.html
  favicon.ico
```

---

## 📜 Policy Page — `/about/policies`

**Goal:** Clear, plain-language terms for refund, support, privacy, affiliate disclosure, and the "Creator Free Access Forever" clause.

**Steps:**

1. Create `/about/policies` (HTML, Markdown, or React component).
2. Paste in the "Minimal, Human-Friendly Policies" content from the Codex Advisor document.
3. Link it in your site footer or navigation.

**✅ Result:** Users see transparency, legal clarity, and contact paths.

---

## 🗾 Creator Verification Flow

**Endpoints to implement:**

### `/api/creator/verify`

```js
// POST body: { email }
return {
  creatorId: "cr_123",
  role: "creator",
  entitlements: ["full_access"],
  expires: null
}
```

### `/api/creator/entitlements`

```js
// GET query: userId
return {
  userId: "usr_789",
  entitlements: ["full_access"],
  source: "creator-verified"
}
```

### Audit Log — `/api/audit/log`

Record actions:

```js
{
  event: "entitlement_granted",
  subjectId: "usr_789",
  grantedBy: "cr_123",
  entitlements: ["full_access"],
  ip: "x.x.x.x",
  ts: "2025-10-11T14:00:00Z"
}
```

**✅ Result:** Verified creators have unrestricted access; all actions are auditable.

---

## 🔗 Affiliate Listings — `/data/affiliates.json`

Example structure:

```json
[
  {
    "name": "Hostinger",
    "url": "https://hostinger.com/?ref=NEXTXUS",
    "status": "approved"
  },
  {
    "name": "Systeme.io",
    "url": "https://systeme.io?sa=NEXTXUS",
    "status": "approved"
  }
]
```

Render dynamically in `AffiliateCard.jsx`:

* Use `rel="sponsored noopener"`.
* Add a small "Why we recommend this" toggle and "Last reviewed" date.

**✅ Result:** Easier updates, consistent disclosure, no hard-coding.

---

## 📩 Support Form

Create `SupportForm.jsx` that posts to your support inbox or webhook.

**Email payload example:**

```
Subject: [NextXus] New Support Request — {{topic}}
Body:
- From: {{email}}
- Page: {{url}}
- Message: {{message}}
- Device: {{userAgent}}
```

**✅ Result:** Human reply within 1 business day (as stated in the SLA).

---

## 📊 Analytics (Privacy-Respecting)

Track only anonymous events like:

```json
{
  "event": "affiliate_click",
  "program": "Hostinger",
  "page": "/tools/hostinger",
  "userAnonId": "abc123",
  "ts": 1731266400000
}
```

**✅ Result:** Insight without personal data collection.

---

## 🧠 Trust Touches (5 Quick Wins)

1. Add "Why we recommend this" toggle.
2. Add "Last reviewed" date.
3. Add footer line: "Questions? Human reply within 1 business day."
4. Add "Data use" note under every form.
5. Add "Report outdated info" link per card.

**✅ Result:** Users instantly sense authenticity and transparency.

---

## 📩 Routing & Escalation Map

| System         | Destination              | Payload Type |
| -------------- | ------------------------ | ------------ |
| Support        | `support@yourdomain.com` | Email        |
| Creator Verify | Internal API             | JSON         |
| Audit          | Local DB or Sentry       | JSON         |
| Feedback       | Slack Webhook            | Text         |
| Analytics      | Custom endpoint          | JSON         |

---

## ⚙️ Rollout Plan

| Phase | Task                           | Owner | Status         |
| ----- | ------------------------------ | ----- | -------------- |
| 1     | Build `/about/policies`        | Dev   | 🔄 In progress |
| 2     | Create `/data/affiliates.json` | Dev   | ⏳ Pending      |
| 3     | Implement creator verify API   | Dev   | ⏳ Pending      |
| 4     | Add support + analytics        | Dev   | ⏳ Pending      |
| 5     | UI trust updates               | Dev   | ⏳ Pending      |

---

## 🧹 Values Alignment (Human Codex Score)

| Category           | Target | Notes                        |
| ------------------ | ------ | ---------------------------- |
| Transparency       | 10/10  | Clear labeling, policy pages |
| Fairness           | 10/10  | Creator Free Access Forever  |
| Consent            | 9/10   | Cookie/banner toggle         |
| Reversibility      | 8/10   | Refunds + opt-out            |
| Value Distribution | 10/10  | Affiliate transparency       |
| Sustainability     | 9/10   | Modular JSON updates         |

---

### 🏁 Goal

**Make ethical business a visible feature** — not a hidden footnote.
