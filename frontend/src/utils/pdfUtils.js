import jsPDF from 'jspdf';

const hex = { ink: [5,8,16], amber: [245,184,64], green: [22,163,74], cream: [245,239,225], muted: [125,131,145] };

export function generateQuotePDF(data) {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });
  const w = doc.internal.pageSize.getWidth();
  const h = doc.internal.pageSize.getHeight();

  // Background
  doc.setFillColor(...hex.ink); doc.rect(0, 0, w, h, 'F');
  // Top accent bar
  doc.setFillColor(...hex.amber); doc.rect(0, 0, w, 4, 'F');

  // Header
  doc.setTextColor(...hex.cream);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.text('ABR AL AWTAN', 40, 60);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...hex.muted);
  doc.text('LOGISTICS INFRASTRUCTURE  •  RIYADH, KSA', 40, 76);

  doc.setTextColor(...hex.amber);
  doc.setFontSize(9);
  doc.text(`QUOTE  •  #${data.id}`, w - 40, 60, { align: 'right' });
  doc.setTextColor(...hex.cream);
  doc.setFontSize(9);
  doc.text(new Date().toLocaleString(), w - 40, 76, { align: 'right' });

  // Divider
  doc.setDrawColor(...hex.amber); doc.setLineWidth(0.3);
  doc.line(40, 96, w - 40, 96);

  // Client block
  doc.setTextColor(...hex.amber);
  doc.setFontSize(9);
  doc.text('PREPARED FOR', 40, 128);
  doc.setTextColor(...hex.cream);
  doc.setFontSize(16);
  doc.setFont('helvetica','bold');
  doc.text(data.company || 'Corporate Client', 40, 148);
  doc.setFont('helvetica','normal');
  doc.setFontSize(10);
  doc.setTextColor(...hex.muted);
  doc.text(`${data.contact || ''}  •  ${data.email || ''}  •  ${data.phone || ''}`, 40, 166);

  // Services
  doc.setTextColor(...hex.amber); doc.setFontSize(9);
  doc.text('REQUESTED SERVICES', 40, 208);
  doc.setDrawColor(50,55,65); doc.line(40, 216, w - 40, 216);

  let y = 238;
  (data.services || []).forEach((s, i) => {
    doc.setTextColor(...hex.cream); doc.setFontSize(11); doc.setFont('helvetica','bold');
    doc.text(`0${i+1}   ${s}`, 40, y);
    y += 20;
  });

  y = Math.max(y, 320);

  // Scope
  doc.setTextColor(...hex.amber); doc.setFontSize(9); doc.setFont('helvetica','bold');
  doc.text('SCOPE & OPERATIONAL DETAILS', 40, y);
  doc.setDrawColor(50,55,65); doc.line(40, y+8, w-40, y+8);
  y += 30;
  doc.setTextColor(...hex.cream); doc.setFont('helvetica','normal'); doc.setFontSize(10);
  const scopeLines = doc.splitTextToSize(
    `Regions: ${data.regions || 'Kingdom-wide'}\nMonthly Volume: ${data.volume || 'TBD'}\nTimeline: ${data.timeline || 'ASAP'}\nAdditional: ${data.notes || 'N/A'}`,
    w - 80
  );
  doc.text(scopeLines, 40, y);
  y += scopeLines.length * 14 + 20;

  // Pricing summary box
  doc.setFillColor(15,21,36); doc.rect(40, y, w - 80, 90, 'F');
  doc.setDrawColor(...hex.amber); doc.setLineWidth(0.4); doc.rect(40, y, w - 80, 90, 'S');
  doc.setTextColor(...hex.amber); doc.setFontSize(9); doc.setFont('helvetica','bold');
  doc.text('COMMERCIAL PROPOSAL', 55, y + 22);
  doc.setTextColor(...hex.cream); doc.setFontSize(11); doc.setFont('helvetica','normal');
  const commercial = 'A detailed commercial proposal will be delivered within 24 hours by our operations directors. This document confirms your request has been logged with the Command Center.';
  const cLines = doc.splitTextToSize(commercial, w - 110);
  doc.text(cLines, 55, y + 42);

  // Footer
  doc.setDrawColor(...hex.amber); doc.setLineWidth(0.3);
  doc.line(40, h - 60, w - 40, h - 60);
  doc.setTextColor(...hex.muted); doc.setFontSize(9);
  doc.text('info@abr-alawtan.com   •   +966 555 324 149   •   www.abrAlawtan.com', w/2, h - 42, { align: 'center' });
  doc.setFontSize(8);
  doc.text('This document is confidential and intended solely for the addressee.', w/2, h - 28, { align: 'center' });

  doc.save(`AbrAlAwtan-Quote-${data.id}.pdf`);
}

