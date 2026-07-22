// ===================================
// سیستم تم Orbit - نسخه 2.0
// ۱۵ تم از پیش تعریف شده + Custom Theme
// با پالت‌های رنگی هماهنگ و حرفه‌ای
// ===================================

const themes = {
  // ===================================
  // 🌌 Cosmic (پیش‌فرض - کهکشانی)
  // ===================================
  cosmic: {
    name: '🌌 Cosmic',
    accent: '#8b5cf6',
    accentHover: '#7c3aed',
    accentGlow: 'rgba(139, 92, 246, 0.5)',
    background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
    secondary: '#4c1d95',
    text: '#ffffff',
    textSecondary: 'rgba(255, 255, 255, 0.75)',
    glass: 'rgba(139, 92, 246, 0.08)',
    glassBorder: 'rgba(139, 92, 246, 0.2)',
    glassShadow: 'rgba(0, 0, 0, 0.3)',
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444',
    info: '#3b82f6'
  },

  // ===================================
  // 🌊 Ocean (اقیانوس)
  // ===================================
  ocean: {
    name: '🌊 Ocean',
    accent: '#22d3ee',
    accentHover: '#06b6d4',
    accentGlow: 'rgba(34, 211, 238, 0.5)',
    background: 'linear-gradient(135deg, #082f49 0%, #0c4a6e 50%, #155e75 100%)',
    secondary: '#164e63',
    text: '#ffffff',
    textSecondary: 'rgba(255, 255, 255, 0.75)',
    glass: 'rgba(34, 211, 238, 0.08)',
    glassBorder: 'rgba(34, 211, 238, 0.2)',
    glassShadow: 'rgba(0, 0, 0, 0.3)',
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444',
    info: '#3b82f6'
  },

  // ===================================
  // 🌅 Sunset (غروب)
  // ===================================
  sunset: {
    name: '🌅 Sunset',
    accent: '#fb923c',
    accentHover: '#f97316',
    accentGlow: 'rgba(251, 146, 60, 0.5)',
    background: 'linear-gradient(135deg, #431407 0%, #7c2d12 50%, #9a3412 100%)',
    secondary: '#c2410c',
    text: '#ffffff',
    textSecondary: 'rgba(255, 255, 255, 0.75)',
    glass: 'rgba(251, 146, 60, 0.08)',
    glassBorder: 'rgba(251, 146, 60, 0.2)',
    glassShadow: 'rgba(0, 0, 0, 0.3)',
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444',
    info: '#3b82f6'
  },

  // ===================================
  // 🌲 Forest (جنگل)
  // ===================================
  forest: {
    name: '🌲 Forest',
    accent: '#34d399',
    accentHover: '#10b981',
    accentGlow: 'rgba(52, 211, 153, 0.5)',
    background: 'linear-gradient(135deg, #052e16 0%, #14532d 50%, #166534 100%)',
    secondary: '#15803d',
    text: '#ffffff',
    textSecondary: 'rgba(255, 255, 255, 0.75)',
    glass: 'rgba(52, 211, 153, 0.08)',
    glassBorder: 'rgba(52, 211, 153, 0.2)',
    glassShadow: 'rgba(0, 0, 0, 0.3)',
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444',
    info: '#3b82f6'
  },

  // ===================================
  // 🌹 Rose (رز)
  // ===================================
  rose: {
    name: '🌹 Rose',
    accent: '#f472b6',
    accentHover: '#ec4899',
    accentGlow: 'rgba(244, 114, 182, 0.5)',
    background: 'linear-gradient(135deg, #500724 0%, #831843 50%, #9f1239 100%)',
    secondary: '#be185d',
    text: '#ffffff',
    textSecondary: 'rgba(255, 255, 255, 0.75)',
    glass: 'rgba(244, 114, 182, 0.08)',
    glassBorder: 'rgba(244, 114, 182, 0.2)',
    glassShadow: 'rgba(0, 0, 0, 0.3)',
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444',
    info: '#3b82f6'
  },

  // ===================================
  // 🌙 Midnight (نیمه‌شب)
  // ===================================
  midnight: {
    name: '🌙 Midnight',
    accent: '#818cf8',
    accentHover: '#6366f1',
    accentGlow: 'rgba(129, 140, 248, 0.5)',
    background: 'linear-gradient(135deg, #020617 0%, #0f172a 50%, #1e293b 100%)',
    secondary: '#334155',
    text: '#ffffff',
    textSecondary: 'rgba(255, 255, 255, 0.75)',
    glass: 'rgba(129, 140, 248, 0.08)',
    glassBorder: 'rgba(129, 140, 248, 0.2)',
    glassShadow: 'rgba(0, 0, 0, 0.4)',
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444',
    info: '#3b82f6'
  },

  // ===================================
  // ☀️ Golden (طلایی)
  // ===================================
  golden: {
    name: '☀️ Golden',
    accent: '#fbbf24',
    accentHover: '#f59e0b',
    accentGlow: 'rgba(251, 191, 36, 0.5)',
    background: 'linear-gradient(135deg, #451a03 0%, #78350f 50%, #92400e 100%)',
    secondary: '#b45309',
    text: '#ffffff',
    textSecondary: 'rgba(255, 255, 255, 0.8)',
    glass: 'rgba(251, 191, 36, 0.08)',
    glassBorder: 'rgba(251, 191, 36, 0.25)',
    glassShadow: 'rgba(0, 0, 0, 0.3)',
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444',
    info: '#3b82f6'
  },

  // ===================================
  // 🔥 Lava (گدازه)
  // ===================================
  lava: {
    name: '🔥 Lava',
    accent: '#f87171',
    accentHover: '#ef4444',
    accentGlow: 'rgba(248, 113, 113, 0.5)',
    background: 'linear-gradient(135deg, #450a0a 0%, #7f1d1d 50%, #991b1b 100%)',
    secondary: '#b91c1c',
    text: '#ffffff',
    textSecondary: 'rgba(255, 255, 255, 0.75)',
    glass: 'rgba(248, 113, 113, 0.08)',
    glassBorder: 'rgba(248, 113, 113, 0.2)',
    glassShadow: 'rgba(0, 0, 0, 0.3)',
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444',
    info: '#3b82f6'
  },

  // ===================================
  // 🌸 Sakura (شکوفه گیلاس)
  // ===================================
  sakura: {
    name: '🌸 Sakura',
    accent: '#f9a8d4',
    accentHover: '#f472b6',
    accentGlow: 'rgba(249, 168, 212, 0.5)',
    background: 'linear-gradient(135deg, #500724 0%, #831843 50%, #9d174d 100%)',
    secondary: '#be185d',
    text: '#ffffff',
    textSecondary: 'rgba(255, 255, 255, 0.8)',
    glass: 'rgba(249, 168, 212, 0.1)',
    glassBorder: 'rgba(249, 168, 212, 0.25)',
    glassShadow: 'rgba(0, 0, 0, 0.3)',
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444',
    info: '#3b82f6'
  },

  // ===================================
  // 🍀 Mint (نعنا)
  // ===================================
  mint: {
    name: '🍀 Mint',
    accent: '#2dd4bf',
    accentHover: '#14b8a6',
    accentGlow: 'rgba(45, 212, 191, 0.5)',
    background: 'linear-gradient(135deg, #022c22 0%, #064e3b 50%, #065f46 100%)',
    secondary: '#047857',
    text: '#ffffff',
    textSecondary: 'rgba(255, 255, 255, 0.75)',
    glass: 'rgba(45, 212, 191, 0.08)',
    glassBorder: 'rgba(45, 212, 191, 0.2)',
    glassShadow: 'rgba(0, 0, 0, 0.3)',
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444',
    info: '#3b82f6'
  },

  // ===================================
  // 🌌 Nebula (سحابی - جدید)
  // ===================================
  nebula: {
    name: '🌌 Nebula',
    accent: '#c084fc',
    accentHover: '#a855f7',
    accentGlow: 'rgba(192, 132, 252, 0.5)',
    background: 'linear-gradient(135deg, #1e1b4b 0%, #581c87 50%, #831843 100%)',
    secondary: '#6b21a8',
    text: '#ffffff',
    textSecondary: 'rgba(255, 255, 255, 0.8)',
    glass: 'rgba(192, 132, 252, 0.1)',
    glassBorder: 'rgba(192, 132, 252, 0.25)',
    glassShadow: 'rgba(0, 0, 0, 0.3)',
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444',
    info: '#3b82f6'
  },

  // ===================================
  // 🍇 Grape (انگور - جدید)
  // ===================================
  grape: {
    name: '🍇 Grape',
    accent: '#a78bfa',
    accentHover: '#8b5cf6',
    accentGlow: 'rgba(167, 139, 250, 0.5)',
    background: 'linear-gradient(135deg, #2e1065 0%, #4c1d95 50%, #5b21b6 100%)',
    secondary: '#6d28d9',
    text: '#ffffff',
    textSecondary: 'rgba(255, 255, 255, 0.8)',
    glass: 'rgba(167, 139, 250, 0.1)',
    glassBorder: 'rgba(167, 139, 250, 0.25)',
    glassShadow: 'rgba(0, 0, 0, 0.3)',
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444',
    info: '#3b82f6'
  },

  // ===================================
  // 💎 Crystal (کریستال یخی - جدید)
  // ===================================
  crystal: {
    name: '💎 Crystal',
    accent: '#67e8f9',
    accentHover: '#22d3ee',
    accentGlow: 'rgba(103, 232, 249, 0.5)',
    background: 'linear-gradient(135deg, #083344 0%, #164e63 50%, #155e75 100%)',
    secondary: '#0e7490',
    text: '#ffffff',
    textSecondary: 'rgba(255, 255, 255, 0.8)',
    glass: 'rgba(103, 232, 249, 0.1)',
    glassBorder: 'rgba(103, 232, 249, 0.25)',
    glassShadow: 'rgba(0, 0, 0, 0.3)',
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444',
    info: '#3b82f6'
  },

  // ===================================
  // 🌑 Eclipse (کسوف - جدید)
  // ===================================
  eclipse: {
    name: '🌑 Eclipse',
    accent: '#a3a3a3',
    accentHover: '#737373',
    accentGlow: 'rgba(163, 163, 163, 0.4)',
    background: 'linear-gradient(135deg, #000000 0%, #0a0a0a 50%, #171717 100%)',
    secondary: '#262626',
    text: '#ffffff',
    textSecondary: 'rgba(255, 255, 255, 0.7)',
    glass: 'rgba(255, 255, 255, 0.05)',
    glassBorder: 'rgba(255, 255, 255, 0.12)',
    glassShadow: 'rgba(0, 0, 0, 0.5)',
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444',
    info: '#3b82f6'
  },

  // ===================================
  // 🍊 Tangerine (نارنگی - جدید)
  // ===================================
  tangerine: {
    name: '🍊 Tangerine',
    accent: '#fb923c',
    accentHover: '#f97316',
    accentGlow: 'rgba(251, 146, 60, 0.5)',
    background: 'linear-gradient(135deg, #431407 0%, #7c2d12 50%, #9a3412 100%)',
    secondary: '#ea580c',
    text: '#ffffff',
    textSecondary: 'rgba(255, 255, 255, 0.8)',
    glass: 'rgba(251, 146, 60, 0.1)',
    glassBorder: 'rgba(251, 146, 60, 0.25)',
    glassShadow: 'rgba(0, 0, 0, 0.3)',
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444',
    info: '#3b82f6'
  },

  // ===================================
  // ⚫ Custom (تم سفارشی کاربر)
  // ===================================
  custom: {
    name: '⚫ Custom',
    accent: '#8b5cf6',
    accentHover: '#7c3aed',
    accentGlow: 'rgba(139, 92, 246, 0.5)',
    background: '#0f0c29',
    secondary: '#302b63',
    text: '#ffffff',
    textSecondary: 'rgba(255, 255, 255, 0.75)',
    glass: 'rgba(255, 255, 255, 0.08)',
    glassBorder: 'rgba(255, 255, 255, 0.18)',
    glassShadow: 'rgba(0, 0, 0, 0.3)',
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444',
    info: '#3b82f6'
  }
};

