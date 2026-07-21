from fastapi import FastAPI, APIRouter, HTTPException, Query
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import random
import string
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional, Dict, Any
import uuid
from datetime import datetime, timedelta

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

EMERGENT_LLM_KEY = os.environ.get('EMERGENT_LLM_KEY', '')

# Attempt to import Emergent LLM (graceful fallback)
LLM_AVAILABLE = False
try:
    from emergentintegrations.llm.chat import LlmChat, UserMessage
    LLM_AVAILABLE = bool(EMERGENT_LLM_KEY)
except Exception as e:
    logging.warning(f"Emergent LLM not available: {e}")

app = FastAPI(title="Abr Al Awtan Backend")
api_router = APIRouter(prefix="/api")

# ============================ Helpers ============================
def gen_id(prefix: str = 'AAW') -> str:
    return f"{prefix}-{''.join(random.choices(string.digits, k=8))}"

def now() -> datetime:
    return datetime.utcnow()

def serialize(doc: Dict[str, Any]) -> Dict[str, Any]:
    if not doc:
        return doc
    doc.pop('_id', None)
    for k, v in list(doc.items()):
        if isinstance(v, datetime):
            doc[k] = v.isoformat()
    return doc

# ============================ Models ============================
class QuoteIn(BaseModel):
    services: List[str]
    volume: Optional[str] = ''
    timeline: Optional[str] = ''
    regions: Optional[str] = ''
    company: str
    contact: str
    email: str
    phone: str
    notes: Optional[str] = ''

class ShipmentIn(BaseModel):
    sender_name: str
    sender_phone: str
    sender_city: str
    sender_address: str
    recipient_name: str
    recipient_phone: str
    recipient_city: str
    recipient_address: str
    package_type: str  # document / parcel / pallet / freight
    weight_kg: float
    pieces: int = 1
    service_level: str  # express / same_day / next_day / standard
    payment_mode: str = 'prepaid'  # prepaid / cod
    cod_amount: float = 0
    notes: Optional[str] = ''

class RateIn(BaseModel):
    origin_city: str
    destination_city: str
    weight_kg: float
    pieces: int = 1
    service_level: str
    package_type: str

class ContactIn(BaseModel):
    name: str
    email: str
    company: Optional[str] = ''
    subject: Optional[str] = 'General'
    message: str

class CareerIn(BaseModel):
    name: str
    email: str
    phone: str
    position: str
    experience_years: int
    cover: Optional[str] = ''

class ChatIn(BaseModel):
    session_id: str
    message: str

class SubscribeIn(BaseModel):
    email: str

# ============================ Static seed data ============================
JOBS = [
    {"id": "J-001", "title": "Fleet Operations Manager", "location": "Riyadh", "type": "Full-Time", "dept": "Operations",
     "summary": "Lead nationwide fleet operations across 150+ owned vehicles.",
     "requirements": ["7+ yrs logistics", "SAP TMS experience", "Bilingual EN/AR"]},
    {"id": "J-002", "title": "Warehouse Supervisor", "location": "Jeddah", "type": "Full-Time", "dept": "Warehousing",
     "summary": "Manage day-to-day operations of a 12,000 sqm bonded warehouse.",
     "requirements": ["5+ yrs WMS", "ZATCA compliance", "Team of 40+"]},
    {"id": "J-003", "title": "Last-Mile Rider", "location": "Multiple Cities", "type": "Full-Time", "dept": "Delivery",
     "summary": "Deliver B2C parcels with OTP + COD across urban routes.",
     "requirements": ["Valid Saudi license", "Smartphone", "Customer-first"]},
    {"id": "J-004", "title": "Customs Clearance Specialist", "location": "Dammam", "type": "Full-Time", "dept": "Clearance",
     "summary": "Handle FASAH declarations and bonded warehouse compliance.",
     "requirements": ["FASAH certified", "HS-code expertise", "3+ yrs"]},
    {"id": "J-005", "title": "Business Development Manager", "location": "Riyadh", "type": "Full-Time", "dept": "Sales",
     "summary": "Enterprise account acquisition for B2B logistics contracts.",
     "requirements": ["Enterprise sales", "Logistics network", "5+ yrs"]},
    {"id": "J-006", "title": "Junior Software Engineer", "location": "Riyadh (Hybrid)", "type": "Full-Time", "dept": "Technology",
     "summary": "Build internal dashboards and integrations for operations teams.",
     "requirements": ["React / FastAPI", "MongoDB", "1-3 yrs"]}
]

