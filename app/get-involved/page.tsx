import Link from 'next/link'

export default function GetInvolvedPage(){
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12 space-y-10">
      <h1 className="font-head text-3xl text-forest">Get Involved</h1>

      <section id="member" className="card">
        <h2 className="font-head text-2xl text-forest">Become a Member</h2>
        <p className="mt-2">Membership sustains education and stewardship year‑round. Members receive event updates and priority registration.</p>
        <Link href="/membership" className="btn-primary mt-3 inline-block">
  Join Now
</Link>
      </section>

      <section id="donate" className="card">
        <h2 className="font-head text-2xl text-forest">Donate</h2>
        <p className="mt-2">Your gift supports local forest health projects and public programs.</p>
        <Link href="donate" className="btn-primary mt-3 inline-block">Donate</Link>
      </section>
    </div>
  )
}
