
export default function ThankYouPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 py-16 space-y-6 text-center">
      <h1 className="font-head text-3xl text-forest">Thank you!</h1>
      <p className="text-stone">
        Your membership/donation helps sustain stewardship and education in the Yuba River watershed.
      </p>
      <p className="text-stone">
        A confirmation email from PayPal is on its way. If you have any questions, email
        {" "}
        <strong>info@yubawatershedinstitute.org</strong>.
      </p>
    </div>
  );
}
