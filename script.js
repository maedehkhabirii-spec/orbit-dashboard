// ===================================
// Orbit Dashboard - Main Script
// داشبورد شخصی هوشمند Orbit
// نسخه: 2.0 - Global Edition
// ===================================

'use strict';

// ===================================
// ۱. متغیرهای سراسری (Global Variables)
// ===================================
let currentFilter = 'all';
let currentCategory = 'all';
let pomodoroInterval = null;
let isPomodoroRunning = false;
let pomodoroSessions = 0;
let focusMinutes = 0;
let selectedCommandIndex = 0;
let deferredPrompt = null;
let allCountries = [];
let worldClockIntervals = [];
let draggedItem = null;
let currentThemeMode = 'dark';
let breathingInterval = null;
let ambientAudio = null;

// ===================================
// ۲. Loading Screen
// ===================================
window.addEventListener('load', async () => {
  try {
    console.log('🪐 Orbit Dashboard Loading...');
    
    // بارگذاری تنظیمات ذخیره شده
    const settings = JSON.parse(localStorage.getItem('orbit-settings') || '{}');
    
    // اعمال زبان
    if (settings.language) {
      applyLanguage(settings.language);
    } else {
      // تشخیص خودکار زبان مرورگر
      const detectedLang = detectBrowserLanguage();
      applyLanguage(detectedLang);
    }
    
    // اعمال تم
    if (typeof loadSavedTheme === 'function') {
      loadSavedTheme();
    }
    
    // بارگذاری کشورها از API
    await loadCountries();
    
    // مخفی کردن Loading Screen
    setTimeout(() => {
      const loadingScreen = document.getElementById('loading-screen');
      if (loadingScreen) {
        loadingScreen.classList.add('hidden');
      }
    }, 1000);
    
    console.log('✅ Orbit Dashboard Loaded Successfully!');
    
  } catch (error) {
    console.error('❌ Error during initialization:', error);
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
      loadingScreen.classList.add('hidden');
    }
  }
});

// ===================================
// ۳. Welcome Modal (خوش‌آمدگویی)
// ===================================
function checkFirstVisit() {
  if (!localStorage.getItem('orbit-visited')) {
    const welcomeModal = document.getElementById('welcome-modal');
    if (welcomeModal) {
      welcomeModal.classList.remove('hidden');
      loadCountriesInWelcomeModal();
      
      // تشخیص خودکار زبان برای انتخاب پیش‌فرض
      const detectedLang = detectBrowserLanguage();
      const langSelect = document.getElementById('user-language');
      if (langSelect) {
        langSelect.value = detectedLang;
      }
    }
  }
}

async function loadCountriesInWelcomeModal() {
  const select = document.getElementById('user-country');
  if (!select) return;
  
  try {
    const countries = await fetchCountries();
    
    select.innerHTML = `<option value="">${t('welcome.selectCountry')}</option>`;
    
    countries.forEach(country => {
      const option = document.createElement('option');
      option.value = country.code;
      option.textContent = `${country.flag} ${country.name}`;
      select.appendChild(option);
    });
  } catch (error) {
    console.error('Error loading countries in welcome modal:', error);
  }
}

const welcomeSaveBtn = document.getElementById('welcome-save');
if (welcomeSaveBtn) {
  welcomeSaveBtn.addEventListener('click', async () => {
    const nameInput = document.getElementById('user-name');
    const countrySelect = document.getElementById('user-country');
    const languageSelect = document.getElementById('user-language');
    
    const name = nameInput?.value.trim() || t('greeting.default');
    const countryCode = countrySelect?.value;
    const language = languageSelect?.value || 'en';
    
    localStorage.setItem('orbit-visited', 'true');
    localStorage.setItem('orbit-user-name', name);
    
    // ذخیره کشور
    if (countryCode) {
      const country = allCountries.find(c => c.code === countryCode);
      if (country) {
        const location = {
          country: country.code,
          countryName: country.name,
          timezone: country.timezones?.[0]?.zoneName || 'UTC'
        };
        localStorage.setItem('orbit-location', JSON.stringify(location));
      }
    }
    
    // ذخیره زبان
    const settings = JSON.parse(localStorage.getItem('orbit-settings') || '{}');
    settings.language = language;
    localStorage.setItem('orbit-settings', JSON.stringify(settings));
    
    applyLanguage(language);
    
    const welcomeModal = document.getElementById('welcome-modal');
    if (welcomeModal) {
      welcomeModal.classList.add('hidden');
    }
    
    updateGreeting();
    getWeather();
    
    addNotification(t('notifications.welcomeComplete'), 'success');
  });
}

// ===================================
// ۴. ساعت و تاریخ زنده (Live Clock)
// ===================================
function updateClock() {
  const now = new Date();
  const settings = JSON.parse(localStorage.getItem('orbit-settings') || '{}');
  const location = JSON.parse(localStorage.getItem('orbit-location') || '{}');
  
  // ساعت بر اساس timezone
  const timezone = location.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone;
  
  try {
    const timeOptions = {
      timeZone: timezone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: settings.timeFormat === '12'
    };
    
    const clock = new Intl.DateTimeFormat('en-US', timeOptions).format(now);
    const clockElement = document.getElementById('clock');
    if (clockElement) {
      clockElement.textContent = formatTime(now);
    }
    
    // تاریخ
    const dateElement = document.getElementById('date');
    if (dateElement) {
      dateElement.textContent = formatDate(now);
    }
    
    // به‌روزرسانی Day Progress
    updateDayProgress(now, timezone);
    
    // به‌روزرسانی World Clock
    updateWorldClock();
    
  } catch (error) {
    console.error('Error updating clock:', error);
  }
}

function updateDayProgress(now, timezone) {
  try {
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const totalMinutes = hours * 60 + minutes;
    const percentage = Math.round((totalMinutes / 1440) * 100);
    
    const progressBar = document.getElementById('day-progress-bar');
    const progressText = document.getElementById('day-progress-text');
    
    if (progressBar) {
      progressBar.style.width = `${percentage}%`;
    }
    if (progressText) {
      progressText.textContent = `${formatNumber(percentage)}%`;
    }
  } catch (error) {
    console.error('Error updating day progress:', error);
  }
}

function updateGreeting() {
  try {
    const hour = new Date().getHours();
    const name = localStorage.getItem('orbit-user-name') || '';
    let greetingKey = 'greeting.default';
    
    if (hour < 12) greetingKey = 'greeting.morning';
    else if (hour < 17) greetingKey = 'greeting.afternoon';
    else if (hour < 21) greetingKey = 'greeting.evening';
    else greetingKey = 'greeting.night';
    
    const greeting = name ? `${t(greetingKey)} ${name}!` : t(greetingKey);
    const greetingElement = document.getElementById('greeting');
    if (greetingElement) {
      greetingElement.textContent = greeting;
    }
  } catch (error) {
    console.error('Error updating greeting:', error);
  }
}

// به‌روزرسانی هر ثانیه
setInterval(updateClock, 1000);
updateClock();
updateGreeting();

// بررسی اولین بازدید
setTimeout(checkFirstVisit, 1500);

// ===================================
// ۵. بارگذاری کشورها (Load Countries)
// ===================================
async function loadCountries() {
  try {
    console.log('📍 Loading countries...');
    allCountries = await fetchCountries();
    console.log(`✅ Loaded ${allCountries.length} countries`);
  } catch (error) {
    console.error('❌ Error loading countries:', error);
    allCountries = getFallbackCountries();
  }
}