// ===================================
// تم‌های روشن (Light Mode) - نسخه 2.0
// ===================================
const lightThemes = {
  cosmic: {
    name: '🌌 Cosmic (Light)',
    accent: '#7c3aed',
    accentHover: '#6d28d9',
    accentGlow: 'rgba(124, 58, 237, 0.25)',
    background: 'linear-gradient(135deg, #ede9fe 0%, #ddd6fe 50%, #c4b5fd 100%)',
    secondary: '#a78bfa',
    text: '#1e1b4b',
    textSecondary: 'rgba(30, 27, 75, 0.7)',
    glass: 'rgba(255, 255, 255, 0.6)',
    glassBorder: 'rgba(124, 58, 237, 0.15)',
    glassShadow: 'rgba(124, 58, 237, 0.08)',
    success: '#059669',
    warning: '#d97706',
    danger: '#dc2626',
    info: '#2563eb'
  },
  ocean: {
    name: '🌊 Ocean (Light)',
    accent: '#0891b2',
    accentHover: '#0e7490',
    accentGlow: 'rgba(8, 145, 178, 0.25)',
    background: 'linear-gradient(135deg, #cffafe 0%, #a5f3fc 50%, #67e8f9 100%)',
    secondary: '#22d3ee',
    text: '#164e63',
    textSecondary: 'rgba(22, 78, 99, 0.7)',
    glass: 'rgba(255, 255, 255, 0.6)',
    glassBorder: 'rgba(8, 145, 178, 0.15)',
    glassShadow: 'rgba(8, 145, 178, 0.08)',
    success: '#059669',
    warning: '#d97706',
    danger: '#dc2626',
    info: '#2563eb'
  },
  sunset: {
    name: '🌅 Sunset (Light)',
    accent: '#ea580c',
    accentHover: '#c2410c',
    accentGlow: 'rgba(234, 88, 12, 0.25)',
    background: 'linear-gradient(135deg, #ffedd5 0%, #fed7aa 50%, #fdba74 100%)',
    secondary: '#fb923c',
    text: '#7c2d12',
    textSecondary: 'rgba(124, 45, 18, 0.7)',
    glass: 'rgba(255, 255, 255, 0.6)',
    glassBorder: 'rgba(234, 88, 12, 0.15)',
    glassShadow: 'rgba(234, 88, 12, 0.08)',
    success: '#059669',
    warning: '#d97706',
    danger: '#dc2626',
    info: '#2563eb'
  },
  forest: {
    name: '🌲 Forest (Light)',
    accent: '#059669',
    accentHover: '#047857',
    accentGlow: 'rgba(5, 150, 105, 0.25)',
    background: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 50%, #6ee7b7 100%)',
    secondary: '#34d399',
    text: '#14532d',
    textSecondary: 'rgba(20, 83, 45, 0.7)',
    glass: 'rgba(255, 255, 255, 0.6)',
    glassBorder: 'rgba(5, 150, 105, 0.15)',
    glassShadow: 'rgba(5, 150, 105, 0.08)',
    success: '#059669',
    warning: '#d97706',
    danger: '#dc2626',
    info: '#2563eb'
  },
  rose: {
    name: '🌹 Rose (Light)',
    accent: '#db2777',
    accentHover: '#be185d',
    accentGlow: 'rgba(219, 39, 119, 0.25)',
    background: 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 50%, #f9a8d4 100%)',
    secondary: '#f472b6',
    text: '#831843',
    textSecondary: 'rgba(131, 24, 67, 0.7)',
    glass: 'rgba(255, 255, 255, 0.6)',
    glassBorder: 'rgba(219, 39, 119, 0.15)',
    glassShadow: 'rgba(219, 39, 119, 0.08)',
    success: '#059669',
    warning: '#d97706',
    danger: '#dc2626',
    info: '#2563eb'
  },
  midnight: {
    name: '🌙 Midnight (Light)',
    accent: '#4f46e5',
    accentHover: '#4338ca',
    accentGlow: 'rgba(79, 70, 229, 0.25)',
    background: 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 50%, #a5b4fc 100%)',
    secondary: '#818cf8',
    text: '#1e1b4b',
    textSecondary: 'rgba(30, 27, 75, 0.7)',
    glass: 'rgba(255, 255, 255, 0.6)',
    glassBorder: 'rgba(79, 70, 229, 0.15)',
    glassShadow: 'rgba(79, 70, 229, 0.08)',
    success: '#059669',
    warning: '#d97706',
    danger: '#dc2626',
    info: '#2563eb'
  },
  golden: {
    name: '☀️ Golden (Light)',
    accent: '#d97706',
    accentHover: '#b45309',
    accentGlow: 'rgba(217, 119, 6, 0.25)',
    background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 50%, #fcd34d 100%)',
    secondary: '#fbbf24',
    text: '#78350f',
    textSecondary: 'rgba(120, 53, 15, 0.7)',
    glass: 'rgba(255, 255, 255, 0.6)',
    glassBorder: 'rgba(217, 119, 6, 0.15)',
    glassShadow: 'rgba(217, 119, 6, 0.08)',
    success: '#059669',
    warning: '#d97706',
    danger: '#dc2626',
    info: '#2563eb'
  },
  lava: {
    name: '🔥 Lava (Light)',
    accent: '#dc2626',
    accentHover: '#b91c1c',
    accentGlow: 'rgba(220, 38, 38, 0.25)',
    background: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 50%, #fca5a5 100%)',
    secondary: '#f87171',
    text: '#7f1d1d',
    textSecondary: 'rgba(127, 29, 29, 0.7)',
    glass: 'rgba(255, 255, 255, 0.6)',
    glassBorder: 'rgba(220, 38, 38, 0.15)',
    glassShadow: 'rgba(220, 38, 38, 0.08)',
    success: '#059669',
    warning: '#d97706',
    danger: '#dc2626',
    info: '#2563eb'
  },
  sakura: {
    name: '🌸 Sakura (Light)',
    accent: '#ec4899',
    accentHover: '#db2777',
    accentGlow: 'rgba(236, 72, 153, 0.25)',
    background: 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 50%, #fbcfe8 100%)',
    secondary: '#f9a8d4',
    text: '#831843',
    textSecondary: 'rgba(131, 24, 67, 0.7)',
    glass: 'rgba(255, 255, 255, 0.6)',
    glassBorder: 'rgba(236, 72, 153, 0.15)',
    glassShadow: 'rgba(236, 72, 153, 0.08)',
    success: '#059669',
    warning: '#d97706',
    danger: '#dc2626',
    info: '#2563eb'
  },
  mint: {
    name: '🍀 Mint (Light)',
    accent: '#0d9488',
    accentHover: '#0f766e',
    accentGlow: 'rgba(13, 148, 136, 0.25)',
    background: 'linear-gradient(135deg, #ccfbf1 0%, #99f6e4 50%, #5eead4 100%)',
    secondary: '#2dd4bf',
    text: '#134e4a',
    textSecondary: 'rgba(19, 78, 74, 0.7)',
    glass: 'rgba(255, 255, 255, 0.6)',
    glassBorder: 'rgba(13, 148, 136, 0.15)',
    glassShadow: 'rgba(13, 148, 136, 0.08)',
    success: '#059669',
    warning: '#d97706',
    danger: '#dc2626',
    info: '#2563eb'
  },
  nebula: {
    name: '🌌 Nebula (Light)',
    accent: '#9333ea',
    accentHover: '#7e22ce',
    accentGlow: 'rgba(147, 51, 234, 0.25)',
    background: 'linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 50%, #d8b4fe 100%)',
    secondary: '#c084fc',
    text: '#3b0764',
    textSecondary: 'rgba(59, 7, 100, 0.7)',
    glass: 'rgba(255, 255, 255, 0.6)',
    glassBorder: 'rgba(147, 51, 234, 0.15)',
    glassShadow: 'rgba(147, 51, 234, 0.08)',
    success: '#059669',
    warning: '#d97706',
    danger: '#dc2626',
    info: '#2563eb'
  },
  grape: {
    name: '🍇 Grape (Light)',
    accent: '#7c3aed',
    accentHover: '#6d28d9',
    accentGlow: 'rgba(124, 58, 237, 0.25)',
    background: 'linear-gradient(135deg, #ede9fe 0%, #ddd6fe 50%, #c4b5fd 100%)',
    secondary: '#a78bfa',
    text: '#2e1065',
    textSecondary: 'rgba(46, 16, 101, 0.7)',
    glass: 'rgba(255, 255, 255, 0.6)',
    glassBorder: 'rgba(124, 58, 237, 0.15)',
    glassShadow: 'rgba(124, 58, 237, 0.08)',
    success: '#059669',
    warning: '#d97706',
    danger: '#dc2626',
    info: '#2563eb'
  },
  crystal: {
    name: '💎 Crystal (Light)',
    accent: '#0891b2',
    accentHover: '#0e7490',
    accentGlow: 'rgba(8, 145, 178, 0.25)',
    background: 'linear-gradient(135deg, #cffafe 0%, #a5f3fc 50%, #67e8f9 100%)',
    secondary: '#22d3ee',
    text: '#083344',
    textSecondary: 'rgba(8, 51, 68, 0.7)',
    glass: 'rgba(255, 255, 255, 0.6)',
    glassBorder: 'rgba(8, 145, 178, 0.15)',
    glassShadow: 'rgba(8, 145, 178, 0.08)',
    success: '#059669',
    warning: '#d97706',
    danger: '#dc2626',
    info: '#2563eb'
  },
  eclipse: {
    name: '🌑 Eclipse (Light)',
    accent: '#525252',
    accentHover: '#404040',
    accentGlow: 'rgba(82, 82, 82, 0.2)',
    background: 'linear-gradient(135deg, #f5f5f5 0%, #e5e5e5 50%, #d4d4d4 100%)',
    secondary: '#a3a3a3',
    text: '#171717',
    textSecondary: 'rgba(23, 23, 23, 0.7)',
    glass: 'rgba(255, 255, 255, 0.7)',
    glassBorder: 'rgba(0, 0, 0, 0.1)',
    glassShadow: 'rgba(0, 0, 0, 0.08)',
    success: '#059669',
    warning: '#d97706',
    danger: '#dc2626',
    info: '#2563eb'
  },
  tangerine: {
    name: '🍊 Tangerine (Light)',
    accent: '#ea580c',
    accentHover: '#c2410c',
    accentGlow: 'rgba(234, 88, 12, 0.25)',
    background: 'linear-gradient(135deg, #ffedd5 0%, #fed7aa 50%, #fdba74 100%)',
    secondary: '#fb923c',
    text: '#7c2d12',
    textSecondary: 'rgba(124, 45, 18, 0.7)',
    glass: 'rgba(255, 255, 255, 0.6)',
    glassBorder: 'rgba(234, 88, 12, 0.15)',
    glassShadow: 'rgba(234, 88, 12, 0.08)',
    success: '#059669',
    warning: '#d97706',
    danger: '#dc2626',
    info: '#2563eb'
  },
  custom: {
    name: '⚫ Custom (Light)',
    accent: '#7c3aed',
    accentHover: '#6d28d9',
    accentGlow: 'rgba(124, 58, 237, 0.25)',
    background: '#ede9fe',
    secondary: '#c4b5fd',
    text: '#1e1b4b',
    textSecondary: 'rgba(30, 27, 75, 0.7)',
    glass: 'rgba(255, 255, 255, 0.6)',
    glassBorder: 'rgba(0, 0, 0, 0.1)',
    glassShadow: 'rgba(0, 0, 0, 0.08)',
    success: '#059669',
    warning: '#d97706',
    danger: '#dc2626',
    info: '#2563eb'
  }
};

