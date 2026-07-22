// Mock data for Abr Al Awtan Command Center Website

export const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Network', href: '#coverage' },
  { label: 'Quote', href: '#quote' },
  { label: 'Track', href: '#track' },
  { label: 'Cases', href: '#cases' },
  { label: 'Contact', href: '#contact' }
];

export const HERO_TICKERS = [
  { label: 'Parcels This Month', value: 100000, suffix: '+' },
  { label: 'Own Salary Drivers', value: 150, suffix: '+' },
  { label: 'Own Big Vans', value: 50, suffix: '+' },
  { label: 'Trained Manpower', value: 250, suffix: '+' },
  { label: 'Lifetime Deliveries', value: 6, suffix: 'M+' },
  { label: 'SLA This Hour', value: 99.4, suffix: '%' }
];

export const SERVICES = [
  { id: 'clearance', title: 'Custom Clearance', ar: 'تخليص جمركي', icon: 'FileCheck2', desc: 'End-to-end Saudi Customs & FASAH handling with pre-cleared documentation.', tags: ['FASAH', 'HS-code', 'Bonded'], code: '01' },
  { id: 'linehaul', title: 'Linehaul & Trucking', ar: 'نقل بري', icon: 'Truck', desc: 'Owned heavy fleet across GCC corridors — refrigerated, dry, and hazmat capable.', tags: ['GCC', 'FTL/LTL', 'Reefer'], code: '02' },
  { id: 'fulfillment', title: 'E-commerce Fulfillment', ar: 'تجهيز الطلبات', icon: 'PackageOpen', desc: 'Pick-pack-ship with WMS integration to Salla, Zid, Shopify, Magento.', tags: ['WMS', 'Salla', 'Shopify'], code: '03' },
  { id: 'lastmile', title: 'Last-Mile B2C', ar: 'الميل الأخير', icon: 'Bike', desc: 'Same-day &  next-day home delivery with OTP + COD handled by owned riders.', tags: ['OTP', 'COD', 'Same-day'], code: '04' },
  { id: 'b2b', title: 'B2B Distribution', ar: 'توزيع B2B', icon: 'Building2', desc: 'Route-optimized store & branch deliveries with proof-of-delivery capture.', tags: ['Route-Opt', 'ePOD', 'SLA'], code: '05' },
  { id: 'express', title: 'Express Parcels', ar: 'طرود سريعة', icon: 'Zap', desc: '2-6 hour intra-city express with priority handling and live customer alerts.', tags: ['Priority', '2-6h', 'Alerts'], code: '06' },
  { id: 'warehousing', title: 'Warehousing & Storage', ar: 'مخازن وتخزين', icon: 'Warehouse', desc: 'ZATCA-compliant bonded and ambient warehouses with 24/7 CCTV and RFID.', tags: ['ZATCA', 'Bonded', 'RFID'], code: '07' },
  { id: 'manpower', title: 'Manpower & Staffing', ar: 'القوى العاملة', icon: 'Users', desc: 'Ajeer, Single-sponsorship & seasonal workforce for peak & backend ops.', tags: ['Ajeer', 'Trained', 'Flexible'], code: '08' },
  { id: 'fleet', title: 'Fleet Rental', ar: 'تأجير الأسطول', icon: 'Bus', desc: 'Vans, 3-tonners, curtain-siders & 40ft trailers on daily / monthly lease.', tags: ['Vans', '3-ton', '40ft'], code: '09' }
];

export const COMPARISON = [
  { feature: 'Own physical infrastructure', us: true, others: false },
  { feature: 'Direct-hire trained workforce', us: true, others: false },
  { feature: 'ZATCA + FASAH compliance', us: true, others: 'Partial' },
  { feature: 'Remote-region SLA guarantee', us: true, others: false },
  { feature: 'Real-time client dashboard', us: true, others: 'Partial' },
  { feature: 'Single point of accountability', us: true, others: false },
  { feature: 'Instant quote & digital contracts', us: true, others: false },
  { feature: '24/7 command center coverage', us: true, others: 'Partial' }
];