// ===================================
// ۶. آب و هوا (Weather)
// ===================================
// ===================================
// ۶. آب و هوا (نسخه ضدگلوله و بدون خطا)
// ===================================
async function getWeather() {
  const location = JSON.parse(localStorage.getItem('orbit-location') || '{}');
  const settings = JSON.parse(localStorage.getItem('orbit-settings') || '{}');
  
  let lat, lon, cityName;
  
  if (location.lat && location.lon) {
    lat = location.lat;
    lon = location.lon;
    cityName = location.city || location.state || location.countryName || '';
  } else {
    // پیش‌فرض: تهران
    lat = 35.6892;
    lon = 51.3890;
    cityName = 'Tehran';
  }
  
  const weatherInfo = document.getElementById('weather-info');
  if (!weatherInfo) return;
  
  try {
    const tempUnit = settings.tempUnit || 'celsius';
    const temperatureUnit = tempUnit === 'celsius' ? 'celsius' : 'fahrenheit';
    const windSpeedUnit = tempUnit === 'celsius' ? 'kmh' : 'mph';
    
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,surface_pressure&daily=temperature_2m_max,temperature_2m_min,weather_code,sunrise,sunset&temperature_unit=${temperatureUnit}&wind_speed_unit=${windSpeedUnit}&timezone=auto&forecast_days=7`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // ✅ بررسی ایمنی: اگر داده‌ای وجود نداشت، خطا نده
    if (!data || !data.current) {
      throw new Error('Invalid weather data received');
    }
    
    const temp = Math.round(data.current.temperature_2m);
    const weatherCode = data.current.weather_code;
    const humidity = data.current.relative_humidity_2m;
    const windSpeed = Math.round(data.current.wind_speed_10m);
    const pressure = Math.round(data.current.surface_pressure);
    
    const weatherDescriptions = {
      0: { emoji: '☀️', text: { fa: 'آفتابی', en: 'Clear sky' } },
      1: { emoji: '🌤️', text: { fa: 'عمدتاً آفتابی', en: 'Mainly clear' } },
      2: { emoji: '⛅', text: { fa: 'نیمه ابری', en: 'Partly cloudy' } },
      3: { emoji: '☁️', text: { fa: 'ابری', en: 'Overcast' } },
      45: { emoji: '🌫️', text: { fa: 'مه‌آلود', en: 'Fog' } },
      51: { emoji: '🌦️', text: { fa: 'نم‌نم باران', en: 'Light drizzle' } },
      61: { emoji: '🌧️', text: { fa: 'باران کم', en: 'Slight rain' } },
      63: { emoji: '🌧️', text: { fa: 'باران متوسط', en: 'Moderate rain' } },
      65: { emoji: '🌧️', text: { fa: 'باران شدید', en: 'Heavy rain' } },
      71: { emoji: '🌨️', text: { fa: 'برف کم', en: 'Slight snow' } },
      75: { emoji: '❄️', text: { fa: 'برف شدید', en: 'Heavy snow' } },
      95: { emoji: '⛈️', text: { fa: 'رعد و برق', en: 'Thunderstorm' } }
    };
    
    const weather = weatherDescriptions[weatherCode] || { emoji: '🌡️', text: { fa: 'نامشخص', en: 'Unknown' } };
    const lang = getCurrentLanguage();
    const weatherText = weather.text[lang] || weather.text.en;
    const tempSymbol = tempUnit === 'celsius' ? '°C' : '°F';
    
    let weatherHTML = `
      <div style="font-size: 3rem; margin-bottom: 10px;">${weather.emoji}</div>
      <div style="font-size: 2.5rem; font-weight: 300; margin-bottom: 5px;">${formatNumber(temp)}${tempSymbol}</div>
      <div style="color: var(--text-secondary); margin-bottom: 15px;">${cityName} - ${weatherText}</div>
    `;
    
    if (settings.showHumidity !== false) {
      weatherHTML += `<div style="margin: 5px 0;">💧 ${t('settings.weather.humidity')}: ${formatNumber(humidity)}%</div>`;
    }
    if (settings.showWind !== false) {
      weatherHTML += `<div style="margin: 5px 0;">💨 ${t('settings.weather.wind')}: ${formatNumber(windSpeed)} ${windSpeedUnit}</div>`;
    }
    if (settings.showPressure !== false) {
      weatherHTML += `<div style="margin: 5px 0;">🌬️ ${t('settings.weather.pressure')}: ${formatNumber(pressure)} hPa</div>`;
    }
    
    weatherInfo.innerHTML = weatherHTML;
    
    // ✅ فراخوانی ایمن پیش‌بینی
    if (data.daily) {
      displayWeatherForecast(data.daily, tempUnit);
    }
    
  } catch (error) {
    console.error('Weather error:', error);
    if (weatherInfo) {
      weatherInfo.innerHTML = `
        <p style="color: var(--danger);">❌ ${t('weather.loading') || 'خطا در دریافت آب‌وهوا'}</p>
        <p style="font-size: 0.9rem; color: var(--text-secondary);">${error.message}</p>
      `;
    }
  }
}

function displayWeatherForecast(daily, tempUnit) {
  const forecastContainer = document.getElementById('weather-forecast');
  if (!forecastContainer || !daily) return;
  
  forecastContainer.innerHTML = '';
  
  const settings = JSON.parse(localStorage.getItem('orbit-settings') || '{}');
  const forecastDays = settings.forecastDays || 5;
  const lang = getCurrentLanguage();
  
  const days = {
    fa: ['یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه', 'شنبه'],
    en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  };
  
  const weatherEmojis = {
    0: '☀️', 1: '🌤️', 2: '⛅', 3: '☁️',
    45: '🌫️', 51: '🌦️', 61: '🌧️', 63: '🌧️', 65: '🌧️',
    71: '🌨️', 75: '❄️', 95: '⛈️'
  };
  
  const tempSymbol = tempUnit === 'celsius' ? '°C' : '°F';
  
  // ✅ استخراج ایمن آرایه‌ها (اگر وجود نداشتند، آرایه خالی برمی‌گرداند)
  const times = daily.time || [];
  const maxTemps = daily.temperature_2m_max || [];
  const minTemps = daily.temperature_2m_min || [];
  const weatherCodes = daily.weathercode || [];
  
  for (let i = 1; i <= forecastDays && i < times.length; i++) {
    const date = new Date(times[i]);
    
    // ✅ استفاده از fallback ایمن برای نام روز
    const dayName = (days[lang] && days[lang][date.getDay()]) || days.en[date.getDay()];
    
    // ✅ استفاده از fallback ایمن برای دما و کد آب‌وهوا (جلوگیری از خطای reading '1')
    const maxTemp = Math.round(maxTemps[i] || 0);
    const minTemp = Math.round(minTemps[i] || 0);
    const weatherCode = weatherCodes[i] || 0;
    const emoji = weatherEmojis[weatherCode] || '🌡️';
    
    forecastContainer.innerHTML += `
      <div class="forecast-day">
        <div class="day-name">${dayName}</div>
        <div class="day-icon">${emoji}</div>
        <div class="day-temp">${formatNumber(maxTemp)}° / ${formatNumber(minTemp)}°</div>
      </div>
    `;
  }
}

// بارگذاری اولیه آب‌وهوا
getWeather();

// ===================================
// ۷. نقل‌قول روزانه (Daily Quote)
// ===================================
const quotes = {
  motivation: [
    { text: 'موفقیت مجموعه‌ای از تلاش‌های کوچک روزانه است.', author: 'ناشناس' },
    { text: 'آینده به کسانی تعلق دارد که به زیبایی رویاهایشان ایمان دارند.', author: 'النور روزولت' },
    { text: 'هر لحظه شروع تازه‌ای است.', author: 'تی.اس. الیوت' },
    { text: 'Success is the sum of small efforts repeated day in and day out.', author: 'Robert Collier' },
    { text: 'The future belongs to those who believe in the beauty of their dreams.', author: 'Eleanor Roosevelt' }
  ],
  success: [
    { text: 'تنها راه انجام کار بزرگ، عشق به کاری است که انجام می‌دهید.', author: 'استیو جابز' },
    { text: 'اگر می‌توانی رویا ببینی، می‌توانی انجامش بدهی.', author: 'والت دیزنی' },
    { text: 'سخت‌ترین قدم، همان قدم اول است.', author: 'ناشناس' },
    { text: 'The only way to do great work is to love what you do.', author: 'Steve Jobs' },
    { text: 'If you can dream it, you can do it.', author: 'Walt Disney' }
  ],
  life: [
    { text: 'زندگی چیزی نیست جز یک فرصت برای عشق ورزیدن.', author: 'مولانا' },
    { text: 'بهترین زمان برای کاشت درخت بیست سال پیش بود. دومین بهترین زمان، الان است.', author: 'ضرب‌المثل چینی' },
    { text: 'مهم نیست چقدر آهسته می‌روی، مهم این است که متوقف نشوی.', author: 'کنفوسیوس' },
    { text: 'Life is really simple, but we insist on making it complicated.', author: 'Confucius' },
    { text: 'The best time to plant a tree was 20 years ago. The second best time is now.', author: 'Chinese Proverb' }
  ]
};

function getRandomQuote(category = 'all') {
  let allQuotes = [];
  
  if (category === 'all') {
    allQuotes = [...quotes.motivation, ...quotes.success, ...quotes.life];
  } else {
    allQuotes = quotes[category] || [];
  }
  
  if (allQuotes.length === 0) return;
  
  const randomIndex = Math.floor(Math.random() * allQuotes.length);
  const quote = allQuotes[randomIndex];
  
  const quoteText = document.getElementById('quote-text');
  const quoteAuthor = document.getElementById('quote-author');
  
  if (quoteText) {
    quoteText.textContent = `"${quote.text}"`;
  }
  if (quoteAuthor) {
    quoteAuthor.textContent = `— ${quote.author}`;
  }
}

const newQuoteBtn = document.getElementById('new-quote');
if (newQuoteBtn) {
  newQuoteBtn.addEventListener('click', () => {
    getRandomQuote(currentCategory);
  });
}

document.querySelectorAll('.category-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
    currentCategory = e.target.dataset.category;
    getRandomQuote(currentCategory);
  });
});

getRandomQuote();

// ===================================
// ۸. مدیریت وظایف (Task Management)
// ===================================
const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');
const taskSearch = document.getElementById('task-search');

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('orbit-tasks')) || [];
  const searchTerm = taskSearch?.value.toLowerCase() || '';
  
  if (!taskList) return;
  
  taskList.innerHTML = '';
  
  let filteredTasks = tasks;
  
  if (searchTerm) {
    filteredTasks = filteredTasks.filter(task => 
      task.text.toLowerCase().includes(searchTerm)
    );
  }
  
  if (currentFilter === 'active') {
    filteredTasks = filteredTasks.filter(task => !task.completed);
  } else if (currentFilter === 'completed') {
    filteredTasks = filteredTasks.filter(task => task.completed);
  } else if (currentFilter === 'high') {
    filteredTasks = filteredTasks.filter(task => task.priority === 'high');
  } else if (currentFilter === 'today') {
    const today = new Date().toISOString().split('T')[0];
    filteredTasks = filteredTasks.filter(task => task.dueDate === today);
  }
  
  filteredTasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.draggable = true;
    li.dataset.index = tasks.indexOf(task);
    
    if (task.completed) li.classList.add('completed');
    if (task.priority) li.classList.add(`priority-${task.priority}`);
    
    const categoryEmojis = {
      work: '💼',
      personal: '👤',
      study: '📚',
      health: '💪',
      other: '📌'
    };
    
    const categoryEmoji = categoryEmojis[task.category] || '📌';
    
    li.innerHTML = `
      <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${tasks.indexOf(task)})">
      <div class="task-text">
        <div>${task.text}</div>
        <div class="task-meta">
          <span class="task-category">${categoryEmoji} ${task.category || 'other'}</span>
          ${task.dueDate ? `<span class="task-due">📅 ${task.dueDate}</span>` : ''}
        </div>
      </div>
      <button class="delete-task" onclick="deleteTask(${tasks.indexOf(task)})">🗑️</button>
    `;
    
    // Drag & Drop
    li.addEventListener('dragstart', handleDragStart);
    li.addEventListener('dragend', handleDragEnd);
    li.addEventListener('dragover', handleDragOver);
    li.addEventListener('drop', handleDrop);
    
    taskList.appendChild(li);
  });
  
  updateTaskCount();
  updateStats();
}

function addTask() {
  if (!taskInput) return;
  
  const text = taskInput.value.trim();
  if (!text) return;
  
  const priority = document.getElementById('task-priority')?.value || 'medium';
  const dueDate = document.getElementById('task-due')?.value || '';
  const category = document.getElementById('task-category')?.value || 'other';
  
  const tasks = JSON.parse(localStorage.getItem('orbit-tasks')) || [];
  tasks.push({ 
    id: Date.now(),
    text, 
    completed: false, 
    priority, 
    dueDate, 
    category,
    createdAt: new Date().toISOString()
  });
  localStorage.setItem('orbit-tasks', JSON.stringify(tasks));
  
  taskInput.value = '';
  loadTasks();
  
  addNotification(t('notifications.taskAdded'), 'success');
}

function toggleTask(index) {
  const tasks = JSON.parse(localStorage.getItem('orbit-tasks')) || [];
  if (!tasks[index]) return;
  
  tasks[index].completed = !tasks[index].completed;
  localStorage.setItem('orbit-tasks', JSON.stringify(tasks));
  
  if (tasks[index].completed) {
    triggerConfetti();
    addNotification(t('notifications.taskCompleted'), 'success');
  }
  
  loadTasks();
}

function deleteTask(index) {
  const tasks = JSON.parse(localStorage.getItem('orbit-tasks')) || [];
  tasks.splice(index, 1);
  localStorage.setItem('orbit-tasks', JSON.stringify(tasks));
  loadTasks();
}

function updateTaskCount() {
  const tasks = JSON.parse(localStorage.getItem('orbit-tasks')) || [];
  const countElement = document.getElementById('tasks-count');
  if (countElement) {
    countElement.textContent = `${formatNumber(tasks.length)} ${t('tasks.count')}`;
  }
}

if (addBtn) {
  addBtn.addEventListener('click', addTask);
}

if (taskInput) {
  taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
  });
}

if (taskSearch) {
  taskSearch.addEventListener('input', loadTasks);
}

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
    currentFilter = e.target.dataset.filter;
    loadTasks();
  });
});

// Drag & Drop Functions
function handleDragStart(e) {
  draggedItem = this;
  setTimeout(() => this.classList.add('dragging'), 0);
}

function handleDragEnd() {
  this.classList.remove('dragging');
  draggedItem = null;
}

function handleDragOver(e) {
  e.preventDefault();
}

function handleDrop(e) {
  e.preventDefault();
  
  if (this !== draggedItem && draggedItem) {
    const tasks = JSON.parse(localStorage.getItem('orbit-tasks')) || [];
    const fromIndex = parseInt(draggedItem.dataset.index);
    const toIndex = parseInt(this.dataset.index);
    
    const [movedTask] = tasks.splice(fromIndex, 1);
    tasks.splice(toIndex, 0, movedTask);
    
    localStorage.setItem('orbit-tasks', JSON.stringify(tasks));
    loadTasks();
  }
}

loadTasks();

// ===================================
// ۹. World Clock
// ===================================
function updateWorldClock() {
  const location = JSON.parse(localStorage.getItem('orbit-location') || '{}');
  const worldClocks = location.worldClocks || [];
  const display = document.getElementById('world-clock-display');
  
  if (!display) return;
  
  if (worldClocks.length === 0) {
    display.innerHTML = `<p style="color: var(--text-secondary); text-align: center;">${t('worldClock.noClocks')}</p>`;
    return;
  }
  
  display.innerHTML = '';
  
  worldClocks.forEach(clock => {
    const time = getTimeInTimezone(clock.timezone);
    const date = getDateInTimezone(clock.timezone, getCurrentLanguage());
    
    display.innerHTML += `
      <div class="world-clock-item">
        <div class="world-clock-name">${clock.name}</div>
        <div class="world-clock-time">${time}</div>
        <div class="world-clock-date">${date}</div>
      </div>
    `;
  });
}

// ===================================
// ۱۰. Confetti Animation
// ===================================
const confettiCanvas = document.getElementById('confetti-canvas');
const confettiCtx = confettiCanvas ? confettiCanvas.getContext('2d') : null;

if (confettiCanvas) {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
}

let confettiPieces = [];

function triggerConfetti() {
  if (!confettiCtx) return;
  
  for (let i = 0; i < 50; i++) {
    confettiPieces.push({
      x: Math.random() * confettiCanvas.width,
      y: -10,
      size: Math.random() * 8 + 4,
      speedY: Math.random() * 3 + 2,
      speedX: Math.random() * 2 - 1,
      color: `hsl(${Math.random() * 360}, 100%, 50%)`,
      rotation: Math.random() * 360,
      rotationSpeed: Math.random() * 10 - 5
    });
  }
  
  if (confettiPieces.length === 50) {
    animateConfetti();
  }
}

function animateConfetti() {
  if (!confettiCtx) return;
  
  confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  
  confettiPieces.forEach((piece, index) => {
    piece.y += piece.speedY;
    piece.x += piece.speedX;
    piece.rotation += piece.rotationSpeed;
    
    confettiCtx.save();
    confettiCtx.translate(piece.x, piece.y);
    confettiCtx.rotate(piece.rotation * Math.PI / 180);
    confettiCtx.fillStyle = piece.color;
    confettiCtx.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size);
    confettiCtx.restore();
    
    if (piece.y > confettiCanvas.height) {
      confettiPieces.splice(index, 1);
    }
  });
  
  if (confettiPieces.length > 0) {
    requestAnimationFrame(animateConfetti);
  }
}

window.addEventListener('resize', () => {
  if (confettiCanvas) {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
  }
});
// ===================================
// Orbit Dashboard - Part 2
// پومودورو، عادت‌ها، یادداشت، لینک‌ها، تقویم، آمار
// ===================================

// ===================================
// ۱۱. تایمر پومودورو (Pomodoro Timer)
// ===================================
let pomodoroTime = 25 * 60;
let pomodoroDuration = 25 * 60;
let breakDuration = 5 * 60;
let isBreakTime = false;

const pomodoroDisplay = document.getElementById('pomodoro-time');
const pomodoroStatus = document.getElementById('pomodoro-status');
const pomodoroStartBtn = document.getElementById('pomodoro-start');
const pomodoroResetBtn = document.getElementById('pomodoro-reset');

function updatePomodoroDisplay() {
  const minutes = Math.floor(pomodoroTime / 60);
  const seconds = pomodoroTime % 60;
  const display = `${formatNumber(String(minutes).padStart(2, '0'))}:${formatNumber(String(seconds).padStart(2, '0'))}`;
  
  if (pomodoroDisplay) {
    pomodoroDisplay.textContent = display;
  }
  
  const focusTimer = document.getElementById('focus-timer');
  if (focusTimer) {
    focusTimer.textContent = display;
  }
}

function startPomodoro() {
  if (isPomodoroRunning) {
    // توقف
    clearInterval(pomodoroInterval);
    if (pomodoroStartBtn) {
      pomodoroStartBtn.textContent = t('pomodoro.start');
    }
    if (pomodoroStatus) {
      pomodoroStatus.textContent = t('pomodoro.ready');
    }
    isPomodoroRunning = false;
  } else {
    // شروع
    if (pomodoroStartBtn) {
      pomodoroStartBtn.textContent = t('pomodoro.reset');
    }
    if (pomodoroStatus) {
      pomodoroStatus.textContent = t('focus.status');
    }
    isPomodoroRunning = true;
    
    pomodoroInterval = setInterval(() => {
      pomodoroTime--;
      focusMinutes++;
      updatePomodoroDisplay();
      
      if (pomodoroTime <= 0) {
        clearInterval(pomodoroInterval);
        isPomodoroRunning = false;
        
        if (!isBreakTime) {
          // پایان تمرکز
          pomodoroSessions++;
          const todaySessionsEl = document.getElementById('today-sessions');
          if (todaySessionsEl) {
            todaySessionsEl.textContent = formatNumber(pomodoroSessions);
          }
          
          if (pomodoroStatus) {
            pomodoroStatus.textContent = '🎉 ' + t('notifications.breakTime');
          }
          if (pomodoroStartBtn) {
            pomodoroStartBtn.textContent = t('pomodoro.start');
          }
          
          triggerConfetti();
          addNotification(t('notifications.pomodoroCompleted'), 'success');
          
          // اعلان مرورگر
          const settings = JSON.parse(localStorage.getItem('orbit-settings') || '{}');
          if (settings.browserNotif !== false && Notification.permission === 'granted') {
            new Notification('Orbit 🪐', { 
              body: t('notifications.breakTime'),
              icon: '🪐'
            });
          }
          
          // صدای اعلان
          if (settings.soundNotif !== false) {
            playNotificationSound();
          }
          
          // شروع استراحت
          isBreakTime = true;
          pomodoroTime = breakDuration;
          updatePomodoroDisplay();
          
          // ذخیره آمار
          savePomodoroStats();
          
        } else {
          // پایان استراحت
          if (pomodoroStatus) {
            pomodoroStatus.textContent = t('pomodoro.ready');
          }
          if (pomodoroStartBtn) {
            pomodoroStartBtn.textContent = t('pomodoro.start');
          }
          
          isBreakTime = false;
          pomodoroTime = pomodoroDuration;
          updatePomodoroDisplay();
          
          addNotification(t('notifications.breakCompleted'), 'info');
        }
        
        updateStats();
      }
    }, 1000);
  }
}

function resetPomodoro() {
  clearInterval(pomodoroInterval);
  pomodoroTime = pomodoroDuration;
  isBreakTime = false;
  updatePomodoroDisplay();
  if (pomodoroStartBtn) {
    pomodoroStartBtn.textContent = t('pomodoro.start');
  }
  if (pomodoroStatus) {
    pomodoroStatus.textContent = t('pomodoro.ready');
  }
  isPomodoroRunning = false;
}

if (pomodoroStartBtn) {
  pomodoroStartBtn.addEventListener('click', startPomodoro);
}

if (pomodoroResetBtn) {
  pomodoroResetBtn.addEventListener('click', resetPomodoro);
}

updatePomodoroDisplay();

// درخواست اجازه اعلان
if ('Notification' in window && Notification.permission === 'default') {
  Notification.requestPermission();
}

// ذخیره آمار پومودورو
function savePomodoroStats() {
  const today = new Date().toISOString().split('T')[0];
  const stats = JSON.parse(localStorage.getItem('orbit-stats') || '{}');
  
  if (!stats.history) {
    stats.history = [];
  }
  
  const todayStats = stats.history.find(s => s.date === today);
  if (todayStats) {
    todayStats.pomodoroSessions++;
    todayStats.focusMinutes += pomodoroDuration / 60;
  } else {
    stats.history.push({
      date: today,
      pomodoroSessions: 1,
      focusMinutes: pomodoroDuration / 60
    });
  }
  
  stats.totalPomodoroSessions = (stats.totalPomodoroSessions || 0) + 1;
  stats.totalFocusMinutes = (stats.totalFocusMinutes || 0) + (pomodoroDuration / 60);
  
  localStorage.setItem('orbit-stats', JSON.stringify(stats));
}

// صدای اعلان
function playNotificationSound() {
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  } catch (error) {
    console.error('Error playing sound:', error);
  }
}

// ===================================
// ۱۲. Focus Mode
// ===================================
const focusBtn = document.getElementById('focus-btn');
const focusMode = document.getElementById('focus-mode');
const exitFocusBtn = document.getElementById('exit-focus');

if (focusBtn) {
  focusBtn.addEventListener('click', () => {
    if (focusMode) {
      focusMode.classList.remove('hidden');
    }
  });
}

if (exitFocusBtn) {
  exitFocusBtn.addEventListener('click', () => {
    if (focusMode) {
      focusMode.classList.add('hidden');
    }
  });
}

// بستن Focus Mode با Esc
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && focusMode && !focusMode.classList.contains('hidden')) {
    focusMode.classList.add('hidden');
  }
});

// ===================================
// ۱۳. عادت‌ها (Habits)
// ===================================
function loadHabits() {
  const habits = JSON.parse(localStorage.getItem('orbit-habits')) || [];
  const habitsList = document.getElementById('habits-list');
  if (!habitsList) return;
  
  const today = new Date().toDateString();
  
  habitsList.innerHTML = '';
  
  habits.forEach((habit, index) => {
    const isCompleted = habit.completedDates && habit.completedDates.includes(today);
    
    const div = document.createElement('div');
    div.className = `habit-item ${isCompleted ? 'completed' : ''}`;
    div.innerHTML = `
      <span class="habit-icon">${habit.icon}</span>
      <span class="habit-name">${habit.name}</span>
      <input type="checkbox" class="habit-check" ${isCompleted ? 'checked' : ''} 
             onchange="toggleHabit(${index})">
      <button class="delete-habit" onclick="deleteHabit(${index})" style="background: transparent; border: none; color: var(--danger); cursor: pointer; font-size: 1.2rem;">×</button>
    `;
    habitsList.appendChild(div);
  });
  
  updateStats();
}

function addHabit() {
  const nameInput = document.getElementById('habit-name');
  const iconInput = document.getElementById('habit-icon');
  
  if (!nameInput) return;
  
  const name = nameInput.value.trim();
  const icon = iconInput?.value.trim() || '⭐';
  
  if (!name) {
    alert(t('notifications.fillAllFields'));
    return;
  }
  
  const habits = JSON.parse(localStorage.getItem('orbit-habits')) || [];
  habits.push({ 
    id: Date.now(),
    name, 
    icon, 
    completedDates: [],
    createdAt: new Date().toISOString()
  });
  localStorage.setItem('orbit-habits', JSON.stringify(habits));
  
  const habitModal = document.getElementById('habit-modal');
  if (habitModal) {
    habitModal.classList.add('hidden');
  }
  if (nameInput) nameInput.value = '';
  if (iconInput) iconInput.value = '';
  
  loadHabits();
  addNotification(t('notifications.habitAdded'), 'success');
}

function toggleHabit(index) {
  const habits = JSON.parse(localStorage.getItem('orbit-habits')) || [];
  if (!habits[index]) return;
  
  const today = new Date().toDateString();
  
  if (!habits[index].completedDates) {
    habits[index].completedDates = [];
  }
  
  const dateIndex = habits[index].completedDates.indexOf(today);
  
  if (dateIndex > -1) {
    habits[index].completedDates.splice(dateIndex, 1);
  } else {
    habits[index].completedDates.push(today);
    triggerConfetti();
    addNotification(t('notifications.habitCompleted'), 'success');
  }
  
  localStorage.setItem('orbit-habits', JSON.stringify(habits));
  loadHabits();
}

function deleteHabit(index) {
  if (!confirm(t('notifications.confirmDelete'))) return;
  
  const habits = JSON.parse(localStorage.getItem('orbit-habits')) || [];
  habits.splice(index, 1);
  localStorage.setItem('orbit-habits', JSON.stringify(habits));
  loadHabits();
}

const addHabitBtn = document.getElementById('add-habit-btn');
const saveHabitBtn = document.getElementById('save-habit');
const cancelHabitBtn = document.getElementById('cancel-habit');
const habitModal = document.getElementById('habit-modal');

if (addHabitBtn) {
  addHabitBtn.addEventListener('click', () => {
    if (habitModal) {
      habitModal.classList.remove('hidden');
    }
  });
}

if (saveHabitBtn) {
  saveHabitBtn.addEventListener('click', addHabit);
}

if (cancelHabitBtn) {
  cancelHabitBtn.addEventListener('click', () => {
    if (habitModal) {
      habitModal.classList.add('hidden');
    }
  });
}

loadHabits();

// ===================================
// ۱۴. یادداشت سریع (Quick Note)
// ===================================
const quickNote = document.getElementById('quick-note');
if (quickNote) {
  quickNote.value = localStorage.getItem('orbit-note') || '';
  
  quickNote.addEventListener('input', () => {
    localStorage.setItem('orbit-note', quickNote.value);
  });
}

// ===================================
// ۱۵. لینک‌های سریع (Quick Links)
// ===================================
const quickLinksContainer = document.getElementById('quick-links');
const defaultLinks = [
  { id: 1, name: 'Google', url: 'https://google.com' },
  { id: 2, name: 'YouTube', url: 'https://youtube.com' },
  { id: 3, name: 'GitHub', url: 'https://github.com' },
  { id: 4, name: 'LinkedIn', url: 'https://linkedin.com' }
];

function loadLinks() {
  let links = JSON.parse(localStorage.getItem('orbit-links'));
  if (!links) {
    links = defaultLinks;
    localStorage.setItem('orbit-links', JSON.stringify(links));
  }
  
  if (!quickLinksContainer) return;
  
  quickLinksContainer.innerHTML = '';
  
  links.forEach((link, index) => {
    const linkElement = document.createElement('a');
    linkElement.href = link.url.startsWith('http') ? link.url : `https://${link.url}`;
    linkElement.target = '_blank';
    linkElement.rel = 'noopener noreferrer';
    linkElement.className = 'link-item';
    linkElement.innerHTML = `
      <span>${link.name}</span>
      <button class="delete-link" onclick="deleteLink(event, ${index})">×</button>
    `;
    quickLinksContainer.appendChild(linkElement);
  });
}