// ===================================
// توابع مدیریت تم
// ===================================

/**
 * اعمال تم به صفحه
 * @param {string} themeName - نام تم
 * @param {string} mode - حالت (dark/light/auto)
 */
function applyTheme(themeName, mode = 'dark') {
  let theme;
  
  // تعیین تم بر اساس حالت
  if (mode === 'auto') {
    const hour = new Date().getHours();
    mode = (hour >= 6 && hour < 18) ? 'light' : 'dark';
  }
  
  if (mode === 'light') {
    theme = lightThemes[themeName] || lightThemes.cosmic;
  } else {
    theme = themes[themeName] || themes.cosmic;
  }
  
  // اعمال متغیرهای CSS
  const root = document.documentElement;
  root.style.setProperty('--accent', theme.accent);
  root.style.setProperty('--accent-hover', theme.accentHover);
  root.style.setProperty('--accent-glow', theme.accentGlow);
  root.style.setProperty('--bg-gradient', theme.background);
  root.style.setProperty('--secondary', theme.secondary);
  root.style.setProperty('--text-primary', theme.text);
  root.style.setProperty('--text-secondary', theme.textSecondary);
  root.style.setProperty('--glass-bg', theme.glass);
  root.style.setProperty('--glass-border', theme.glassBorder);
  root.style.setProperty('--glass-shadow', theme.glassShadow);
  root.style.setProperty('--success', theme.success);
  root.style.setProperty('--warning', theme.warning);
  root.style.setProperty('--danger', theme.danger);
  root.style.setProperty('--info', theme.info);
  
  // ذخیره تنظیمات
  const settings = JSON.parse(localStorage.getItem('orbit-settings') || '{}');
  settings.theme = themeName;
  settings.themeMode = mode;
  localStorage.setItem('orbit-settings', JSON.stringify(settings));
}

