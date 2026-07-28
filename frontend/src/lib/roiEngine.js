/**
 * Abr Al Awtan ROI Engine
 * Realistic multi-factor model for In-House vs Outsourced last-mile
 */

export function calculateROI(monthlyVolume) {
  // ── Base Assumptions (KSA market rates 2025-26) ────────────────
  const AVG_PARCEL_WEIGHT_KG = 2.4;
  const DAYS_PER_MONTH = 26; // operating days

  // CapEx components (one-time)
  const VAN_COST = 95000;           // average 2-ton van
  const WAREHOUSE_FITOUT_PER_SQM = 280;
  const WMS_SETUP = 180000;
  const CCTV_SECURITY = 95000;
  const LICENSING_LEGAL = 120000;

  // OpEx per month components
  const DRIVER_SALARY = 4200;       // + benefits
  const HELPER_SALARY = 2800;
  const VAN_FUEL_MAINT = 1850;
  const WAREHOUSE_RENT_PER_SQM = 45;
  const INSURANCE_PER_VAN = 620;
  const COD_HANDLING_COST = 1.8;    // per parcel
  const FAILED_DELIVERY_COST = 4.2; // per failed attempt

  // Productivity assumptions
  const PARCELS_PER_VAN_PER_DAY = 48;
  const FIRST_ATTEMPT_SUCCESS = 0.91; // industry average in-house
  const ABR_FIRST_ATTEMPT = 0.99;

  // ── Derived ───────────────────────────────────────────────────
  const dailyVolume = monthlyVolume / DAYS_PER_MONTH;
  const vansNeeded = Math.ceil(dailyVolume / PARCELS_PER_VAN_PER_DAY);
  const driversNeeded = vansNeeded;
  const helpersNeeded = Math.ceil(vansNeeded * 0.6);
  const warehouseSqm = Math.ceil(monthlyVolume * 0.018); // rough storage need

  // CapEx total
  const capex = {
    fleet: vansNeeded * VAN_COST,
    warehouse: warehouseSqm * WAREHOUSE_FITOUT_PER_SQM,
    systems: WMS_SETUP + CCTV_SECURITY,
    legal: LICENSING_LEGAL,
  };
  const totalCapex = Object.values(capex).reduce((a, b) => a + b, 0);

  // Monthly OpEx
  const opex = {
    drivers: driversNeeded * DRIVER_SALARY,
    helpers: helpersNeeded * HELPER_SALARY,
    fleet: vansNeeded * (VAN_FUEL_MAINT + INSURANCE_PER_VAN),
    warehouse: warehouseSqm * WAREHOUSE_RENT_PER_SQM,
    codHandling: monthlyVolume * COD_HANDLING_COST,
    failedDeliveries: monthlyVolume * (1 - FIRST_ATTEMPT_SUCCESS) * FAILED_DELIVERY_COST,
  };
  const totalMonthlyOpex = Object.values(opex).reduce((a, b) => a + b, 0);

  // Abr Al Awtan effective cost (simplified commercial model)
  // Blended rate drops with volume
  let abrRatePerParcel;
  if (monthlyVolume < 10000) abrRatePerParcel = 14.5;
  else if (monthlyVolume < 30000) abrRatePerParcel = 11.8;
  else if (monthlyVolume < 60000) abrRatePerParcel = 9.4;
  else abrRatePerParcel = 7.9;

  const abrMonthlyCost = monthlyVolume * abrRatePerParcel;

  // Savings
  const monthlySavings = totalMonthlyOpex - abrMonthlyCost;
  const annualSavings = monthlySavings * 12;
  const paybackMonths = totalCapex / Math.max(monthlySavings, 1);

  // Time advantage
  const timeToLaunchInHouse = 14; // months average
  const timeToLaunchAbr = 0.2;    // ~6 days

  return {
    volume: monthlyVolume,
    vansNeeded,
    driversNeeded,
    helpersNeeded,
    warehouseSqm,
    totalCapex,
    capexBreakdown: capex,
    totalMonthlyOpex,
    opexBreakdown: opex,
    abrRatePerParcel,
    abrMonthlyCost,
    monthlySavings,
    annualSavings,
    paybackMonths: Math.round(paybackMonths * 10) / 10,
    timeToLaunchInHouse,
    timeToLaunchAbr,
    firstAttemptDelta: ((ABR_FIRST_ATTEMPT - FIRST_ATTEMPT_SUCCESS) * 100).toFixed(1),
  };
}