function deleteLink(event, index) {
  event.preventDefault();
  event.stopPropagation();
  
  const links = JSON.parse(localStorage.getItem('orbit-links')) || [];
  links.splice(index, 1);
  localStorage.setItem('orbit-links', JSON.stringify(links));
  loadLinks();
}

const addLinkBtn = document.getElementById('add-link-btn');
const saveLinkBtn = document.getElementById('save-link');
const cancelLinkBtn = document.getElementById('cancel-link');
const linkModal = document.getElementById('link-modal');

if (addLinkBtn) {
  addLinkBtn.addEventListener('click', () => {
    if (linkModal) {
      linkModal.classList.remove('hidden');
    }
  });
}

if (saveLinkBtn) {
  saveLinkBtn.addEventListener('click', () => {
    const nameInput = document.getElementById('link-name');
    const urlInput = document.getElementById('link-url');
    
    const name = nameInput?.value.trim();
    const url = urlInput?.value.trim();
    
    if (!name || !url) {
      alert(t('notifications.fillAllFields'));
      return;
    }
    
    const links = JSON.parse(localStorage.getItem('orbit-links')) || [];
    links.push({ id: Date.now(), name, url });
    localStorage.setItem('orbit-links', JSON.stringify(links));
    
    if (linkModal) {
      linkModal.classList.add('hidden');
    }
    if (nameInput) nameInput.value = '';
    if (urlInput) urlInput.value = '';
    
    loadLinks();
    addNotification(t('notifications.linkAdded'), 'success');
  });
}

if (cancelLinkBtn) {
  cancelLinkBtn.addEventListener('click', () => {
    if (linkModal) {
      linkModal.classList.add('hidden');
    }
  });
}

loadLinks();

// ===================================
// ۱۶. تقویم (Calendar)
// ===================================
function renderCalendar() {
  const calendar = document.getElementById('mini-calendar');
  if (!calendar) return;
  
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  
  const daysInMonth = lastDay.getDate();
  const startingDay = firstDay.getDay();
  
  const settings = JSON.parse(localStorage.getItem('orbit-settings') || '{}');
  const lang = settings.language || 'fa';
  
  const dayNames = {
    fa: ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'],
    en: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    ar: ['أ', 'ا', 'ث', 'ر', 'خ', 'ج', 'س'],
    fr: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
    es: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
    de: ['S', 'M', 'D', 'M', 'D', 'F', 'S'],
    tr: ['P', 'P', 'S', 'Ç', 'P', 'C', 'C'],
    zh: ['日', '一', '二', '三', '四', '五', '六'],
    ja: ['日', '月', '火', '水', '木', '金', '土'],
    ko: ['일', '월', '화', '수', '목', '금', '토'],
    ru: ['В', 'П', 'В', 'С', 'Ч', 'П', 'С'],
    it: ['D', 'L', 'M', 'M', 'G', 'V', 'S']
  };
  
  calendar.innerHTML = '';
  
  // روزهای هفته
  (dayNames[lang] || dayNames.en).forEach(day => {
    const div = document.createElement('div');
    div.className = 'calendar-header';
    div.textContent = day;
    calendar.appendChild(div);
  });
  
  // روزهای خالی قبل از شروع ماه
  for (let i = 0; i < startingDay; i++) {
    const div = document.createElement('div');
    calendar.appendChild(div);
  }
  
  // روزهای ماه
  for (let day = 1; day <= daysInMonth; day++) {
    const div = document.createElement('div');
    div.className = 'calendar-day';
    div.textContent = formatNumber(day);
    
    if (day === today.getDate()) {
      div.classList.add('today');
    }
    
    calendar.appendChild(div);
  }
}

renderCalendar();

// ===================================
// ۱۷. آمار (Statistics)
// ===================================
function updateStats() {
  const tasks = JSON.parse(localStorage.getItem('orbit-tasks')) || [];
  const habits = JSON.parse(localStorage.getItem('orbit-habits')) || [];
  const stats = JSON.parse(localStorage.getItem('orbit-stats') || '{}');
  const today = new Date().toDateString();
  
  const completedTasks = tasks.filter(t => t.completed).length;
  const completedHabits = habits.filter(h => 
    h.completedDates && h.completedDates.includes(today)
  ).length;
  
  const tasksCompletedEl = document.getElementById('tasks-completed');
  const pomodoroSessionsEl = document.getElementById('pomodoro-sessions');
  const habitsCompletedEl = document.getElementById('habits-completed');
  const focusTimeEl = document.getElementById('focus-time');
  
  if (tasksCompletedEl) {
    tasksCompletedEl.textContent = formatNumber(completedTasks);
  }
  if (pomodoroSessionsEl) {
    pomodoroSessionsEl.textContent = formatNumber(pomodoroSessions);
  }
  if (habitsCompletedEl) {
    habitsCompletedEl.textContent = formatNumber(completedHabits);
  }
  if (focusTimeEl) {
    focusTimeEl.textContent = formatNumber(Math.floor(focusMinutes));
  }
}

updateStats();

// ===================================
// ۱۸. Breathing Exercise
// ===================================
const breathingBtn = document.getElementById('breathing-btn');
const breathingModal = document.getElementById('breathing-modal');
const startBreathingBtn = document.getElementById('start-breathing');
const closeBreathingBtn = document.getElementById('close-breathing');
const breathingText = document.getElementById('breathing-text');

let breathingPhase = 0;
let breathingRunning = false;

if (breathingBtn) {
  breathingBtn.addEventListener('click', () => {
    if (breathingModal) {
      breathingModal.classList.toggle('hidden');
    }
  });
}

if (startBreathingBtn) {
  startBreathingBtn.addEventListener('click', () => {
    if (breathingRunning) {
      clearInterval(breathingInterval);
      breathingRunning = false;
      startBreathingBtn.textContent = t('pomodoro.start');
      if (breathingText) {
        breathingText.textContent = t('welcome.start');
      }
    } else {
      breathingRunning = true;
      startBreathingBtn.textContent = t('pomodoro.reset');
      breathingPhase = 0;
      runBreathingCycle();
    }
  });
}

function runBreathingCycle() {
  const phases = [
    { text: 'دم', duration: 4000 },
    { text: 'نگه داشتن', duration: 7000 },
    { text: 'بازدم', duration: 8000 }
  ];
  
  function nextPhase() {
    if (!breathingRunning) return;
    
    if (breathingText) {
      breathingText.textContent = phases[breathingPhase].text;
    }
    
    breathingInterval = setTimeout(() => {
      breathingPhase = (breathingPhase + 1) % phases.length;
      nextPhase();
    }, phases[breathingPhase].duration);
  }
  
  nextPhase();
}

