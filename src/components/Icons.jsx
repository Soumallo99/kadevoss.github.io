import { motion } from 'framer-motion'

export function ArrowUpRight({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M5 15 15 5M6 5h9v9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function ArrowRight({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M3.5 10h12m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function ArrowDown({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M10 3.5v12m-5-5 5 5 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function ServiceIcon({ type, className = '' }) {
  const common = {
    className,
    viewBox: '0 0 32 32',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.5,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  }

  if (type === 'business') {
    return (
      <svg {...common}>
        <rect x="4.75" y="5.75" width="22.5" height="20.5" rx="3" />
        <path d="M5 11.5h22M10 8.7h.01m3.5 0h.01M9 16h5m-5 4h8m4-4h1m-1 4h1" />
      </svg>
    )
  }

  if (type === 'app') {
    return (
      <svg {...common}>
        <path d="m16 4 11 6-11 6-11-6 11-6Z" />
        <path d="m5 16 11 6 11-6M5 21l11 6 11-6M16 16v6" />
      </svg>
    )
  }

  if (type === 'commerce') {
    return (
      <svg {...common}>
        <path d="M5 13h22l-2-8H7l-2 8Z" />
        <path d="M6.5 13v14h19V13M12 27v-8h8v8" />
        <path d="M5 13a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0" />
      </svg>
    )
  }

  if (type === 'design') {
    return (
      <svg {...common}>
        <path d="m5 27 4-9L22 5l5 5-13 13-9 4Z" />
        <path d="m18 9 5 5M6 23l3 3M4 5h7M7.5 1.5v7" />
      </svg>
    )
  }

  if (type === 'automation') {
    return (
      <svg {...common}>
        <circle cx="7" cy="8" r="3" />
        <circle cx="25" cy="24" r="3" />
        <circle cx="24" cy="7" r="3" />
        <path d="M10 8h5a4 4 0 0 1 4 4v8a4 4 0 0 0 4 4h-1M19 12h2a3 3 0 0 0 3-3" />
      </svg>
    )
  }

  if (type === 'performance') {
    return (
      <svg {...common}>
        <path d="M5 24a12 12 0 1 1 22 0M8 24h16" />
        <path d="m16 17 6-6" />
        <circle cx="16" cy="17" r="2" />
        <path d="M8 15h2m12 0h2" />
      </svg>
    )
  }

  return (
    <svg {...common}>
      <path d="m16 3 2.4 7.1L26 13l-7.6 2.9L16 23l-2.4-7.1L6 13l7.6-2.9L16 3Z" />
      <path d="m25 20 .9 2.6 2.6.9-2.6.9L25 27l-.9-2.6-2.6-.9 2.6-.9L25 20ZM7 4l.8 2.2L10 7l-2.2.8L7 10l-.8-2.2L4 7l2.2-.8L7 4Z" />
    </svg>
  )
}

export function SocialIcon({ type, className = '' }) {
  const common = {
    className,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  }

  if (type === 'email') {
    return (
      <svg {...common}>
        <rect x="3" y="5" width="18" height="14" rx="2.5" />
        <path d="m4.5 7 7.5 6 7.5-6" />
      </svg>
    )
  }

  if (type === 'linkedin') {
    return (
      <svg {...common}>
        <path d="M7 9v9M7 6.25v.01M11 18v-5a4 4 0 0 1 8 0v5m-8-5v5" />
        <rect x="3" y="3" width="18" height="18" rx="4" />
      </svg>
    )
  }

  if (type === 'x') {
    return (
      <svg {...common} fill="currentColor" stroke="none" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817-5.964 6.817H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644Z" />
      </svg>
    )
  }

  return (
    <svg {...common}>
      <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 6v-3.9a3.4 3.4 0 0 0-.9-2.6c3-.3 6.1-1.5 6.1-6.7a5.2 5.2 0 0 0-1.4-3.6 4.8 4.8 0 0 0-.1-3.6S17.5 1.3 14 3.7a13 13 0 0 0-7 0C3.5 1.3 2.3 1.6 2.3 1.6a4.8 4.8 0 0 0-.1 3.6 5.2 5.2 0 0 0-1.4 3.6c0 5.2 3.1 6.4 6.1 6.7A3.4 3.4 0 0 0 6 18v4" transform="translate(3 0) scale(.83)" />
    </svg>
  )
}

export function MenuIcon({ open = false, className = '' }) {
  const lineStyle = { originX: '50%', originY: '50%' }

  return (
    <motion.svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <motion.path
        d="M4 8h16"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        style={lineStyle}
        animate={open ? { y: 4, rotate: 45 } : { y: 0, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 360, damping: 24 }}
      />
      <motion.path
        d="M4 16h16"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        style={lineStyle}
        animate={open ? { y: -4, rotate: -45 } : { y: 0, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 360, damping: 24 }}
      />
    </motion.svg>
  )
}
