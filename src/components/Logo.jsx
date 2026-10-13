import { Link } from 'react-router-dom'

export function Crest({ className = 'h-10 w-10' }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <path d="M32 3 56 11v20c0 15-10 25-24 30C18 56 8 46 8 31V11z" fill="#00205b" stroke="#fff" strokeWidth="2" />
      <path d="M32 9 50 15v16c0 11-7 19-18 23-11-4-18-12-18-23V15z" fill="none" stroke="#00843d" strokeWidth="3" />
      <text x="32" y="40" textAnchor="middle" fontFamily="Inter, Arial, sans-serif" fontWeight="800" fontSize="19" fill="#fff">VV</text>
    </svg>
  )
}

export default function Logo({ light = true }) {
  return (
    <Link to="/" className="flex items-center gap-3" aria-label="Vancouver Vikings — home">
      <Crest />
      <span className={`leading-tight ${light ? 'text-white' : 'text-navy'}`}>
        <span className="block text-[11px] font-semibold uppercase tracking-[0.2em] opacity-80">Vancouver</span>
        <span className="block text-lg font-extrabold tracking-tight">VIKINGS</span>
      </span>
    </Link>
  )
}