if (closeBreathingBtn) {
  closeBreathingBtn.addEventListener('click', () => {
    if (breathingModal) {
      breathingModal.classList.add('hidden');
    }
    if (breathingRunning) {
      clearInterval(breathingInterval);
      breathingRunning = false;
    }
  });
}

// ===================================
// ۱۹. Ambient Sounds
// ===================================
const ambientBtn = document.getElementById('ambient-btn');
const ambientPanel = document.getElementById('ambient-panel');
const stopAmbientBtn = document.getElementById('stop-ambient');
const ambientVolume = document.getElementById('ambient-volume');

if (ambientBtn) {
  ambientBtn.addEventListener('click', () => {
    if (ambientPanel) {
      ambientPanel.classList.toggle('hidden');
    }
  });
}

document.querySelectorAll('.ambient-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const sound = e.currentTarget.dataset.sound;
    playAmbientSound(sound);
    
    document.querySelectorAll('.ambient-btn').forEach(b => b.classList.remove('active'));
    e.currentTarget.classList.add('active');
  });
});

function playAmbientSound(sound) {
  if (ambientAudio) {
    ambientAudio.pause();
  }
  
  // استفاده از صداهای رایگان آنلاین
  const soundUrls = {
    rain: 'https://cdn.pixabay.com/audio/2022/03/15/audio_1b8f1b8b8b.mp3',
    forest: 'https://cdn.pixabay.com/audio/2022/03/15/audio_1b8f1b8b8b.mp3',
    cafe: 'https://cdn.pixabay.com/audio/2022/03/15/audio_1b8f1b8b8b.mp3',
    fire: 'https://cdn.pixabay.com/audio/2022/03/15/audio_1b8f1b8b8b.mp3',
    ocean: 'https://cdn.pixabay.com/audio/2022/03/15/audio_1b8f1b8b8b.mp3',
    wind: 'https://cdn.pixabay.com/audio/2022/03/15/audio_1b8f1b8b8b.mp3'
  };
  
  try {
    ambientAudio = new Audio(soundUrls[sound]);
    ambientAudio.loop = true;
    ambientAudio.volume = ambientVolume ? ambientVolume.value / 100 : 0.5;
    ambientAudio.play().catch(e => console.log('Audio play failed:', e));
  } catch (error) {
    console.error('Error playing ambient sound:', error);
  }
}

if (ambientVolume) {
  ambientVolume.addEventListener('input', (e) => {
    if (ambientAudio) {
      ambientAudio.volume = e.target.value / 100;
    }
  });
}

if (stopAmbientBtn) {
  stopAmbientBtn.addEventListener('click', () => {
    if (ambientAudio) {
      ambientAudio.pause();
      ambientAudio = null;
    }
    document.querySelectorAll('.ambient-btn').forEach(b => b.classList.remove('active'));
  });
}

// ===================================
// ۲۰. Notifications
// ===================================
function addNotification(message, type = 'info') {
  const notifications = JSON.parse(localStorage.getItem('orbit-notifications')) || [];
  notifications.unshift({
    id: Date.now(),
    message,
    type,
    time: new Date().toISOString(),
    read: false
  });
  
  if (notifications.length > 20) notifications.pop();
  
  localStorage.setItem('orbit-notifications', JSON.stringify(notifications));
  renderNotifications();
}

function renderNotifications() {
  const notifications = JSON.parse(localStorage.getItem('orbit-notifications')) || [];
  const list = document.getElementById('notification-list');
  const badge = document.getElementById('notification-badge');
  
  if (list) {
    list.innerHTML = '';
    
    notifications.forEach(notif => {
      const li = document.createElement('li');
      li.className = 'notification-item';
      
      const icons = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
      };
      
      li.innerHTML = `
        <span>${icons[notif.type] || 'ℹ️'}</span>
        <span style="flex: 1;">${notif.message}</span>
        <span style="font-size: 0.8rem; color: var(--text-secondary);">${new Date(notif.time).toLocaleTimeString()}</span>
      `;
      list.appendChild(li);
    });
  }
  
  if (badge) {
    const unreadCount = notifications.filter(n => !n.read).length;
    if (unreadCount > 0) {
      badge.textContent = formatNumber(unreadCount);
      badge.classList.remove('hidden');
    } else {
      badge.classList.add('hidden');
    }
  }
}

const notificationsBtn = document.getElementById('notifications-btn');
const notificationCenter = document.getElementById('notification-center');
const clearNotificationsBtn = document.getElementById('clear-notifications');

if (notificationsBtn) {
  notificationsBtn.addEventListener('click', () => {
    if (notificationCenter) {
      notificationCenter.classList.toggle('hidden');
      // علامت‌گذاری همه به عنوان خوانده شده
      const notifications = JSON.parse(localStorage.getItem('orbit-notifications')) || [];
      notifications.forEach(n => n.read = true);
      localStorage.setItem('orbit-notifications', JSON.stringify(notifications));
      renderNotifications();
    }
  });
}

if (clearNotificationsBtn) {
  clearNotificationsBtn.addEventListener('click', () => {
    localStorage.setItem('orbit-notifications', '[]');
    renderNotifications();
  });
}

renderNotifications();

// ===================================
// ۲۱. Import/Export Data
// ===================================
const exportDataBtn = document.getElementById('export-data');
const importDataInput = document.getElementById('import-data');
const clearAllDataBtn = document.getElementById('clear-all-data');

