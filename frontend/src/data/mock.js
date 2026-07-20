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
  { label: 'Active Shipments', value: 12847 },
  { label: 'On-Route Vehicles', value: 138 },
  { label: 'Warehouses Online', value: 9 },
  { label: 'SLA This Hour', value: 99.7, suffix: '%' },
  { label: 'Avg Dispatch', value: 42, suffix: 'min' }
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
    tag: 'E-Commerce',
    title: '3M+ parcels for a global marketplace',
    metric: '99.4% SLA',
    body: 'Onboarded a top-3 marketplace and scaled from 40k to 260k monthly parcels across 25 cities in 90 days with zero downtime.',
    image: 'https://images.pexels.com/photos/4487363/pexels-photo-4487363.jpeg'
  },
  {
    tag: 'Government',
    title: 'National ministry supply-chain rollout',
    metric: '18 regions',
    body: 'Deployed climate-controlled linehaul + bonded storage for a ministry-grade national distribution program with full ZATCA compliance.',
    image: 'https://images.pexels.com/photos/5410923/pexels-photo-5410923.jpeg'
  },
  {
    tag: 'Retail',
    title: 'Fashion retailer omnichannel fulfillment',
    metric: '24h D2C',
    body: 'Integrated Salla + physical stores into a single-inventory pool, enabling 24-hour direct-to-customer nationwide fulfillment.',
    image: 'https://images.unsplash.com/photo-1616432043562-3671ea2e5242'
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
  { name: 'Aymakan', logo: 'aymakan' },
  { name: 'Zajil', logo: 'ZAJIL' },
  { name: 'SMSA', logo: 'SMSA' },
  { name: 'Naqel', logo: 'Naqel' },
  { name: 'Salla', logo: 'salla' },
  { name: 'Zid', logo: 'Zid' }
];

export const LEADERS = [
  { name: 'Malik Al-Sihani', nameAr: 'مالك السهيني', role: 'Founder & CEO', location: 'Riyadh', quote: 'Own the assets. Employ the people. Control the quality. Everything else is theatre.' },
  { name: 'Jasir Manzoor', nameAr: 'جاسر منظور', role: 'Managing Director — Operations', location: 'Multi-Regional', quote: 'Excellence isn’t promised. It’s executed — every parcel, every lane, every hour.' }
];

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
export const CTA_WHATSAPP = 'https://wa.me/966500000000';
