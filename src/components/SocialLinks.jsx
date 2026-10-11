import { SocialIcon } from './Icons.jsx'

const links = [
  { label: 'Email', type: 'email', href: 'mailto:debsoumallo@gmail.com' },
  { label: 'LinkedIn', type: 'linkedin', href: 'https://www.linkedin.com/in/soumallo-deb-86a45a437' },
  { label: 'X', type: 'x', href: 'https://x.com/soumallo62590' },
  { label: 'GitHub', type: 'github', href: 'https://github.com/Soumallo99' },
]

export default function SocialLinks({ compact = false }) {
  return (
    <ul className={`social-links${compact ? ' social-links--compact' : ''}`}>
      {links.map((link) => (
        <li key={link.type}>
          <a
            href={link.href}
            aria-label={link.type === 'email' ? 'Email Soumallo Deb' : `Open Soumallo Deb on ${link.label}`}
            title={link.type === 'email' ? 'Email debsoumallo@gmail.com' : `Open Soumallo Deb on ${link.label}`}
            target={link.type === 'email' ? undefined : '_blank'}
            rel={link.type === 'email' ? undefined : 'noopener noreferrer'}
          >
            <SocialIcon type={link.type} className="social-icon" />
            {!compact && <span>{link.label}</span>}
          </a>
        </li>
      ))}
    </ul>
  )
}
