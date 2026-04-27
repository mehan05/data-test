export interface VisitorData {
  // Automatic Detection
  browser: string;
  os: string;
  deviceType: 'mobile' | 'tablet' | 'desktop';
  screenResolution: string;
  location: {
    country: string;
    city: string;
    timezone: string;
  };
  language: string;
  referrer: string;
  utm: {
    source: string | null;
    medium: string | null;
    campaign: string | null;
    keyword: string | null;
  };
  trafficType: 'Paid' | 'Organic';
  timeSpent: number; // in seconds
  scrollDepth: number; // percentage
  isReturning: boolean;
}