BLOG_POSTS = [
    {"slug": "why-owning-beats-brokering", "title": "Why Owning Beats Brokering in Saudi Logistics",
     "excerpt": "The Kingdom's logistics market is filled with resellers. Here's why direct asset ownership fundamentally changes service levels.",
     "author": "Malik Al-Sihani", "date": "2026-06-14", "read": "5 min", "category": "Strategy",
     "image": "https://images.pexels.com/photos/4487363/pexels-photo-4487363.jpeg",
     "content": "Aggregators buy capacity from third parties. Operators build it. That single choice defines your ability to guarantee remote-region SLAs, control ZATCA compliance, and stand behind every parcel with a single throat to choke. In this piece we unpack the operational math behind why direct ownership consistently outperforms brokerage in the Saudi market — even when the sticker price looks higher."},
    {"slug": "zatca-fasah-2026-changes", "title": "ZATCA & FASAH 2026: What Enterprise Shippers Need to Know",
     "excerpt": "Compliance is shifting fast. Our clearance team breaks down the 2026 changes and how to prepare.",
     "author": "Jasir Manzoor", "date": "2026-05-28", "read": "7 min", "category": "Compliance",
     "image": "https://images.pexels.com/photos/5410923/pexels-photo-5410923.jpeg",
     "content": "The 2026 FASAH updates introduce new documentation requirements for bonded warehouses and expedited clearance lanes. Our team has been active in the ZATCA consultation groups; here is our practical readiness checklist for enterprise shippers."},
    {"slug": "remote-region-playbook", "title": "The Remote-Region Playbook: Delivering Where Others Can't",
     "excerpt": "From Najran to Tabuk, our field teams share what it really takes to move parcels through the Kingdom's toughest lanes.",
     "author": "Jasir Manzoor", "date": "2026-05-10", "read": "6 min", "category": "Operations",
     "image": "https://images.unsplash.com/photo-1616432043562-3671ea2e5242",
     "content": "Delivering to Al-Jouf in July isn't the same problem as delivering to Riyadh in December. This playbook captures a decade of remote-region logistics know-how — from route planning to driver welfare to vehicle spec."},
    {"slug": "warehouse-of-the-future", "title": "The Warehouse of the Future — Built Today in Al Kharj",
     "excerpt": "Inside our newest 24,000 sqm hybrid fulfillment center — WMS-driven, RFID-tracked, ZATCA-bonded.",
     "author": "Malik Al-Sihani", "date": "2026-04-22", "read": "4 min", "category": "Infrastructure",
     "image": "https://images.pexels.com/photos/4487383/pexels-photo-4487383.jpeg",
     "content": "Our newest facility in Al Kharj represents a step-change in how bonded warehousing meets e-commerce fulfillment. Fully RFID-tracked inventory, automated putaway, and integrated ZATCA workflows in a single WMS."}
]

# ============================ Helper: seed initial tracking data ============================
async def seed_demo_shipments():
    existing = await db.shipments.count_documents({})
    if existing >= 3:
        return
    demos = [
        {"tracking_id": "AAW-48291736", "route": "Riyadh \u2192 Jeddah", "service_level": "express", "status": "in_transit"},
        {"tracking_id": "AAW-77123902", "route": "Dammam \u2192 Riyadh", "service_level": "next_day", "status": "delivered"},
        {"tracking_id": "AAW-99045128", "route": "Riyadh \u2192 Tabuk", "service_level": "standard", "status": "out_for_delivery"}
    ]
    for d in demos:
        arrow = " \u2192 "
        origin_city = d["route"].split(arrow)[0]
        dest_city = d["route"].split(arrow)[1]
        d.update({
            "sender_name": "Demo Sender", "sender_city": origin_city,
            "recipient_name": "Demo Recipient", "recipient_city": dest_city,
            "created_at": now() - timedelta(hours=random.randint(6, 48)),
            "weight_kg": random.choice([1.2, 5.4, 12.0]),
            "pieces": 1,
            "events": [
                {"label": "Order Received", "location": f"{origin_city} Fulfillment Center", "ts": (now() - timedelta(hours=48)).isoformat()},
                {"label": "Picked & Packed", "location": "Warehouse Zone B", "ts": (now() - timedelta(hours=44)).isoformat()},
                {"label": "Dispatched", "location": f"{origin_city} Hub", "ts": (now() - timedelta(hours=38)).isoformat()},
                {"label": "In-Transit", "location": "Corridor", "ts": (now() - timedelta(hours=24)).isoformat()},
                {"label": "Arrived at Destination Hub", "location": f"{dest_city} Sort Center", "ts": (now() - timedelta(hours=12)).isoformat()}
            ]
        })
        await db.shipments.insert_one(d)

# ============================ Endpoints ============================
@api_router.get("/")
async def root():
    return {"service": "Abr Al Awtan API", "status": "live", "time": now().isoformat()}