export const CASES = [
  {
    tag: 'Global Partner · 2016',
    title: 'Aramex — First flagship partnership',
    metric: '9-Year Partnership',
    body: 'Signed our first flagship logistics partnership with Aramex in 2016 — the foundation that turned Abr Al Awtan into a trusted last-mile operator across the Kingdom.',
    image: 'https://images.pexels.com/photos/4487363/pexels-photo-4487363.jpeg'
  },
  {
    tag: 'E-Commerce · 2023',
    title: 'iMile — Kingdom-wide last-mile',
    metric: '100k+ / month',
    body: 'Agreement signed Q3 2023 and re-scaled in 2025 for last-mile delivery services — currently processing over 100,000 parcels per month across all major KSA cities.',
    image: 'https://images.pexels.com/photos/5980585/pexels-photo-5980585.jpeg'
  },
  {
    tag: 'CSP · 2025',
    title: 'JDL — Last-mile on CSP model',
    metric: 'Q3 2025 Live',
    body: 'Onboarded JDL on a Contracted Service Provider (CSP) model in Q3 2025 — dedicated fleet, dedicated riders, integrated warehouse networking end-to-end.',
    image: 'https://images.pexels.com/photos/5410923/pexels-photo-5410923.jpeg'
  }
];

export const TESTIMONIALS = [
  { quote: 'Their remote-region reach is unmatched in the Kingdom. We route our hardest lanes through Abr Al Awtan.', name: 'Operations Head', role: 'Global Marketplace', rating: 5 },
  { quote: 'Onboarding was 6 days. Six. That kind of speed with a compliant operator is genuinely rare here.', name: 'Supply Chain Director', role: 'Retail Group', rating: 5 },
  { quote: 'They own the trucks, the warehouses and the people. Accountability is single-threaded and it shows in the SLA.', name: 'COO', role: 'D2C Brand', rating: 5 },
  { quote: 'Their dashboard replaced three vendors for us. One partner, one view, zero excuses.', name: 'Head of Logistics', role: 'FMCG', rating: 5 }
];

export const NETWORK_TOTALS = [
  { label: 'Cities', labelAr: 'مدن', value: 25 },
  { label: 'Warehouses', labelAr: 'مخازن', value: 9, accent: true },
  { label: 'Stations', labelAr: 'محطات', value: 5 },
  { label: 'Stores', labelAr: 'متاجر', value: 11 }
];

export const MAP_LOCATIONS = [
  { name: 'Rafha', type: 'Store', x: 66, y: 20 },
  { name: 'Jubail', type: 'Warehouse', x: 78, y: 34 },
  { name: 'Qurrayat', type: 'Station', x: 36, y: 12 },
  { name: 'Sakaka', type: 'Store', x: 47, y: 20 },
  { name: 'Yanbu', type: 'Warehouse', x: 28, y: 46 },
  { name: 'Hafer al Batin', type: 'Station', x: 70, y: 30 },
  { name: 'Al Ula', type: 'Warehouse', x: 34, y: 38 },
  { name: 'Al Hait', type: 'Store', x: 44, y: 45 },
  { name: 'Tabuk', type: 'Warehouse', x: 25, y: 26 },
  { name: 'Hail', type: 'Warehouse', x: 48, y: 38 },
  { name: 'Ar Rass', type: 'Station', x: 54, y: 47 },
  { name: 'Buraydah', type: 'Warehouse', x: 55, y: 44 },
  { name: 'Madinah', type: 'Warehouse', x: 36, y: 58 },
  { name: 'Al Kharj', type: 'Warehouse', x: 68, y: 60 },
  { name: 'Riyadh', type: 'Warehouse', x: 66, y: 54 },
  { name: 'Abha', type: 'Warehouse', x: 48, y: 82 },
  { name: 'Jazan', type: 'Store', x: 42, y: 90 },
  { name: 'Najran', type: 'Store', x: 55, y: 88 },
  { name: 'Dammam', type: 'Warehouse', x: 76, y: 42 },
  { name: 'Jeddah', type: 'Warehouse', x: 30, y: 66 },
  { name: 'Makkah', type: 'Store', x: 34, y: 70 },
  { name: 'Taif', type: 'Store', x: 40, y: 68 }
];

// Animated shipment routes for hero map
export const ROUTES = [
  { from: 'Jeddah', to: 'Riyadh' },
  { from: 'Riyadh', to: 'Dammam' },
  { from: 'Riyadh', to: 'Tabuk' },
  { from: 'Dammam', to: 'Buraydah' },
  { from: 'Jeddah', to: 'Abha' },
  { from: 'Riyadh', to: 'Jazan' },
  { from: 'Riyadh', to: 'Al Ula' },
  { from: 'Madinah', to: 'Hail' }
];

