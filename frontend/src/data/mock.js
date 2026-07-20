// Mock data for Abr Al Awtan clone

export const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Coverage', href: '#coverage' },
  { label: 'About', href: '#enterprise' },
  { label: 'Leadership', href: '#leadership' },
  { label: 'Clients', href: '#clients' },
  { label: 'Contact', href: '#contact' }
];

export const SERVICES = [
  {
    id: 'warehouse',
    title: 'Own Warehouse Network',
    titleAr: 'شبكة مخازن خاصة',
    tagline: 'Core Service',
    icon: 'Warehouse',
    image: 'https://images.pexels.com/photos/4487383/pexels-photo-4487383.jpeg',
    description: 'Strategic warehouses spanning Saudi Arabia — from major cities to the most remote regions. Climate-controlled, 24/7 operations.',
    bullets: ['Remote city coverage', 'Climate-controlled', 'Real-time inventory', '24/7 operations']
  },
  {
    id: 'manpower',
    title: 'Skilled Manpower',
    titleAr: 'كوادر مدربة',
    tagline: 'Core Service',
    icon: 'Users',
    image: 'https://images.pexels.com/photos/14053428/pexels-photo-14053428.jpeg',
    description: 'Trained professionals for your requirements. Single Sponsorship, Ajeer Helpers, and certified workforce solutions.',
    bullets: ['Single Sponsorship', 'Ajeer Helpers', 'Certified training', 'Flexible staffing']
  },
  {
    id: 'delivery',
    title: 'Delivery Services',
    titleAr: 'خدمات التوصيل',
    tagline: 'Core Service',
    icon: 'Truck',
    image: 'https://images.pexels.com/photos/5410923/pexels-photo-5410923.jpeg',
    description: 'Our delivery network reaches extreme remote areas with unfavorable conditions — where others simply do not go.',
    bullets: ['Remote specialists', 'Last-mile delivery', 'Express options', 'Real-time tracking']
  },
  {
    id: 'fleet',
    title: 'Own Vehicle Fleet',
    titleAr: 'أسطول سيارات مملوكة',
    tagline: 'Core Service',
    icon: 'Bus',
    image: 'https://images.unsplash.com/photo-1592838064575-70ed626d3a0e',
    description: '150+ owned vehicles, from light vans to heavy trucks, maintained and equipped for all terrains across the Kingdom.',
    bullets: ['Vans to heavy trucks', 'GPS tracking', 'Regular maintenance', 'All-terrain capable']
  }
];

export const STATS = [
  { value: 6000000, suffix: 'M+', label: 'Orders Delivered', labelAr: 'تمت توصيلها', note: 'Across Saudi Arabia' },
  { value: 25, suffix: '+', label: 'Own Locations', labelAr: 'موقع خاص', note: 'Nationwide presence' },
  { value: 500, suffix: '+', label: 'Skilled Staff', labelAr: 'كوادر مدربة', note: 'Trained professionals' },
  { value: 150, suffix: '+', label: 'Own Vehicles', labelAr: 'سيارات مملوكة', note: 'Modern fleet' },
  { value: 25, suffix: '+', label: 'Cities Covered', labelAr: 'مدن مشمولة', note: 'Including remote areas' }
];

export const NETWORK_TOTALS = [
  { label: 'Cities', labelAr: 'مدن', value: 25 },
  { label: 'Warehouses', labelAr: 'مخازن', value: 9, accent: true },
  { label: 'Stations', labelAr: 'محطات', value: 5 },
  { label: 'Stores', labelAr: 'متاجر', value: 11 }
];