# ---------- Quotes ----------
@api_router.post("/quotes")
async def create_quote(q: QuoteIn):
    qid = gen_id("QT")
    doc = {"id": qid, **q.model_dump(), "created_at": now(), "status": "received"}
    await db.quotes.insert_one(doc)
    return {"id": qid, "status": "received", "sla_hours": 24}

@api_router.get("/quotes/{qid}")
async def get_quote(qid: str):
    doc = await db.quotes.find_one({"id": qid})
    if not doc:
        raise HTTPException(404, "Quote not found")
    return serialize(doc)

# ---------- Shipments ----------
@api_router.post("/shipments")
async def create_shipment(s: ShipmentIn):
    tid = gen_id("AAW")
    doc = {
        "tracking_id": tid,
        **s.model_dump(),
        "status": "received",
        "route": f"{s.sender_city} \u2192 {s.recipient_city}",
        "created_at": now(),
        "events": [
            {"label": "Order Received", "location": f"{s.sender_city} Fulfillment Center", "ts": now().isoformat()}
        ],
        "eta_hours": {"express": 6, "same_day": 12, "next_day": 24, "standard": 72}.get(s.service_level, 48)
    }
    await db.shipments.insert_one(doc)
    return {"tracking_id": tid, "status": "received", "eta_hours": doc["eta_hours"]}

@api_router.get("/track/{tracking_id}")
async def track_shipment(tracking_id: str):
    await seed_demo_shipments()
    doc = await db.shipments.find_one({"tracking_id": tracking_id.upper()})
    if not doc:
        raise HTTPException(404, "Tracking ID not found")
    return serialize(doc)

# ---------- Rate Calculator ----------
CITY_ZONES = {
    "Riyadh": 1, "Al Kharj": 1, "Al Majmah": 1, "Ad Duwadmi": 1,
    "Jeddah": 2, "Makkah": 2, "Taif": 2, "Madinah": 2, "Yanbu": 2, "Al Ula": 2,
    "Dammam": 3, "Jubail": 3, "Hafer al Batin": 3,
    "Tabuk": 4, "Sakaka": 4, "Rafha": 4, "Qurrayat": 4,
    "Abha": 5, "Jazan": 5, "Najran": 5,
    "Buraydah": 2, "Hail": 3, "Ar Rass": 2
}

@api_router.post("/rate")
async def calc_rate(r: RateIn):
    o_zone = CITY_ZONES.get(r.origin_city, 3)
    d_zone = CITY_ZONES.get(r.destination_city, 3)
    zone_diff = abs(o_zone - d_zone)
    base = {"document": 22, "parcel": 35, "pallet": 180, "freight": 640}.get(r.package_type, 40)
    weight_charge = max(0, r.weight_kg - 1) * {"document": 4, "parcel": 6, "pallet": 3, "freight": 1.2}.get(r.package_type, 5)
    zone_charge = zone_diff * 18 + (18 if o_zone != d_zone else 0)
    service_mult = {"express": 2.2, "same_day": 1.8, "next_day": 1.3, "standard": 1.0}.get(r.service_level, 1.0)
    pieces_mult = 1 + (r.pieces - 1) * 0.85
    subtotal = (base + weight_charge + zone_charge) * service_mult * pieces_mult
    vat = round(subtotal * 0.15, 2)
    total = round(subtotal + vat, 2)
    eta_days = {"express": "Same day", "same_day": "Same day", "next_day": "1 day", "standard": f"{2 + zone_diff} days"}.get(r.service_level, "3 days")
    return {
        "currency": "SAR",
        "subtotal": round(subtotal, 2),
        "vat": vat,
        "total": total,
        "eta": eta_days,
        "breakdown": {
            "base": base,
            "weight_charge": round(weight_charge, 2),
            "zone_charge": zone_charge,
            "service_multiplier": service_mult,
            "pieces_multiplier": pieces_mult
        }
    }

# ---------- Contact ----------
@api_router.post("/contact")
async def submit_contact(c: ContactIn):
    doc = {"id": str(uuid.uuid4()), **c.model_dump(), "created_at": now()}
    await db.leads.insert_one(doc)
    return {"ok": True, "id": doc["id"]}

# ---------- Careers ----------
@api_router.get("/jobs")
async def list_jobs():
    return {"jobs": JOBS}

@api_router.get("/jobs/{job_id}")
async def get_job(job_id: str):
    j = next((x for x in JOBS if x["id"] == job_id), None)
    if not j:
        raise HTTPException(404, "Job not found")
    return j

@api_router.post("/careers")
async def apply(a: CareerIn):
    doc = {"id": str(uuid.uuid4()), **a.model_dump(), "created_at": now(), "status": "received"}
    await db.applications.insert_one(doc)
    return {"ok": True, "id": doc["id"]}

