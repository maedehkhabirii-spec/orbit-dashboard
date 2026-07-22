// ===================================
// سیستم چندزبانه Orbit (i18n)
// پشتیبانی از ۱۲ زبان
// ===================================

const translations = {
  // ===================================
  // 🇮🇷 فارسی
  // ===================================
  fa: {
    loading: {
      text: 'در حال آماده‌سازی داشبورد شما...'
    },
    welcome: {
      title: '👋 به Orbit خوش آمدید!',
      description: 'داشبورد شخصی شما آماده است. بیایید چند تنظیم اولیه انجام دهیم:',
      name: 'نام شما:',
      namePlaceholder: 'مثلاً: علی',
      country: 'کشور شما:',
      selectCountry: 'انتخاب کشور...',
      language: 'زبان:',
      start: 'شروع کنیم! 🚀'
    },
    command: {
      placeholder: '🔍 دستور یا جستجو...',
      hint: '⬆️⬇️ برای حرکت | Enter برای اجرا | Esc برای بستن'
    },
    notifications: {
      title: '🔔 اعلان‌ها',
      clearAll: 'پاک کردن همه'
    },
    settings: {
      title: '⚙️ تنظیمات',
      save: 'ذخیره',
      tabs: {
        location: '📍 مکان',
        weather: '🌡️ آب‌وهوا',
        appearance: '🎨 ظاهر',
        language: '🌐 زبان',
        general: '⚙️ عمومی',
        accessibility: '♿ دسترسی‌پذیری',
        privacy: '🔒 حریم خصوصی'
      },
      location: {
        country: '🌍 کشور:',
        state: '🏙️ استان/ایالت:',
        city: '🏘️ شهر (اختیاری):',
        cityPlaceholder: 'مثلاً: تهران',
        gps: '📡 تشخیص خودکار موقعیت با GPS',
        worldClock: '🕐 ساعت جهانی (حداکثر ۵ منطقه):',
        addClock: '+ افزودن منطقه زمانی',
        loading: 'در حال بارگذاری...',
        selectCountryFirst: 'ابتدا کشور را انتخاب کنید'
      },
      weather: {
        tempUnit: '🌡️ واحد دما:',
        celsius: 'سلسیوس (°C)',
        fahrenheit: 'فارنهایت (°F)',
        details: '📊 جزئیات آب‌وهوا:',
        humidity: '💧 رطوبت',
        wind: '💨 سرعت باد',
        pressure: '🌬️ فشار هوا',
        visibility: '👁️ دید افقی',
        sunrise: '🌅 طلوع و غروب',
        forecast: '📅 پیش‌بینی:',
        '5days': '۵ روز',
        '7days': '۷ روز'
      },
      appearance: {
        theme: '🎨 تم‌های از پیش تعریف شده:',
        customTheme: '⚫ تم سفارشی:',
        accentColor: 'رنگ اصلی:',
        bgColor: 'رنگ پس‌زمینه:',
        secondaryColor: 'رنگ ثانویه:',
        textColor: 'رنگ متن:',
        applyCustom: 'اعمال تم سفارشی',
        mode: '🌓 حالت:',
        dark: '🌙 تاریک',
        light: '☀️ روشن',
        auto: '🔄 خودکار',
        glassOpacity: '💎 شفافیت کارت‌ها:',
        animations: '✨ انیمیشن‌ها',
        sounds: '🔊 صداهای رابط کاربری'
      },
      language: {
        select: '🌐 زبان برنامه:',
        calendar: '📅 تقویم:',
        persian: '📅 شمسی',
        gregorian: '📆 میلادی',
        islamic: '🕌 قمری',
        numberFormat: '🔢 فرمت اعداد:',
        persianNumbers: '۱۲۳ (فارسی)',
        englishNumbers: '123 (English)',
        arabicNumbers: '١٢٣ (عربی)',
        timeFormat: '🕐 فرمت ساعت:',
        '24hour': '۲۴ ساعته (14:30)',
        '12hour': '۱۲ ساعته (2:30 PM)',
        apply: 'اعمال تغییرات'
      },
      general: {
        name: '👤 نام شما:',
        namePlaceholder: 'نام شما',
        pomodoro: '⏱️ مدت پومودورو (دقیقه):',
        break: '☕ مدت استراحت (دقیقه):',
        notifications: '🔔 اعلان‌ها:',
        pomodoroNotif: 'اعلان پایان پومودورو',
        soundNotif: 'صدای اعلان',
        browserNotif: 'اعلان مرورگر'
      },
      accessibility: {
        fontSize: '🔤 اندازه فونت:',
        small: 'کوچک',
        medium: 'متوسط',
        large: 'بزرگ',
        xlarge: 'خیلی بزرگ',
        highContrast: '🎭 کنتراست بالا',
        reduceMotion: '🚫 کاهش حرکت (غیرفعال کردن انیمیشن‌ها)',
        colorBlind: '🎨 حالت کوررنگی:',
        none: 'بدون',
        deuteranopia: 'دوترانوپی (سبز-قرمز)',
        protanopia: 'پروتانوپی (قرمز-سبز)',
        tritanopia: 'تریتانوپی (آبی-زرد)'
      },
      privacy: {
        dataManagement: '💾 مدیریت داده‌ها',
        export: '📥 خروجی داده‌ها (JSON)',
        import: '📤 وارد کردن داده‌ها:',
        storage: '📊 فضای ذخیره‌سازی',
        dangerZone: '⚠️ منطقه خطر',
        clearAll: '🗑️ پاک کردن همه داده‌ها'
      }
    },
    greeting: {
      default: 'سلام!',
      morning: 'صبح بخیر',
      afternoon: 'ظهر بخیر',
      evening: 'عصر بخیر',
      night: 'شب بخیر'
    },
    date: {
      loading: 'در حال بارگذاری...'
    },
    worldClock: {
      title: '🕐 ساعت جهانی'
    },
    search: {
      placeholder: '🔍 در گوگل جستجو کنید... (کلید /)',
      button: 'جستجو'
    },
    weather: {
      title: '🌤️ آب و هوا',
      loading: 'در حال دریافت...'
    },
    pomodoro: {
      title: '⏱️ پومودورو',
      ready: 'آماده برای تمرکز',
      start: 'شروع',
      reset: 'ریست',
      today: 'امروز:',
      sessions: 'جلسه'
    },
    quote: {
      title: '💡 نقل‌قول روز',
      loading: 'در حال بارگذاری...',
      new: 'نقل قول جدید'
    },
    calendar: {
      title: '📅 تقویم'
    },
    habits: {
      title: '🎯 عادت‌های روزانه',
      add: '+ افزودن عادت'
    },
    notes: {
      title: '📝 یادداشت سریع',
      placeholder: 'هر چیزی که می‌خوای یادت نره اینجا بنویس...',
      hint: '💾 خودکار ذخیره می‌شود'
    },
    links: {
      title: '🔗 لینک‌های سریع',
      add: '+ افزودن لینک'
    },
    stats: {
      title: '📊 آمار امروز',
      tasksCompleted: 'وظیفه انجام شده',
      pomodoroSessions: 'جلسه پومودورو',
      habitsCompleted: 'عادت انجام شده',
      focusMinutes: 'دقیقه تمرکز'
    },
    tasks: {
      title: '📋 وظایف امروز',
      search: '🔍 جستجو در وظایف...',
      placeholder: 'وظیفه جدید... (Enter برای افزودن)',
      add: '+ افزودن',
      count: '0 وظیفه',
      print: '🖨️ چاپ',
      priority: {
        low: '🟢 پایین',
        medium: '🟡 متوسط',
        high: '🔴 بالا'
      },
      category: {
        work: '💼 کار',
        personal: '👤 شخصی',
        study: '📚 مطالعه',
        health: '💪 سلامت',
        other: '📌 سایر'
      },
      filters: {
        all: 'همه',
        active: 'فعال',
        completed: 'انجام شده',
        high: '🔴 اولویت بالا',
        today: '📅 امروز'
      }
    },
    footer: {
      madeWith: 'ساخته شده با ❤️ توسط',
      github: 'گیت‌هاب',
      linkedin: 'لینکدین',
      shortcuts: '💡 میانبرهای کیبورد: <kbd>Ctrl+K</kbd> Command | <kbd>/</kbd> جستجو | <kbd>S</kbd> تنظیمات | <kbd>F</kbd> تمرکز | <kbd>L</kbd> زبان'
    },
    modals: {
      save: 'ذخیره',
      cancel: 'انصراف',
      link: {
        title: 'لینک جدید',
        namePlaceholder: 'نام (مثلاً: گیت‌هاب)',
        urlPlaceholder: 'آدرس (مثلاً: github.com)'
      },
      habit: {
        title: 'عادت جدید',
        namePlaceholder: 'نام عادت (مثلاً: ورزش)',
        iconPlaceholder: 'ایموجی (مثلاً: 🏃)'
      },
      worldClock: {
        title: 'افزودن منطقه زمانی',
        namePlaceholder: 'نام (مثلاً: نیویورک)',
        selectTimezone: 'انتخاب منطقه زمانی...'
      }
    },
    focus: {
      status: 'در حال تمرکز...',
      exit: 'خروج از حالت تمرکز (Esc)'
    },
    themes: {
      cosmic: '🌌 Cosmic',
      ocean: '🌊 Ocean',
      sunset: '🌅 Sunset',
      forest: '🌲 Forest',
      rose: '🌹 Rose',
      midnight: '🌙 Midnight',
      golden: '☀️ Golden',
      lava: '🔥 Lava',
      sakura: '🌸 Sakura',
      mint: '🍀 Mint'
    }
  },

  // ===================================
  // 🇬🇧 English
  // ===================================
  en: {
    loading: {
      text: 'Preparing your dashboard...'
    },
    welcome: {
      title: '👋 Welcome to Orbit!',
      description: 'Your personal dashboard is ready. Let\'s do some initial setup:',
      name: 'Your name:',
      namePlaceholder: 'e.g., John',
      country: 'Your country:',
      selectCountry: 'Select country...',
      language: 'Language:',
      start: 'Let\'s start! 🚀'
    },
    command: {
      placeholder: '🔍 Command or search...',
      hint: '⬆️⬇️ to navigate | Enter to execute | Esc to close'
    },
    notifications: {
      title: '🔔 Notifications',
      clearAll: 'Clear all'
    },
    settings: {
      title: '⚙️ Settings',
      save: 'Save',
      tabs: {
        location: '📍 Location',
        weather: '🌡️ Weather',
        appearance: '🎨 Appearance',
        language: '🌐 Language',
        general: '⚙️ General',
        accessibility: '♿ Accessibility',
        privacy: '🔒 Privacy'
      },
      location: {
        country: '🌍 Country:',
        state: '🏙️ State/Province:',
        city: '🏘️ City (optional):',
        cityPlaceholder: 'e.g., New York',
        gps: '📡 Auto-detect location with GPS',
        worldClock: '🕐 World Clock (max 5 zones):',
        addClock: '+ Add timezone',
        loading: 'Loading...',
        selectCountryFirst: 'Select a country first'
      },
      weather: {
        tempUnit: '🌡️ Temperature unit:',
        celsius: 'Celsius (°C)',
        fahrenheit: 'Fahrenheit (°F)',
        details: '📊 Weather details:',
        humidity: '💧 Humidity',
        wind: '💨 Wind speed',
        pressure: '🌬️ Pressure',
        visibility: '👁️ Visibility',
        sunrise: '🌅 Sunrise & Sunset',
        forecast: '📅 Forecast:',
        '5days': '5 days',
        '7days': '7 days'
      },
      appearance: {
        theme: '🎨 Preset themes:',
        customTheme: '⚫ Custom theme:',
        accentColor: 'Accent color:',
        bgColor: 'Background color:',
        secondaryColor: 'Secondary color:',
        textColor: 'Text color:',
        applyCustom: 'Apply custom theme',
        mode: '🌓 Mode:',
        dark: '🌙 Dark',
        light: '☀️ Light',
        auto: '🔄 Auto',
        glassOpacity: '💎 Card opacity:',
        animations: '✨ Animations',
        sounds: '🔊 UI sounds'
      },
      language: {
        select: '🌐 App language:',
        calendar: '📅 Calendar:',
        persian: '📅 Persian',
        gregorian: '📆 Gregorian',
        islamic: '🕌 Islamic',
        numberFormat: '🔢 Number format:',
        persianNumbers: '۱۲۳ (Persian)',
        englishNumbers: '123 (English)',
        arabicNumbers: '١٢٣ (Arabic)',
        timeFormat: '🕐 Time format:',
        '24hour': '24-hour (14:30)',
        '12hour': '12-hour (2:30 PM)',
        apply: 'Apply changes'
      },
      general: {
        name: '👤 Your name:',
        namePlaceholder: 'Your name',
        pomodoro: '⏱️ Pomodoro duration (minutes):',
        break: '☕ Break duration (minutes):',
        notifications: '🔔 Notifications:',
        pomodoroNotif: 'Pomodoro end notification',
        soundNotif: 'Notification sound',
        browserNotif: 'Browser notification'
      },
      accessibility: {
        fontSize: '🔤 Font size:',
        small: 'Small',
        medium: 'Medium',
        large: 'Large',
        xlarge: 'Extra Large',
        highContrast: '🎭 High contrast',
        reduceMotion: '🚫 Reduce motion (disable animations)',
        colorBlind: '🎨 Color blindness mode:',
        none: 'None',
        deuteranopia: 'Deuteranopia (green-red)',
        protanopia: 'Protanopia (red-green)',
        tritanopia: 'Tritanopia (blue-yellow)'
      },
      privacy: {
        dataManagement: '💾 Data management',
        export: '📥 Export data (JSON)',
        import: '📤 Import data:',
        storage: '📊 Storage space',
        dangerZone: '⚠️ Danger zone',
        clearAll: '🗑️ Clear all data'
      }
    },
    greeting: {
      default: 'Hello!',
      morning: 'Good morning',
      afternoon: 'Good afternoon',
      evening: 'Good evening',
      night: 'Good night'
    },
    date: {
      loading: 'Loading...'
    },
    worldClock: {
      title: '🕐 World Clock'
    },
    search: {
      placeholder: '🔍 Search in Google... (key /)',
      button: 'Search'
    },
    weather: {
      title: '🌤️ Weather',
      loading: 'Loading...'
    },
    pomodoro: {
      title: '⏱️ Pomodoro',
      ready: 'Ready to focus',
      start: 'Start',
      reset: 'Reset',
      today: 'Today:',
      sessions: 'sessions'
    },
    quote: {
      title: '💡 Quote of the day',
      loading: 'Loading...',
      new: 'New quote'
    },
    calendar: {
      title: '📅 Calendar'
    },
    habits: {
      title: '🎯 Daily habits',
      add: '+ Add habit'
    },
    notes: {
      title: '📝 Quick note',
      placeholder: 'Write anything you don\'t want to forget here...',
      hint: '💾 Auto-saved'
    },
    links: {
      title: '🔗 Quick links',
      add: '+ Add link'
    },
    stats: {
      title: '📊 Today\'s stats',
      tasksCompleted: 'Tasks completed',
      pomodoroSessions: 'Pomodoro sessions',
      habitsCompleted: 'Habits completed',
      focusMinutes: 'Focus minutes'
    },
    tasks: {
      title: '📋 Today\'s tasks',
      search: '🔍 Search tasks...',
      placeholder: 'New task... (Enter to add)',
      add: '+ Add',
      count: '0 tasks',
      print: '🖨️ Print',
      priority: {
        low: '🟢 Low',
        medium: '🟡 Medium',
        high: '🔴 High'
      },
      category: {
        work: '💼 Work',
        personal: '👤 Personal',
        study: '📚 Study',
        health: '💪 Health',
        other: '📌 Other'
      },
      filters: {
        all: 'All',
        active: 'Active',
        completed: 'Completed',
        high: '🔴 High priority',
        today: '📅 Today'
      }
    },
    footer: {
      madeWith: 'Made with ❤️ by',
      github: 'GitHub',
      linkedin: 'LinkedIn',
      shortcuts: '💡 Keyboard shortcuts: <kbd>Ctrl+K</kbd> Command | <kbd>/</kbd> Search | <kbd>S</kbd> Settings | <kbd>F</kbd> Focus | <kbd>L</kbd> Language'
    },
    modals: {
      save: 'Save',
      cancel: 'Cancel',
      link: {
        title: 'New link',
        namePlaceholder: 'Name (e.g., GitHub)',
        urlPlaceholder: 'URL (e.g., github.com)'
      },
      habit: {
        title: 'New habit',
        namePlaceholder: 'Habit name (e.g., Exercise)',
        iconPlaceholder: 'Emoji (e.g., 🏃)'
      },
      worldClock: {
        title: 'Add timezone',
        namePlaceholder: 'Name (e.g., New York)',
        selectTimezone: 'Select timezone...'
      }
    },
    focus: {
      status: 'Focusing...',
      exit: 'Exit focus mode (Esc)'
    },
    themes: {
      cosmic: '🌌 Cosmic',
      ocean: '🌊 Ocean',
      sunset: '🌅 Sunset',
      forest: '🌲 Forest',
      rose: '🌹 Rose',
      midnight: '🌙 Midnight',
      golden: '☀️ Golden',
      lava: '🔥 Lava',
      sakura: '🌸 Sakura',
      mint: '🍀 Mint'
    }
  },

  // ===================================
  // 🇸🇦 العربية
  // ===================================
  ar: {
    loading: { text: 'جاري تحضير لوحة التحكم...' },
    welcome: {
      title: '👋 مرحباً بك في Orbit!',
      description: 'لوحة التحكم الشخصية الخاصة بك جاهزة. دعنا نقوم ببعض الإعدادات الأولية:',
      name: 'اسمك:',
      namePlaceholder: 'مثلاً: أحمد',
      country: 'بلدك:',
      selectCountry: 'اختر البلد...',
      language: 'اللغة:',
      start: 'لنبدأ! 🚀'
    },
    command: { placeholder: '🔍 أمر أو بحث...', hint: '⬆️⬇️ للتنقل | Enter للتنفيذ | Esc للإغلاق' },
    notifications: { title: '🔔 الإشعارات', clearAll: 'مسح الكل' },
    settings: {
      title: '⚙️ الإعدادات',
      save: 'حفظ',
      tabs: { location: '📍 الموقع', weather: '🌡️ الطقس', appearance: '🎨 المظهر', language: '🌐 اللغة', general: '⚙️ عام', accessibility: '♿ إمكانية الوصول', privacy: '🔒 الخصوصية' },
      location: { country: '🌍 البلد:', state: '🏙️ الولاية/المقاطعة:', city: '🏘️ المدينة (اختياري):', cityPlaceholder: 'مثلاً: القاهرة', gps: '📡 اكتشاف الموقع تلقائياً باستخدام GPS', worldClock: '🕐 الساعة العالمية (بحد أقصى 5 مناطق):', addClock: '+ إضافة منطقة زمنية', loading: 'جاري التحميل...', selectCountryFirst: 'اختر بلداً أولاً' },
      weather: { tempUnit: '🌡️ وحدة درجة الحرارة:', celsius: 'سلسيوس (°C)', fahrenheit: 'فهرنهايت (°F)', details: '📊 تفاصيل الطقس:', humidity: '💧 الرطوبة', wind: '💨 سرعة الرياح', pressure: '🌬️ الضغط', visibility: '👁️ الرؤية', sunrise: '🌅 شروق وغروب', forecast: '📅 التوقعات:', '5days': '5 أيام', '7days': '7 أيام' },
      appearance: { theme: '🎨 السمات المحددة مسبقاً:', customTheme: '⚫ سمة مخصصة:', accentColor: 'لون التمييز:', bgColor: 'لون الخلفية:', secondaryColor: 'اللون الثانوي:', textColor: 'لون النص:', applyCustom: 'تطبيق السمة المخصصة', mode: '🌓 الوضع:', dark: '🌙 داكن', light: '☀️ فاتح', auto: '🔄 تلقائي', glassOpacity: '💎 شفافية البطاقات:', animations: '✨ الرسوم المتحركة', sounds: '🔊 أصوات الواجهة' },
      language: { select: '🌐 لغة التطبيق:', calendar: '📅 التقويم:', persian: '📅 فارسي', gregorian: '📆 ميلادي', islamic: '🕌 هجري', numberFormat: '🔢 تنسيق الأرقام:', persianNumbers: '۱۲۳ (فارسي)', englishNumbers: '123 (إنجليزي)', arabicNumbers: '١٢٣ (عربي)', timeFormat: '🕐 تنسيق الوقت:', '24hour': '24 ساعة (14:30)', '12hour': '12 ساعة (2:30 م)', apply: 'تطبيق التغييرات' },
      general: { name: '👤 اسمك:', namePlaceholder: 'اسمك', pomodoro: '⏱️ مدة بومودورو (دقائق):', break: '☕ مدة الاستراحة (دقائق):', notifications: '🔔 الإشعارات:', pomodoroNotif: 'إشعار نهاية بومودورو', soundNotif: 'صوت الإشعار', browserNotif: 'إشعار المتصفح' },
      accessibility: { fontSize: '🔤 حجم الخط:', small: 'صغير', medium: 'متوسط', large: 'كبير', xlarge: 'كبير جداً', highContrast: '🎭 تباين عالي', reduceMotion: '🚫 تقليل الحركة', colorBlind: '🎨 وضع عمى الألوان:', none: 'بدون', deuteranopia: 'ديوتيرانوبيا', protanopia: 'بروتانوبيا', tritanopia: 'تريتانونيا' },
      privacy: { dataManagement: '💾 إدارة البيانات', export: '📥 تصدير البيانات (JSON)', import: '📤 استيراد البيانات:', storage: '📊 مساحة التخزين', dangerZone: '⚠️ منطقة الخطر', clearAll: '🗑️ مسح جميع البيانات' }
    },
    greeting: { default: 'مرحباً!', morning: 'صباح الخير', afternoon: 'مساء الخير', evening: 'مساء الخير', night: 'تصبح على خير' },
    date: { loading: 'جاري التحميل...' },
    worldClock: { title: '🕐 الساعة العالمية' },
    search: { placeholder: '🔍 ابحث في جوجل... (مفتاح /)', button: 'بحث' },
    weather: { title: '🌤️ الطقس', loading: 'جاري التحميل...' },
    pomodoro: { title: '⏱️ بومودورو', ready: 'جاهز للتركيز', start: 'بدء', reset: 'إعادة تعيين', today: 'اليوم:', sessions: 'جلسات' },
    quote: { title: '💡 اقتباس اليوم', loading: 'جاري التحميل...', new: 'اقتباس جديد' },
    calendar: { title: '📅 التقويم' },
    habits: { title: '🎯 العادات اليومية', add: '+ إضافة عادة' },
    notes: { title: '📝 ملاحظة سريعة', placeholder: 'اكتب أي شيء لا تريد نسيانه هنا...', hint: '💾 حفظ تلقائي' },
    links: { title: '🔗 روابط سريعة', add: '+ إضافة رابط' },
    stats: { title: '📊 إحصائيات اليوم', tasksCompleted: 'مهام مكتملة', pomodoroSessions: 'جلسات بومودورو', habitsCompleted: 'عادات مكتملة', focusMinutes: 'دقائق التركيز' },
    tasks: {
      title: '📋 مهام اليوم',
      search: '🔍 البحث في المهام...',
      placeholder: 'مهمة جديدة... (Enter للإضافة)',
      add: '+ إضافة',
      count: '0 مهام',
      print: '🖨️ طباعة',
      priority: { low: '🟢 منخفض', medium: '🟡 متوسط', high: '🔴 عالي' },
      category: { work: '💼 عمل', personal: '👤 شخصي', study: '📚 دراسة', health: '💪 صحة', other: '📌 أخرى' },
      filters: { all: 'الكل', active: 'نشط', completed: 'مكتمل', high: '🔴 أولوية عالية', today: '📅 اليوم' }
    },
    footer: { madeWith: 'صنع بـ ❤️ بواسطة', github: 'جيت هاب', linkedin: 'لينكد إن', shortcuts: '💡 اختصارات لوحة المفاتيح: <kbd>Ctrl+K</kbd> أمر | <kbd>/</kbd> بحث | <kbd>S</kbd> إعدادات | <kbd>F</kbd> تركيز | <kbd>L</kbd> لغة' },
    modals: {
      save: 'حفظ', cancel: 'إلغاء',
      link: { title: 'رابط جديد', namePlaceholder: 'الاسم (مثلاً: جيت هاب)', urlPlaceholder: 'الرابط (مثلاً: github.com)' },
      habit: { title: 'عادة جديدة', namePlaceholder: 'اسم العادة (مثلاً: تمرين)', iconPlaceholder: 'رمز تعبيري (مثلاً: 🏃)' },
      worldClock: { title: 'إضافة منطقة زمنية', namePlaceholder: 'الاسم (مثلاً: نيويورك)', selectTimezone: 'اختر المنطقة الزمنية...' }
    },
    focus: { status: 'جاري التركيز...', exit: 'الخروج من وضع التركيز (Esc)' },
    themes: { cosmic: '🌌 كوني', ocean: '🌊 محيط', sunset: '🌅 غروب', forest: '🌲 غابة', rose: '🌹 وردة', midnight: '🌙 منتصف الليل', golden: '☀️ ذهبي', lava: '🔥 حمم', sakura: '🌸 ساكورا', mint: '🍀 نعناع' }
  },

  // ===================================
  // 🇫🇷 Français
  // ===================================
  fr: {
    loading: { text: 'Préparation de votre tableau de bord...' },
    welcome: {
      title: '👋 Bienvenue sur Orbit !',
      description: 'Votre tableau de bord personnel est prêt. Faisons quelques configurations initiales :',
      name: 'Votre nom :',
      namePlaceholder: 'ex : Jean',
      country: 'Votre pays :',
      selectCountry: 'Sélectionner un pays...',
      language: 'Langue :',
      start: 'Commençons ! 🚀'
    },
    command: { placeholder: '🔍 Commande ou recherche...', hint: '⬆️⬇️ pour naviguer | Entrée pour exécuter | Esc pour fermer' },
    notifications: { title: '🔔 Notifications', clearAll: 'Tout effacer' },
    settings: {
      title: '⚙️ Paramètres',
      save: 'Enregistrer',
      tabs: { location: '📍 Emplacement', weather: '🌡️ Météo', appearance: '🎨 Apparence', language: '🌐 Langue', general: '⚙️ Général', accessibility: '♿ Accessibilité', privacy: '🔒 Confidentialité' },
      location: { country: '🌍 Pays :', state: '🏙️ État/Province :', city: '🏘️ Ville (optionnel) :', cityPlaceholder: 'ex : Paris', gps: '📡 Détection automatique par GPS', worldClock: '🕐 Horloge mondiale (max 5 zones) :', addClock: '+ Ajouter un fuseau horaire', loading: 'Chargement...', selectCountryFirst: 'Sélectionnez d\'abord un pays' },
      weather: { tempUnit: '🌡️ Unité de température :', celsius: 'Celsius (°C)', fahrenheit: 'Fahrenheit (°F)', details: '📊 Détails météo :', humidity: '💧 Humidité', wind: '💨 Vitesse du vent', pressure: '🌬️ Pression', visibility: '👁️ Visibilité', sunrise: '🌅 Lever et coucher du soleil', forecast: '📅 Prévisions :', '5days': '5 jours', '7days': '7 jours' },
      appearance: { theme: '🎨 Thèmes prédéfinis :', customTheme: '⚫ Thème personnalisé :', accentColor: 'Couleur d\'accent :', bgColor: 'Couleur de fond :', secondaryColor: 'Couleur secondaire :', textColor: 'Couleur du texte :', applyCustom: 'Appliquer le thème personnalisé', mode: '🌓 Mode :', dark: '🌙 Sombre', light: '☀️ Clair', auto: '🔄 Auto', glassOpacity: '💎 Opacité des cartes :', animations: '✨ Animations', sounds: '🔊 Sons de l\'interface' },
      language: { select: '🌐 Langue de l\'application :', calendar: '📅 Calendrier :', persian: '📅 Persan', gregorian: '📆 Grégorien', islamic: '🕌 Islamique', numberFormat: '🔢 Format des nombres :', persianNumbers: '۱۲۳ (Persan)', englishNumbers: '123 (Anglais)', arabicNumbers: '١٢٣ (Arabe)', timeFormat: '🕐 Format de l\'heure :', '24hour': '24 heures (14:30)', '12hour': '12 heures (14:30)', apply: 'Appliquer les modifications' },
      general: { name: '👤 Votre nom :', namePlaceholder: 'Votre nom', pomodoro: '⏱️ Durée Pomodoro (minutes) :', break: '☕ Durée de pause (minutes) :', notifications: '🔔 Notifications :', pomodoroNotif: 'Notification de fin Pomodoro', soundNotif: 'Son de notification', browserNotif: 'Notification du navigateur' },
      accessibility: { fontSize: '🔤 Taille de police :', small: 'Petit', medium: 'Moyen', large: 'Grand', xlarge: 'Très grand', highContrast: '🎭 Contraste élevé', reduceMotion: '🚫 Réduire les mouvements', colorBlind: '🎨 Mode daltonisme :', none: 'Aucun', deuteranopia: 'Deutéranopie', protanopia: 'Protanopie', tritanopia: 'Tritanopie' },
      privacy: { dataManagement: '💾 Gestion des données', export: '📥 Exporter les données (JSON)', import: '📤 Importer les données :', storage: '📊 Espace de stockage', dangerZone: '⚠️ Zone dangereuse', clearAll: '🗑️ Effacer toutes les données' }
    },
    greeting: { default: 'Bonjour !', morning: 'Bonjour', afternoon: 'Bon après-midi', evening: 'Bonsoir', night: 'Bonne nuit' },
    date: { loading: 'Chargement...' },
    worldClock: { title: '🕐 Horloge mondiale' },
    search: { placeholder: '🔍 Rechercher sur Google... (touche /)', button: 'Rechercher' },
    weather: { title: '🌤️ Météo', loading: 'Chargement...' },
    pomodoro: { title: '⏱️ Pomodoro', ready: 'Prêt à se concentrer', start: 'Démarrer', reset: 'Réinitialiser', today: 'Aujourd\'hui :', sessions: 'sessions' },
    quote: { title: '💡 Citation du jour', loading: 'Chargement...', new: 'Nouvelle citation' },
    calendar: { title: '📅 Calendrier' },
    habits: { title: '🎯 Habitudes quotidiennes', add: '+ Ajouter une habitude' },
    notes: { title: '📝 Note rapide', placeholder: 'Écrivez tout ce que vous ne voulez pas oublier ici...', hint: '💾 Sauvegarde automatique' },
    links: { title: '🔗 Liens rapides', add: '+ Ajouter un lien' },
    stats: { title: '📊 Statistiques du jour', tasksCompleted: 'Tâches terminées', pomodoroSessions: 'Sessions Pomodoro', habitsCompleted: 'Habitudes terminées', focusMinutes: 'Minutes de concentration' },
    tasks: {
      title: '📋 Tâches du jour',
      search: '🔍 Rechercher des tâches...',
      placeholder: 'Nouvelle tâche... (Entrée pour ajouter)',
      add: '+ Ajouter',
      count: '0 tâches',
      print: '🖨️ Imprimer',
      priority: { low: '🟢 Basse', medium: '🟡 Moyenne', high: '🔴 Haute' },
      category: { work: '💼 Travail', personal: '👤 Personnel', study: '📚 Étude', health: '💪 Santé', other: '📌 Autre' },
      filters: { all: 'Toutes', active: 'Actives', completed: 'Terminées', high: '🔴 Priorité haute', today: '📅 Aujourd\'hui' }
    },
    footer: { madeWith: 'Fait avec ❤️ par', github: 'GitHub', linkedin: 'LinkedIn', shortcuts: '💡 Raccourcis clavier : <kbd>Ctrl+K</kbd> Commande | <kbd>/</kbd> Recherche | <kbd>S</kbd> Paramètres | <kbd>F</kbd> Focus | <kbd>L</kbd> Langue' },
    modals: {
      save: 'Enregistrer', cancel: 'Annuler',
      link: { title: 'Nouveau lien', namePlaceholder: 'Nom (ex : GitHub)', urlPlaceholder: 'URL (ex : github.com)' },
      habit: { title: 'Nouvelle habitude', namePlaceholder: 'Nom de l\'habitude (ex : Exercice)', iconPlaceholder: 'Emoji (ex : 🏃)' },
      worldClock: { title: 'Ajouter un fuseau horaire', namePlaceholder: 'Nom (ex : New York)', selectTimezone: 'Sélectionner un fuseau horaire...' }
    },
    focus: { status: 'Concentration...', exit: 'Quitter le mode focus (Esc)' },
    themes: { cosmic: '🌌 Cosmique', ocean: '🌊 Océan', sunset: '🌅 Coucher de soleil', forest: '🌲 Forêt', rose: '🌹 Rose', midnight: '🌙 Minuit', golden: '☀️ Doré', lava: '🔥 Lave', sakura: '🌸 Sakura', mint: '🍀 Menthe' }
  },

  // ===================================
  // 🇪🇸 Español
  // ===================================
  es: {
    loading: { text: 'Preparando tu panel...' },
    welcome: {
      title: '👋 ¡Bienvenido a Orbit!',
      description: 'Tu panel personal está listo. Hagamos una configuración inicial:',
      name: 'Tu nombre:',
      namePlaceholder: 'ej: Juan',
      country: 'Tu país:',
      selectCountry: 'Seleccionar país...',
      language: 'Idioma:',
      start: '¡Empecemos! 🚀'
    },
    command: { placeholder: '🔍 Comando o búsqueda...', hint: '⬆️⬇️ para navegar | Enter para ejecutar | Esc para cerrar' },
    notifications: { title: '🔔 Notificaciones', clearAll: 'Borrar todo' },
    settings: {
      title: '⚙️ Configuración',
      save: 'Guardar',
      tabs: { location: '📍 Ubicación', weather: '🌡️ Clima', appearance: '🎨 Apariencia', language: '🌐 Idioma', general: '⚙️ General', accessibility: '♿ Accesibilidad', privacy: '🔒 Privacidad' },
      location: { country: '🌍 País:', state: '🏙️ Estado/Provincia:', city: '🏘️ Ciudad (opcional):', cityPlaceholder: 'ej: Madrid', gps: '📡 Detección automática por GPS', worldClock: '🕐 Reloj mundial (máx 5 zonas):', addClock: '+ Agregar zona horaria', loading: 'Cargando...', selectCountryFirst: 'Selecciona un país primero' },
      weather: { tempUnit: '🌡️ Unidad de temperatura:', celsius: 'Celsius (°C)', fahrenheit: 'Fahrenheit (°F)', details: '📊 Detalles del clima:', humidity: '💧 Humedad', wind: '💨 Velocidad del viento', pressure: '🌬️ Presión', visibility: '👁️ Visibilidad', sunrise: '🌅 Amanecer y atardecer', forecast: '📅 Pronóstico:', '5days': '5 días', '7days': '7 días' },
      appearance: { theme: '🎨 Temas predefinidos:', customTheme: '⚫ Tema personalizado:', accentColor: 'Color de acento:', bgColor: 'Color de fondo:', secondaryColor: 'Color secundario:', textColor: 'Color del texto:', applyCustom: 'Aplicar tema personalizado', mode: '🌓 Modo:', dark: '🌙 Oscuro', light: '☀️ Claro', auto: '🔄 Auto', glassOpacity: '💎 Opacidad de tarjetas:', animations: '✨ Animaciones', sounds: '🔊 Sonidos de la interfaz' },
      language: { select: '🌐 Idioma de la app:', calendar: '📅 Calendario:', persian: '📅 Persa', gregorian: '📆 Gregoriano', islamic: '🕌 Islámico', numberFormat: '🔢 Formato de números:', persianNumbers: '۱۲۳ (Persa)', englishNumbers: '123 (Inglés)', arabicNumbers: '١٢٣ (Árabe)', timeFormat: '🕐 Formato de hora:', '24hour': '24 horas (14:30)', '12hour': '12 horas (2:30 PM)', apply: 'Aplicar cambios' },
      general: { name: '👤 Tu nombre:', namePlaceholder: 'Tu nombre', pomodoro: '⏱️ Duración Pomodoro (minutos):', break: '☕ Duración del descanso (minutos):', notifications: '🔔 Notificaciones:', pomodoroNotif: 'Notificación de fin Pomodoro', soundNotif: 'Sonido de notificación', browserNotif: 'Notificación del navegador' },
      accessibility: { fontSize: '🔤 Tamaño de fuente:', small: 'Pequeño', medium: 'Mediano', large: 'Grande', xlarge: 'Muy grande', highContrast: '🎭 Alto contraste', reduceMotion: '🚫 Reducir movimiento', colorBlind: '🎨 Modo daltonismo:', none: 'Ninguno', deuteranopia: 'Deuteranopía', protanopia: 'Protanopía', tritanopia: 'Tritanopía' },
      privacy: { dataManagement: '💾 Gestión de datos', export: '📥 Exportar datos (JSON)', import: '📤 Importar datos:', storage: '📊 Espacio de almacenamiento', dangerZone: '⚠️ Zona peligrosa', clearAll: '🗑️ Borrar todos los datos' }
    },
    greeting: { default: '¡Hola!', morning: 'Buenos días', afternoon: 'Buenas tardes', evening: 'Buenas tardes', night: 'Buenas noches' },
    date: { loading: 'Cargando...' },
    worldClock: { title: '🕐 Reloj mundial' },
    search: { placeholder: '🔍 Buscar en Google... (tecla /)', button: 'Buscar' },
    weather: { title: '🌤️ Clima', loading: 'Cargando...' },
    pomodoro: { title: '⏱️ Pomodoro', ready: 'Listo para concentrarse', start: 'Iniciar', reset: 'Reiniciar', today: 'Hoy:', sessions: 'sesiones' },
    quote: { title: '💡 Cita del día', loading: 'Cargando...', new: 'Nueva cita' },
    calendar: { title: '📅 Calendario' },
    habits: { title: '🎯 Hábitos diarios', add: '+ Agregar hábito' },
    notes: { title: '📝 Nota rápida', placeholder: 'Escribe lo que no quieres olvidar aquí...', hint: '💾 Guardado automático' },
    links: { title: '🔗 Enlaces rápidos', add: '+ Agregar enlace' },
    stats: { title: '📊 Estadísticas de hoy', tasksCompleted: 'Tareas completadas', pomodoroSessions: 'Sesiones Pomodoro', habitsCompleted: 'Hábitos completados', focusMinutes: 'Minutos de enfoque' },
    tasks: {
      title: '📋 Tareas de hoy',
      search: '🔍 Buscar tareas...',
      placeholder: 'Nueva tarea... (Enter para agregar)',
      add: '+ Agregar',
      count: '0 tareas',
      print: '🖨️ Imprimir',
      priority: { low: '🟢 Baja', medium: '🟡 Media', high: '🔴 Alta' },
      category: { work: '💼 Trabajo', personal: '👤 Personal', study: '📚 Estudio', health: '💪 Salud', other: '📌 Otro' },
      filters: { all: 'Todas', active: 'Activas', completed: 'Completadas', high: '🔴 Prioridad alta', today: '📅 Hoy' }
    },
    footer: { madeWith: 'Hecho con ❤️ por', github: 'GitHub', linkedin: 'LinkedIn', shortcuts: '💡 Atajos de teclado: <kbd>Ctrl+K</kbd> Comando | <kbd>/</kbd> Buscar | <kbd>S</kbd> Configuración | <kbd>F</kbd> Enfoque | <kbd>L</kbd> Idioma' },
    modals: {
      save: 'Guardar', cancel: 'Cancelar',
      link: { title: 'Nuevo enlace', namePlaceholder: 'Nombre (ej: GitHub)', urlPlaceholder: 'URL (ej: github.com)' },
      habit: { title: 'Nuevo hábito', namePlaceholder: 'Nombre del hábito (ej: Ejercicio)', iconPlaceholder: 'Emoji (ej: 🏃)' },
      worldClock: { title: 'Agregar zona horaria', namePlaceholder: 'Nombre (ej: Nueva York)', selectTimezone: 'Seleccionar zona horaria...' }
    },
    focus: { status: 'Concentrándose...', exit: 'Salir del modo enfoque (Esc)' },
    themes: { cosmic: '🌌 Cósmico', ocean: '🌊 Océano', sunset: '🌅 Atardecer', forest: '🌲 Bosque', rose: '🌹 Rosa', midnight: '🌙 Medianoche', golden: '☀️ Dorado', lava: '🔥 Lava', sakura: '🌸 Sakura', mint: '🍀 Menta' }
  },

  // ===================================
  // 🇩🇪 Deutsch
  // ===================================
  de: {
    loading: { text: 'Dashboard wird vorbereitet...' },
    welcome: {
      title: '👋 Willkommen bei Orbit!',
      description: 'Ihr persönliches Dashboard ist bereit. Lassen Sie uns einige Ersteinrichtungen vornehmen:',
      name: 'Ihr Name:',
      namePlaceholder: 'z.B.: Hans',
      country: 'Ihr Land:',
      selectCountry: 'Land auswählen...',
      language: 'Sprache:',
      start: 'Los geht\'s! 🚀'
    },
    command: { placeholder: '🔍 Befehl oder Suche...', hint: '⬆️⬇️ zum Navigieren | Enter zum Ausführen | Esc zum Schließen' },
    notifications: { title: '🔔 Benachrichtigungen', clearAll: 'Alle löschen' },
    settings: {
      title: '⚙️ Einstellungen',
      save: 'Speichern',
      tabs: { location: '📍 Standort', weather: '🌡️ Wetter', appearance: '🎨 Erscheinungsbild', language: '🌐 Sprache', general: '⚙️ Allgemein', accessibility: '♿ Barrierefreiheit', privacy: '🔒 Datenschutz' },
      location: { country: '🌍 Land:', state: '🏙️ Bundesland:', city: '🏘️ Stadt (optional):', cityPlaceholder: 'z.B.: Berlin', gps: '📍 Automatische Standorterkennung per GPS', worldClock: '🕐 Weltuhr (max 5 Zonen):', addClock: '+ Zeitzone hinzufügen', loading: 'Laden...', selectCountryFirst: 'Wählen Sie zuerst ein Land' },
      weather: { tempUnit: '🌡️ Temperatureinheit:', celsius: 'Celsius (°C)', fahrenheit: 'Fahrenheit (°F)', details: '📊 Wetterdetails:', humidity: '💧 Luftfeuchtigkeit', wind: '💨 Windgeschwindigkeit', pressure: '🌬️ Druck', visibility: '👁️ Sichtweite', sunrise: '🌅 Sonnenauf- und untergang', forecast: '📅 Vorhersage:', '5days': '5 Tage', '7days': '7 Tage' },
      appearance: { theme: '🎨 Voreingestellte Themen:', customTheme: '⚫ Benutzerdefiniertes Thema:', accentColor: 'Akzentfarbe:', bgColor: 'Hintergrundfarbe:', secondaryColor: 'Sekundärfarbe:', textColor: 'Textfarbe:', applyCustom: 'Benutzerdefiniertes Thema anwenden', mode: '🌓 Modus:', dark: '🌙 Dunkel', light: '☀️ Hell', auto: '🔄 Auto', glassOpacity: '💎 Kartenopazität:', animations: '✨ Animationen', sounds: '🔊 UI-Sounds' },
      language: { select: '🌐 App-Sprache:', calendar: '📅 Kalender:', persian: '📅 Persisch', gregorian: '📆 Gregorianisch', islamic: '🕌 Islamisch', numberFormat: '🔢 Zahlenformat:', persianNumbers: '۱۲۳ (Persisch)', englishNumbers: '123 (Englisch)', arabicNumbers: '١٢٣ (Arabisch)', timeFormat: '🕐 Zeitformat:', '24hour': '24 Stunden (14:30)', '12hour': '12 Stunden (14:30)', apply: 'Änderungen übernehmen' },
      general: { name: '👤 Ihr Name:', namePlaceholder: 'Ihr Name', pomodoro: '⏱️ Pomodoro-Dauer (Minuten):', break: '☕ Pausendauer (Minuten):', notifications: '🔔 Benachrichtigungen:', pomodoroNotif: 'Pomodoro-Ende-Benachrichtigung', soundNotif: 'Benachrichtigungston', browserNotif: 'Browser-Benachrichtigung' },
      accessibility: { fontSize: '🔤 Schriftgröße:', small: 'Klein', medium: 'Mittel', large: 'Groß', xlarge: 'Sehr groß', highContrast: '🎭 Hoher Kontrast', reduceMotion: '🚫 Bewegung reduzieren', colorBlind: '🎨 Farbenblindheitsmodus:', none: 'Keine', deuteranopia: 'Deuteranopie', protanopia: 'Protanopie', tritanopia: 'Tritanopie' },
      privacy: { dataManagement: '💾 Datenverwaltung', export: '📥 Daten exportieren (JSON)', import: '📤 Daten importieren:', storage: '📊 Speicherplatz', dangerZone: '⚠️ Gefahrenzone', clearAll: '🗑️ Alle Daten löschen' }
    },
    greeting: { default: 'Hallo!', morning: 'Guten Morgen', afternoon: 'Guten Tag', evening: 'Guten Abend', night: 'Gute Nacht' },
    date: { loading: 'Laden...' },
    worldClock: { title: '🕐 Weltuhr' },
    search: { placeholder: '🔍 In Google suchen... (Taste /)', button: 'Suchen' },
    weather: { title: '🌤️ Wetter', loading: 'Laden...' },
    pomodoro: { title: '⏱️ Pomodoro', ready: 'Bereit zum Fokus', start: 'Start', reset: 'Zurücksetzen', today: 'Heute:', sessions: 'Sitzungen' },
    quote: { title: '💡 Zitat des Tages', loading: 'Laden...', new: 'Neues Zitat' },
    calendar: { title: '📅 Kalender' },
    habits: { title: '🎯 Tägliche Gewohnheiten', add: '+ Gewohnheit hinzufügen' },
    notes: { title: '📝 Schnelle Notiz', placeholder: 'Schreiben Sie hier alles, was Sie nicht vergessen möchten...', hint: '💾 Automatisch gespeichert' },
    links: { title: '🔗 Schnelle Links', add: '+ Link hinzufügen' },
    stats: { title: '📊 Heutige Statistiken', tasksCompleted: 'Erledigte Aufgaben', pomodoroSessions: 'Pomodoro-Sitzungen', habitsCompleted: 'Erledigte Gewohnheiten', focusMinutes: 'Fokus-Minuten' },
    tasks: {
      title: '📋 Heutige Aufgaben',
      search: '🔍 Aufgaben suchen...',
      placeholder: 'Neue Aufgabe... (Enter zum Hinzufügen)',
      add: '+ Hinzufügen',
      count: '0 Aufgaben',
      print: '🖨️ Drucken',
      priority: { low: '🟢 Niedrig', medium: '🟡 Mittel', high: '🔴 Hoch' },
      category: { work: '💼 Arbeit', personal: '👤 Persönlich', study: '📚 Studium', health: '💪 Gesundheit', other: '📌 Sonstiges' },
      filters: { all: 'Alle', active: 'Aktiv', completed: 'Erledigt', high: '🔴 Hohe Priorität', today: '📅 Heute' }
    },
    footer: { madeWith: 'Mit ❤️ gemacht von', github: 'GitHub', linkedin: 'LinkedIn', shortcuts: '💡 Tastenkürzel: <kbd>Strg+K</kbd> Befehl | <kbd>/</kbd> Suche | <kbd>S</kbd> Einstellungen | <kbd>F</kbd> Fokus | <kbd>L</kbd> Sprache' },
    modals: {
      save: 'Speichern', cancel: 'Abbrechen',
      link: { title: 'Neuer Link', namePlaceholder: 'Name (z.B.: GitHub)', urlPlaceholder: 'URL (z.B.: github.com)' },
      habit: { title: 'Neue Gewohnheit', namePlaceholder: 'Gewohnheitsname (z.B.: Sport)', iconPlaceholder: 'Emoji (z.B.: 🏃)' },
      worldClock: { title: 'Zeitzone hinzufügen', namePlaceholder: 'Name (z.B.: New York)', selectTimezone: 'Zeitzone auswählen...' }
    },
    focus: { status: 'Fokussiert...', exit: 'Fokusmodus verlassen (Esc)' },
    themes: { cosmic: '🌌 Kosmisch', ocean: '🌊 Ozean', sunset: '🌅 Sonnenuntergang', forest: '🌲 Wald', rose: '🌹 Rose', midnight: '🌙 Mitternacht', golden: '☀️ Golden', lava: '🔥 Lava', sakura: '🌸 Sakura', mint: '🍀 Minze' }
  },

  // ===================================
  // 🇹🇷 Türkçe
  // ===================================
  tr: {
    loading: { text: 'Paneliniz hazırlanıyor...' },
    welcome: {
      title: '👋 Orbit\'e hoş geldiniz!',
      description: 'Kişisel paneliniz hazır. Bazı ilk ayarları yapalım:',
      name: 'Adınız:',
      namePlaceholder: 'ör: Ahmet',
      country: 'Ülkeniz:',
      selectCountry: 'Ülke seçin...',
      language: 'Dil:',
      start: 'Başlayalım! 🚀'
    },
    command: { placeholder: '🔍 Komut veya arama...', hint: '⬆️⬇️ gezinmek için | Enter çalıştırmak için | Esc kapatmak için' },
    notifications: { title: '🔔 Bildirimler', clearAll: 'Tümünü temizle' },
    settings: {
      title: '⚙️ Ayarlar',
      save: 'Kaydet',
      tabs: { location: '📍 Konum', weather: '🌡️ Hava Durumu', appearance: '🎨 Görünüm', language: '🌐 Dil', general: '⚙️ Genel', accessibility: '♿ Erişilebilirlik', privacy: '🔒 Gizlilik' },
      location: { country: '🌍 Ülke:', state: '🏙️ İl/Eyalet:', city: '🏘️ Şehir (isteğe bağlı):', cityPlaceholder: 'ör: İstanbul', gps: '📍 GPS ile otomatik konum algılama', worldClock: '🕐 Dünya Saati (maks 5 bölge):', addClock: '+ Saat dilimi ekle', loading: 'Yükleniyor...', selectCountryFirst: 'Önce bir ülke seçin' },
      weather: { tempUnit: '🌡️ Sıcaklık birimi:', celsius: 'Selsius (°C)', fahrenheit: 'Fahrenheit (°F)', details: '📊 Hava durumu detayları:', humidity: '💧 Nem', wind: '💨 Rüzgar hızı', pressure: '🌬️ Basınç', visibility: '👁️ Görüş mesafesi', sunrise: '🌅 Gün doğumu ve batımı', forecast: '📅 Tahmin:', '5days': '5 gün', '7days': '7 gün' },
      appearance: { theme: '🎨 Hazır temalar:', customTheme: '⚫ Özel tema:', accentColor: 'Vurgu rengi:', bgColor: 'Arka plan rengi:', secondaryColor: 'İkincil renk:', textColor: 'Metin rengi:', applyCustom: 'Özel temayı uygula', mode: '🌓 Mod:', dark: '🌙 Koyu', light: '☀️ Açık', auto: '🔄 Otomatik', glassOpacity: '💎 Kart opaklığı:', animations: '✨ Animasyonlar', sounds: '🔊 Arayüz sesleri' },
      language: { select: '🌐 Uygulama dili:', calendar: '📅 Takvim:', persian: '📅 Farsça', gregorian: '📆 Miladi', islamic: '🕌 Hicri', numberFormat: '🔢 Sayı formatı:', persianNumbers: '۱۲۳ (Farsça)', englishNumbers: '123 (İngilizce)', arabicNumbers: '١٢٣ (Arapça)', timeFormat: '🕐 Saat formatı:', '24hour': '24 saat (14:30)', '12hour': '12 saat (14:30)', apply: 'Değişiklikleri uygula' },
      general: { name: '👤 Adınız:', namePlaceholder: 'Adınız', pomodoro: '⏱️ Pomodoro süresi (dakika):', break: '☕ Mola süresi (dakika):', notifications: '🔔 Bildirimler:', pomodoroNotif: 'Pomodoro bitiş bildirimi', soundNotif: 'Bildirim sesi', browserNotif: 'Tarayıcı bildirimi' },
      accessibility: { fontSize: '🔤 Yazı tipi boyutu:', small: 'Küçük', medium: 'Orta', large: 'Büyük', xlarge: 'Çok büyük', highContrast: '🎭 Yüksek kontrast', reduceMotion: '🚫 Hareketi azalt', colorBlind: '🎨 Renk körlüğü modu:', none: 'Yok', deuteranopia: 'Döteranopi', protanopia: 'Protanopi', tritanopia: 'Tritanopi' },
      privacy: { dataManagement: '💾 Veri yönetimi', export: '📥 Verileri dışa aktar (JSON)', import: '📤 Verileri içe aktar:', storage: '📊 Depolama alanı', dangerZone: '⚠️ Tehlikeli bölge', clearAll: '🗑️ Tüm verileri sil' }
    },
    greeting: { default: 'Merhaba!', morning: 'Günaydın', afternoon: 'İyi günler', evening: 'İyi akşamlar', night: 'İyi geceler' },
    date: { loading: 'Yükleniyor...' },
    worldClock: { title: '🕐 Dünya Saati' },
    search: { placeholder: '🔍 Google\'da ara... (/ tuşu)', button: 'Ara' },
    weather: { title: '🌤️ Hava Durumu', loading: 'Yükleniyor...' },
    pomodoro: { title: '⏱️ Pomodoro', ready: 'Odaklanmaya hazır', start: 'Başlat', reset: 'Sıfırla', today: 'Bugün:', sessions: 'oturum' },
    quote: { title: '💡 Günün alıntısı', loading: 'Yükleniyor...', new: 'Yeni alıntı' },
    calendar: { title: '📅 Takvim' },
    habits: { title: '🎯 Günlük alışkanlıklar', add: '+ Alışkanlık ekle' },
    notes: { title: '📝 Hızlı not', placeholder: 'Unutmak istemediğiniz her şeyi buraya yazın...', hint: '💾 Otomatik kaydedildi' },
    links: { title: '🔗 Hızlı bağlantılar', add: '+ Bağlantı ekle' },
    stats: { title: '📊 Bugünün istatistikleri', tasksCompleted: 'Tamamlanan görevler', pomodoroSessions: 'Pomodoro oturumları', habitsCompleted: 'Tamamlanan alışkanlıklar', focusMinutes: 'Odaklanma dakikaları' },
    tasks: {
      title: '📋 Bugünün görevleri',
      search: '🔍 Görev ara...',
      placeholder: 'Yeni görev... (Eklemek için Enter)',
      add: '+ Ekle',
      count: '0 görev',
      print: '🖨️ Yazdır',
      priority: { low: '🟢 Düşük', medium: '🟡 Orta', high: '🔴 Yüksek' },
      category: { work: '💼 İş', personal: '👤 Kişisel', study: '📚 Çalışma', health: '💪 Sağlık', other: '📌 Diğer' },
      filters: { all: 'Tümü', active: 'Aktif', completed: 'Tamamlandı', high: '🔴 Yüksek öncelik', today: '📅 Bugün' }
    },
    footer: { madeWith: '❤️ ile yapıldı', github: 'GitHub', linkedin: 'LinkedIn', shortcuts: '💡 Klavye kısayolları: <kbd>Ctrl+K</kbd> Komut | <kbd>/</kbd> Ara | <kbd>S</kbd> Ayarlar | <kbd>F</kbd> Odak | <kbd>L</kbd> Dil' },
    modals: {
      save: 'Kaydet', cancel: 'İptal',
      link: { title: 'Yeni bağlantı', namePlaceholder: 'Ad (ör: GitHub)', urlPlaceholder: 'URL (ör: github.com)' },
      habit: { title: 'Yeni alışkanlık', namePlaceholder: 'Alışkanlık adı (ör: Egzersiz)', iconPlaceholder: 'Emoji (ör: 🏃)' },
      worldClock: { title: 'Saat dilimi ekle', namePlaceholder: 'Ad (ör: New York)', selectTimezone: 'Saat dilimi seç...' }
    },
    focus: { status: 'Odaklanılıyor...', exit: 'Odak modundan çık (Esc)' },
    themes: { cosmic: '🌌 Kozmik', ocean: '🌊 Okyanus', sunset: '🌅 Gün batımı', forest: '🌲 Orman', rose: '🌹 Gül', midnight: '🌙 Gece yarısı', golden: '☀️ Altın', lava: '🔥 Lav', sakura: '🌸 Sakura', mint: '🍀 Nane' }
  },

  // ===================================
  // 🇨🇳 中文 (Chinese)
  // ===================================
  zh: {
    loading: { text: '正在准备您的仪表板...' },
    welcome: {
      title: '👋 欢迎使用 Orbit!',
      description: '您的个人仪表板已准备就绪。让我们进行一些初始设置:',
      name: '您的名字:',
      namePlaceholder: '例如: 张伟',
      country: '您的国家:',
      selectCountry: '选择国家...',
      language: '语言:',
      start: '开始吧! 🚀'
    },
    command: { placeholder: '🔍 命令或搜索...', hint: '⬆️⬇️ 导航 | Enter 执行 | Esc 关闭' },
    notifications: { title: '🔔 通知', clearAll: '全部清除' },
    settings: {
      title: '⚙️ 设置',
      save: '保存',
      tabs: { location: '📍 位置', weather: '🌡️ 天气', appearance: '🎨 外观', language: '🌐 语言', general: '⚙️ 常规', accessibility: '♿ 辅助功能', privacy: '🔒 隐私' },
      location: { country: '🌍 国家:', state: '🏙️ 省/州:', city: '🏘️ 城市 (可选):', cityPlaceholder: '例如: 北京', gps: '📍 GPS 自动检测位置', worldClock: '🕐 世界时钟 (最多 5 个时区):', addClock: '+ 添加时区', loading: '加载中...', selectCountryFirst: '请先选择国家' },
      weather: { tempUnit: '🌡️ 温度单位:', celsius: '摄氏度 (°C)', fahrenheit: '华氏度 (°F)', details: '📊 天气详情:', humidity: '💧 湿度', wind: '💨 风速', pressure: '🌬️ 气压', visibility: '👁️ 能见度', sunrise: '🌅 日出和日落', forecast: '📅 预报:', '5days': '5 天', '7days': '7 天' },
      appearance: { theme: '🎨 预设主题:', customTheme: '⚫ 自定义主题:', accentColor: '强调色:', bgColor: '背景色:', secondaryColor: '辅助色:', textColor: '文字颜色:', applyCustom: '应用自定义主题', mode: '🌓 模式:', dark: '🌙 深色', light: '☀️ 浅色', auto: '🔄 自动', glassOpacity: '💎 卡片透明度:', animations: '✨ 动画', sounds: '🔊 界面声音' },
      language: { select: '🌐 应用语言:', calendar: '📅 日历:', persian: '📅 波斯历', gregorian: '📆 公历', islamic: '🕌 伊斯兰历', numberFormat: '🔢 数字格式:', persianNumbers: '۱۲۳ (波斯)', englishNumbers: '123 (英文)', arabicNumbers: '١٢٣ (阿拉伯)', timeFormat: '🕐 时间格式:', '24hour': '24 小时制 (14:30)', '12hour': '12 小时制 (下午 2:30)', apply: '应用更改' },
      general: { name: '👤 您的名字:', namePlaceholder: '您的名字', pomodoro: '⏱️ 番茄钟时长 (分钟):', break: '☕ 休息时长 (分钟):', notifications: '🔔 通知:', pomodoroNotif: '番茄钟结束通知', soundNotif: '通知声音', browserNotif: '浏览器通知' },
      accessibility: { fontSize: '🔤 字体大小:', small: '小', medium: '中', large: '大', xlarge: '特大', highContrast: '🎭 高对比度', reduceMotion: '🚫 减少动画', colorBlind: '🎨 色盲模式:', none: '无', deuteranopia: '绿色盲', protanopia: '红色盲', tritanopia: '蓝色盲' },
      privacy: { dataManagement: '💾 数据管理', export: '📥 导出数据 (JSON)', import: '📤 导入数据:', storage: '📊 存储空间', dangerZone: '⚠️ 危险区域', clearAll: '🗑️ 清除所有数据' }
    },
    greeting: { default: '你好!', morning: '早上好', afternoon: '下午好', evening: '晚上好', night: '晚安' },
    date: { loading: '加载中...' },
    worldClock: { title: '🕐 世界时钟' },
    search: { placeholder: '🔍 在 Google 搜索... (/ 键)', button: '搜索' },
    weather: { title: '🌤️ 天气', loading: '加载中...' },
    pomodoro: { title: '⏱️ 番茄钟', ready: '准备专注', start: '开始', reset: '重置', today: '今天:', sessions: '个会话' },
    quote: { title: '💡 今日名言', loading: '加载中...', new: '新名言' },
    calendar: { title: '📅 日历' },
    habits: { title: '🎯 每日习惯', add: '+ 添加习惯' },
    notes: { title: '📝 快速笔记', placeholder: '在这里写下任何你不想忘记的事情...', hint: '💾 自动保存' },
    links: { title: '🔗 快速链接', add: '+ 添加链接' },
    stats: { title: '📊 今日统计', tasksCompleted: '已完成任务', pomodoroSessions: '番茄钟会话', habitsCompleted: '已完成习惯', focusMinutes: '专注分钟' },
    tasks: {
      title: '📋 今日任务',
      search: '🔍 搜索任务...',
      placeholder: '新任务... (按 Enter 添加)',
      add: '+ 添加',
      count: '0 个任务',
      print: '🖨️ 打印',
      priority: { low: '🟢 低', medium: '🟡 中', high: '🔴 高' },
      category: { work: '💼 工作', personal: '👤 个人', study: '📚 学习', health: '💪 健康', other: '📌 其他' },
      filters: { all: '全部', active: '活动', completed: '已完成', high: '🔴 高优先级', today: '📅 今天' }
    },
    footer: { madeWith: '用 ❤️ 制作', github: 'GitHub', linkedin: 'LinkedIn', shortcuts: '💡 键盘快捷键: <kbd>Ctrl+K</kbd> 命令 | <kbd>/</kbd> 搜索 | <kbd>S</kbd> 设置 | <kbd>F</kbd> 专注 | <kbd>L</kbd> 语言' },
    modals: {
      save: '保存', cancel: '取消',
      link: { title: '新链接', namePlaceholder: '名称 (例如: GitHub)', urlPlaceholder: 'URL (例如: github.com)' },
      habit: { title: '新习惯', namePlaceholder: '习惯名称 (例如: 锻炼)', iconPlaceholder: '表情符号 (例如: 🏃)' },
      worldClock: { title: '添加时区', namePlaceholder: '名称 (例如: 纽约)', selectTimezone: '选择时区...' }
    },
    focus: { status: '专注中...', exit: '退出专注模式 (Esc)' },
    themes: { cosmic: '🌌 宇宙', ocean: '🌊 海洋', sunset: '🌅 日落', forest: '🌲 森林', rose: '🌹 玫瑰', midnight: '🌙 午夜', golden: '☀️ 金色', lava: '🔥 熔岩', sakura: '🌸 樱花', mint: '🍀 薄荷' }
  },

  // ===================================
  // 🇯🇵 日本語 (Japanese)
  // ===================================
  ja: {
    loading: { text: 'ダッシュボードを準備中...' },
    welcome: {
      title: '👋 Orbitへようこそ!',
      description: 'パーソナルダッシュボードの準備ができました。初期設定を行いましょう:',
      name: 'お名前:',
      namePlaceholder: '例: 太郎',
      country: 'お国:',
      selectCountry: '国を選択...',
      language: '言語:',
      start: '始めましょう! 🚀'
    },
    command: { placeholder: '🔍 コマンドまたは検索...', hint: '⬆️⬇️ 移動 | Enter 実行 | Esc 閉じる' },
    notifications: { title: '🔔 通知', clearAll: 'すべてクリア' },
    settings: {
      title: '⚙️ 設定',
      save: '保存',
      tabs: { location: '📍 場所', weather: '🌡️ 天気', appearance: '🎨 外観', language: '🌐 言語', general: '⚙️ 一般', accessibility: '♿ アクセシビリティ', privacy: '🔒 プライバシー' },
      location: { country: '🌍 国:', state: '🏙️ 都道府県/州:', city: '🏘️ 市 (任意):', cityPlaceholder: '例: 東京', gps: '📍 GPSで自動位置検出', worldClock: '🕐 世界時計 (最大5ゾーン):', addClock: '+ タイムゾーンを追加', loading: '読み込み中...', selectCountryFirst: 'まず国を選択してください' },
      weather: { tempUnit: '🌡️ 温度単位:', celsius: '摂氏 (°C)', fahrenheit: '華氏 (°F)', details: '📊 天気の詳細:', humidity: '💧 湿度', wind: '💨 風速', pressure: '🌬️ 気圧', visibility: '👁️ 視程', sunrise: '🌅 日の出と日の入り', forecast: '📅 予報:', '5days': '5日', '7days': '7日' },
      appearance: { theme: '🎨 プリセットテーマ:', customTheme: '⚫ カスタムテーマ:', accentColor: 'アクセントカラー:', bgColor: '背景色:', secondaryColor: 'セカンダリカラー:', textColor: 'テキストカラー:', applyCustom: 'カスタムテーマを適用', mode: '🌓 モード:', dark: '🌙 ダーク', light: '☀️ ライト', auto: '🔄 自動', glassOpacity: '💎 カードの不透明度:', animations: '✨ アニメーション', sounds: '🔊 UIサウンド' },
      language: { select: '🌐 アプリ言語:', calendar: '📅 カレンダー:', persian: '📅 ペルシャ暦', gregorian: '📆 グレゴリオ暦', islamic: '🕌 イスラム暦', numberFormat: '🔢 数字形式:', persianNumbers: '۱۲۳ (ペルシャ)', englishNumbers: '123 (英語)', arabicNumbers: '١٢٣ (アラビア)', timeFormat: '🕐 時間形式:', '24hour': '24時間 (14:30)', '12hour': '12時間 (午後2:30)', apply: '変更を適用' },
      general: { name: '👤 お名前:', namePlaceholder: 'お名前', pomodoro: '⏱️ ポモドーロ時間 (分):', break: '☕ 休憩時間 (分):', notifications: '🔔 通知:', pomodoroNotif: 'ポモドーロ終了通知', soundNotif: '通知音', browserNotif: 'ブラウザ通知' },
      accessibility: { fontSize: '🔤 フォントサイズ:', small: '小', medium: '中', large: '大', xlarge: '特大', highContrast: '🎭 ハイコントラスト', reduceMotion: '🚫 動きを減らす', colorBlind: '🎨 色覚モード:', none: 'なし', deuteranopia: '緑色覚異常', protanopia: '赤色覚異常', tritanopia: '青色覚異常' },
      privacy: { dataManagement: '💾 データ管理', export: '📥 データをエクスポート (JSON)', import: '📤 データをインポート:', storage: '📊 保存領域', dangerZone: '⚠️ 危険ゾーン', clearAll: '🗑️ すべてのデータを削除' }
    },
    greeting: { default: 'こんにちは!', morning: 'おはようございます', afternoon: 'こんにちは', evening: 'こんばんは', night: 'おやすみなさい' },
    date: { loading: '読み込み中...' },
    worldClock: { title: '🕐 世界時計' },
    search: { placeholder: '🔍 Googleで検索... (/ キー)', button: '検索' },
    weather: { title: '🌤️ 天気', loading: '読み込み中...' },
    pomodoro: { title: '⏱️ ポモドーロ', ready: '集中準備完了', start: '開始', reset: 'リセット', today: '今日:', sessions: 'セッション' },
    quote: { title: '💡 今日の名言', loading: '読み込み中...', new: '新しい名言' },
    calendar: { title: '📅 カレンダー' },
    habits: { title: '🎯 毎日の習慣', add: '+ 習慣を追加' },
    notes: { title: '📝 クイックノート', placeholder: '忘れたくないことをここに書いてください...', hint: '💾 自動保存' },
    links: { title: '🔗 クイックリンク', add: '+ リンクを追加' },
    stats: { title: '📊 今日の統計', tasksCompleted: '完了したタスク', pomodoroSessions: 'ポモドーロセッション', habitsCompleted: '完了した習慣', focusMinutes: '集中分数' },
    tasks: {
      title: '📋 今日のタスク',
      search: '🔍 タスクを検索...',
      placeholder: '新しいタスク... (Enterで追加)',
      add: '+ 追加',
      count: '0 タスク',
      print: '🖨️ 印刷',
      priority: { low: '🟢 低', medium: '🟡 中', high: '🔴 高' },
      category: { work: '💼 仕事', personal: '👤 個人', study: '📚 勉強', health: '💪 健康', other: '📌 その他' },
      filters: { all: 'すべて', active: 'アクティブ', completed: '完了', high: '🔴 高優先度', today: '📅 今日' }
    },
    footer: { madeWith: '❤️ で作成', github: 'GitHub', linkedin: 'LinkedIn', shortcuts: '💡 キーボードショートカット: <kbd>Ctrl+K</kbd> コマンド | <kbd>/</kbd> 検索 | <kbd>S</kbd> 設定 | <kbd>F</kbd> フォーカス | <kbd>L</kbd> 言語' },
    modals: {
      save: '保存', cancel: 'キャンセル',
      link: { title: '新しいリンク', namePlaceholder: '名前 (例: GitHub)', urlPlaceholder: 'URL (例: github.com)' },
      habit: { title: '新しい習慣', namePlaceholder: '習慣名 (例: 運動)', iconPlaceholder: '絵文字 (例: 🏃)' },
      worldClock: { title: 'タイムゾーンを追加', namePlaceholder: '名前 (例: ニューヨーク)', selectTimezone: 'タイムゾーンを選択...' }
    },
    focus: { status: '集中中...', exit: 'フォーカスモードを終了 (Esc)' },
    themes: { cosmic: '🌌 コスミック', ocean: '🌊 オーシャン', sunset: '🌅 サンセット', forest: '🌲 フォレスト', rose: '🌹 ローズ', midnight: '🌙 ミッドナイト', golden: '☀️ ゴールデン', lava: '🔥 ラバ', sakura: '🌸 桜', mint: '🍀 ミント' }
  },

  // ===================================
  // 🇰🇷 한국어 (Korean)
  // ===================================
  ko: {
    loading: { text: '대시보드를 준비하는 중...' },
    welcome: {
      title: '👋 Orbit에 오신 것을 환영합니다!',
      description: '개인 대시보드가 준비되었습니다. 초기 설정을 해봅시다:',
      name: '이름:',
      namePlaceholder: '예: 홍길동',
      country: '국가:',
      selectCountry: '국가 선택...',
      language: '언어:',
      start: '시작합시다! 🚀'
    },
    command: { placeholder: '🔍 명령 또는 검색...', hint: '⬆️⬇️ 탐색 | Enter 실행 | Esc 닫기' },
    notifications: { title: '🔔 알림', clearAll: '모두 지우기' },
    settings: {
      title: '⚙️ 설정',
      save: '저장',
      tabs: { location: '📍 위치', weather: '🌡️ 날씨', appearance: '🎨 모양', language: '🌐 언어', general: '⚙️ 일반', accessibility: '♿ 접근성', privacy: '🔒 개인정보' },
      location: { country: '🌍 국가:', state: '🏙️ 주/도:', city: '🏘️ 도시 (선택사항):', cityPlaceholder: '예: 서울', gps: '📍 GPS로 자동 위치 감지', worldClock: '🕐 세계 시계 (최대 5개 구역):', addClock: '+ 시간대 추가', loading: '로딩 중...', selectCountryFirst: '먼저 국가를 선택하세요' },
      weather: { tempUnit: '🌡️ 온도 단위:', celsius: '섭씨 (°C)', fahrenheit: '화씨 (°F)', details: '📊 날씨 세부정보:', humidity: '💧 습도', wind: '💨 풍속', pressure: '🌬️ 기압', visibility: '👁️ 시정', sunrise: '🌅 일출 및 일몰', forecast: '📅 예보:', '5days': '5일', '7days': '7일' },
      appearance: { theme: '🎨 사전 설정 테마:', customTheme: '⚫ 사용자 정의 테마:', accentColor: '강조 색상:', bgColor: '배경 색상:', secondaryColor: '보조 색상:', textColor: '텍스트 색상:', applyCustom: '사용자 정의 테마 적용', mode: '🌓 모드:', dark: '🌙 어둡게', light: '☀️ 밝게', auto: '🔄 자동', glassOpacity: '💎 카드 불투명도:', animations: '✨ 애니메이션', sounds: '🔊 UI 사운드' },
      language: { select: '🌐 앱 언어:', calendar: '📅 달력:', persian: '📅 페르시아', gregorian: '📆 그레고리', islamic: '🕌 이슬람', numberFormat: '🔢 숫자 형식:', persianNumbers: '۱۲۳ (페르시아)', englishNumbers: '123 (영어)', arabicNumbers: '١٢٣ (아랍)', timeFormat: '🕐 시간 형식:', '24hour': '24시간 (14:30)', '12hour': '12시간 (오후 2:30)', apply: '변경 사항 적용' },
      general: { name: '👤 이름:', namePlaceholder: '이름', pomodoro: '⏱️ 뽀모도로 시간 (분):', break: '☕ 휴식 시간 (분):', notifications: '🔔 알림:', pomodoroNotif: '뽀모도로 종료 알림', soundNotif: '알림 소리', browserNotif: '브라우저 알림' },
      accessibility: { fontSize: '🔤 글꼴 크기:', small: '작게', medium: '중간', large: '크게', xlarge: '매우 크게', highContrast: '🎭 고대비', reduceMotion: '🚫 움직임 줄이기', colorBlind: '🎨 색맹 모드:', none: '없음', deuteranopia: '녹색맹', protanopia: '적색맹', tritanopia: '청색맹' },
      privacy: { dataManagement: '💾 데이터 관리', export: '📥 데이터 내보내기 (JSON)', import: '📤 데이터 가져오기:', storage: '📊 저장 공간', dangerZone: '⚠️ 위험 구역', clearAll: '🗑️ 모든 데이터 삭제' }
    },
    greeting: { default: '안녕하세요!', morning: '좋은 아침', afternoon: '좋은 오후', evening: '좋은 저녁', night: '안녕히 주무세요' },
    date: { loading: '로딩 중...' },
    worldClock: { title: '🕐 세계 시계' },
    search: { placeholder: '🔍 Google에서 검색... (/ 키)', button: '검색' },
    weather: { title: '🌤️ 날씨', loading: '로딩 중...' },
    pomodoro: { title: '⏱️ 뽀모도로', ready: '집중 준비', start: '시작', reset: '재설정', today: '오늘:', sessions: '세션' },
    quote: { title: '💡 오늘의 명언', loading: '로딩 중...', new: '새 명언' },
    calendar: { title: '📅 달력' },
    habits: { title: '🎯 매일 습관', add: '+ 습관 추가' },
    notes: { title: '📝 빠른 메모', placeholder: '잊고 싶지 않은 것을 여기에 적으세요...', hint: '💾 자동 저장' },
    links: { title: '🔗 빠른 링크', add: '+ 링크 추가' },
    stats: { title: '📊 오늘 통계', tasksCompleted: '완료된 작업', pomodoroSessions: '뽀모도로 세션', habitsCompleted: '완료된 습관', focusMinutes: '집중 분' },
    tasks: {
      title: '📋 오늘 작업',
      search: '🔍 작업 검색...',
      placeholder: '새 작업... (Enter로 추가)',
      add: '+ 추가',
      count: '0 작업',
      print: '🖨️ 인쇄',
      priority: { low: '🟢 낮음', medium: '🟡 보통', high: '🔴 높음' },
      category: { work: '💼 업무', personal: '👤 개인', study: '📚 공부', health: '💪 건강', other: '📌 기타' },
      filters: { all: '모두', active: '활성', completed: '완료', high: '🔴 높은 우선순위', today: '📅 오늘' }
    },
    footer: { madeWith: '❤️ 으로 제작', github: 'GitHub', linkedin: 'LinkedIn', shortcuts: '💡 키보드 단축키: <kbd>Ctrl+K</kbd> 명령 | <kbd>/</kbd> 검색 | <kbd>S</kbd> 설정 | <kbd>F</kbd> 집중 | <kbd>L</kbd> 언어' },
    modals: {
      save: '저장', cancel: '취소',
      link: { title: '새 링크', namePlaceholder: '이름 (예: GitHub)', urlPlaceholder: 'URL (예: github.com)' },
      habit: { title: '새 습관', namePlaceholder: '습관 이름 (예: 운동)', iconPlaceholder: '이모지 (예: 🏃)' },
      worldClock: { title: '시간대 추가', namePlaceholder: '이름 (예: 뉴욕)', selectTimezone: '시간대 선택...' }
    },
    focus: { status: '집중 중...', exit: '집중 모드 종료 (Esc)' },
    themes: { cosmic: '🌌 코스믹', ocean: '🌊 오션', sunset: '🌅 선셋', forest: '🌲 포레스트', rose: '🌹 로즈', midnight: '🌙 미드나잇', golden: '☀️ 골든', lava: '🔥 라바', sakura: '🌸 사쿠라', mint: '🍀 민트' }
  },

  // ===================================
  // 🇷🇺 Русский (Russian)
  // ===================================
  ru: {
    loading: { text: 'Подготовка панели...' },
    welcome: {
      title: '👋 Добро пожаловать в Orbit!',
      description: 'Ваша личная панель готова. Давайте выполним начальную настройку:',
      name: 'Ваше имя:',
      namePlaceholder: 'например: Иван',
      country: 'Ваша страна:',
      selectCountry: 'Выберите страну...',
      language: 'Язык:',
      start: 'Начнём! 🚀'
    },
    command: { placeholder: '🔍 Команда или поиск...', hint: '⬆️⬇️ навигация | Enter выполнить | Esc закрыть' },
    notifications: { title: '🔔 Уведомления', clearAll: 'Очистить все' },
    settings: {
      title: '⚙️ Настройки',
      save: 'Сохранить',
      tabs: { location: '📍 Местоположение', weather: '🌡️ Погода', appearance: '🎨 Внешний вид', language: '🌐 Язык', general: '⚙️ Общие', accessibility: '♿ Доступность', privacy: '🔒 Конфиденциальность' },
      location: { country: '🌍 Страна:', state: '🏙️ Область/Штат:', city: '🏘️ Город (необязательно):', cityPlaceholder: 'например: Москва', gps: '📍 Автоопределение местоположения по GPS', worldClock: '🕐 Мировые часы (макс 5 зон):', addClock: '+ Добавить часовой пояс', loading: 'Загрузка...', selectCountryFirst: 'Сначала выберите страну' },
      weather: { tempUnit: '🌡️ Единица температуры:', celsius: 'Цельсий (°C)', fahrenheit: 'Фаренгейт (°F)', details: '📊 Детали погоды:', humidity: '💧 Влажность', wind: '💨 Скорость ветра', pressure: '🌬️ Давление', visibility: '👁️ Видимость', sunrise: '🌅 Восход и закат', forecast: '📅 Прогноз:', '5days': '5 дней', '7days': '7 дней' },
      appearance: { theme: '🎨 Предустановленные темы:', customTheme: '⚫ Пользовательская тема:', accentColor: 'Цвет акцента:', bgColor: 'Цвет фона:', secondaryColor: 'Вторичный цвет:', textColor: 'Цвет текста:', applyCustom: 'Применить пользовательскую тему', mode: '🌓 Режим:', dark: '🌙 Тёмный', light: '☀️ Светлый', auto: '🔄 Авто', glassOpacity: '💎 Прозрачность карточек:', animations: '✨ Анимации', sounds: '🔊 Звуки интерфейса' },
      language: { select: '🌐 Язык приложения:', calendar: '📅 Календарь:', persian: '📅 Персидский', gregorian: '📆 Григорианский', islamic: '🕌 Исламский', numberFormat: '🔢 Формат чисел:', persianNumbers: '۱۲۳ (Персидский)', englishNumbers: '123 (Английский)', arabicNumbers: '١٢٣ (Арабский)', timeFormat: '🕐 Формат времени:', '24hour': '24 часа (14:30)', '12hour': '12 часов (2:30 PM)', apply: 'Применить изменения' },
      general: { name: '👤 Ваше имя:', namePlaceholder: 'Ваше имя', pomodoro: '⏱️ Длительность помодоро (минуты):', break: '☕ Длительность перерыва (минуты):', notifications: '🔔 Уведомления:', pomodoroNotif: 'Уведомление об окончании помодоро', soundNotif: 'Звук уведомления', browserNotif: 'Уведомление браузера' },
      accessibility: { fontSize: '🔤 Размер шрифта:', small: 'Маленький', medium: 'Средний', large: 'Большой', xlarge: 'Очень большой', highContrast: '🎭 Высокая контрастность', reduceMotion: '🚫 Уменьшить движение', colorBlind: '🎨 Режим дальтонизма:', none: 'Нет', deuteranopia: 'Дейтеранопия', protanopia: 'Протанопия', tritanopia: 'Тританопия' },
      privacy: { dataManagement: '💾 Управление данными', export: '📥 Экспорт данных (JSON)', import: '📤 Импорт данных:', storage: '📊 Место хранения', dangerZone: '⚠️ Опасная зона', clearAll: '🗑️ Очистить все данные' }
    },
    greeting: { default: 'Привет!', morning: 'Доброе утро', afternoon: 'Добрый день', evening: 'Добрый вечер', night: 'Спокойной ночи' },
    date: { loading: 'Загрузка...' },
    worldClock: { title: '🕐 Мировые часы' },
    search: { placeholder: '🔍 Поиск в Google... (клавиша /)', button: 'Поиск' },
    weather: { title: '🌤️ Погода', loading: 'Загрузка...' },
    pomodoro: { title: '⏱️ Помодоро', ready: 'Готов к концентрации', start: 'Старт', reset: 'Сброс', today: 'Сегодня:', sessions: 'сессий' },
    quote: { title: '💡 Цитата дня', loading: 'Загрузка...', new: 'Новая цитата' },
    calendar: { title: '📅 Календарь' },
    habits: { title: '🎯 Ежедневные привычки', add: '+ Добавить привычку' },
    notes: { title: '📝 Быстрая заметка', placeholder: 'Напишите здесь всё, что не хотите забыть...', hint: '💾 Автосохранение' },
    links: { title: '🔗 Быстрые ссылки', add: '+ Добавить ссылку' },
    stats: { title: '📊 Статистика за сегодня', tasksCompleted: 'Выполненные задачи', pomodoroSessions: 'Сессии помодоро', habitsCompleted: 'Выполненные привычки', focusMinutes: 'Минуты концентрации' },
    tasks: {
      title: '📋 Задачи на сегодня',
      search: '🔍 Поиск задач...',
      placeholder: 'Новая задача... (Enter для добавления)',
      add: '+ Добавить',
      count: '0 задач',
      print: '🖨️ Печать',
      priority: { low: '🟢 Низкий', medium: '🟡 Средний', high: '🔴 Высокий' },
      category: { work: '💼 Работа', personal: '👤 Личное', study: '📚 Учёба', health: '💪 Здоровье', other: '📌 Другое' },
      filters: { all: 'Все', active: 'Активные', completed: 'Выполненные', high: '🔴 Высокий приоритет', today: '📅 Сегодня' }
    },
    footer: { madeWith: 'Сделано с ❤️', github: 'GitHub', linkedin: 'LinkedIn', shortcuts: '💡 Горячие клавиши: <kbd>Ctrl+K</kbd> Команда | <kbd>/</kbd> Поиск | <kbd>S</kbd> Настройки | <kbd>F</kbd> Фокус | <kbd>L</kbd> Язык' },
    modals: {
      save: 'Сохранить', cancel: 'Отмена',
      link: { title: 'Новая ссылка', namePlaceholder: 'Имя (например: GitHub)', urlPlaceholder: 'URL (например: github.com)' },
      habit: { title: 'Новая привычка', namePlaceholder: 'Название привычки (например: Упражнения)', iconPlaceholder: 'Эмодзи (например: 🏃)' },
      worldClock: { title: 'Добавить часовой пояс', namePlaceholder: 'Имя (например: Нью-Йорк)', selectTimezone: 'Выберите часовой пояс...' }
    },
    focus: { status: 'Концентрация...', exit: 'Выйти из режима фокуса (Esc)' },
    themes: { cosmic: '🌌 Космическая', ocean: '🌊 Океан', sunset: '🌅 Закат', forest: '🌲 Лес', rose: '🌹 Роза', midnight: '🌙 Полночь', golden: '☀️ Золотая', lava: '🔥 Лава', sakura: '🌸 Сакура', mint: '🍀 Мята' }
  },

  // ===================================
  // 🇮🇹 Italiano
  // ===================================
  it: {
    loading: { text: 'Preparazione della dashboard...' },
    welcome: {
      title: '👋 Benvenuto su Orbit!',
      description: 'La tua dashboard personale è pronta. Facciamo alcune configurazioni iniziali:',
      name: 'Il tuo nome:',
      namePlaceholder: 'es: Mario',
      country: 'Il tuo paese:',
      selectCountry: 'Seleziona paese...',
      language: 'Lingua:',
      start: 'Iniziamo! 🚀'
    },
    command: { placeholder: '🔍 Comando o ricerca...', hint: '⬆️⬇️ per navigare | Invio per eseguire | Esc per chiudere' },
    notifications: { title: '🔔 Notifiche', clearAll: 'Cancella tutto' },
    settings: {
      title: '⚙️ Impostazioni',
      save: 'Salva',
      tabs: { location: '📍 Posizione', weather: '🌡️ Meteo', appearance: '🎨 Aspetto', language: '🌐 Lingua', general: '⚙️ Generale', accessibility: '♿ Accessibilità', privacy: '🔒 Privacy' },
      location: { country: '🌍 Paese:', state: '🏙️ Regione/Stato:', city: '🏘️ Città (opzionale):', cityPlaceholder: 'es: Roma', gps: '📍 Rilevamento automatico posizione con GPS', worldClock: '🕐 Orologio mondiale (max 5 zone):', addClock: '+ Aggiungi fuso orario', loading: 'Caricamento...', selectCountryFirst: 'Seleziona prima un paese' },
      weather: { tempUnit: '🌡️ Unità di temperatura:', celsius: 'Celsius (°C)', fahrenheit: 'Fahrenheit (°F)', details: '📊 Dettagli meteo:', humidity: '💧 Umidità', wind: '💨 Velocità del vento', pressure: '🌬️ Pressione', visibility: '👁️ Visibilità', sunrise: '🌅 Alba e tramonto', forecast: '📅 Previsioni:', '5days': '5 giorni', '7days': '7 giorni' },
      appearance: { theme: '🎨 Temi predefiniti:', customTheme: '⚫ Tema personalizzato:', accentColor: 'Colore accento:', bgColor: 'Colore sfondo:', secondaryColor: 'Colore secondario:', textColor: 'Colore testo:', applyCustom: 'Applica tema personalizzato', mode: '🌓 Modalità:', dark: '🌙 Scuro', light: '☀️ Chiaro', auto: '🔄 Auto', glassOpacity: '💎 Opacità schede:', animations: '✨ Animazioni', sounds: '🔊 Suoni interfaccia' },
      language: { select: '🌐 Lingua app:', calendar: '📅 Calendario:', persian: '📅 Persiano', gregorian: '📆 Gregoriano', islamic: '🕌 Islamico', numberFormat: '🔢 Formato numeri:', persianNumbers: '۱۲۳ (Persiano)', englishNumbers: '123 (Inglese)', arabicNumbers: '١٢٣ (Arabo)', timeFormat: '🕐 Formato ora:', '24hour': '24 ore (14:30)', '12hour': '12 ore (14:30)', apply: 'Applica modifiche' },
      general: { name: '👤 Il tuo nome:', namePlaceholder: 'Il tuo nome', pomodoro: '⏱️ Durata pomodoro (minuti):', break: '☕ Durata pausa (minuti):', notifications: '🔔 Notifiche:', pomodoroNotif: 'Notifica fine pomodoro', soundNotif: 'Suono notifica', browserNotif: 'Notifica browser' },
      accessibility: { fontSize: '🔤 Dimensione font:', small: 'Piccolo', medium: 'Medio', large: 'Grande', xlarge: 'Molto grande', highContrast: '🎭 Alto contrasto', reduceMotion: '🚫 Riduci movimento', colorBlind: '🎨 Modalità daltonismo:', none: 'Nessuno', deuteranopia: 'Deuteranopia', protanopia: 'Protanopia', tritanopia: 'Tritanopia' },
      privacy: { dataManagement: '💾 Gestione dati', export: '📥 Esporta dati (JSON)', import: '📤 Importa dati:', storage: '📊 Spazio di archiviazione', dangerZone: '⚠️ Zona pericolosa', clearAll: '🗑️ Cancella tutti i dati' }
    },
    greeting: { default: 'Ciao!', morning: 'Buongiorno', afternoon: 'Buon pomeriggio', evening: 'Buonasera', night: 'Buonanotte' },
    date: { loading: 'Caricamento...' },
    worldClock: { title: '🕐 Orologio mondiale' },
    search: { placeholder: '🔍 Cerca su Google... (tasto /)', button: 'Cerca' },
    weather: { title: '🌤️ Meteo', loading: 'Caricamento...' },
    pomodoro: { title: '⏱️ Pomodoro', ready: 'Pronto a concentrarsi', start: 'Avvia', reset: 'Reimposta', today: 'Oggi:', sessions: 'sessioni' },
    quote: { title: '💡 Citazione del giorno', loading: 'Caricamento...', new: 'Nuova citazione' },
    calendar: { title: '📅 Calendario' },
    habits: { title: '🎯 Abitudini quotidiane', add: '+ Aggiungi abitudine' },
    notes: { title: '📝 Nota rapida', placeholder: 'Scrivi qui tutto ciò che non vuoi dimenticare...', hint: '💾 Salvataggio automatico' },
    links: { title: '🔗 Link rapidi', add: '+ Aggiungi link' },
    stats: { title: '📊 Statistiche di oggi', tasksCompleted: 'Attività completate', pomodoroSessions: 'Sessioni pomodoro', habitsCompleted: 'Abitudini completate', focusMinutes: 'Minuti di concentrazione' },
    tasks: {
      title: '📋 Attività di oggi',
      search: '🔍 Cerca attività...',
      placeholder: 'Nuova attività... (Invio per aggiungere)',
      add: '+ Aggiungi',
      count: '0 attività',
      print: '🖨️ Stampa',
      priority: { low: '🟢 Bassa', medium: '🟡 Media', high: '🔴 Alta' },
      category: { work: '💼 Lavoro', personal: '👤 Personale', study: '📚 Studio', health: '💪 Salute', other: '📌 Altro' },
      filters: { all: 'Tutte', active: 'Attive', completed: 'Completate', high: '🔴 Priorità alta', today: '📅 Oggi' }
    },
    footer: { madeWith: 'Fatto con ❤️ da', github: 'GitHub', linkedin: 'LinkedIn', shortcuts: '💡 Scorciatoie da tastiera: <kbd>Ctrl+K</kbd> Comando | <kbd>/</kbd> Cerca | <kbd>S</kbd> Impostazioni | <kbd>F</kbd> Focus | <kbd>L</kbd> Lingua' },
    modals: {
      save: 'Salva', cancel: 'Annulla',
      link: { title: 'Nuovo link', namePlaceholder: 'Nome (es: GitHub)', urlPlaceholder: 'URL (es: github.com)' },
      habit: { title: 'Nuova abitudine', namePlaceholder: 'Nome abitudine (es: Esercizio)', iconPlaceholder: 'Emoji (es: 🏃)' },
      worldClock: { title: 'Aggiungi fuso orario', namePlaceholder: 'Nome (es: New York)', selectTimezone: 'Seleziona fuso orario...' }
    },
    focus: { status: 'Concentrazione...', exit: 'Esci dalla modalità focus (Esc)' },
    themes: { cosmic: '🌌 Cosmico', ocean: '🌊 Oceano', sunset: '🌅 Tramonto', forest: '🌲 Foresta', rose: '🌹 Rosa', midnight: '🌙 Mezzanotte', golden: '☀️ Dorato', lava: '🔥 Lava', sakura: '🌸 Sakura', mint: '🍀 Menta' }
  }
};