if (exportDataBtn) {
  exportDataBtn.addEventListener('click', () => {
    const data = {
      version: '2.0',
      exportDate: new Date().toISOString(),
      tasks: localStorage.getItem('orbit-tasks'),
      habits: localStorage.getItem('orbit-habits'),
      links: localStorage.getItem('orbit-links'),
      note: localStorage.getItem('orbit-note'),
      notifications: localStorage.getItem('orbit-notifications'),
      stats: localStorage.getItem('orbit-stats'),
      settings: localStorage.getItem('orbit-settings'),
      location: localStorage.getItem('orbit-location'),
      user: {
        name: localStorage.getItem('orbit-user-name'),
        visited: localStorage.getItem('orbit-visited')
      }
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `orbit-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    addNotification(t('notifications.dataExported'), 'success');
  });
}

if (importDataInput) {
  importDataInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        
        if (data.tasks) localStorage.setItem('orbit-tasks', data.tasks);
        if (data.habits) localStorage.setItem('orbit-habits', data.habits);
        if (data.links) localStorage.setItem('orbit-links', data.links);
        if (data.note) localStorage.setItem('orbit-note', data.note);
        if (data.notifications) localStorage.setItem('orbit-notifications', data.notifications);
        if (data.stats) localStorage.setItem('orbit-stats', data.stats);
        if (data.settings) localStorage.setItem('orbit-settings', data.settings);
        if (data.location) localStorage.setItem('orbit-location', data.location);
        if (data.user) {
          if (data.user.name) localStorage.setItem('orbit-user-name', data.user.name);
          if (data.user.visited) localStorage.setItem('orbit-visited', data.user.visited);
        }
        
        // بارگذاری مجدد داده‌ها
        loadTasks();
        loadHabits();
        loadLinks();
        renderNotifications();
        updateStats();
        updateGreeting();
        getWeather();
        
        // اعمال تنظیمات
        const settings = JSON.parse(localStorage.getItem('orbit-settings') || '{}');
        if (settings.language) {
          applyLanguage(settings.language);
        }
        if (typeof loadSavedTheme === 'function') {
          loadSavedTheme();
        }
        
        addNotification(t('notifications.dataImported'), 'success');
      } catch (error) {
        console.error('Error importing data:', error);
        addNotification(t('notifications.importError'), 'error');
      }
    };
    reader.readAsText(file);
  });
}

if (clearAllDataBtn) {
  clearAllDataBtn.addEventListener('click', () => {
    if (confirm(t('notifications.confirmClearAll'))) {
      localStorage.clear();
      location.reload();
    }
  });
}

// ===================================
// ۲۲. Storage Info
// ===================================
function updateStorageInfo() {
  const storageInfo = document.getElementById('storage-info');
  if (!storageInfo) return;
  
  let totalSize = 0;
  for (let key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      totalSize += localStorage[key].length + key.length;
    }
  }
  
  const sizeKB = (totalSize / 1024).toFixed(2);
  const sizeMB = (totalSize / 1024 / 1024).toFixed(2);
  
  storageInfo.innerHTML = `
    <p>${t('settings.privacy.storage')}: <strong>${sizeKB} KB</strong> (${sizeMB} MB)</p>
    <p>${t('stats.tasksCompleted')}: <strong>${formatNumber(JSON.parse(localStorage.getItem('orbit-tasks') || '[]').length)}</strong></p>
    <p>${t('stats.habitsCompleted')}: <strong>${formatNumber(JSON.parse(localStorage.getItem('orbit-habits') || '[]').length)}</strong></p>
    <p>${t('links.title')}: <strong>${formatNumber(JSON.parse(localStorage.getItem('orbit-links') || '[]').length)}</strong></p>
  `;
}

updateStorageInfo();
// ===================================
// Orbit Dashboard - Part 3
// Settings Panel, Location, Theme, Language, Keyboard Shortcuts
// ===================================

// ===================================
// ۲۳. Settings Panel (پنل تنظیمات)
// ===================================
const settingsBtn = document.getElementById('settings-btn');
const settingsPanel = document.getElementById('settings-panel');
const closeSettingsBtn = document.getElementById('close-settings');

if (settingsBtn) {
  settingsBtn.addEventListener('click', () => {
    if (settingsPanel) {
      settingsPanel.classList.remove('hidden');
      loadSettings();
    }
  });
}

if (closeSettingsBtn) {
  closeSettingsBtn.addEventListener('click', () => {
    if (settingsPanel) {
      settingsPanel.classList.add('hidden');
    }
  });
}

// بستن Settings با Esc
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && settingsPanel && !settingsPanel.classList.contains('hidden')) {
    settingsPanel.classList.add('hidden');
  }
});

// بارگذاری تنظیمات در پنل
function loadSettings() {
  const settings = JSON.parse(localStorage.getItem('orbit-settings') || '{}');
  const location = JSON.parse(localStorage.getItem('orbit-location') || '{}');
  
  // تب عمومی
  const settingsName = document.getElementById('settings-name');
  const settingsPomodoro = document.getElementById('settings-pomodoro');
  const settingsBreak = document.getElementById('settings-break');
  const settingsNotifPomodoro = document.getElementById('settings-notif-pomodoro');
  const settingsNotifSound = document.getElementById('settings-notif-sound');
  const settingsNotifBrowser = document.getElementById('settings-notif-browser');
  
  if (settingsName) {
    settingsName.value = localStorage.getItem('orbit-user-name') || '';
  }
  if (settingsPomodoro) {
    settingsPomodoro.value = settings.pomodoroDuration || 25;
  }
  if (settingsBreak) {
    settingsBreak.value = settings.breakDuration || 5;
  }
  if (settingsNotifPomodoro) {
    settingsNotifPomodoro.checked = settings.pomodoroNotif !== false;
  }
  if (settingsNotifSound) {
    settingsNotifSound.checked = settings.soundNotif !== false;
  }
  if (settingsNotifBrowser) {
    settingsNotifBrowser.checked = settings.browserNotif === true;
  }
  
  // تب ظاهر
  const settingsAnimations = document.getElementById('settings-animations');
  const settingsSounds = document.getElementById('settings-sounds');
  const glassOpacity = document.getElementById('glass-opacity');
  const glassOpacityValue = document.getElementById('glass-opacity-value');
  
  if (settingsAnimations) {
    settingsAnimations.checked = settings.animations !== false;
  }
  if (settingsSounds) {
    settingsSounds.checked = settings.sounds === true;
  }
  if (glassOpacity) {
    glassOpacity.value = settings.glassOpacity || 8;
    if (glassOpacityValue) {
      glassOpacityValue.textContent = `${settings.glassOpacity || 8}%`;
    }
  }
  
  // تب آب‌وهوا
  const tempUnit = settings.tempUnit || 'celsius';
  const tempUnitRadios = document.querySelectorAll('input[name="temp-unit"]');
  tempUnitRadios.forEach(radio => {
    radio.checked = radio.value === tempUnit;
  });
  
  const showHumidity = document.getElementById('show-humidity');
  const showWind = document.getElementById('show-wind');
  const showPressure = document.getElementById('show-pressure');
  const showVisibility = document.getElementById('show-visibility');
  const showSunrise = document.getElementById('show-sunrise');
  
  if (showHumidity) showHumidity.checked = settings.showHumidity !== false;
  if (showWind) showWind.checked = settings.showWind !== false;
  if (showPressure) showPressure.checked = settings.showPressure !== false;
  if (showVisibility) showVisibility.checked = settings.showVisibility === true;
  if (showSunrise) showSunrise.checked = settings.showSunrise !== false;
  
  const forecastDays = settings.forecastDays || 5;
  const forecastRadios = document.querySelectorAll('input[name="forecast-days"]');
  forecastRadios.forEach(radio => {
    radio.checked = parseInt(radio.value) === forecastDays;
  });
  
  // تب زبان
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === settings.language);
  });
  
  document.querySelectorAll('.calendar-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.calendar === (settings.calendar || 'persian'));
  });
  
  const numberFormat = document.getElementById('number-format');
  if (numberFormat) {
    numberFormat.value = settings.numberFormat || 'english';
  }
  
  const timeFormatRadios = document.querySelectorAll('input[name="time-format"]');
  timeFormatRadios.forEach(radio => {
    radio.checked = radio.value === (settings.timeFormat || '24');
  });
  
  // تب دسترسی‌پذیری
  const fontSize = settings.fontSize || 'medium';
  document.querySelectorAll('.font-size-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.size === fontSize);
  });
  
  const highContrast = document.getElementById('settings-high-contrast');
  const reduceMotion = document.getElementById('settings-reduce-motion');
  const colorBlindMode = document.getElementById('color-blind-mode');
  
  if (highContrast) highContrast.checked = settings.highContrast === true;
  if (reduceMotion) reduceMotion.checked = settings.reduceMotion === true;
  if (colorBlindMode) colorBlindMode.value = settings.colorBlindMode || 'none';
  
  // تب ظاهر - تم
  const currentTheme = settings.theme || 'cosmic';
  document.querySelectorAll('.theme-card').forEach(card => {
    card.classList.toggle('active', card.dataset.theme === currentTheme);
  });
  
  const themeMode = settings.themeMode || 'dark';
  document.querySelectorAll('.theme-btn[data-theme-mode]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.themeMode === themeMode);
  });
  
  // تم سفارشی
  const customTheme = settings.customTheme || {};
  const customAccent = document.getElementById('custom-accent');
  const customBackground = document.getElementById('custom-background');
  const customSecondary = document.getElementById('custom-secondary');
  const customText = document.getElementById('custom-text');
  
  if (customAccent) customAccent.value = customTheme.accent || '#7c3aed';
  if (customBackground) customBackground.value = customTheme.background || '#0f0c29';
  if (customSecondary) customSecondary.value = customTheme.secondary || '#302b63';
  if (customText) customText.value = customTheme.text || '#ffffff';
  
  // به‌روزرسانی اطلاعات ذخیره‌سازی
  updateStorageInfo();
}

// تغییر تب‌های تنظیمات
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    
    e.target.classList.add('active');
    const tabId = `tab-${e.target.dataset.tab}`;
    const tabContent = document.getElementById(tabId);
    if (tabContent) {
      tabContent.classList.add('active');
    }
    
    // بارگذاری داده‌های خاص هر تب
    if (e.target.dataset.tab === 'location') {
      loadLocationSettings();
    }
  });
});

// ===================================
// ۲۴. Location Management (مدیریت مکان)
// ===================================
async function loadLocationSettings() {
  const location = JSON.parse(localStorage.getItem('orbit-location') || '{}');
  const countrySelect = document.getElementById('settings-country');
  const stateSelect = document.getElementById('settings-state');
  const cityInput = document.getElementById('settings-city');
  
  if (!countrySelect) {
    console.error('❌ Country select element not found');
    return;
  }
  
  console.log('📍 Loading location settings...');
  console.log('📊 allCountries count:', allCountries.length);
  
  // ✅ اگر هنوز کشورها لود نشده‌اند، صبر کن
  if (allCountries.length === 0) {
    console.log('⏳ Waiting for countries to load...');
    countrySelect.innerHTML = `<option value="">${t('settings.location.loading') || 'در حال بارگذاری...'}</option>`;
    
    try {
      allCountries = await fetchCountries();
      console.log(`✅ Countries loaded: ${allCountries.length}`);
    } catch (error) {
      console.error('❌ Error loading countries:', error);
      countrySelect.innerHTML = `<option value="">خطا در بارگذاری کشورها</option>`;
      return;
    }
  }
  
  // ✅ پر کردن dropdown کشورها
  countrySelect.innerHTML = `<option value="">${t('settings.location.selectCountry') || 'انتخاب کشور...'}</option>`;
  
  allCountries.forEach(country => {
    const option = document.createElement('option');
    option.value = country.code;
    option.textContent = `${country.flag} ${country.name}`;
    
    // ✅ اگر این کشور قبلاً انتخاب شده بود، آن را selected کن
    if (country.code === location.country) {
      option.selected = true;
    }
    
    countrySelect.appendChild(option);
  });
  
  console.log(`✅ ${allCountries.length} کشور در dropdown نمایش داده شد`);
  
  // ✅ اگر کشور انتخاب شده، استان‌ها را بارگذاری کن
  if (location.country) {
    console.log(`📍 Loading states for: ${location.country}`);
    await loadStates(location.country, location.state);
  } else {
    // ✅ اگر کشوری انتخاب نشده، dropdown استان‌ها را غیرفعال کن
    if (stateSelect) {
      stateSelect.innerHTML = `<option value="">${t('settings.location.selectCountryFirst') || 'ابتدا کشور را انتخاب کنید'}</option>`;
      stateSelect.disabled = true;
    }
  }
  
  // ✅ پر کردن فیلد شهر
  if (cityInput && location.city) {
    cityInput.value = location.city;
  }
  
  // ✅ بارگذاری World Clock
  loadWorldClockList();
}

// تغییر کشور
// تغییر کشور
const countrySelect = document.getElementById('settings-country');
if (countrySelect) {
  countrySelect.addEventListener('change', async (e) => {
    const countryCode = e.target.value;
    console.log(`🔄 Country changed to: ${countryCode}`);
    await loadStates(countryCode);
  });
}

// بارگذاری استان‌ها
async function loadStates(countryCode, selectedState = null) {
  const stateSelect = document.getElementById('settings-state');
  if (!stateSelect) return;
  
  if (!countryCode) {
    stateSelect.innerHTML = `<option value="">${t('settings.location.selectCountryFirst')}</option>`;
    stateSelect.disabled = true;
    return;
  }
  
  stateSelect.disabled = true;
  stateSelect.innerHTML = `<option value="">${t('settings.location.loading')}</option>`;
  
  try {
    const states = await fetchStates(countryCode);
    
    stateSelect.innerHTML = `<option value="">${t('settings.location.selectState') || 'Select state...'}</option>`;
    
    states.forEach(state => {
      const option = document.createElement('option');
      option.value = state.code;
      option.textContent = state.name;
      if (selectedState && state.code === selectedState) {
        option.selected = true;
      }
      stateSelect.appendChild(option);
    });
    
    stateSelect.disabled = false;
  } catch (error) {
    console.error('Error loading states:', error);
    stateSelect.innerHTML = `<option value="">Error loading states</option>`;
  }
}

// GPS
const gpsCheckbox = document.getElementById('settings-gps');
if (gpsCheckbox) {
  gpsCheckbox.addEventListener('change', async (e) => {
    if (e.target.checked) {
      try {
        const position = await detectUserLocation();
        const locationInfo = await reverseGeocode(position.lat, position.lon);
        
        if (locationInfo) {
          const cityInput = document.getElementById('settings-city');
          if (cityInput) {
            cityInput.value = locationInfo.city;
          }
          
          addNotification(`${t('notifications.locationDetected')}: ${locationInfo.city}, ${locationInfo.country}`, 'success');
        }
      } catch (error) {
        console.error('GPS error:', error);
        e.target.checked = false;
        addNotification(t('notifications.gpsError'), 'error');
      }
    }
  });
}

// ذخیره مکان
const saveLocationBtn = document.getElementById('save-location');
if (saveLocationBtn) {
  saveLocationBtn.addEventListener('click', async () => {
    const countryCode = document.getElementById('settings-country')?.value;
    const stateCode = document.getElementById('settings-state')?.value;
    const city = document.getElementById('settings-city')?.value.trim();
    
    const country = allCountries.find(c => c.code === countryCode);
    
    if (country) {
      const location = {
        country: country.code,
        countryName: country.name,
        timezone: country.timezones?.[0]?.zoneName || 'UTC'
      };
      
      // اگر استان انتخاب شده بود، مختصات آن را بگیر
      if (stateCode) {
        try {
          const states = await fetchStates(countryCode);
          const state = states.find(s => s.code === stateCode);
          if (state) {
            location.state = state.name;
            location.lat = state.latitude;
            location.lon = state.longitude;
          }
        } catch (error) {
          console.error('Error getting state:', error);
        }
      }
      
      // اگر شهر دستی وارد شده بود، مختصات آن را بگیر (اولویت با شهر است)
      if (city) {
        location.city = city;
        try {
          const coords = await geocodeCity(city);
          if (coords) {
            location.lat = coords.lat;
            location.lon = coords.lon;
          }
        } catch (error) {
          console.error('Error geocoding city:', error);
        }
      }
      
      console.log('💾 Saving location:', location);
      localStorage.setItem('orbit-location', JSON.stringify(location));
      
      // به‌روزرسانی فوری آب‌وهوا و ساعت
      getWeather();
      updateClock();
      
      addNotification(t('notifications.locationSaved') || 'مکان با موفقیت ذخیره شد', 'success');
      settingsPanel.classList.add('hidden'); // بستن پنل تنظیمات
    } else {
      addNotification(t('notifications.selectCountry') || 'لطفاً یک کشور انتخاب کنید', 'warning');
    }
  });
}

// ===================================
// ۲۵. World Clock Management
// ===================================
function loadWorldClockList() {
  const location = JSON.parse(localStorage.getItem('orbit-location') || '{}');
  const worldClocks = location.worldClocks || [];
  const list = document.getElementById('world-clock-list');
  
  if (!list) return;
  
  list.innerHTML = '';
  
  if (worldClocks.length === 0) {
    list.innerHTML = `<p style="color: var(--text-secondary); text-align: center; padding: 10px;">${t('worldClock.noClocks') || 'No clocks added'}</p>`;
    return;
  }
  
  worldClocks.forEach((clock, index) => {
    const item = document.createElement('div');
    item.className = 'world-clock-list-item';
    item.style.cssText = 'display: flex; justify-content: space-between; align-items: center; padding: 10px; background: rgba(255,255,255,0.05); border-radius: 8px; margin-bottom: 8px;';
    item.innerHTML = `
      <span>${clock.name} - ${clock.timezone}</span>
      <button onclick="removeWorldClock(${index})" style="background: var(--danger); border: none; color: white; padding: 5px 10px; border-radius: 6px; cursor: pointer;">×</button>
    `;
    list.appendChild(item);
  });
}

function removeWorldClock(index) {
  const location = JSON.parse(localStorage.getItem('orbit-location') || '{}');
  if (!location.worldClocks) return;
  
  location.worldClocks.splice(index, 1);
  localStorage.setItem('orbit-location', JSON.stringify(location));
  loadWorldClockList();
  updateWorldClock();
}

const addWorldClockBtn = document.getElementById('add-world-clock');
const worldClockModal = document.getElementById('world-clock-modal');
const saveWorldClockBtn = document.getElementById('save-world-clock');
const cancelWorldClockBtn = document.getElementById('cancel-world-clock');

if (addWorldClockBtn) {
  addWorldClockBtn.addEventListener('click', () => {
    if (worldClockModal) {
      worldClockModal.classList.remove('hidden');
      loadTimezones();
    }
  });
}

function loadTimezones() {
  const select = document.getElementById('world-clock-timezone');
  if (!select) return;
  
  const timezones = getTimezones();
  select.innerHTML = `<option value="">${t('modals.worldClock.selectTimezone')}</option>`;
  
  timezones.forEach(tz => {
    const option = document.createElement('option');
    option.value = tz.value;
    option.textContent = tz.label;
    select.appendChild(option);
  });
}

if (saveWorldClockBtn) {
  saveWorldClockBtn.addEventListener('click', () => {
    const nameInput = document.getElementById('world-clock-name');
    const timezoneSelect = document.getElementById('world-clock-timezone');
    
    const name = nameInput?.value.trim();
    const timezone = timezoneSelect?.value;
    
    if (!name || !timezone) {
      alert(t('notifications.fillAllFields'));
      return;
    }
    
    const location = JSON.parse(localStorage.getItem('orbit-location') || '{}');
    if (!location.worldClocks) {
      location.worldClocks = [];
    }
    
    if (location.worldClocks.length >= 5) {
      alert(t('notifications.maxWorldClocks') || 'Maximum 5 world clocks allowed');
      return;
    }
    
    location.worldClocks.push({ name, timezone });
    localStorage.setItem('orbit-location', JSON.stringify(location));
    
    if (worldClockModal) {
      worldClockModal.classList.add('hidden');
    }
    if (nameInput) nameInput.value = '';
    if (timezoneSelect) timezoneSelect.value = '';
    
    loadWorldClockList();
    updateWorldClock();
    
    addNotification(t('notifications.clockAdded'), 'success');
  });
}

if (cancelWorldClockBtn) {
  cancelWorldClockBtn.addEventListener('click', () => {
    if (worldClockModal) {
      worldClockModal.classList.add('hidden');
    }
  });
}

// ===================================
// ۲۶. Weather Settings
// ===================================
const saveWeatherBtn = document.getElementById('save-weather');
if (saveWeatherBtn) {
  saveWeatherBtn.addEventListener('click', () => {
    const settings = JSON.parse(localStorage.getItem('orbit-settings') || '{}');
    
    // واحد دما
    const tempUnitRadio = document.querySelector('input[name="temp-unit"]:checked');
    if (tempUnitRadio) {
      settings.tempUnit = tempUnitRadio.value;
    }
    
    // جزئیات
    settings.showHumidity = document.getElementById('show-humidity')?.checked !== false;
    settings.showWind = document.getElementById('show-wind')?.checked !== false;
    settings.showPressure = document.getElementById('show-pressure')?.checked !== false;
    settings.showVisibility = document.getElementById('show-visibility')?.checked === true;
    settings.showSunrise = document.getElementById('show-sunrise')?.checked !== false;
    
    // پیش‌بینی
    const forecastRadio = document.querySelector('input[name="forecast-days"]:checked');
    if (forecastRadio) {
      settings.forecastDays = parseInt(forecastRadio.value);
    }
    
    localStorage.setItem('orbit-settings', JSON.stringify(settings));
    getWeather();
    
    addNotification(t('notifications.weatherSettingsSaved'), 'success');
  });
}

// ===================================
// ۲۷. Appearance Settings (تنظیمات ظاهر)
// ===================================
// انتخاب تم‌های از پیش تعریف شده
document.querySelectorAll('.theme-card').forEach(card => {
  card.addEventListener('click', (e) => {
    const themeName = e.currentTarget.dataset.theme;
    const settings = JSON.parse(localStorage.getItem('orbit-settings') || '{}');
    const mode = settings.themeMode || 'dark';
    
    document.querySelectorAll('.theme-card').forEach(c => c.classList.remove('active'));
    e.currentTarget.classList.add('active');
    
    if (typeof applyTheme === 'function') {
      applyTheme(themeName, mode);
    }
    
    addNotification(t('notifications.themeApplied'), 'success');
  });
});

// انتخاب حالت تم (تاریک/روشن/خودکار)
document.querySelectorAll('.theme-btn[data-theme-mode]').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const mode = e.currentTarget.dataset.themeMode;
    
    document.querySelectorAll('.theme-btn[data-theme-mode]').forEach(b => b.classList.remove('active'));
    e.currentTarget.classList.add('active');
    
    if (typeof setThemeMode === 'function') {
      setThemeMode(mode);
    }
    
    const settings = JSON.parse(localStorage.getItem('orbit-settings') || '{}');
    settings.themeMode = mode;
    localStorage.setItem('orbit-settings', JSON.stringify(settings));
    
    addNotification(t('notifications.themeModeApplied'), 'success');
  });
});

// اعمال تم سفارشی
const applyCustomThemeBtn = document.getElementById('apply-custom-theme');
if (applyCustomThemeBtn) {
  applyCustomThemeBtn.addEventListener('click', () => {
    const customTheme = {
      accent: document.getElementById('custom-accent')?.value || '#7c3aed',
      background: document.getElementById('custom-background')?.value || '#0f0c29',
      secondary: document.getElementById('custom-secondary')?.value || '#302b63',
      text: document.getElementById('custom-text')?.value || '#ffffff'
    };
    
    if (typeof applyCustomTheme === 'function') {
      applyCustomTheme(customTheme);
    }
    
    addNotification(t('notifications.customThemeApplied'), 'success');
  });
}

// شفافیت کارت‌ها
const glassOpacity = document.getElementById('glass-opacity');
const glassOpacityValue = document.getElementById('glass-opacity-value');

if (glassOpacity) {
  glassOpacity.addEventListener('input', (e) => {
    const value = e.target.value;
    if (glassOpacityValue) {
      glassOpacityValue.textContent = `${value}%`;
    }
    
    if (typeof setGlassOpacity === 'function') {
      setGlassOpacity(parseInt(value));
    }
  });
}

// انیمیشن‌ها
const settingsAnimations = document.getElementById('settings-animations');
if (settingsAnimations) {
  settingsAnimations.addEventListener('change', (e) => {
    const settings = JSON.parse(localStorage.getItem('orbit-settings') || '{}');
    settings.animations = e.target.checked;
    localStorage.setItem('orbit-settings', JSON.stringify(settings));
    
    document.body.classList.toggle('reduce-motion', !e.target.checked);
  });
}

// ===================================
// ۲۸. Language Settings (تنظیمات زبان)
// ===================================
document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const lang = e.currentTarget.dataset.lang;
    
    document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
    e.currentTarget.classList.add('active');
    
    applyLanguage(lang);
    
    const settings = JSON.parse(localStorage.getItem('orbit-settings') || '{}');
    settings.language = lang;
    localStorage.setItem('orbit-settings', JSON.stringify(settings));
    
    // به‌روزرسانی همه متن‌ها
    updateGreeting();
    renderCalendar();
    loadTasks();
    loadHabits();
    loadLinks();
    updateStats();
    
    addNotification(t('notifications.languageChanged'), 'success');
  });
});

// تقویم
document.querySelectorAll('.calendar-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const calendar = e.currentTarget.dataset.calendar;
    
    document.querySelectorAll('.calendar-btn').forEach(b => b.classList.remove('active'));
    e.currentTarget.classList.add('active');
    
    const settings = JSON.parse(localStorage.getItem('orbit-settings') || '{}');
    settings.calendar = calendar;
    localStorage.setItem('orbit-settings', JSON.stringify(settings));
    
    renderCalendar();
    updateClock();
    
    addNotification(t('notifications.calendarChanged'), 'success');
  });
});

// فرمت اعداد
const numberFormat = document.getElementById('number-format');
if (numberFormat) {
  numberFormat.addEventListener('change', (e) => {
    const settings = JSON.parse(localStorage.getItem('orbit-settings') || '{}');
    settings.numberFormat = e.target.value;
    localStorage.setItem('orbit-settings', JSON.stringify(settings));
    
    // به‌روزرایی همه اعداد
    updateClock();
    updateStats();
    loadTasks();
    renderCalendar();
    
    addNotification(t('notifications.numberFormatChanged'), 'success');
  });
}

// فرمت ساعت
document.querySelectorAll('input[name="time-format"]').forEach(radio => {
  radio.addEventListener('change', (e) => {
    const settings = JSON.parse(localStorage.getItem('orbit-settings') || '{}');
    settings.timeFormat = e.target.value;
    localStorage.setItem('orbit-settings', JSON.stringify(settings));
    
    updateClock();
    
    addNotification(t('notifications.timeFormatChanged'), 'success');
  });
});

// دکمه اعمال تغییرات زبان
const saveLanguageBtn = document.getElementById('save-language');
if (saveLanguageBtn) {
  saveLanguageBtn.addEventListener('click', () => {
    addNotification(t('notifications.settingsApplied'), 'success');
  });
}

// ===================================
// ۲۹. General Settings (تنظیمات عمومی)
// ===================================
const saveGeneralBtn = document.getElementById('save-general');
if (saveGeneralBtn) {
  saveGeneralBtn.addEventListener('click', () => {
    const settings = JSON.parse(localStorage.getItem('orbit-settings') || '{}');
    
    // نام
    const name = document.getElementById('settings-name')?.value.trim();
    if (name) {
      localStorage.setItem('orbit-user-name', name);
      updateGreeting();
    }
    
    // پومودورو
    const pomodoroDuration = parseInt(document.getElementById('settings-pomodoro')?.value || 25);
    const breakDuration = parseInt(document.getElementById('settings-break')?.value || 5);
    
    settings.pomodoroDuration = pomodoroDuration;
    settings.breakDuration = breakDuration;
    
    pomodoroDuration_global = pomodoroDuration * 60;
    breakDuration_global = breakDuration * 60;
    
    if (!isPomodoroRunning) {
      pomodoroTime = pomodoroDuration * 60;
      pomodoroDuration = pomodoroDuration * 60;
      breakDuration = breakDuration * 60;
      updatePomodoroDisplay();
    }
    
    // اعلان‌ها
    settings.pomodoroNotif = document.getElementById('settings-notif-pomodoro')?.checked !== false;
    settings.soundNotif = document.getElementById('settings-notif-sound')?.checked !== false;
    settings.browserNotif = document.getElementById('settings-notif-browser')?.checked === true;
    
    localStorage.setItem('orbit-settings', JSON.stringify(settings));
    
    addNotification(t('notifications.generalSettingsSaved'), 'success');
  });
}

// ===================================
// ۳۰. Accessibility Settings (تنظیمات دسترسی‌پذیری)
// ===================================
// اندازه فونت
document.querySelectorAll('.font-size-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const size = e.currentTarget.dataset.size;
    
    document.querySelectorAll('.font-size-btn').forEach(b => b.classList.remove('active'));
    e.currentTarget.classList.add('active');
    
    document.body.classList.remove('font-small', 'font-medium', 'font-large', 'font-xlarge');
    document.body.classList.add(`font-${size}`);
    
    const settings = JSON.parse(localStorage.getItem('orbit-settings') || '{}');
    settings.fontSize = size;
    localStorage.setItem('orbit-settings', JSON.stringify(settings));
  });
});

// کنتراست بالا
const highContrast = document.getElementById('settings-high-contrast');
if (highContrast) {
  highContrast.addEventListener('change', (e) => {
    document.body.classList.toggle('high-contrast', e.target.checked);
    
    const settings = JSON.parse(localStorage.getItem('orbit-settings') || '{}');
    settings.highContrast = e.target.checked;
    localStorage.setItem('orbit-settings', JSON.stringify(settings));
  });
}

// کاهش حرکت
const reduceMotion = document.getElementById('settings-reduce-motion');
if (reduceMotion) {
  reduceMotion.addEventListener('change', (e) => {
    document.body.classList.toggle('reduce-motion', e.target.checked);
    
    const settings = JSON.parse(localStorage.getItem('orbit-settings') || '{}');
    settings.reduceMotion = e.target.checked;
    localStorage.setItem('orbit-settings', JSON.stringify(settings));
  });
}

// حالت کوررنگی
const colorBlindMode = document.getElementById('color-blind-mode');
if (colorBlindMode) {
  colorBlindMode.addEventListener('change', (e) => {
    document.body.classList.remove('deuteranopia', 'protanopia', 'tritanopia');
    
    if (e.target.value !== 'none') {
      document.body.classList.add(e.target.value);
    }
    
    const settings = JSON.parse(localStorage.getItem('orbit-settings') || '{}');
    settings.colorBlindMode = e.target.value;
    localStorage.setItem('orbit-settings', JSON.stringify(settings));
  });
}

// دکمه ذخیره دسترسی‌پذیری
const saveAccessibilityBtn = document.getElementById('save-accessibility');
if (saveAccessibilityBtn) {
  saveAccessibilityBtn.addEventListener('click', () => {
    addNotification(t('notifications.accessibilitySettingsSaved'), 'success');
  });
}

// ===================================
// ۳۱. Keyboard Shortcuts (میانبرهای کیبورد)
// ===================================
document.addEventListener('keydown', (e) => {
  // Ctrl+K: Command Palette
  if (e.ctrlKey && e.key === 'k') {
    e.preventDefault();
    openCommandPalette();
    return;
  }
  
  // Ctrl+/: Help
  if (e.ctrlKey && e.key === '/') {
    e.preventDefault();
    const shortcutsModal = document.getElementById('shortcuts-modal');
    if (shortcutsModal) {
      shortcutsModal.classList.toggle('hidden');
    }
    return;
  }
  
  // اگر در input یا textarea هستیم، میانبرها کار نکنند
  if (e.target.matches('input, textarea, select')) {
    return;
  }
  
  // /: Search
  if (e.key === '/') {
    e.preventDefault();
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      searchInput.focus();
    }
    return;
  }
  
  // S: Settings
  if (e.key === 's' || e.key === 'S') {
    e.preventDefault();
    if (settingsBtn) {
      settingsBtn.click();
    }
    return;
  }
  
  // F: Focus Mode
  if (e.key === 'f' || e.key === 'F') {
    e.preventDefault();
    if (focusBtn) {
      focusBtn.click();
    }
    return;
  }
  
  // T: Theme Toggle
  if (e.key === 't' || e.key === 'T') {
    e.preventDefault();
    const settings = JSON.parse(localStorage.getItem('orbit-settings') || '{}');
    const currentMode = settings.themeMode || 'dark';
    const newMode = currentMode === 'dark' ? 'light' : 'dark';
    if (typeof setThemeMode === 'function') {
      setThemeMode(newMode);
    }
    return;
  }
  
  // L: Language Quick Switch
  if (e.key === 'l' || e.key === 'L') {
    e.preventDefault();
    const languageQuickSwitch = document.getElementById('language-quick-switch');
    if (languageQuickSwitch) {
      languageQuickSwitch.click();
    }
    return;
  }
  
  // N: Notifications
  if (e.key === 'n' || e.key === 'N') {
    e.preventDefault();
    if (notificationsBtn) {
      notificationsBtn.click();
    }
    return;
  }
  
  // ?: Help
  if (e.key === '?') {
    e.preventDefault();
    const shortcutsModal = document.getElementById('shortcuts-modal');
    if (shortcutsModal) {
      shortcutsModal.classList.toggle('hidden');
    }
    return;
  }
  
  // Esc: Close all modals
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal').forEach(m => m.classList.add('hidden'));
    if (settingsPanel) settingsPanel.classList.add('hidden');
    if (focusMode) focusMode.classList.add('hidden');
    if (ambientPanel) ambientPanel.classList.add('hidden');
    if (notificationCenter) notificationCenter.classList.add('hidden');
    closeCommandPalette();
  }
});

// Language Quick Switch
const languageQuickSwitch = document.getElementById('language-quick-switch');
if (languageQuickSwitch) {
  languageQuickSwitch.addEventListener('click', () => {
    const settings = JSON.parse(localStorage.getItem('orbit-settings') || '{}');
    const currentLang = settings.language || 'fa';
    const languages = ['fa', 'en', 'ar', 'fr', 'es', 'de', 'tr', 'zh', 'ja', 'ko', 'ru', 'it'];
    const currentIndex = languages.indexOf(currentLang);
    const nextIndex = (currentIndex + 1) % languages.length;
    const nextLang = languages[nextIndex];
    
    applyLanguage(nextLang);
    
    settings.language = nextLang;
    localStorage.setItem('orbit-settings', JSON.stringify(settings));
    
    updateGreeting();
    renderCalendar();
    loadTasks();
    loadHabits();
    loadLinks();
    updateStats();
    
    addNotification(`${t('notifications.languageChanged')}: ${nextLang.toUpperCase()}`, 'success');
  });
}

// Theme Quick Toggle
const themeBtn = document.getElementById('theme-btn');
if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    const settings = JSON.parse(localStorage.getItem('orbit-settings') || '{}');
    const currentMode = settings.themeMode || 'dark';
    const newMode = currentMode === 'dark' ? 'light' : 'dark';
    
    if (typeof setThemeMode === 'function') {
      setThemeMode(newMode);
    }
    
    settings.themeMode = newMode;
    localStorage.setItem('orbit-settings', JSON.stringify(settings));
    
    addNotification(t('notifications.themeModeApplied'), 'success');
  });
}

// Shortcuts Modal
const shortcutsModal = document.getElementById('shortcuts-modal');
const closeShortcutsBtn = document.getElementById('close-shortcuts');

if (closeShortcutsBtn) {
  closeShortcutsBtn.addEventListener('click', () => {
    if (shortcutsModal) {
      shortcutsModal.classList.add('hidden');
    }
  });
}

// ===================================
// ۳۲. Command Palette
// ===================================
const commandPalette = document.getElementById('command-palette');
const commandInput = document.getElementById('command-input');
const commandList = document.getElementById('command-list');
const commandBtn = document.getElementById('command-btn');

const commands = [
  { 
    name: { fa: '🔍 جستجو در گوگل', en: '🔍 Search Google' }, 
    action: () => document.getElementById('search-input')?.focus() 
  },
  { 
    name: { fa: '⚙️ باز کردن تنظیمات', en: '⚙️ Open Settings' }, 
    action: () => settingsBtn?.click() 
  },
  { 
    name: { fa: '🎯 حالت تمرکز', en: '🎯 Focus Mode' }, 
    action: () => focusBtn?.click() 
  },
  { 
    name: { fa: '🌓 تغییر تم', en: '🌓 Toggle Theme' }, 
    action: () => themeBtn?.click() 
  },
  { 
    name: { fa: '🌐 تغییر زبان', en: '🌐 Change Language' }, 
    action: () => languageQuickSwitch?.click() 
  },
  { 
    name: { fa: '🔔 اعلان‌ها', en: '🔔 Notifications' }, 
    action: () => notificationsBtn?.click() 
  },
  { 
    name: { fa: '➕ افزودن وظیفه', en: '➕ Add Task' }, 
    action: () => taskInput?.focus() 
  },
  { 
    name: { fa: '⏱️ شروع پومودورو', en: '⏱️ Start Pomodoro' }, 
    action: () => startPomodoro() 
  },
  { 
    name: { fa: '💡 نقل قول جدید', en: '💡 New Quote' }, 
    action: () => getRandomQuote(currentCategory) 
  },
  { 
    name: { fa: '🌤️ به‌روزرسانی آب‌وهوا', en: '🌤️ Refresh Weather' }, 
    action: () => getWeather() 
  },
  { 
    name: { fa: '📝 یادداشت', en: '📝 Quick Note' }, 
    action: () => quickNote?.focus() 
  },
  { 
    name: { fa: '🎯 افزودن عادت', en: '🎯 Add Habit' }, 
    action: () => addHabitBtn?.click() 
  },
  { 
    name: { fa: '🔗 افزودن لینک', en: '🔗 Add Link' }, 
    action: () => addLinkBtn?.click() 
  },
  { 
    name: { fa: '📥 خروجی داده‌ها', en: '📥 Export Data' }, 
    action: () => exportDataBtn?.click() 
  },
  { 
    name: { fa: '🖨️ چاپ وظایف', en: '🖨️ Print Tasks' }, 
    action: () => window.print() 
  }
];

function openCommandPalette() {
  if (commandPalette) {
    commandPalette.classList.remove('hidden');
  }
  if (commandInput) {
    commandInput.value = '';
    commandInput.focus();
  }
  renderCommands('');
}

function closeCommandPalette() {
  if (commandPalette) {
    commandPalette.classList.add('hidden');
  }
}

function renderCommands(searchTerm) {
  if (!commandList) return;
  
  const lang = getCurrentLanguage();
  
  const filtered = commands.filter(cmd => {
    const name = cmd.name[lang] || cmd.name.en;
    return name.toLowerCase().includes(searchTerm.toLowerCase());
  });
  
  commandList.innerHTML = '';
  selectedCommandIndex = 0;
  
  filtered.forEach((cmd, index) => {
    const li = document.createElement('li');
    li.textContent = cmd.name[lang] || cmd.name.en;
    if (index === 0) li.classList.add('selected');
    
    li.addEventListener('click', () => {
      cmd.action();
      closeCommandPalette();
    });
    
    commandList.appendChild(li);
  });
  
  // ذخیره filtered برای استفاده در keydown
  commandList.dataset.filteredCount = filtered.length;
  commandList.filteredCommands = filtered;
}

if (commandInput) {
  commandInput.addEventListener('input', (e) => {
    renderCommands(e.target.value);
  });
  
  commandInput.addEventListener('keydown', (e) => {
    const items = commandList?.querySelectorAll('li') || [];
    
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      selectedCommandIndex = Math.min(selectedCommandIndex + 1, items.length - 1);
      items.forEach((item, i) => {
        item.classList.toggle('selected', i === selectedCommandIndex);
      });
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      selectedCommandIndex = Math.max(selectedCommandIndex - 1, 0);
      items.forEach((item, i) => {
        item.classList.toggle('selected', i === selectedCommandIndex);
      });
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const filtered = commandList.filteredCommands || [];
      if (filtered[selectedCommandIndex]) {
        filtered[selectedCommandIndex].action();
        closeCommandPalette();
      }
    } else if (e.key === 'Escape') {
      closeCommandPalette();
    }
  });
}

if (commandBtn) {
  commandBtn.addEventListener('click', openCommandPalette);
}

// بستن Command Palette با کلیک بیرون
if (commandPalette) {
  commandPalette.addEventListener('click', (e) => {
    if (e.target === commandPalette) {
      closeCommandPalette();
    }
  });
}

// ===================================
// ۳۳. PWA Support
// ===================================
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  const installBtn = document.getElementById('install-pwa');
  if (installBtn) {
    installBtn.classList.remove('hidden');
  }
});

const installPwaBtn = document.getElementById('install-pwa');
if (installPwaBtn) {
  installPwaBtn.addEventListener('click', async () => {
    if (!deferredPrompt) return;
    
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      addNotification(t('notifications.appInstalled'), 'success');
    }
    
    deferredPrompt = null;
    installPwaBtn.classList.add('hidden');
  });
}

// ===================================
// ۳۴. Stars Background Animation
// ===================================
const starsCanvas = document.getElementById('stars-canvas');
const starsCtx = starsCanvas ? starsCanvas.getContext('2d') : null;

function resizeStarsCanvas() {
  if (!starsCanvas) return;
  starsCanvas.width = window.innerWidth;
  starsCanvas.height = window.innerHeight;
}

resizeStarsCanvas();
window.addEventListener('resize', resizeStarsCanvas);

const stars = [];
const numStars = 150;

for (let i = 0; i < numStars; i++) {
  stars.push({
    x: Math.random() * (starsCanvas?.width || 1000),
    y: Math.random() * (starsCanvas?.height || 1000),
    radius: Math.random() * 1.5,
    opacity: Math.random(),
    speed: Math.random() * 0.5 + 0.1
  });
}

function animateStars() {
  if (!starsCtx || !starsCanvas) {
    requestAnimationFrame(animateStars);
    return;
  }
  
  starsCtx.clearRect(0, 0, starsCanvas.width, starsCanvas.height);
  
  stars.forEach(star => {
    star.opacity += star.speed * 0.01;
    if (star.opacity > 1 || star.opacity < 0) {
      star.speed = -star.speed;
    }
    
    starsCtx.beginPath();
    starsCtx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    starsCtx.fillStyle = `rgba(255, 255, 255, ${Math.abs(star.opacity)})`;
    starsCtx.fill();
  });
  
  requestAnimationFrame(animateStars);
}

animateStars();

// ===================================
// ۳۵. Print Tasks
// ===================================
const printTasksBtn = document.getElementById('print-tasks');
if (printTasksBtn) {
  printTasksBtn.addEventListener('click', () => {
    window.print();
  });
}

// ===================================
// ۳۶. Search Form
// ===================================
const searchForm = document.getElementById('search-form');
if (searchForm) {
  searchForm.addEventListener('submit', (e) => {
    const searchInput = document.getElementById('search-input');
    if (searchInput && !searchInput.value.trim()) {
      e.preventDefault();
    }
  });
}

// ===================================
// ۳۷. Apply Saved Settings on Load
// ===================================
function applySavedSettings() {
  const settings = JSON.parse(localStorage.getItem('orbit-settings') || '{}');
  
  // Font Size
  if (settings.fontSize) {
    document.body.classList.add(`font-${settings.fontSize}`);
  }
  
  // High Contrast
  if (settings.highContrast) {
    document.body.classList.add('high-contrast');
  }
  
  // Reduce Motion
  if (settings.reduceMotion || settings.animations === false) {
    document.body.classList.add('reduce-motion');
  }
  
  // Color Blind Mode
  if (settings.colorBlindMode && settings.colorBlindMode !== 'none') {
    document.body.classList.add(settings.colorBlindMode);
  }
  
  // Pomodoro Duration
  if (settings.pomodoroDuration) {
    pomodoroDuration = settings.pomodoroDuration * 60;
    pomodoroTime = pomodoroDuration;
    updatePomodoroDisplay();
  }
  
  if (settings.breakDuration) {
    breakDuration = settings.breakDuration * 60;
  }
}

applySavedSettings();

// ===================================
// ۳۸. Console Message
// ===================================
console.log('%c🪐 Orbit Dashboard', 'font-size: 30px; font-weight: bold; color: #7c3aed;');
console.log('%cMK', 'font-size: 14px; color: #a78bfa;');
console.log('%cنسخه 2.0 - Global Edition', 'font-size: 12px; color: #a78bfa;');
console.log('%cمیانبرها: Ctrl+K | / | S | F | T | L | N | ?', 'font-size: 12px; color: #a78bfa;');
// ===================================
// Orbit Dashboard - Part 4 (Final)
// Voice Commands, Easter Eggs, Performance, Error Handling
// ===================================

// ===================================
// ۳۹. Voice Commands (دستورات صوتی)
// ===================================
const voiceBtn = document.getElementById('voice-btn');
let recognition = null;
let isListening = false;

function initVoiceRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  
  if (!SpeechRecognition) {
    console.warn('Speech Recognition not supported');
    if (voiceBtn) {
      voiceBtn.style.opacity = '0.5';
      voiceBtn.title = 'Voice not supported';
    }
    return;
  }
  
  recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
  
  recognition.onstart = () => {
    isListening = true;
    if (voiceBtn) {
      voiceBtn.style.background = 'var(--danger)';
      voiceBtn.style.transform = 'scale(1.2)';
    }
    addNotification(t('notifications.listening') || '🎤 Listening...', 'info');
  };
  
  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript.toLowerCase().trim();
    processVoiceCommand(transcript);
  };
  
  recognition.onerror = (event) => {
    console.error('Speech recognition error:', event.error);
    isListening = false;
    if (voiceBtn) {
      voiceBtn.style.background = '';
      voiceBtn.style.transform = '';
    }
    
    if (event.error === 'not-allowed') {
      addNotification(t('notifications.micDenied') || 'Microphone access denied', 'error');
    } else {
      addNotification(t('notifications.voiceError') || 'Voice recognition error', 'error');
    }
  };
  
  recognition.onend = () => {
    isListening = false;
    if (voiceBtn) {
      voiceBtn.style.background = '';
      voiceBtn.style.transform = '';
    }
  };
}

function startVoiceCommand() {
  if (!recognition) {
    initVoiceRecognition();
  }
  
  if (!recognition) {
    addNotification(t('notifications.voiceNotSupported') || 'Voice not supported', 'warning');
    return;
  }
  
  if (isListening) {
    recognition.stop();
    return;
  }
  
  // تنظیم زبان بر اساس زبان فعلی
  const lang = getCurrentLanguage();
  const langMap = {
    fa: 'fa-IR',
    en: 'en-US',
    ar: 'ar-SA',
    fr: 'fr-FR',
    es: 'es-ES',
    de: 'de-DE',
    tr: 'tr-TR',
    zh: 'zh-CN',
    ja: 'ja-JP',
    ko: 'ko-KR',
    ru: 'ru-RU',
    it: 'it-IT'
  };
  
  recognition.lang = langMap[lang] || 'en-US';
  
  try {
    recognition.start();
  } catch (error) {
    console.error('Error starting recognition:', error);
  }
}

function processVoiceCommand(command) {
  addNotification(`🎤 "${command}"`, 'info');
  
  const lang = getCurrentLanguage();
  
  // دستورات فارسی
  if (lang === 'fa') {
    if (command.includes('وظیفه') || command.includes('اضافه') || command.includes('تسک')) {
      if (taskInput) taskInput.focus();
      return;
    }
    if (command.includes('پومودورو') || command.includes('شروع') || command.includes('تمرکز')) {
      startPomodoro();
      return;
    }
    if (command.includes('تنظیمات') || command.includes('تنظیم')) {
      if (settingsBtn) settingsBtn.click();
      return;
    }
    if (command.includes('جستجو') || command.includes('سرچ') || command.includes('گوگل')) {
      const searchInput = document.getElementById('search-input');
      if (searchInput) searchInput.focus();
      return;
    }
    if (command.includes('تم') || command.includes('رنگ') || command.includes('حالت')) {
      if (themeBtn) themeBtn.click();
      return;
    }
    if (command.includes('یادداشت') || command.includes('نوت')) {
      if (quickNote) quickNote.focus();
      return;
    }
    if (command.includes('اعلان') || command.includes('نوتیفیکیشن')) {
      if (notificationsBtn) notificationsBtn.click();
      return;
    }
  }
  
  // دستورات انگلیسی (همیشه فعال)
  if (command.includes('task') || command.includes('add') || command.includes('todo')) {
    if (taskInput) taskInput.focus();
    return;
  }
  if (command.includes('pomodoro') || command.includes('start') || command.includes('focus')) {
    startPomodoro();
    return;
  }
  if (command.includes('setting') || command.includes('config')) {
    if (settingsBtn) settingsBtn.click();
    return;
  }
  if (command.includes('search') || command.includes('google') || command.includes('find')) {
    const searchInput = document.getElementById('search-input');
    if (searchInput) searchInput.focus();
    return;
  }
  if (command.includes('theme') || command.includes('dark') || command.includes('light')) {
    if (themeBtn) themeBtn.click();
    return;
  }
  if (command.includes('note') || command.includes('write')) {
    if (quickNote) quickNote.focus();
    return;
  }
  if (command.includes('notification') || command.includes('alert')) {
    if (notificationsBtn) notificationsBtn.click();
    return;
  }
  if (command.includes('weather') || command.includes('temperature')) {
    getWeather();
    return;
  }
  if (command.includes('quote') || command.includes('inspiration')) {
    getRandomQuote(currentCategory);
    return;
  }
  if (command.includes('print')) {
    window.print();
    return;
  }
  if (command.includes('help') || command.includes('shortcut')) {
    const shortcutsModal = document.getElementById('shortcuts-modal');
    if (shortcutsModal) shortcutsModal.classList.toggle('hidden');
    return;
  }
  
  addNotification(t('notifications.commandNotRecognized') || 'Command not recognized', 'warning');
}

if (voiceBtn) {
  voiceBtn.addEventListener('click', startVoiceCommand);
  initVoiceRecognition();
}

// ===================================
// ۴۰. Easter Eggs
// ===================================
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let easterEggActive = false;

document.addEventListener('keydown', (e) => {
  konamiCode.push(e.key);
  if (konamiCode.length > konamiSequence.length) {
    konamiCode.shift();
  }
  
  if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
    activateEasterEgg();
    konamiCode = [];
  }
});

function activateEasterEgg() {
  if (easterEggActive) return;
  easterEggActive = true;
  
  // انیمیشن رنگین‌کمان
  document.body.style.animation = 'rainbow 3s linear infinite';
  
  // اضافه کردن CSS انیمیشن
  const style = document.createElement('style');
  style.id = 'easter-egg-style';
  style.textContent = `
    @keyframes rainbow {
      0% { filter: hue-rotate(0deg); }
      100% { filter: hue-rotate(360deg); }
    }
  `;
  document.head.appendChild(style);
  
  // کانفتی بزرگ
  for (let i = 0; i < 5; i++) {
    setTimeout(() => triggerConfetti(), i * 300);
  }
  
  addNotification('🎉🌈 You found the secret! Konami Code activated!', 'success');
  
  // غیرفعال کردن بعد از ۱۰ ثانیه
  setTimeout(() => {
    document.body.style.animation = '';
    const easterStyle = document.getElementById('easter-egg-style');
    if (easterStyle) easterStyle.remove();
    easterEggActive = false;
  }, 10000);
}

// Easter Egg: کلیک روی لوگو
const logo = document.querySelector('.logo');
if (logo) {
  let logoClickCount = 0;
  let logoClickTimer = null;
  
  logo.addEventListener('click', () => {
    logoClickCount++;
    
    if (logoClickTimer) clearTimeout(logoClickTimer);
    
    logoClickTimer = setTimeout(() => {
      logoClickCount = 0;
    }, 2000);
    
    if (logoClickCount >= 5) {
      logoClickCount = 0;
      triggerConfetti();
      addNotification('🪐 Orbit loves you! ❤️', 'success');
    }
  });
}

// ===================================
// ۴۱. Performance Optimization
// ===================================

// Debounce Function
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle Function
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Lazy Load Images (اگر تصاویری اضافه شود)
function lazyLoadImages() {
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
}

// Optimize Resize Events
const optimizedResize = throttle(() => {
  resizeStarsCanvas();
  if (confettiCanvas) {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
  }
}, 200);

window.addEventListener('resize', optimizedResize);

// Optimize Scroll Events
const optimizedScroll = throttle(() => {
  // می‌توان افکت‌های اسکرول اضافه کرد
}, 100);

window.addEventListener('scroll', optimizedScroll, { passive: true });

// ===================================
// ۴۲. Offline Detection
// ===================================
function updateOnlineStatus() {
  if (!navigator.onLine) {
    addNotification(t('notifications.offline') || '📡 You are offline. Some features may not work.', 'warning');
    document.body.classList.add('offline');
  } else {
    document.body.classList.remove('offline');
    // بارگذاری مجدد داده‌ها
    getWeather();
    loadCountries();
  }
}

window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);

// بررسی اولیه
if (!navigator.onLine) {
  updateOnlineStatus();
}

// ===================================
// ۴۳. Auto-Save Settings (ذخیره خودکار)
// ===================================
const autoSaveSettings = debounce(() => {
  const settings = JSON.parse(localStorage.getItem('orbit-settings') || '{}');
  settings.lastSaved = new Date().toISOString();
  localStorage.setItem('orbit-settings', JSON.stringify(settings));
}, 1000);

// ===================================
// ۴۴. Usage Analytics (آمار استفاده)
// ===================================
function trackUsage() {
  const stats = JSON.parse(localStorage.getItem('orbit-stats') || '{}');
  
  if (!stats.usage) {
    stats.usage = {
      totalVisits: 0,
      firstVisit: new Date().toISOString(),
      lastVisit: new Date().toISOString(),
      totalSessionTime: 0
    };
  }
  
  stats.usage.totalVisits++;
  stats.usage.lastVisit = new Date().toISOString();
  
  localStorage.setItem('orbit-stats', JSON.stringify(stats));
}

trackUsage();

// محاسبه زمان جلسه
let sessionStartTime = Date.now();

window.addEventListener('beforeunload', () => {
  const stats = JSON.parse(localStorage.getItem('orbit-stats') || '{}');
  if (stats.usage) {
    stats.usage.totalSessionTime += Math.floor((Date.now() - sessionStartTime) / 1000);
    localStorage.setItem('orbit-stats', JSON.stringify(stats));
  }
});

// ===================================
// ۴۵. Error Handling نهایی
// ===================================
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
  
  // لاگ خطا در LocalStorage برای دیباگ
  const errors = JSON.parse(localStorage.getItem('orbit-errors') || '[]');
  errors.unshift({
    message: event.message,
    filename: event.filename,
    lineno: event.lineno,
    colno: event.colno,
    time: new Date().toISOString()
  });
  
  // فقط ۱۰ خطای آخر
  if (errors.length > 10) errors.pop();
  
  localStorage.setItem('orbit-errors', JSON.stringify(errors));
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
});

// ===================================
// ۴۶. Cleanup Functions
// ===================================
function cleanup() {
  // پاک کردن interval ها
  if (pomodoroInterval) clearInterval(pomodoroInterval);
  if (breathingInterval) clearTimeout(breathingInterval);
  
  // پاک کردن audio
  if (ambientAudio) {
    ambientAudio.pause();
    ambientAudio = null;
  }
  
  // پاک کردن recognition
  if (recognition && isListening) {
    recognition.stop();
  }
  
  console.log('🧹 Cleanup completed');
}

window.addEventListener('beforeunload', cleanup);

// ===================================
// ۴۷. Dark/Light Mode Auto-Detection
// ===================================
function checkAutoTheme() {
  const settings = JSON.parse(localStorage.getItem('orbit-settings') || '{}');
  
  if (settings.themeMode === 'auto') {
    const hour = new Date().getHours();
    const isDay = hour >= 6 && hour < 18;
    const themeName = settings.theme || 'cosmic';
    
    if (typeof applyTheme === 'function') {
      applyTheme(themeName, isDay ? 'light' : 'dark');
    }
  }
}

// بررسی هر ساعت
setInterval(checkAutoTheme, 60 * 60 * 1000);
checkAutoTheme();

// ===================================
// ۴۸. Onboarding Tour (راهنمای اولیه)
// ===================================
function showOnboardingTour() {
  const settings = JSON.parse(localStorage.getItem('orbit-settings') || '{}');
  
  if (settings.tourCompleted) return;
  
  const tourSteps = [
    {
      element: '.header-card',
      message: { fa: '👋 به Orbit خوش آمدید! این ساعت و تاریخ شماست.', en: '👋 Welcome to Orbit! This is your clock and date.' }
    },
    {
      element: '.search-card',
      message: { fa: '🔍 از اینجا می‌توانید در گوگل جستجو کنید.', en: '🔍 Search Google from here.' }
    },
    {
      element: '.weather-card',
      message: { fa: '🌤️ آب و هوای شهر شما اینجا نمایش داده می‌شود.', en: '🌤️ Your city weather is shown here.' }
    },
    {
      element: '.tasks-card',
      message: { fa: '📋 وظایف روزانه خود را اینجا مدیریت کنید.', en: '📋 Manage your daily tasks here.' }
    },
    {
      element: '.top-controls',
      message: { fa: '⚙️ از اینجا به تنظیمات، تم و زبان دسترسی دارید.', en: '⚙️ Access settings, theme and language from here.' }
    }
  ];
  
  let currentStep = 0;
  const lang = getCurrentLanguage();
  
  function showStep() {
    if (currentStep >= tourSteps.length) {
      settings.tourCompleted = true;
      localStorage.setItem('orbit-settings', JSON.stringify(settings));
      return;
    }
    
    const step = tourSteps[currentStep];
    const element = document.querySelector(step.element);
    const message = step.message[lang] || step.message.en;
    
    if (element) {
      element.style.outline = '3px solid var(--accent)';
      element.style.outlineOffset = '5px';
      element.style.transition = 'outline 0.3s ease';
      
      addNotification(message, 'info');
      
      setTimeout(() => {
        element.style.outline = '';
        element.style.outlineOffset = '';
        currentStep++;
        showStep();
      }, 4000);
    } else {
      currentStep++;
      showStep();
    }
  }
  
  // شروع تور بعد از ۳ ثانیه
  setTimeout(showStep, 3000);
}

// نمایش تور فقط برای اولین بار
setTimeout(() => {
  if (localStorage.getItem('orbit-visited')) {
    showOnboardingTour();
  }
}, 5000);

// ===================================
// ۴۹. Service Worker Registration (PWA)
// ===================================
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // اگر فایل sw.js دارید، اینجا ثبت کنید
    // navigator.serviceWorker.register('/sw.js')
    //   .then(reg => console.log('SW registered:', reg))
    //   .catch(err => console.log('SW registration failed:', err));
  });
}

// ===================================
// ۵۰. Keyboard Navigation Enhancement
// ===================================
document.addEventListener('keydown', (e) => {
  // Tab Navigation برای کارت‌ها
  if (e.key === 'Tab') {
    document.body.classList.add('keyboard-nav');
  }
});

document.addEventListener('mousedown', () => {
  document.body.classList.remove('keyboard-nav');
});

// ===================================
// ۵۱. Dynamic Title Update
// ===================================
function updatePageTitle() {
  const tasks = JSON.parse(localStorage.getItem('orbit-tasks') || '[]');
  const completedTasks = tasks.filter(t => t.completed).length;
  const totalTasks = tasks.length;
  
  if (totalTasks > 0) {
    document.title = `Orbit 🪐 | ${completedTasks}/${totalTasks}`;
  } else {
    document.title = 'Orbit 🪐 | Dashboard';
  }
}

updatePageTitle();
setInterval(updatePageTitle, 5000);

// ===================================
// ۵۲. Visibility Change Handler
// ===================================
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    // صفحه مخفی شده - کاهش مصرف منابع
    console.log('📱 Page hidden - reducing resource usage');
  } else {
    // صفحه نمایش داده شده - به‌روزرسانی داده‌ها
    console.log('👁️ Page visible - refreshing data');
    updateClock();
    getWeather();
    updateWorldClock();
  }
});

// ===================================
// ۵۳. Touch Gestures (برای موبایل)
// ===================================
let touchStartX = 0;
let touchStartY = 0;

document.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
  touchStartY = e.changedTouches[0].screenY;
}, { passive: true });

document.addEventListener('touchend', (e) => {
  const touchEndX = e.changedTouches[0].screenX;
  const touchEndY = e.changedTouches[0].screenY;
  
  const diffX = touchEndX - touchStartX;
  const diffY = touchEndY - touchStartY;
  
  // Swipe Left (باز کردن تنظیمات)
  if (Math.abs(diffX) > 100 && Math.abs(diffX) > Math.abs(diffY)) {
    if (diffX < 0) {
      // Swipe Left
      if (settingsBtn) settingsBtn.click();
    } else {
      // Swipe Right (بستن تنظیمات)
      if (settingsPanel && !settingsPanel.classList.contains('hidden')) {
        settingsPanel.classList.add('hidden');
      }
    }
  }
  
  // Swipe Down (به‌روزرسانی آب‌وهوا)
  if (diffY > 100 && Math.abs(diffY) > Math.abs(diffX)) {
    getWeather();
    addNotification(t('notifications.weatherRefreshed') || 'Weather refreshed', 'info');
  }
}, { passive: true });

// ===================================
// ۵۴. Context Menu Enhancement
// ===================================
document.addEventListener('contextmenu', (e) => {
  // غیرفعال کردن منوی راست‌کلیک روی دکمه‌ها
  if (e.target.closest('button, .icon-btn, .btn-primary, .btn-secondary')) {
    e.preventDefault();
  }
});

// ===================================
// ۵۵. Copy to Clipboard Utility
// ===================================
function copyToClipboard(text) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      addNotification(t('notifications.copied') || 'Copied to clipboard!', 'success');
    }).catch(err => {
      console.error('Copy failed:', err);
    });
  } else {
    // Fallback
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    addNotification(t('notifications.copied') || 'Copied to clipboard!', 'success');
  }
}

// ===================================
// ۵۶. Notification Permission Handler
// ===================================
async function requestNotificationPermission() {
  if (!('Notification' in window)) return;
  
  if (Notification.permission === 'default') {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      addNotification(t('notifications.notifEnabled') || 'Notifications enabled!', 'success');
    }
  }
}

// درخواست اجازه بعد از ۱۰ ثانیه
setTimeout(requestNotificationPermission, 10000);

// ===================================
// ۵۷. Data Migration (از نسخه‌های قبلی)
// ===================================
function migrateData() {
  const settings = JSON.parse(localStorage.getItem('orbit-settings') || '{}');
  const dataVersion = settings.dataVersion || '1.0';
  
  if (dataVersion === '1.0') {
    console.log('🔄 Migrating data from v1.0 to v2.0...');
    
    // مهاجرت داده‌ها از نسخه ۱ به ۲
    const oldTasks = localStorage.getItem('orbit-tasks');
    if (oldTasks) {
      try {
        const tasks = JSON.parse(oldTasks);
        const migratedTasks = tasks.map(task => ({
          id: task.id || Date.now() + Math.random(),
          text: task.text,
          completed: task.completed || false,
          priority: task.priority || 'medium',
          dueDate: task.dueDate || '',
          category: task.category || 'other',
          createdAt: task.createdAt || new Date().toISOString()
        }));
        localStorage.setItem('orbit-tasks', JSON.stringify(migratedTasks));
      } catch (e) {
        console.error('Migration error:', e);
      }
    }
    
    settings.dataVersion = '2.0';
    localStorage.setItem('orbit-settings', JSON.stringify(settings));
    console.log('✅ Data migration completed');
  }
}

migrateData();

// ===================================
// ۵۸. Memory Management
// ===================================
function cleanupOldData() {
  // پاک کردن اعلان‌های قدیمی (بیشتر از ۷ روز)
  const notifications = JSON.parse(localStorage.getItem('orbit-notifications') || '[]');
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
  
  const filteredNotifs = notifications.filter(n => n.time > sevenDaysAgo);
  
  if (filteredNotifs.length !== notifications.length) {
    localStorage.setItem('orbit-notifications', JSON.stringify(filteredNotifs));
    renderNotifications();
  }
  
  // پاک کردن آمار قدیمی (بیشتر از ۳۰ روز)
  const stats = JSON.parse(localStorage.getItem('orbit-stats') || '{}');
  if (stats.history) {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    stats.history = stats.history.filter(h => h.date > thirtyDaysAgo);
    localStorage.setItem('orbit-stats', JSON.stringify(stats));
  }
  
  // پاک کردن خطاهای قدیمی
  const errors = JSON.parse(localStorage.getItem('orbit-errors') || '[]');
  if (errors.length > 10) {
    localStorage.setItem('orbit-errors', JSON.stringify(errors.slice(0, 10)));
  }
}

// پاکسازی هر روز
setInterval(cleanupOldData, 24 * 60 * 60 * 1000);
cleanupOldData();

// ===================================
// ۵۹. Accessibility Enhancement
// ===================================
// Skip to main content
document.addEventListener('keydown', (e) => {
  if (e.key === 'Tab' && e.shiftKey) {
    // Shift+Tab - backward navigation
  }
});

// Announce dynamic content changes
function announceToScreenReader(message) {
  const announcer = document.createElement('div');
  announcer.setAttribute('role', 'status');
  announcer.setAttribute('aria-live', 'polite');
  announcer.className = 'sr-only';
  announcer.textContent = message;
  document.body.appendChild(announcer);
  
  setTimeout(() => {
    announcer.remove();
  }, 1000);
}

// ===================================
// ۶۰. Final Initialization
// ===================================
function finalInit() {
  console.log('🚀 Final initialization...');
  
  // به‌روزرسانی همه بخش‌ها
  updateClock();
  updateGreeting();
  getWeather();
  loadTasks();
  loadHabits();
  loadLinks();
  renderCalendar();
  updateStats();
  updateWorldClock();
  renderNotifications();
  
  // اعمال تنظیمات ذخیره شده
  applySavedSettings();
  
  console.log('✅ Orbit Dashboard fully initialized!');
  console.log('📊 Version: 2.0 - Global Edition');
  console.log('🌐 Languages: 12');
  console.log('🎨 Themes: 10 + Custom');
  console.log('⌨️ Shortcuts: Ctrl+K | / | S | F | T | L | N | ?');
}

// اجرای نهایی
setTimeout(finalInit, 2000);

