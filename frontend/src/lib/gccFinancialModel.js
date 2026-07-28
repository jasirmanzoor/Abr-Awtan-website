/**
 * Abr Al Awtan — GCC Expansion Financial Model
 * Deep multi-market model (UAE → Bahrain → Kuwait → Oman/Qatar)
 * All figures in SAR unless noted. Conservative base case 2026-28.
 */

export const GCC_MARKETS = {
  UAE: {
    code: 'UAE',
    name: 'United Arab Emirates',
    priority: 1,
    entryModel: 'Asset-light + Free-zone last-mile',
    cities: ['Dubai', 'Abu Dhabi', 'Sharjah'],
    timelineMonths: 8,

    // Volume ramp (monthly parcels)
    volumeY1: [8000, 12000, 18000, 25000, 32000, 40000, 48000, 55000, 62000, 70000, 78000, 85000],
    volumeY2Exit: 140000,

    // Pricing
    avgRatePerParcel: 11.2, // AED converted ≈ SAR

    // CapEx (one-time)
    capex: {
      freeZoneLicense: 185000,
      warehouseDepositFitout: 420000,
      initialFleetLeaseDeposit: 280000, // 12 vans leased
      systemsIntegration: 150000,
      legalCompliance: 95000,
      workingCapital: 350000,
    },

    // Monthly OpEx at scale (Y1 exit)
    opexAtScale: {
      warehouseRent: 85000,
      leasedFleet: 72000, // 12 vans
      driversHelpers: 168000,
      fuelMaint: 38000,
      managementLocal: 45000,
      insuranceCompliance: 22000,
      misc: 18000,
    },

    // Contribution margin target
    targetCM: 0.28,
    breakEvenMonth: 11,
  },

  BAHRAIN: {
    code: 'BH',
    name: 'Bahrain',
    priority: 2,
    entryModel: 'Full own fleet + bonded warehouse',
    cities: ['Manama', 'Muharraq', 'Riffa'],
    timelineMonths: 10,

    volumeY1: [3000, 4500, 6500, 9000, 12000, 15000, 18000, 21000, 24000, 27000, 30000, 33000],
    volumeY2Exit: 55000,

    avgRatePerParcel: 13.5,

    capex: {
      licenseCustoms: 110000,
      warehouseFitout: 310000,
      ownFleet: 760000, // 8 vans owned
      systems: 90000,
      legal: 65000,
      workingCapital: 220000,
    },

    opexAtScale: {
      warehouseRent: 42000,
      fleetOwnedDep: 18000,
      driversHelpers: 95000,
      fuelMaint: 22000,
      managementLocal: 28000,
      insuranceCompliance: 14000,
      misc: 12000,
    },

    targetCM: 0.32,
    breakEvenMonth: 13,
  },

  KUWAIT: {
    code: 'KW',
    name: 'Kuwait',
    priority: 3,
    entryModel: 'CSP / Joint Venture',
    cities: ['Kuwait City', 'Hawalli', 'Salmiya'],
    timelineMonths: 14,

    volumeY1: [2500, 4000, 6000, 8500, 11000, 14000, 17000, 20000, 23000, 26000, 29000, 32000],
    volumeY2Exit: 60000,

    avgRatePerParcel: 14.8,

    capex: {
      jvSetupLegal: 180000,
      warehouseShare: 250000,
      fleetContribution: 380000,
      systems: 110000,
      workingCapital: 280000,
    },

    opexAtScale: {
      warehouseShare: 38000,
      fleetShare: 45000,
      driversHelpers: 110000,
      fuelMaint: 25000,
      managementLocal: 35000,
      insuranceCompliance: 16000,
      misc: 14000,
    },

    targetCM: 0.26,
    breakEvenMonth: 15,
  },

  OMAN_QATAR: {
    code: 'OM_QA',
    name: 'Oman + Qatar',
    priority: 4,
    entryModel: 'Selective secure corridors + government focus',
    cities: ['Muscat', 'Sohar', 'Doha'],
    timelineMonths: 20,

    volumeY1: [1200, 1800, 2500, 3500, 4500, 5500, 6500, 7500, 8500, 9500, 10500, 12000],
    volumeY2Exit: 28000,

    avgRatePerParcel: 18.5, // higher security premium

    capex: {
      licenses: 140000,
      smallHubFitout: 190000,
      fleet: 285000,
      systems: 70000,
      workingCapital: 160000,
    },

    opexAtScale: {
      hubRent: 28000,
      fleet: 22000,
      driversHelpers: 62000,
      fuelMaint: 14000,
      management: 22000,
      insuranceCompliance: 11000,
      misc: 9000,
    },

    targetCM: 0.35,
    breakEvenMonth: 16,
  },
};

/** Aggregate investment required */
export function totalGCCCapex(markets = Object.keys(GCC_MARKETS)) {
  return markets.reduce((sum, key) => {
    const m = GCC_MARKETS[key];
    const total = Object.values(m.capex).reduce((a, b) => a + b, 0);
    return sum + total;
  }, 0);
}

/** Year-1 revenue projection for a market */
export function year1Revenue(marketKey) {
  const m = GCC_MARKETS[marketKey];
  return m.volumeY1.reduce((sum, v) => sum + v * m.avgRatePerParcel, 0);
}

/** Simple P&L snapshot at Y1 exit run-rate */
export function runRatePL(marketKey) {
  const m = GCC_MARKETS[marketKey];
  const monthlyVolume = m.volumeY1[11];
  const revenue = monthlyVolume * m.avgRatePerParcel;
  const opex = Object.values(m.opexAtScale).reduce((a, b) => a + b, 0);
  const contribution = revenue - opex;
  const cm = contribution / revenue;

  return {
    monthlyVolume,
    revenue,
    opex,
    contribution,
    cm: Math.round(cm * 1000) / 10, // %
    breakEvenMonth: m.breakEvenMonth,
  };
}

/** Full portfolio summary */
export function portfolioSummary() {
  const keys = Object.keys(GCC_MARKETS);
  const totalCapex = totalGCCCapex(keys);
  const y1Revenue = keys.reduce((s, k) => s + year1Revenue(k), 0);
  const pls = keys.map((k) => ({ market: k, ...runRatePL(k) }));

  return {
    totalCapex,
    y1Revenue,
    markets: pls,
    phasedInvestment: {
      phase1_UAE: totalGCCCapex(['UAE']),
      phase2_Bahrain: totalGCCCapex(['BAHRAIN']),
      phase3_Kuwait: totalGCCCapex(['KUWAIT']),
      phase4_OmanQatar: totalGCCCapex(['OMAN_QATAR']),
    },
  };
}

/** Sensitivity: volume ±20% impact on CM */
export function sensitivity(marketKey, volumeFactor = 1.0) {
  const m = GCC_MARKETS[marketKey];
  const baseVol = m.volumeY1[11];
  const vol = Math.round(baseVol * volumeFactor);
  const revenue = vol * m.avgRatePerParcel;
  const opex = Object.values(m.opexAtScale).reduce((a, b) => a + b, 0);
  // assume 40% of opex is variable
  const variableOpex = opex * 0.4 * volumeFactor;
  const fixedOpex = opex * 0.6;
  const totalOpex = fixedOpex + variableOpex;
  const cm = (revenue - totalOpex) / revenue;
  return { volume: vol, revenue, totalOpex, cm: Math.round(cm * 1000) / 10 };
}