/**
 * اعمال تم سفارشی کاربر
 * @param {Object} customTheme - تم سفارشی
 */
function applyCustomTheme(customTheme) {
  const root = document.documentElement;
  root.style.setProperty('--accent', customTheme.accent);
  root.style.setProperty('--accent-hover', customTheme.accent);
  root.style.setProperty('--accent-glow', customTheme.accent + '80');
  root.style.setProperty('--bg-gradient', customTheme.background);
  root.style.setProperty('--secondary', customTheme.secondary);
  root.style.setProperty('--text-primary', customTheme.text);
  root.style.setProperty('--text-secondary', customTheme.text + 'B3');
  root.style.setProperty('--glass-bg', 'rgba(255, 255, 255, 0.08)');
  root.style.setProperty('--glass-border', 'rgba(255, 255, 255, 0.18)');
  root.style.setProperty('--glass-shadow', 'rgba(0, 0, 0, 0.3)');
  
  // ذخیره تم سفارشی
  const settings = JSON.parse(localStorage.getItem('orbit-settings') || '{}');
  settings.customTheme = customTheme;
  settings.theme = 'custom';
  localStorage.setItem('orbit-settings', JSON.stringify(settings));
}

/**
 * دریافت تم فعلی
 * @returns {Object} تم فعلی
 */
