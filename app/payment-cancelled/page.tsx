import Link from "next/link";

export default function PaymentCancelledPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 py-16 space-y-6 text-center">
      <h1 className="font-head text-3xl text-forest">Payment not completed</h1>
      <p className="text-stone">
        Your PayPal checkout was cancelled. No charges were made.
      </p>
      <p className="text-stone">
        You can try again below or contact us at <strong>info@yubawatershedinstitute.org</strong>.
      </p>
      <Link href="/membership" className="btn-primary inline-block mt-4">Return to Membership</Link>
    </div>
  );
}