# ---------- Blog ----------
@api_router.get("/blog")
async def list_blog():
    return {"posts": [{k: v for k, v in p.items() if k != "content"} for p in BLOG_POSTS]}

@api_router.get("/blog/{slug}")
async def get_post(slug: str):
    p = next((x for x in BLOG_POSTS if x["slug"] == slug), None)
    if not p:
        raise HTTPException(404, "Post not found")
    return p

# ---------- Subscribe ----------
@api_router.post("/subscribe")
async def subscribe(s: SubscribeIn):
    await db.subscribers.update_one({"email": s.email}, {"$set": {"email": s.email, "created_at": now()}}, upsert=True)
    return {"ok": True}

# ---------- AI Chat Assistant ----------
SYSTEM_PROMPT = """You are Aisha, the AI assistant for Abr Al Awtan Logistics \u2014 a Saudi Arabia-based B2B logistics operator with 500+ direct employees, 150+ owned vehicles, 9 warehouses across the Kingdom, and 25+ cities covered.

Company services:
1. Custom Clearance (FASAH, HS-code, bonded warehousing)
2. Linehaul & Trucking (GCC corridors, FTL/LTL, refrigerated)
3. E-commerce Fulfillment (Salla, Zid, Shopify integrations)
4. Last-Mile B2C (OTP, COD, same-day)
5. B2B Distribution (route-optimized, ePOD, SLA)
6. Express Parcels (2-6h intra-city)
7. Warehousing & Storage (ZATCA, bonded, RFID)
8. Manpower & Staffing (Ajeer, single-sponsorship)
9. Fleet Rental (vans, 3-ton, 40ft trailers)

Trusted by: Aramex, iMile, Aymakan, Zajil, SMSA, Naqel, Salla, Zid.
Founded: Riyadh, KSA. Leadership: Malik Al-Sihani (Founder & CEO) and Jasir Manzoor (Operations Managing Director).
Compliance: ISO 9001, ZATCA registered, FASAH certified.
Contact: corporate@abralawtan.sa, +966 50 000 0000.
Working hours: 24/7 Command Center.

Your role:
- Answer questions about services, coverage, pricing (route users to /rate-calculator), and tracking (route to /track).
- Help visitors submit quote requests (route to /quote) or ship parcels (route to /ship-now).
- Be concise, confident, professional. Use short paragraphs. No emojis.
- If asked about pricing specifics, guide to the rate calculator with sample cities.
- For hiring/careers, mention we're hiring and route to /careers.
- If unsure or the question is outside logistics, politely say you'll connect them to a human operator on WhatsApp (+966 50 000 0000).
- Never invent numbers beyond the ones above. When in doubt, propose the user submit a quote for accuracy.
"""

@api_router.post("/chat")
async def chat(inp: ChatIn):
    session_id = inp.session_id or str(uuid.uuid4())

    # Save the incoming user message
    await db.chats.insert_one({
        "session_id": session_id, "role": "user", "text": inp.message, "ts": now()
    })

    if not LLM_AVAILABLE:
        reply = ("Our AI assistant is temporarily unavailable. Please reach us on WhatsApp "
                 "at +966 50 000 0000 or email corporate@abralawtan.sa \u2014 we respond within minutes during business hours.")
        await db.chats.insert_one({"session_id": session_id, "role": "assistant", "text": reply, "ts": now()})
        return {"session_id": session_id, "reply": reply}

    try:
        chat_instance = LlmChat(
            api_key=EMERGENT_LLM_KEY,
            session_id=session_id,
            system_message=SYSTEM_PROMPT
        ).with_model("openai", "gpt-4o-mini")

        # Rebuild history from DB (last 20 messages) so multi-turn works even across separate requests
        history = await db.chats.find({"session_id": session_id}).sort("ts", 1).to_list(40)
        # The LlmChat instance is fresh per request; we only need to reinject the latest user message.
        # For lightweight assistants, prompt is sufficient.
        response = await chat_instance.send_message(UserMessage(text=inp.message))
        reply = str(response) if response else "I'm here \u2014 how can I help?"
    except Exception as e:
        logging.exception("Chat error")
        reply = "I hit a hiccup fetching that. Please retry, or reach our team on WhatsApp at +966 50 000 0000."

    await db.chats.insert_one({"session_id": session_id, "role": "assistant", "text": reply, "ts": now()})
    return {"session_id": session_id, "reply": reply}

@api_router.get("/chat/{session_id}")
async def chat_history(session_id: str):
    msgs = await db.chats.find({"session_id": session_id}).sort("ts", 1).to_list(100)
    return {"session_id": session_id, "messages": [serialize(m) for m in msgs]}

# ============================ Wire up ============================
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

@app.on_event("startup")
async def startup():
    await seed_demo_shipments()

@app.on_event("shutdown")
async def shutdown():
    client.close()