function getCurrentTheme() {
  const settings = JSON.parse(localStorage.getItem('orbit-settings') || '{}');
  const themeName = settings.theme || 'cosmic';
  const mode = settings.themeMode || 'dark';
  
  if (themeName === 'custom' && settings.customTheme) {
    return settings.customTheme;
  }
  
  if (mode === 'light') {
    return lightThemes[themeName] || lightThemes.cosmic;
  }
  
  return themes[themeName] || themes.cosmic;
}

/**
 * تغییر حالت تم (dark/light/auto)
 * @param {string} mode - حالت جدید
 */
function setThemeMode(mode) {
  const settings = JSON.parse(localStorage.getItem('orbit-settings') || '{}');
  const themeName = settings.theme || 'cosmic';
  applyTheme(themeName, mode);
}

/**
 * تنظیم شفافیت کارت‌ها
 * @param {number} opacity - شفافیت (0-100)
 */
function setGlassOpacity(opacity) {
  const opacityValue = opacity / 100;
  const root = document.documentElement;
  root.style.setProperty('--glass-bg', `rgba(255, 255, 255, ${opacityValue})`);
  
  // ذخیره تنظیمات
  const settings = JSON.parse(localStorage.getItem('orbit-settings') || '{}');
  settings.glassOpacity = opacity;
  localStorage.setItem('orbit-settings', JSON.stringify(settings));
}