// x, y coordinates approximate positions on the KSA map (0-100 scale)
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
  { name: 'Marat', type: 'Store', x: 58, y: 47 },
  { name: 'Az Zulfi', type: 'Store', x: 62, y: 46 },
  { name: 'Buraydah', type: 'Warehouse', x: 55, y: 44 },
  { name: 'Ar Rass 2', type: 'Store', x: 55, y: 50 },
  { name: 'Madinah Henakyah', type: 'Store', x: 40, y: 55 },
  { name: 'Shaqra', type: 'Store', x: 60, y: 52 },
  { name: 'Riyadh (Umm al Hamam)', type: 'Store', x: 66, y: 54 },
  { name: 'Riyadh (Qurtubah)', type: 'Store', x: 68, y: 54 },
  { name: 'Abha', type: 'Warehouse', x: 48, y: 82 },
  { name: 'Madinah', type: 'Warehouse', x: 36, y: 58 },
  { name: 'Al Majmah', type: 'Station', x: 61, y: 50 },
  { name: 'Al Kharj', type: 'Warehouse', x: 68, y: 60 },
  { name: 'Ad Duwadmi', type: 'Station', x: 58, y: 56 }
];

export const REGIONS = [
  {
    name: 'Northern Border Region', count: 3,
    locations: [
      { name: 'Rafha', type: 'Store' },
      { name: 'Qurrayat', type: 'Station' },
      { name: 'Sakaka', type: 'Store' }
    ]
  },
  { name: 'Eastern Region', count: 1, locations: [{ name: 'Jubail', type: 'Warehouse' }] },
  {
    name: 'Madinah Region', count: 6,
    locations: [
      { name: 'Madinah', type: 'Warehouse' },
      { name: 'Yanbu', type: 'Warehouse' },
      { name: 'Al Ula', type: 'Warehouse' },
      { name: 'Al Hait', type: 'Store' },
      { name: 'Madinah Henakyah', type: 'Store' },
      { name: 'Shaqra', type: 'Store' }
    ]
  },
  { name: 'Tabuk Region', count: 1, locations: [{ name: 'Tabuk', type: 'Warehouse' }] },
  {
    name: 'Hail Region', count: 3,
    locations: [
      { name: 'Hail', type: 'Warehouse' },
      { name: 'Marat', type: 'Store' },
      { name: 'Az Zulfi', type: 'Store' }
    ]
  },
  {
    name: 'Al-Qassim Region', count: 3,
    locations: [
      { name: 'Buraydah', type: 'Warehouse' },
      { name: 'Ar Rass', type: 'Station' },
      { name: 'Ar Rass 2', type: 'Store' }
    ]
  },
  {
    name: 'Hafer al Batin Corridor', count: 2,
    locations: [
      { name: 'Hafer al Batin', type: 'Station' },
      { name: 'Hafer al Batin', type: 'Store' }
    ]
  },
  {
    name: 'Riyadh Region', count: 5,
    locations: [
      { name: 'Riyadh (Umm al Hamam)', type: 'Store' },
      { name: 'Riyadh (Qurtubah)', type: 'Store' },
      { name: 'Al Majmah', type: 'Station' },
      { name: 'Al Kharj', type: 'Warehouse' },
      { name: 'Ad Duwadmi', type: 'Station' }
    ]
  },
  { name: 'Asir Region', count: 1, locations: [{ name: 'Abha', type: 'Warehouse' }] }
];

export const REMOTE_REGIONS = [
  'Northern Border Region', 'Najran Province', 'Jazan Region', 'Al-Jouf',
  'Tabuk Region', 'Hail Region', 'Al-Baha', 'Asir Region'
];

export const PARTNERS = [
  { name: 'Aramex', category: 'Global Logistics', logo: 'ARAMEX' },
  { name: 'iMile', category: 'Last-Mile', logo: 'iMile' },
  { name: 'Aymakan', category: 'E-Commerce', logo: 'aymakan' },
  { name: 'Zajil', category: 'Express Courier', logo: 'ZAJIL' },
  { name: 'SMSA', category: 'Freight', logo: 'SMSA' },
  { name: 'Naqel', category: 'Enterprise', logo: 'Naqel' }
];