// ===================================
// توابع کمکی i18n
// ===================================

/**
 * دریافت ترجمه بر اساس کلید
 * @param {string} key - کلید ترجمه (مثلاً: 'greeting.morning')
 * @returns {string} متن ترجمه شده
 */
function t(key) {
  const lang = getCurrentLanguage();
  const keys = key.split('.');
  let value = translations[lang];
  
  for (const k of keys) {
    if (value && typeof value === 'object') {
      value = value[k];
    } else {
      return key; // اگر کلید پیدا نشد، خود کلید را برگردان
    }
  }
  
  return value || key;
}

/**
 * دریافت زبان فعلی
 * @returns {string} کد زبان فعلی
 */
function getCurrentLanguage() {
  const settings = JSON.parse(localStorage.getItem('orbit-settings') || '{}');
  return settings.language || detectBrowserLanguage();
}

/**
 * تشخیص خودکار زبان مرورگر
 * @returns {string} کد زبان تشخیص داده شده
 */
function detectBrowserLanguage() {
  const browserLang = navigator.language || navigator.userLanguage;
  const langCode = browserLang.split('-')[0];
  
  // لیست زبان‌های پشتیبانی شده
  const supportedLangs = ['fa', 'en', 'ar', 'fr', 'es', 'de', 'tr', 'zh', 'ja', 'ko', 'ru', 'it'];
  
  return supportedLangs.includes(langCode) ? langCode : 'en';
}