/**
 * بارگذاری تم ذخیره شده
 */
function loadSavedTheme() {
  const settings = JSON.parse(localStorage.getItem('orbit-settings') || '{}');
  const themeName = settings.theme || 'cosmic';
  const mode = settings.themeMode || 'dark';
  const glassOpacity = settings.glassOpacity || 8;
  
  if (themeName === 'custom' && settings.customTheme) {
    applyCustomTheme(settings.customTheme);
  } else {
    applyTheme(themeName, mode);
  }
  
  setGlassOpacity(glassOpacity);
}

/**
 * دریافت لیست همه تم‌ها
 * @returns {Array} لیست تم‌ها
 */
function getAllThemes() {
  return Object.keys(themes).map(key => ({
    id: key,
    name: themes[key].name,
    preview: themes[key].background
  }));
}

/**
 * بررسی اینکه آیا حالت auto فعال است
 * @returns {boolean}
 */
function isAutoMode() {
  const settings = JSON.parse(localStorage.getItem('orbit-settings') || '{}');
  return settings.themeMode === 'auto';
}

/**
 * به‌روزرسانی خودکار تم بر اساس ساعت (برای حالت auto)
 */
function updateAutoTheme() {
  if (!isAutoMode()) return;
  
  const settings = JSON.parse(localStorage.getItem('orbit-settings') || '{}');
  const themeName = settings.theme || 'cosmic';
  applyTheme(themeName, 'auto');
}

// ===================================
// راه‌اندازی اولیه
// ===================================
document.addEventListener('DOMContentLoaded', () => {
  loadSavedTheme();
  
  // به‌روزرسانی خودکار تم هر ساعت (برای حالت auto)
  setInterval(updateAutoTheme, 60 * 60 * 1000);
});

// ===================================
// Export برای استفاده در سایر فایل‌ها
// ===================================
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    themes,
    lightThemes,
    applyTheme,
    applyCustomTheme,
    getCurrentTheme,
    setThemeMode,
    setGlassOpacity,
    loadSavedTheme,
    getAllThemes,
    isAutoMode,
    updateAutoTheme
  };
}