/**
 * Live Metrics Layer
 * Ready for real API integration (replace mock with fetch)
 */

const API_BASE = process.env.REACT_APP_API_BASE || '/api';

/**
 * Simulated live feed (replace with real endpoints)
 * Expected backend endpoints:
 *   GET /api/live/awb          → latest AWB events
 *   GET /api/live/kpis         → real-time KPIs
 *   GET /api/live/stations     → station-level OFD
 *   GET /api/network/status    → hub health
 */

export async function fetchLiveAWB() {
  // TODO: replace with real fetch(`${API_BASE}/live/awb`)
  const samples = [
    { awb: 'AA-7734-KSA', from: 'Riyadh DC', to: 'Jazan', status: 'Out for Delivery', ts: Date.now() },
    { awb: 'AA-8821-KSA', from: 'Jeddah Hub', to: 'Tabuk', status: 'In Transit', ts: Date.now() },
    { awb: 'AA-9012-KSA', from: 'Dammam', to: 'Najran', status: 'Arrived Hub', ts: Date.now() },
    { awb: 'AA-6645-KSA', from: 'Riyadh', to: 'Rafha', status: 'Dispatched', ts: Date.now() },
    { awb: 'AA-3109-KSA', from: 'Madinah', to: 'Hafr Al Batin', status: 'Out for Delivery', ts: Date.now() },
  ];
  return samples[Math.floor(Math.random() * samples.length)];
}

export async function fetchLiveKPIs() {
  // TODO: replace with real fetch(`${API_BASE}/live/kpis`)
  return {
    parcelsToday: 3840 + Math.floor(Math.random() * 220),
    ofdNow: 1120 + Math.floor(Math.random() * 80),
    firstAttemptRate: 98.7 + Math.random() * 0.8,
    activeRiders: 148 + Math.floor(Math.random() * 12),
    openExceptions: Math.floor(Math.random() * 9),
  };
}

export async function fetchStationOFD() {
  // TODO: replace with real fetch(`${API_BASE}/live/stations`)
  return [
    { name: 'Hafr Al Batin', ofd: 1240 + Math.floor(Math.random() * 40) },
    { name: 'Rafha', ofd: 890 + Math.floor(Math.random() * 30) },
    { name: 'Tabuk', ofd: 1120 + Math.floor(Math.random() * 35) },
    { name: 'Sabya / Jazan', ofd: 980 + Math.floor(Math.random() * 25) },
    { name: 'Madinah', ofd: 1450 + Math.floor(Math.random() * 50) },
    { name: 'Mahd Ad Dahab', ofd: 620 + Math.floor(Math.random() * 20) },
    { name: 'Al Henakiyah', ofd: 725 + Math.floor(Math.random() * 22) },
  ];
}

/**
 * Hook-ready polling helper
 */
export function startLivePolling(callback, intervalMs = 8000) {
  const tick = async () => {
    try {
      const [awb, kpis, stations] = await Promise.all([
        fetchLiveAWB(),
        fetchLiveKPIs(),
        fetchStationOFD(),
      ]);
      callback({ awb, kpis, stations, ts: Date.now() });
    } catch (err) {
      console.warn('Live metrics poll failed', err);
    }
  };
  tick();
  const id = setInterval(tick, intervalMs);
  return () => clearInterval(id);
}
