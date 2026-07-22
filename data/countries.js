// ===================================
// سیستم کشورها و استان‌های Orbit
// API: CountryStateCity
// ===================================

const CSC_API_KEY = '442af9002a30c4376b9145a86fb792e480855bb33bb458caeccd59f270c92450';
const CSC_BASE_URL = 'https://api.countrystatecity.in/v1';

/**
 * دریافت لیست کشورها
 */
async function fetchCountries() {
  try {
    console.log('📡 در حال اتصال به API کشورها...');
    
    const response = await fetch(`${CSC_BASE_URL}/countries`, {
      method: 'GET',
      headers: {
        'X-CSCAPI-KEY': CSC_API_KEY
      }
    });

    if (!response.ok) {
      throw new Error(`خطای سرور: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log(`✅ با موفقیت ${data.length} کشور دریافت شد.`);
    
    return data.map(country => ({
      code: country.iso2,
      name: country.name,
      phoneCode: country.phonecode,
      currency: country.currency,
      currencySymbol: country.currency_symbol,
      flag: country.flag,
      timezones: country.timezones || [{ zoneName: 'UTC' }]
    })).sort((a, b) => a.name.localeCompare(b.name));

  } catch (error) {
    console.error('❌ خطا در دریافت کشورها:', error);
    console.warn('⚠️ در حال استفاده از لیست پشتیبان (Fallback)...');
    return getFallbackCountries();
  }
}

/**
 * دریافت لیست استان‌های یک کشور
 */
async function fetchStates(countryCode) {
  if (!countryCode) return [];
  
  try {
    console.log(`📡 در حال دریافت استان‌های کشور: ${countryCode}...`);
    
    const response = await fetch(`${CSC_BASE_URL}/countries/${countryCode}/states`, {
      method: 'GET',
      headers: {
        'X-CSCAPI-KEY': CSC_API_KEY
      }
    });

    if (!response.ok) {
      throw new Error(`خطای سرور: ${response.status}`);
    }

    const data = await response.json();
    console.log(`✅ ${data.length} استان دریافت شد.`);
    
    return data.map(state => ({
      code: state.iso2,
      name: state.name,
      latitude: state.latitude,
      longitude: state.longitude
    })).sort((a, b) => a.name.localeCompare(b.name));

  } catch (error) {
    console.error(`❌ خطا در دریافت استان‌های ${countryCode}:`, error);
    return [];
  }
}

/**
 * دریافت لیست شهرهای یک استان
 */
async function fetchCities(countryCode, stateCode) {
  if (!countryCode || !stateCode) return [];

  try {
    const response = await fetch(`${CSC_BASE_URL}/countries/${countryCode}/states/${stateCode}/cities`, {
      method: 'GET',
      headers: {
        'X-CSCAPI-KEY': CSC_API_KEY
      }
    });

    if (!response.ok) throw new Error(`خطای سرور: ${response.status}`);
    
    const data = await response.json();
    return data.map(city => ({
      name: city.name,
      latitude: city.latitude,
      longitude: city.longitude
    })).sort((a, b) => a.name.localeCompare(b.name));

  } catch (error) {
    console.error(`❌ خطا در دریافت شهرها:`, error);
    return [];
  }
}

/**
 * داده‌های پشتیبان (Fallback) - اگر API به هر دلیلی کار نکرد
 */
function getFallbackCountries() {
  return [
    { code: 'IR', name: 'Iran', phoneCode: '98', currency: 'IRR', currencySymbol: '﷼', flag: '🇮🇷', timezones: [{ zoneName: 'Asia/Tehran' }] },
    { code: 'US', name: 'United States', phoneCode: '1', currency: 'USD', currencySymbol: '$', flag: '🇺🇸', timezones: [{ zoneName: 'America/New_York' }] },
    { code: 'DE', name: 'Germany', phoneCode: '49', currency: 'EUR', currencySymbol: '€', flag: '🇩🇪', timezones: [{ zoneName: 'Europe/Berlin' }] },
    { code: 'GB', name: 'United Kingdom', phoneCode: '44', currency: 'GBP', currencySymbol: '£', flag: '🇬🇧', timezones: [{ zoneName: 'Europe/London' }] },
    { code: 'TR', name: 'Turkey', phoneCode: '90', currency: 'TRY', currencySymbol: '₺', flag: '🇹🇷', timezones: [{ zoneName: 'Europe/Istanbul' }] },
    { code: 'AE', name: 'United Arab Emirates', phoneCode: '971', currency: 'AED', currencySymbol: 'د.إ', flag: '🇦🇪', timezones: [{ zoneName: 'Asia/Dubai' }] }
  ];
}

/**
 * تبدیل نام شهر به مختصات (برای آب‌وهوا) - از Open-Meteo (کاملاً رایگان)
 */
async function geocodeCity(cityName) {
  try {
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=fa`
    );
    if (!response.ok) throw new Error('Geocode failed');
    const data = await response.json();
    if (data.results && data.results.length > 0) {
      return {
        name: data.results[0].name,
        country: data.results[0].country,
        lat: data.results[0].latitude,
        lon: data.results[0].longitude,
        timezone: data.results[0].timezone
      };
    }
    return null;
  } catch (error) {
    console.error('Error geocoding:', error);
    return null;
  }
}

/**
 * تشخیص موقعیت GPS
 */
function detectUserLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('مرورگر شما از GPS پشتیبانی نمی‌کند'));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => resolve({ lat: position.coords.latitude, lon: position.coords.longitude }),
      (error) => reject(error),
      { enableHighAccuracy: true, timeout: 5000 }
    );
  });
}

/**
 * دریافت ساعت در یک منطقه زمانی
 */
function getTimeInTimezone(timezone) {
  try {
    return new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
    }).format(new Date());
  } catch (e) {
    return '--:--:--';
  }
}

/**
 * دریافت تاریخ در یک منطقه زمانی
 */
function getDateInTimezone(timezone, lang = 'fa') {
  try {
    return new Date().toLocaleDateString(lang === 'fa' ? 'fa-IR' : lang, {
      timeZone: timezone, weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
  } catch (e) {
    return '';
  }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { fetchCountries, fetchStates, fetchCities, getFallbackCountries, geocodeCity, detectUserLocation, getTimeInTimezone, getDateInTimezone };
}