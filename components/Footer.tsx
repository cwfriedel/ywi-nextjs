import Link from 'next/link'
import FooterSubscribe from '@/components/FooterSubscribe'

export default function Footer(){
  return (
    <footer className="mt-16 border-t border-stone/20 bg-white/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 grid sm:grid-cols-3 gap-8">
        <div>
          <h4 className="font-head text-lg text-forest mb-3">Yuba Watershed Institute</h4>
          <p className="text-sm text-stone">Nevada City, California · 501(c)(3) non-profit</p>
          <p className="text-sm text-stone mt-2">Promoting the sustainable use of natural resources and protecting long-term biological diversity within the Yuba River watershed.</p>
        </div>
        <div>
          <h5 className="font-head text-base text-forest mb-3">Quick Links</h5>
          <ul className="space-y-2 text-sm">
            <li><Link className="link" href="/about">About Us</Link></li>
            <li><Link className="link" href="/our-work">Our Work</Link></li>
            <li><Link className="link" href="/events">Events</Link></li>
            <li><Link className="link" href="/get-involved">Get Involved</Link></li>
          </ul>
        </div>
        <div>
          <h5 className="font-head text-base text-forest mb-3">Support</h5>
          <p className="text-sm text-stone">Your gift sustains forest health projects, ecological restoration, and educational events.</p>
          <Link href="/donate" className="btn-primary mt-3 inline-block">Donate</Link>
        </div>
      </div>

      {/* Newsletter signup (Mailchimp embed) */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <FooterSubscribe />
      </div>

      <div className="py-4 text-center text-xs text-stone/80">© {new Date().getFullYear()} Yuba Watershed Institute</div>
    </footer>
  )
}
