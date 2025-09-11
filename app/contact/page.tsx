export default function ContactPage(){
  const EMAIL = "info@yubawatershedinstitute.org"

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
      <h1 className="font-head text-3xl text-forest mb-4">Contact</h1>
      <p className="mb-4">Questions about our programs or partnerships? We’d love to hear from you.</p>
      <div className="card">
        <p>
          <strong>Email:</strong>{' '}
          <a href={`mailto:${EMAIL}`} className="underline text-forest" aria-label={`Email ${EMAIL}`}>
            {EMAIL}
          </a>
        </p>
        <p className="mt-2"><strong>Mailing Address:</strong> Yuba Watershed Institute, PO Box 2198, Nevada City, CA 95959</p>
      </div>
    </div>
  )
}