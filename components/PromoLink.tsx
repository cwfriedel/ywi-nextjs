import Link from 'next/link'

interface PromoLinkProps {
  href: string
  label: string
  className?: string
}

export default function PromoLink({ href, label, className }: PromoLinkProps) {
  if (href.endsWith('.pdf')) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {label} →
      </a>
    )
  }

  return (
    <Link href={href} className={className}>
      {label} →
    </Link>
  )
}