/**
 * بررسی اینکه زبان RTL است یا LTR
 * @param {string} lang - کد زبان
 * @returns {boolean} true اگر RTL باشد
 */
function isRTL(lang) {
  const rtlLangs = ['fa', 'ar', 'he', 'ur'];
  return rtlLangs.includes(lang);
}

/**
 * اعمال زبان به کل صفحه
 * @param {string} lang - کد زبان
 */
function applyLanguage(lang) {
  const html = document.documentElement;
  
  // تنظیم جهت متن
  html.dir = isRTL(lang) ? 'rtl' : 'ltr';
  html.lang = lang;
  
  // ترجمه همه عناصر با data-i18n
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    const translation = t(key);
    
    // اگر متن شامل HTML tags باشد (مثل <kbd>)
    if (translation.includes('<')) {
      element.innerHTML = translation;
    } else {
      element.textContent = translation;
    }
  });
  
  // ترجمه placeholder ها
  document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
    const key = element.getAttribute('data-i18n-placeholder');
    element.placeholder = t(key);
  });
  
  // ذخیره تنظیمات
  const settings = JSON.parse(localStorage.getItem('orbit-settings') || '{}');
  settings.language = lang;
  localStorage.setItem('orbit-settings', JSON.stringify(settings));
}

/**
 * فرمت اعداد بر اساس زبان
 * @param {number} num - عدد
 * @param {string} lang - کد زبان
 * @returns {string} عدد فرمت شده
 */