export const LEADERS = [
  {
    name: 'Malik Al-Sihani',
    nameAr: 'مالك السهيني',
    role: 'Founder & CEO',
    roleAr: 'المؤسس والرئيس التنفيذي',
    location: 'Saudi Arabia',
    quote: 'Our foundation is simple: own the assets, employ the people, control the quality. In a market full of brokers, we chose to be operators. That decision is what allows us to guarantee results where others cannot even attempt.',
    quoteAr: 'أسسنا بسيط: امتلك الأصول، ووظف الكوادر، وتحكم بالجودة. في سوق مليء بالوسطاء، اخترنا أن نكون مشغّلين.',
    bullets: ['Founded Abr Al Awtan', 'Vision: Seamless & integrated logistics', 'Focus on excellence & innovation', 'Nationwide infrastructure builder'],
    image: 'https://logistics-fulfilled--jasirmanzoor2.replit.app/assets/IMG_6031_1784560742055-BhxfNvY2.jpeg'
  },
  {
    name: 'Jasir Manzoor',
    nameAr: 'جاسر منظور',
    role: 'Operations Managing Director',
    roleAr: 'المدير التنفيذي للعمليات',
    location: 'Multi-Regional',
    quote: 'Every delivery completed in a remote region, every warehouse staffed, every vehicle deployed on time — that is what operational excellence looks like. We do not promise it. We execute it.',
    quoteAr: 'كل توصيل يُكتمل في منطقة نائية، وكل مخزن يُجهَّز، وكل مركبة تُنشر في وقتها — هذا هو التميز التشغيلي.',
    bullets: ['Leads nationwide logistics operations', 'Oversees 500+ direct employees', 'Manages 150+ owned vehicle fleet', '25+ locations across Saudi Arabia'],
    linkedin: 'https://www.linkedin.com/in/jasir-kuloo-7539301b7',
    image: 'https://logistics-fulfilled--jasirmanzoor2.replit.app/assets/IMG_6033_1784560742055-wVWrBeUm.jpeg'
  }
];

export const ADVANTAGES = [
  { icon: 'Flag', title: 'National Authority', titleAr: 'التغطية الشاملة', desc: 'Complete coverage of the Kingdom, from major hubs to the deepest remote outposts.' },
  { icon: 'Building2', title: 'Direct Asset Ownership', titleAr: 'ملكية الأصول المباشرة', desc: 'Full operational control through owned facilities, fleets, and direct employees.' },
  { icon: 'Zap', title: 'Critical Response', titleAr: 'استجابة حرجة', desc: 'Express options and rapid mobilization for urgent enterprise logistics needs.' },
  { icon: 'ShieldCheck', title: 'Labor Compliance', titleAr: 'الامتثال للقوانين', desc: 'Ajeer and Single Sponsorship helpers fully compliant with Ministry of Labor regulations.' },
  { icon: 'Briefcase', title: 'B2B Exclusivity', titleAr: 'حصرية B2B', desc: 'Systems, reporting, and operations designed strictly for enterprise-level volume.' },
  { icon: 'Radio', title: 'Command Center', titleAr: 'مركز القيادة', desc: '24/7 dedicated account management and operational oversight for partners.' }
];

export const GALLERY = [
  { title: 'Warehouse Network', titleAr: 'شبكة المخازن', image: 'https://images.pexels.com/photos/4487363/pexels-photo-4487363.jpeg' },
  { title: 'Vehicle Fleet', titleAr: 'أسطول السيارات', image: 'https://images.pexels.com/photos/5410923/pexels-photo-5410923.jpeg' },
  { title: 'Operations Team', titleAr: 'فريق العمليات', image: 'https://images.pexels.com/photos/14053428/pexels-photo-14053428.jpeg' },
  { title: 'Delivery Network', titleAr: 'شبكة التوصيل', image: 'https://images.unsplash.com/photo-1616432043562-3671ea2e5242' }
];

export const ENTERPRISE_BULLETS = [
  { en: 'Owned warehouse network', ar: 'شبكة مخازن خاصة' },
  { en: 'Remote region dominance', ar: 'السيطرة على المناطق النائية' },
  { en: 'Compliant workforce solutions', ar: 'حلول قوة عاملة متوافقة' },
  { en: 'B2B dedicated operations', ar: 'عمليات مكثفة B2B' },
  { en: '150+ heavy & light vehicles', ar: '150+ سيارة ثقيلة وخفيفة' },
  { en: '500+ direct employees', ar: '500+ موظف مباشر' }
];

export const HERO_IMAGE = 'https://images.pexels.com/photos/30341205/pexels-photo-30341205.jpeg';
