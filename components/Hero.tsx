// components/Hero.tsx
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative h-[420px] sm:h-[520px]">
      <Image
        src="/images/yuba-hero.jpg" // under /public/images
        alt="Yuba River in the Yuba watershed"
        fill
        priority                       // only use on the top hero
        sizes="(max-width: 768px) 100vw, 1200px"
        className="object-cover"
      />
      {/* keep your CSS overlay if you have it; bg-black/30 is a safe fallback */}
      <div className="absolute inset-0 bg-black/30 hero-overlay" />

      <div className="absolute inset-0 flex items-center">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h1 className="max-w-4xl font-head text-4xl sm:text-5xl md:text-6xl text-white drop-shadow-lg">
            Preserving the Yuba River Watershed for Generations to Come
          </h1>
          <p className="mt-4 max-w-2xl text-white/90">
            Stewardship and education rooted in the Yuba River watershed.
          </p>
          <div className="mt-6 flex gap-3">
            <Link href="/get-involved#member" className="btn-primary">
              Become a Member
            </Link>
            <Link
              href="/our-work"
              className="inline-flex items-center justify-center rounded-xl px-5 py-3 font-semibold border border-white/70 text-white hover:bg-white/10"
            >
              Our Work
            </Link>
            <Link 
              href="/programs#tree-rings" 
              className="inline-flex items-center justify-center rounded-xl px-5 py-3 font-semibold border border-white/70 text-white hover:bg-white/10"
            >
              Read Tree Rings Journal
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