export const REGIONS = [
  { name: 'Central', count: 5, locations: [{name:'Riyadh',type:'Warehouse'},{name:'Al Kharj',type:'Warehouse'},{name:'Al Majmah',type:'Station'},{name:'Ad Duwadmi',type:'Station'},{name:'Shaqra',type:'Store'}] },
  { name: 'Western', count: 6, locations: [{name:'Jeddah',type:'Warehouse'},{name:'Madinah',type:'Warehouse'},{name:'Yanbu',type:'Warehouse'},{name:'Makkah',type:'Store'},{name:'Taif',type:'Store'},{name:'Al Ula',type:'Warehouse'}] },
  { name: 'Eastern', count: 3, locations: [{name:'Dammam',type:'Warehouse'},{name:'Jubail',type:'Warehouse'},{name:'Hafer al Batin',type:'Station'}] },
  { name: 'Northern', count: 4, locations: [{name:'Tabuk',type:'Warehouse'},{name:'Sakaka',type:'Store'},{name:'Rafha',type:'Store'},{name:'Qurrayat',type:'Station'}] },
  { name: 'Southern', count: 3, locations: [{name:'Abha',type:'Warehouse'},{name:'Jazan',type:'Store'},{name:'Najran',type:'Store'}] },
  { name: 'Al-Qassim & Hail', count: 4, locations: [{name:'Buraydah',type:'Warehouse'},{name:'Hail',type:'Warehouse'},{name:'Ar Rass',type:'Station'},{name:'Marat',type:'Store'}] }
];

export const PARTNERS = [
  { name: 'Aramex', logo: 'ARAMEX' },
  { name: 'iMile', logo: 'iMile' },
  { name: 'AJEX', logo: 'AJEX.' },
  { name: 'Keeta', logo: 'Keeta' },
  { name: 'Logistiq', logo: 'Logistiq' },
  { name: 'Naqel Express', logo: 'Naqel' },
  { name: 'J&T Express', logo: 'J&T' },
  { name: 'Aymakan', logo: 'aymakan' },
  { name: 'Zajil', logo: 'ZAJIL' },
  { name: 'SMSA', logo: 'SMSA' },
  { name: 'Salla', logo: 'salla' },
  { name: 'Zid', logo: 'Zid' }
];

export const LEADERS = [
  { name: 'Malik Al Otaibi', nameAr: 'مالك العتيبي', role: 'Founder & CEO', location: 'Riyadh, KSA',
    photo: 'https://customer-assets-rejwkqb3.emergentagent.net/job_delivery-nexus-42/artifacts/msijincm_IMG_6031.jpeg',
    photoPosition: 'right top',
    quote: 'Own the assets. Employ the people. Control the quality. Everything else is theatre.',
    bio: 'Saudi-rooted founder with a vision for true logistics ownership. Builds infrastructure that others rent.' },
  { name: 'Jasir Manzoor', nameAr: 'جاسر منظور', role: 'Country Operations Director', location: 'Multi-Regional · KSA',
    photo: 'https://customer-assets-rejwkqb3.emergentagent.net/job_delivery-nexus-42/artifacts/lryz2ia6_IMG_6033.jpeg',
    photoPosition: 'center top',
    quote: 'Excellence isn\u2019t promised. It\u2019s executed \u2014 every parcel, every lane, every hour.',
    bio: 'Turns strategy into daily execution across the Kingdom. 250+ direct employees, 150+ own drivers, 50+ owned vans, 23+ cities.' }
];

export const COMPANY_PROFILE_PDF = 'https://customer-assets-rejwkqb3.emergentagent.net/job_delivery-nexus-42/artifacts/kaum80i3_Abral%20awtan%20profile%20.pdf';

export const ADVANTAGES = [
  { icon: 'ShieldCheck', title: 'ZATCA & FASAH Compliant', desc: 'Fully licensed operator across every regulatory layer of Saudi logistics.' },
  { icon: 'Radio', title: '24/7 Command Center', desc: 'Live operations desk with dedicated account leads for every enterprise partner.' },
  { icon: 'Building2', title: 'Owned Assets, Zero Brokerage', desc: 'Every truck, warehouse, and worker is directly owned or employed by us.' },
  { icon: 'Zap', title: 'Instant Digital Onboarding', desc: 'From RFQ to first shipment in under 6 working days — signed digitally.' },
  { icon: 'Flag', title: 'Full-Kingdom Coverage', desc: 'Central, Western, Eastern, Northern & Southern regions — including remote deserts.' },
  { icon: 'Award', title: 'ISO 9001 Certified', desc: 'Documented process quality across every warehouse, hub and fleet division.' }
];

