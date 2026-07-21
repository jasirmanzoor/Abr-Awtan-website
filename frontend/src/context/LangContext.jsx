import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

const LangContext = createContext({ lang: 'en', t: (k) => k, toggle: () => {} });

// Translation dictionary — expand as needed
const DICT = {
  // Top bar
  'topbar.command': { en: 'COMMAND CENTER · LIVE', ar: 'مركز القيادة · مباشر' },
  'topbar.location': { en: 'RIYADH · KSA', ar: 'الرياض · المملكة العربية السعودية' },

  // Nav
  'nav.services': { en: 'Services', ar: 'الخدمات' },
  'nav.fleet': { en: 'Fleet', ar: 'الأسطول' },
  'nav.about': { en: 'About', ar: 'من نحن' },
  'nav.careers': { en: 'Careers', ar: 'الوظائف' },
  'nav.blog': { en: 'Blog', ar: 'المدونة' },
  'nav.contact': { en: 'Contact', ar: 'تواصل' },
  'nav.shipTrack': { en: 'Ship & Track', ar: 'شحن وتتبع' },
  'nav.shipNow': { en: 'Ship Now', ar: 'اشحن الآن' },
  'nav.track': { en: 'Track', ar: 'تتبع' },
  'nav.trackShipment': { en: 'Track Shipment', ar: 'تتبع الشحنة' },
  'nav.rateCalc': { en: 'Rate Calculator', ar: 'حاسبة الأسعار' },

  // Hero
  'hero.badge': { en: "The Kingdom's Own Operator", ar: 'مشغّل المملكة الخاص' },
  'hero.title1': { en: 'Ship anywhere', ar: 'اشحن أينما' },
  'hero.title2': { en: 'in Saudi.', ar: 'في السعودية.' },
  'hero.title3': { en: 'Effortlessly.', ar: 'بسهولة.' },
  'hero.sub': { en: 'End-to-end logistics on infrastructure we own and operate — clearance, linehaul, warehousing, fulfillment and last-mile. One partner. Zero brokerage. Full-Kingdom coverage.', ar: 'خدمات لوجستية متكاملة على بنية تحتية نملكها ونشغّلها — تخليص، نقل، تخزين، تجهيز، وميل أخير. شريك واحد. صفر وساطة. تغطية كاملة للمملكة.' },
  'hero.ctaShip': { en: 'Ship a Parcel Now', ar: 'اشحن طرداً الآن' },
  'hero.ctaRate': { en: 'Get Instant Rate', ar: 'احصل على السعر فوراً' },
  'hero.ctaProfile': { en: 'Company Profile', ar: 'الملف التعريفي' },
  'hero.scroll': { en: 'Scroll to Explore', ar: 'مرّر للاستكشاف' },

  // Sections
  'sec.leadership': { en: 'Leadership', ar: 'القيادة' },
  'sec.leadership.title': { en: 'The minds behind the mission.', ar: 'العقول التي تقود المهمة.' },
  'sec.enterprise': { en: 'The Enterprise', ar: 'المؤسسة' },
  'sec.trusted': { en: 'Trusted by industry leaders', ar: 'شركاء الثقة في القطاع' },
  'sec.coverage': { en: 'Kingdom Coverage', ar: 'تغطية المملكة' },
  'sec.cases': { en: 'Case Studies', ar: 'قصص النجاح' },
  'sec.testimonials': { en: 'Testimonials', ar: 'شهادات العملاء' },
  'sec.advantage': { en: 'The Advantage', ar: 'ميزتنا' },
  'sec.getQuote': { en: 'Get an Instant Quote', ar: 'احصل على عرض فوري' },

  // Common
  'lang.toggle': { en: 'AR', ar: 'EN' }
};

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => (typeof window !== 'undefined' && localStorage.getItem('aaw_lang')) || 'en');

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('lang', lang);
      document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    }
    if (typeof window !== 'undefined') localStorage.setItem('aaw_lang', lang);
  }, [lang]);

  const t = useCallback((key) => {
    const entry = DICT[key];
    if (!entry) return key;
    return entry[lang] || entry.en || key;
  }, [lang]);

  const toggle = useCallback(() => setLang((l) => (l === 'en' ? 'ar' : 'en')), []);

  return <LangContext.Provider value={{ lang, t, toggle }}>{children}</LangContext.Provider>;
}

export function useLang() { return useContext(LangContext); }
