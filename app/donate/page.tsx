export default function DonatePage() {
  const business = "info@yubawatershedinstitute.org";

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12 space-y-8">
      <h1 className="font-head text-3xl text-forest">Donate</h1>
      <p>
  Your gift sustains stewardship projects like forest health and fuels reduction,
  along with educational programs for the community. Thank you for supporting
  this work.
</p>

     {/* One-time gift */}
      <section className="card">
        <h2 className="font-head text-2xl text-forest mb-2">One-Time Gift</h2>
        <form
          action="https://www.paypal.com/cgi-bin/webscr"
          method="post"
          target="_blank"
          className="space-y-4"
        >
          <input type="hidden" name="cmd" value="_xclick" />
          <input type="hidden" name="business" value={business} />
          <input type="hidden" name="item_name" value="Yuba Watershed Institute Donation" />
          <input type="hidden" name="currency_code" value="USD" />

          <label className="block">
            <span className="text-sm text-stone">Amount (USD)</span>
            <input
              name="amount"
              type="number"
              min="1"
              step="1"
              required
              placeholder="50"
              className="mt-1 w-full rounded-xl border border-stone/30 px-3 py-2"
            />
          </label>

          <button type="submit" className="btn-primary">Donate with PayPal</button>
        </form>
      </section>

      {/* Monthly recurring gift */}
      <section className="card">
        <h2 className="font-head text-2xl text-forest mb-2">Monthly Gift</h2>
        <form
          action="https://www.paypal.com/cgi-bin/webscr"
          method="post"
          target="_blank"
          className="space-y-4"
        >
          <input type="hidden" name="cmd" value="_xclick-subscriptions" />
          <input type="hidden" name="business" value={business} />
          <input type="hidden" name="item_name" value="Yuba Watershed Institute — Monthly Donation" />
          <input type="hidden" name="currency_code" value="USD" />

          <label className="block">
            <span className="text-sm text-stone">Monthly amount (USD)</span>
            <input
              name="a3"
              type="number"
              min="1"
              step="1"
              required
              placeholder="15"
              className="mt-1 w-full rounded-xl border border-stone/30 px-3 py-2"
            />
          </label>

          <input type="hidden" name="p3" value="1" />  {/* every 1 month */}
          <input type="hidden" name="t3" value="M" />  {/* M = months */}
          <input type="hidden" name="src" value="1" />  {/* recurring */}
          <input type="hidden" name="sra" value="1" />  {/* reattempt on failure */}

          <button type="submit" className="btn-primary">Start Monthly Donation</button>
        </form>

        <p className="text-xs text-stone mt-2">
          You can cancel recurring donations anytime in your PayPal account settings.
        </p>
      </section>

      <section className="card">
        <h2 className="font-head text-2xl text-forest mb-2">Prefer to give by mail?</h2>
        <p>Yuba Watershed Institute<br/>P.O. Box 2198<br/>Nevada City, CA 95959</p>
      </section>
    </div>
  );
}