export const TRACK_STAGES = [
  { label: 'Order Received', location: 'Riyadh Fulfillment Center', time: '08:12 AM' },
  { label: 'Picked & Packed', location: 'Warehouse Zone B', time: '10:34 AM' },
  { label: 'Dispatched', location: 'Riyadh Hub → Jeddah Line', time: '02:47 PM' },
  { label: 'In-Transit', location: 'Ar Rass Corridor', time: '09:15 PM' },
  { label: 'Arrived at Destination Hub', location: 'Jeddah Sort Center', time: '05:20 AM' },
  { label: 'Out for Delivery', location: 'Jeddah North Rider', time: '07:48 AM' },
  { label: 'Delivered', location: 'Customer Signed', time: '11:02 AM' }
];

export const HERO_IMAGE = 'https://images.pexels.com/photos/30341205/pexels-photo-30341205.jpeg';
// All quote / WhatsApp CTAs route to the Country Operations Director (Jasir Manzoor)
export const CTA_WHATSAPP = 'https://wa.me/966578061556';
export const OPS_WHATSAPP_LABEL = '+966 57 806 1556';

export const COMPANY_CONTACT = {
  email: 'info@abr-alawtan.com',
  website: 'www.abrAlawtan.com',
  phones: ['+966 555 324 149', '+966 536 708 287'],
  address: 'Riyadh, Kingdom of Saudi Arabia'
};

// Vision & Mission — verbatim from company profile
export const COMPANY_STORY = {
  mission: 'Reliable and cost-effective parcel delivery throughout Saudi Arabia — empowering individuals, online sellers, and emerging businesses with a seamless local shipping experience.',
  vision: 'To be the leading logistics broker in the Kingdom, offering smart, scalable, and secure shipping solutions built on excellence, innovation, and a truly customer-centric operating model.',
  founded: 'Riyadh, KSA'
};

// Full leadership roster from company profile
export const FULL_TEAM = [
  { name: 'Malik Al Otaibi', role: 'Founder & CEO' },
  { name: 'Jasir Manzoor', role: 'Country Operations Director' },
  { name: 'Turki Al Otaibi', role: 'General Manager' },
  { name: 'Mohammed Dhaifullah', role: 'Department Head' },
  { name: 'Abdullah Al Sihani', role: 'Human Resources' },
  { name: 'Ahmed Shaiba', role: 'Projects & Development' },
  { name: 'Meshaal Obaid', role: 'Partner Relations' },
  { name: 'Turki Al Rowgi', role: 'Operations' },
  { name: 'Fahed Ghibaiwy', role: 'Finance Manager' },
  { name: 'Ayad Mutlaq', role: 'Customer Service' },
  { name: 'Hitham Nasr', role: 'Control' },
  { name: 'M. Al Kerdawi', role: 'Accountant' },
  { name: 'Khader', role: 'Ground Operation' },
  { name: 'Abdullah Fahad', role: 'Outlets Supervisor' },
  { name: 'Mir Salman', role: 'External Supervisor' }
];

// Company milestones from PDF
export const MILESTONES = [
  { year: '2016', title: 'Founded in Riyadh', detail: 'First flagship partnership signed with Aramex.' },
  { year: '2017–2021', title: 'Expansion from 3 → 20 cities', detail: 'Coverage grew to include major KSA urban markets.' },
  { year: '2022', title: '50,000 parcels/month', detail: 'Scaled monthly volume beyond the 50k threshold.' },
  { year: '2023', title: 'iMile agreement · 23 cities', detail: 'Signed Q3 2023 iMile partnership. Coverage across 23 KSA cities.' },
  { year: '2024', title: 'Fleet diversification', detail: 'Fleet mix expanded from trucks to motorcycles. 15 remote areas onboarded.' },
  { year: '2025', title: 'JDL partnership · 100k+/mo', detail: 'CSP model with JDL live in Q3. Now processing 100,000+ parcels per month.' }
];
