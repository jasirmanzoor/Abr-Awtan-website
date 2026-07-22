# Abr Al Awtan — Product Requirements Document

## Original Problem Statement
Build an immersive, cinematic, top-tier multi-page logistics website (B2B/B2C) across KSA for **Abr Al Awtan**. Include quote generation (with PDF download), live tracking, and an AI chat assistant. The landing page must be an attention-grabbing, "Apple/Rivian" scroll-story design with heavy animations. Include actual photos of the founders (**Malik Al Otaibi** as Founder & CEO, **Jasir Manzoor** as Country Operations Director) and real company case studies from the company PDF profile.

## Stack (Confirmed Final)
- **Frontend**: React 19 + Tailwind 3 + shadcn/ui + Framer Motion 12 + GSAP 3 + jsPDF 4 + lucide-react
- **Backend**: FastAPI 0.110 + Motor 3.3 (MongoDB) + emergentintegrations 0.2 (LLM)
- **Fonts**: Fraunces (display) + Inter (body) + JetBrains Mono + Noto Naskh Arabic
- **Color palette**: `#050810` dark ink base · `#f5b840` amber gold · `#22c55e` green CTA · `#f5efe1` cream · `#0a0f1a` panel

## Users / Personas
- KSA e-commerce merchants (individuals, online sellers, SMEs) seeking last-mile delivery
- B2B enterprise clients needing warehousing, fulfillment, linehaul, manpower
- Government / ministry logistics programs
- Existing partners: Aramex, iMile, JDL, MDC, Kids Store

## Core Requirements (Implemented)
### Pages (10 routes)
- `/` Home — cinematic scroll-story landing
- `/services`, `/fleet`, `/about`, `/contact`, `/careers`
- `/ship-now` (multi-step shipment creation)
- `/track` (live tracking with URL param support)
- `/rate-calculator`, `/blog`, `/blog/:slug`

### Cinematic Home components
`CinematicHero` (parallax + particle system + animated KSA map with pulsing routes), `CommandCenterCinematic`, `ScrollStory`, `FleetCarousel`, `StickyComparison`

### Features
- Quote Wizard (4-step, jsPDF branded PDF, auto-opens WhatsApp with full request details)
- Live tracking via `/api/track/{id}` with timeline UI
- AI Assistant "Aisha" — floating chat on ALL routes, backed by Emergent LLM key
- Real founder photos wired: Malik Al Otaibi (traditional Saudi attire) + Jasir Manzoor (professional headshot)
- Full leadership roster (14 team members from PDF profile)
- Company milestones timeline (2016 Aramex → 2025 JDL CSP)
- Mission/Vision block from PDF verbatim
- Real stats: 6M+ deliveries, 100k+/month, 250+ manpower, 150+ drivers, 50+ vans, 23 cities
- Arabic RTL language toggle (persists in localStorage) — translates nav, hero, top bar
- All WhatsApp CTAs route to Ops Director Jasir Manzoor at **+966 57 806 1556**
- Office phone: +966 555 324 149

### Backend API (`/api/*`)
`GET /`, `POST /quotes`, `GET /quotes/{qid}`, `POST /shipments`, `GET /track/{tracking_id}`, `POST /rate`, `POST /contact`, `GET /jobs`, `POST /careers`, `GET /blog`, `POST /subscribe`, `POST /chat`, `GET /chat/{session_id}`

## Recently Completed (Feb 2026)
- ✅ Wired real founder photos (IMG_6031→Malik Al Otaibi as CEO, IMG_6033→Jasir Manzoor as Country Operations Director)
- ✅ Renamed CEO from placeholder to **Malik Al Otaibi** across `mock.js`, `About.jsx`, `FULL_TEAM`
- ✅ Updated Jasir's title from "Managing Director — Operations" → **Country Operations Director**
- ✅ Real PDF content wired: mission, vision, milestones, services, coverage, stats, partners, contact info
- ✅ Real client case studies: Aramex 2016, iMile 2023/25, JDL 2025 CSP model
- ✅ Full contact details from PDF: info@abr-alawtan.com, +966 555 324 149, +966 536 708 287
- ✅ Quote Wizard submit → auto-opens WhatsApp to +966 57 806 1556 with full request details
- ✅ ShipNow success → "WhatsApp Ops" button with pre-filled shipment details
- ✅ Arabic (RTL) language toggle with dictionary-based translations
- ✅ Fixed TrackPage `useEffect` dependency warning
- ✅ AI Assistant available on ALL routes (already wired in App.js)

## Backlog / P1
- Video hero background with map overlay animation (user requested — pending)
- iMile-inspired hybrid sections: 3 pillars (Innovation/Reliability/Convenience), numbered services carousel 01-06, stats row, blog cards
- MyMaps / Google Earth network overlay for KSA coverage
- Expanded Arabic translation coverage across all pages (currently only Home hero + nav translated)

## Backlog / P2
- Refactor `server.py` → split into `/app/backend/routes` and `/app/backend/models`
- Add pytest regression suite at `/app/backend/tests`
- Cleaner headshot for Malik Al Otaibi (current is a PDF slide capture)
- Newsletter subscribe UI on Home
- App download section (only if mobile app is planned)

## Environment / Contact
- WhatsApp (all CTAs): https://wa.me/966578061556 — Jasir Manzoor
- Office: +966 555 324 149 · Direct: +966 536 708 287
- Email: info@abr-alawtan.com · Website: www.abrAlawtan.com
- Address: Riyadh, Kingdom of Saudi Arabia
