import { useState, useEffect } from 'react';
import axios from 'axios';
import type { VisitorData } from './types';

export const useAnalytics = () => {
  const [data, setData] = useState<VisitorData>({
    browser: 'Loading...',
    os: 'Loading...',
    deviceType: 'desktop',
    screenResolution: `${window.screen.width}x${window.screen.height}`,
    location: {
      country: 'Loading...',
      city: 'Loading...',
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
    language: navigator.language,
    referrer: document.referrer || 'Direct',
    utm: {
      source: null,
      medium: null,
      campaign: null,
      keyword: null,
    },
    trafficType: 'Organic',
    timeSpent: 0,
    scrollDepth: 0,
    isReturning: false,
  });

  useEffect(() => {
    // 1. Browser & OS Detection
    const ua = navigator.userAgent;
    let browser = 'Unknown';
    if (ua.indexOf('Firefox') > -1) browser = 'Firefox';
    else if (ua.indexOf('SamsungBrowser') > -1) browser = 'Samsung Browser';
    else if (ua.indexOf('Opera') > -1 || ua.indexOf('OPR') > -1) browser = 'Opera';
    else if (ua.indexOf('Trident') > -1) browser = 'Internet Explorer';
    else if (ua.indexOf('Edge') > -1 || ua.indexOf('Edg') > -1) browser = 'Edge';
    else if (ua.indexOf('Chrome') > -1) browser = 'Chrome';
    else if (ua.indexOf('Safari') > -1) browser = 'Safari';

    let os = 'Unknown';
    if (ua.indexOf('Win') > -1) os = 'Windows';
    else if (ua.indexOf('Mac') > -1) os = 'MacOS';
    else if (ua.indexOf('Linux') > -1) os = 'Linux';
    else if (ua.indexOf('Android') > -1) os = 'Android';
    else if (ua.indexOf('like Mac') > -1) os = 'iOS';

    // 2. Device Type
    const deviceType = /Mobile|Android|iPhone/i.test(ua) ? 'mobile' : /Tablet|iPad/i.test(ua) ? 'tablet' : 'desktop';

    // 3. UTM Parameters
    const params = new URLSearchParams(window.location.search);
    const utm = {
      source: params.get('utm_source'),
      medium: params.get('utm_medium'),
      campaign: params.get('utm_campaign'),
      keyword: params.get('utm_keyword'),
    };
    const trafficType = utm.medium === 'cpc' || utm.medium === 'ppc' || utm.medium === 'paid' ? 'Paid' : 'Organic';

    // 4. Returning Visitor
    const hasVisited = localStorage.getItem('hasVisited');
    const isReturning = !!hasVisited;
    if (!hasVisited) {
      localStorage.setItem('hasVisited', 'true');
    }

    setData(prev => ({
      ...prev,
      browser,
      os,
      deviceType,
      utm,
      trafficType,
      isReturning,
    }));

    // 5. Geolocation using Axios
    axios.get('https://freeipapi.com/api/json')
      .then(response => {
        const geo = response.data;
        setData(prev => ({
          ...prev,
          location: {
            country: geo.country || 'Unknown',
            city: geo.city || 'Unknown',
            timezone: geo.timezone || prev.location.timezone,
          },
        }));
      })
      .catch(() => {
        setData(prev => ({
          ...prev,
          location: { ...prev.location, country: 'API Error', city: 'API Error' }
        }));
      });

    // 6. Scroll Depth
    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? Math.round((winScroll / height) * 100) : 100;
      
      setData(prev => ({
        ...prev,
        scrollDepth: Math.max(prev.scrollDepth, isNaN(scrolled) ? 0 : scrolled),
      }));
    };
    window.addEventListener('scroll', handleScroll);

    // 7. Time Spent
    const timer = setInterval(() => {
      setData(prev => ({ ...prev, timeSpent: prev.timeSpent + 1 }));
    }, 1000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(timer);
    };
  }, []);

  return { data };
};