function formatNumber(num, lang = null) {
  if (lang === null) lang = getCurrentLanguage();
  
  const settings = JSON.parse(localStorage.getItem('orbit-settings') || '{}');
  const numberFormat = settings.numberFormat || 'english';
  
  if (numberFormat === 'persian') {
    return num.toString().replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]);
  } else if (numberFormat === 'arabic') {
    return num.toString().replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d]);
  }
  
  return num.toString();
}

/**
 * فرمت تاریخ بر اساس زبان و تقویم
 * @param {Date} date - تاریخ
 * @returns {string} تاریخ فرمت شده
 */
function formatDate(date) {
  const settings = JSON.parse(localStorage.getItem('orbit-settings') || '{}');
  const lang = settings.language || 'fa';
  const calendar = settings.calendar || 'persian';
  
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  
  if (calendar === 'persian') {
    return date.toLocaleDateString('fa-IR', options);
  } else if (calendar === 'islamic') {
    return date.toLocaleDateString('ar-SA-u-ca-islamic', options);
  } else {
    // gregorian
    const localeMap = {
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
    return date.toLocaleDateString(localeMap[lang] || 'en-US', options);
  }
}

/**
 * فرمت ساعت بر اساس تنظیمات
 * @param {Date} date - تاریخ
 * @returns {string} ساعت فرمت شده
 */
function formatTime(date) {
  const settings = JSON.parse(localStorage.getItem('orbit-settings') || '{}');
  const timeFormat = settings.timeFormat || '24';
  
  const hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  
  if (timeFormat === '12') {
    const period = hours >= 12 ? 'PM' : 'AM';
    const hour12 = hours % 12 || 12;
    return `${formatNumber(hour12)}:${minutes}:${seconds} ${period}`;
  }
  
  return `${formatNumber(hours)}:${minutes}:${seconds}`;
}

// ===================================
// راه‌اندازی اولیه
// ===================================

// تشخیص خودکار زبان هنگام بارگذاری صفحه
document.addEventListener('DOMContentLoaded', () => {
  const settings = JSON.parse(localStorage.getItem('orbit-settings') || '{}');
  
  // اگر زبان تنظیم نشده باشد، از زبان مرورگر استفاده کن
  if (!settings.language) {
    settings.language = detectBrowserLanguage();
    localStorage.setItem('orbit-settings', JSON.stringify(settings));
  }
  
  // اعمال زبان
  applyLanguage(settings.language);
});