export function generateCompanyProfilePDF() {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });
  const w = doc.internal.pageSize.getWidth();
  const h = doc.internal.pageSize.getHeight();
  doc.setFillColor(...hex.ink); doc.rect(0,0,w,h,'F');
  doc.setFillColor(...hex.amber); doc.rect(0, 0, w, 6, 'F');

  doc.setTextColor(...hex.cream); doc.setFont('helvetica','bold'); doc.setFontSize(36);
  doc.text('ABR AL AWTAN', 40, 120);
  doc.setFontSize(12); doc.setFont('helvetica','normal'); doc.setTextColor(...hex.amber);
  doc.text('LOGISTICS INFRASTRUCTURE   •   KINGDOM OF SAUDI ARABIA', 40, 140);

  doc.setTextColor(...hex.cream); doc.setFontSize(14); doc.setFont('helvetica','bold');
  doc.text('The Physical Backbone of Enterprise Logistics.', 40, 200);
  doc.setFont('helvetica','normal'); doc.setFontSize(11); doc.setTextColor(220,214,196);
  const intro = doc.splitTextToSize('From custom clearance to linehaul, warehousing, fulfillment and last-mile — we own the assets, employ the people, and operate the entire chain. Trusted by Aramex, iMile, Aymakan, Zajil and enterprise leaders across the Kingdom.', w - 80);
  doc.text(intro, 40, 224);

  const services = ['Custom Clearance & FASAH','Linehaul & Trucking','E-commerce Fulfillment','Last-Mile B2C','B2B Distribution','Express Parcels','Warehousing & Storage','Manpower & Staffing','Fleet Rental'];
  doc.setTextColor(...hex.amber); doc.setFontSize(10); doc.setFont('helvetica','bold');
  doc.text('CORE SERVICES', 40, 320);
  doc.setDrawColor(50,55,65); doc.line(40, 328, w-40, 328);
  doc.setTextColor(...hex.cream); doc.setFont('helvetica','normal'); doc.setFontSize(11);
  services.forEach((s, i) => { doc.text(`0${i+1}    ${s}`, 40, 356 + i*22); });

  // Stats
  doc.setTextColor(...hex.amber); doc.setFontSize(10); doc.setFont('helvetica','bold');
  doc.text('NETWORK AT A GLANCE', 340, 320);
  doc.setDrawColor(50,55,65); doc.line(340, 328, w-40, 328);
  const stats = [['6M+','Orders / year'],['500+','Direct employees'],['150+','Owned vehicles'],['25+','Cities covered'],['9','Warehouses'],['ISO 9001','Certified']];
  stats.forEach((s, i) => {
    doc.setTextColor(...hex.amber); doc.setFontSize(20); doc.setFont('helvetica','bold');
    doc.text(s[0], 340, 360 + i*32);
    doc.setTextColor(...hex.cream); doc.setFontSize(10); doc.setFont('helvetica','normal');
    doc.text(s[1], 410, 360 + i*32);
  });

  doc.setDrawColor(...hex.amber); doc.line(40, h - 60, w - 40, h - 60);
  doc.setTextColor(...hex.muted); doc.setFontSize(9);
  doc.text('info@abr-alawtan.com   •   +966 555 324 149   •   Riyadh, Kingdom of Saudi Arabia', w/2, h - 42, { align: 'center' });
  doc.save('AbrAlAwtan-Company-Profile.pdf');
}

export function newQuoteId() {
  return 'AAW-' + Date.now().toString().slice(-8);
}

