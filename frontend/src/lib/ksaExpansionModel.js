/**
 * Abr Al Awtan — KSA Expansion & Scale Model
 * Deep focus on Kingdom-wide densification, remote lanes, and capacity.
 * All figures SAR. Base case 2026–2028.
 */

export const KSA_REGIONS = {
  CENTRAL: {
    name: 'Central',
    nameAr: 'الوسطى',
    hubs: ['Riyadh', 'Al Kharj', 'Al Majmaah', 'Shaqra'],
    currentCities: 5,
    targetCities: 9,
    monthlyVolumeNow: 42000,
    monthlyVolumeTarget: 78000,
    priority: 1,
  },
  WESTERN: {
    name: 'Western',
    nameAr: 'الغربية',
    hubs: ['Jeddah', 'Madinah', 'Makkah', 'Yanbu', 'Taif', 'Al Ula'],
    currentCities: 6,
    targetCities: 10,
    monthlyVolumeNow: 28000,
    monthlyVolumeTarget: 55000,
    priority: 2,
  },
  EASTERN: {
    name: 'Eastern',
    nameAr: 'الشرقية',
    hubs: ['Dammam', 'Jubail', 'Hafr Al Batin', 'Khobar'],
    currentCities: 4,
    targetCities: 7,
    monthlyVolumeNow: 18000,
    monthlyVolumeTarget: 38000,
    priority: 3,
  },
  NORTHERN: {
    name: 'Northern',
    nameAr: 'الشمالية',
    hubs: ['Tabuk', 'Sakaka', 'Rafha', 'Qurayyat', 'Arar'],
    currentCities: 4,
    targetCities: 7,
    monthlyVolumeNow: 6500,
    monthlyVolumeTarget: 18000,
    priority: 4,
  },
  SOUTHERN: {
    name: 'Southern',
    nameAr: 'الجنوبية',
    hubs: ['Abha', 'Jazan', 'Najran', 'Sabya'],
    currentCities: 4,
    targetCities: 7,
    monthlyVolumeNow: 7200,
    monthlyVolumeTarget: 22000,
    priority: 5,
  },
  QASSIM_HAIL: {
    name: 'Al-Qassim & Hail',
    nameAr: 'القصيم وحائل',
    hubs: ['Buraydah', 'Hail', 'Ar Rass', 'Unaizah'],
    currentCities: 4,
    targetCities: 6,
    monthlyVolumeNow: 8300,
    monthlyVolumeTarget: 19000,
    priority: 6,
  },
};

export const SCALE_TARGETS = {
  current: {
    monthlyParcels: 100000,
    cities: 25,
    ownVans: 50,
    salaryDrivers: 150,
    warehouses: 9,
    stations: 5,
  },
  year1: {
    monthlyParcels: 180000,
    cities: 32,
    ownVans: 85,
    salaryDrivers: 240,
    warehouses: 12,
    stations: 9,
  },
  year2: {
    monthlyParcels: 280000,
    cities: 40,
    ownVans: 130,
    salaryDrivers: 360,
    warehouses: 16,
    stations: 14,
  },
};

export const CAPEX_ROADMAP = {
  year1: {
    additionalVans: 35,
    vanCost: 95000,
    newWarehouses: 3,
    warehouseFitout: 380000,
    stationBuildouts: 4,
    stationCost: 145000,
    systemsUpgrade: 220000,
    workingCapital: 450000,
  },
  year2: {
    additionalVans: 45,
    vanCost: 95000,
    newWarehouses: 4,
    warehouseFitout: 380000,
    stationBuildouts: 5,
    stationCost: 145000,
    systemsUpgrade: 180000,
    workingCapital: 520000,
  },
};

export function totalCapex(year) {
  const y = CAPEX_ROADMAP[year];
  return (
    y.additionalVans * y.vanCost +
    y.newWarehouses * y.warehouseFitout +
    y.stationBuildouts * y.stationCost +
    y.systemsUpgrade +
    y.workingCapital
  );
}

export function portfolioView() {
  const regions = Object.values(KSA_REGIONS);
  const currentVol = regions.reduce((s, r) => s + r.monthlyVolumeNow, 0);
  const targetVol = regions.reduce((s, r) => s + r.monthlyVolumeTarget, 0);
  return {
    regions,
    currentVol,
    targetVol,
    uplift: targetVol - currentVol,
    upliftPct: Math.round(((targetVol - currentVol) / currentVol) * 100),
    capexY1: totalCapex('year1'),
    capexY2: totalCapex('year2'),
    scale: SCALE_TARGETS,
  };
}

/** KSA Regulatory Compliance Landscape */
export const REGULATORY_LANDSCAPE = [
  {
    layer: 'Transport Authority',
    body: 'TGA — Transport General Authority',
    items: [
      'Public Transport License (Freight)',
      'Vehicle Operating Permits',
      'Driver Professional Cards',
      'Route & Corridor Approvals',
    ],
    status: 'Active',
  },
  {
    layer: 'Customs & Trade',
    body: 'ZATCA + Fasah',
    items: [
      'ZATCA E-Invoicing (Fatoora)',
      'Fasah Customs Access',
      'Bonded Warehouse Authorization',
      'HS-Code & Clearance Rights',
    ],
    status: 'Active',
  },
  {
    layer: 'Labor & Saudization',
    body: 'HRSD + GOSI + Ajeer',
    items: [
      'GOSI Employer Registration',
      '100% Driver Iqama Sponsorship',
      'Saudization Quotas Met',
      'Ajeer Seasonal Workforce Ready',
    ],
    status: 'Active',
  },
  {
    layer: 'Municipal & Real Estate',
    body: 'Municipalities + MOMRA',
    items: [
      'Warehouse Operating Permits',
      'Fire & Safety Certificates',
      'Zoning Compliance',
      'CCTV & Security Standards',
    ],
    status: 'Active',
  },
  {
    layer: 'Quality & Standards',
    body: 'SASO + ISO',
    items: [
      'ISO 9001 Certified',
      'Process Documentation',
      'Customer Complaint Protocols',
      'SLA Measurement Framework',
    ],
    status: 'Active',
  },
  {
    layer: 'Data & Digital',
    body: 'NDMO + SDAIA guidance',
    items: [
      'Customer Data Handling',
      'OTP & POD Digital Capture',
      'API Integration Readiness',
      'Tracking Data Retention',
    ],
    status: 'In Progress',
  },
];
