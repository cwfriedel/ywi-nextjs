"use client";

import { useRef, useState } from "react";

// --- PayPal env toggle (reads from .env.local) ---
const IS_LIVE = process.env.NEXT_PUBLIC_PAYPAL_ENV === "live";

const PAYPAL_BASE = IS_LIVE
  ? "https://www.paypal.com/cgi-bin/webscr"
  : "https://www.sandbox.paypal.com/cgi-bin/webscr";

const MODE_LABEL = IS_LIVE ? "LIVE" : "SANDBOX TEST MODE";
const MODE_CLASS = IS_LIVE
  ? "bg-green-600 text-white"
  : "bg-yellow-500 text-black";

const BUSINESS_EMAIL =
  (IS_LIVE
    ? process.env.NEXT_PUBLIC_PAYPAL_BUSINESS_EMAIL_LIVE
    : process.env.NEXT_PUBLIC_PAYPAL_BUSINESS_EMAIL_SANDBOX) || "";

const RETURN_URL =
  process.env.NEXT_PUBLIC_RETURN_URL || "http://localhost:3000/thank-you";

const CANCEL_URL =
  process.env.NEXT_PUBLIC_CANCEL_URL || "http://localhost:3000/payment-cancelled";

// --- Your Google Apps Script Web App URL ---
const SHEET_WEB_APP_URL = "https://script.google.com/macros/s/AKfycbzQHcersQLK4zsa4cnrWOuWwtfwUD5VMAXFjcb1d8pHkwsGr63a-kp50kosePsH2n9U/exec"; // paste your deployed URL

type Tier = { code: "individual" | "family" | "business"; name: string; price: number; blurb: string };

const TIERS: Tier[] = [
  { code: "individual", name: "Basic / Individual", price: 35, blurb: "Great for individuals who want to support year-round." },
  { code: "family",     name: "Family",             price: 50, blurb: "Support as a household and enjoy member benefits together." },
  { code: "business",   name: "Business / Forest Steward", price: 100, blurb: "For businesses and land stewards investing in local resilience." },
];

export default function MembershipPage() {
  const [member, setMember] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
  });

  const [plan, setPlan] = useState<"one" | "annual" | "monthly">("one");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Hidden PayPal forms keyed by "<tier>-<plan>"
  const forms = useRef<Record<string, HTMLFormElement | null>>({});

  const emailValid = (e: string) => /\S+@\S+\.\S+/.test(e);

  async function handleJoin(tier: Tier) {
    setError(null);

    // Basic validation
    if (!member.firstName || !member.lastName) return setError("Please enter your first and last name.");
    if (!emailValid(member.email)) return setError("Please enter a valid email address.");

    // 1) Save/update in Google Sheet
    try {
      setSaving(true);
      const payload = {
        firstName: member.firstName,
        lastName: member.lastName,
        email: member.email,
        address: member.address,
        city: member.city,
        state: member.state,
        zip: member.zip,
        phone: member.phone,
        amount: tier.price,
        plan: plan === "one" ? "One-time" : plan === "annual" ? "Annual Recurring" : "Monthly Recurring",
      };

// Build FormData (no custom Content-Type header!)
const fd = new FormData();
fd.append("firstName", member.firstName);
fd.append("lastName", member.lastName);
fd.append("email", member.email);
fd.append("address", member.address);
fd.append("city", member.city);
fd.append("state", member.state);
fd.append("zip", member.zip);
fd.append("phone", member.phone);
fd.append("amount", String(tier.price));
fd.append(
  "plan",
  plan === "one" ? "One-time" : plan === "annual" ? "Annual Recurring" : "Monthly Recurring"
);

const res = await fetch(SHEET_WEB_APP_URL, {
  method: "POST",
  body: fd,             // 👈 no headers object!
  cache: "no-store",
});

console.log("Sheet response", res.status, await res.text());

      // If the sheet call fails, continue to PayPal anyway (don’t block donations)
      if (!res.ok) {
        console.warn("Sheet save failed:", await res.text());
      }
    } catch (err) {
      console.warn("Sheet save error:", err);
      // continue anyway
    } finally {
      setSaving(false);
    }

    // 2) Submit the matching hidden PayPal form
    const key = `${tier.code}-${plan}`;
    forms.current[key]?.submit();
  }

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12 space-y-10">

{/* Mode banner */}
<div className={`${MODE_CLASS} py-2 px-4 text-center text-sm font-semibold rounded-xl`}>
  {MODE_LABEL}
</div>

      <header className="space-y-3">
        <h1 className="font-head text-3xl text-forest">Become a Member</h1>
        <p className="text-stone">
          Provide your contact details below so we can keep accurate records, then choose your membership level and complete payment with PayPal.
        </p>
      </header>

      {/* Contact info */}
      <section className="card">
        <h2 className="font-head text-2xl text-forest mb-4">Member Contact (for our records)</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <label className="block">
            <span className="text-sm text-stone">First Name</span>
            <input
              className="mt-1 w-full rounded-xl border border-stone/30 px-3 py-2"
              value={member.firstName}
              onChange={(e) => setMember({ ...member, firstName: e.target.value })}
              placeholder="First Name"
            />
          </label>
          <label className="block">
            <span className="text-sm text-stone">Last Name</span>
            <input
              className="mt-1 w-full rounded-xl border border-stone/30 px-3 py-2"
              value={member.lastName}
              onChange={(e) => setMember({ ...member, lastName: e.target.value })}
              placeholder="Last Name"
            />
          </label>
          <label className="block">
            <span className="text-sm text-stone">Email Address</span>
            <input
              type="email"
              className="mt-1 w-full rounded-xl border border-stone/30 px-3 py-2"
              value={member.email}
              onChange={(e) => setMember({ ...member, email: e.target.value })}
              placeholder="name@example.org"
            />
          </label>
          <label className="block">
            <span className="text-sm text-stone">Phone Number</span>
            <input
              className="mt-1 w-full rounded-xl border border-stone/30 px-3 py-2"
              value={member.phone}
              onChange={(e) => setMember({ ...member, phone: e.target.value })}
              placeholder="(###) ###-####"
            />
          </label>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <label className="block">
            <span className="text-sm text-stone">Address</span>
            <input
              className="mt-1 w-full rounded-xl border border-stone/30 px-3 py-2"
              value={member.address}
              onChange={(e) => setMember({ ...member, address: e.target.value })}
              placeholder="Street address"
            />
          </label>
          <label className="block">
            <span className="text-sm text-stone">City</span>
            <input
              className="mt-1 w-full rounded-xl border border-stone/30 px-3 py-2"
              value={member.city}
              onChange={(e) => setMember({ ...member, city: e.target.value })}
              placeholder="City"
            />
          </label>
          <label className="block">
            <span className="text-sm text-stone">State</span>
            <input
              className="mt-1 w-full rounded-xl border border-stone/30 px-3 py-2"
              value={member.state}
              onChange={(e) => setMember({ ...member, state: e.target.value })}
              placeholder="CA"
            />
          </label>
          <label className="block">
            <span className="text-sm text-stone">Zip</span>
            <input
              className="mt-1 w-full rounded-xl border border-stone/30 px-3 py-2"
              value={member.zip}
              onChange={(e) => setMember({ ...member, zip: e.target.value })}
              placeholder="ZIP Code"
            />
          </label>
        </div>

        {error && <p className="text-red-600 text-sm mt-3">{error}</p>}
      </section>

      {/* Billing preference */}
      <section className="card">
        <h3 className="font-head text-xl text-forest mb-3">Billing Preference</h3>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            className={`px-4 py-2 rounded-xl border ${plan === "one" ? "bg-accent text-white" : "border-stone/30"}`}
            onClick={() => setPlan("one")}
          >
            One-time
          </button>
          <button
            type="button"
            className={`px-4 py-2 rounded-xl border ${plan === "annual" ? "bg-accent text-white" : "border-stone/30"}`}
            onClick={() => setPlan("annual")}
          >
            Auto-renew yearly
          </button>
          <button
            type="button"
            className={`px-4 py-2 rounded-xl border ${plan === "monthly" ? "bg-accent text-white" : "border-stone/30"}`}
            onClick={() => setPlan("monthly")}
          >
            Auto-renew monthly
          </button>
        </div>
      </section>

      {/* Tier cards + hidden PayPal forms */}
      <section className="grid md:grid-cols-3 gap-5">
        {TIERS.map((tier) => (
          <article key={tier.code} className="border border-stone/20 rounded-2xl p-5 bg-white/90">
            <div className="font-head text-xl text-forest">{tier.name}</div>
            <div className="text-stone">${tier.price} / year</div>
            <p className="text-sm text-stone mt-2">{tier.blurb}</p>

            <button
              className="btn-primary w-full mt-4 disabled:opacity-60"
              disabled={saving}
              onClick={() => handleJoin(tier)}
            >
              {saving ? "Saving..." : "Join Now"}
            </button>

            {/* Hidden PayPal forms for this tier */}
            {/* One-time */}
            <form
  ref={(el) => { forms.current[`${tier.code}-one`] = el; }}
  action={PAYPAL_BASE}
  method="post"
  target="_blank"
  className="hidden"
>
  <input type="hidden" name="cmd" value="_xclick" />
  <input type="hidden" name="business" value={BUSINESS_EMAIL} />
  <input type="hidden" name="item_name" value={`YWI Membership — ${tier.name}`} />
  <input type="hidden" name="amount" value={String(tier.price)} />
  <input type="hidden" name="currency_code" value="USD" />

  {/* these 3 MUST be present, exactly like your sub forms */}
  <input type="hidden" name="return" value={RETURN_URL} />
  <input type="hidden" name="cancel_return" value={CANCEL_URL} />
  <input type="hidden" name="rm" value="1" /> {/* force GET return */}
</form>


            {/* Annual recurring */}
            <form
              ref={(el) => { forms.current[`${tier.code}-annual`] = el; }}
              action={PAYPAL_BASE}
              method="post"
              target="_blank"
              className="hidden"
            >
              <input type="hidden" name="cmd" value="_xclick-subscriptions" />
              <input type="hidden" name="business" value={BUSINESS_EMAIL} />
              <input type="hidden" name="item_name" value={`YWI Membership — ${tier.name} (Annual Recurring)`} />
              <input type="hidden" name="currency_code" value="USD" />
              <input type="hidden" name="a3" value={String(tier.price)} />
              <input type="hidden" name="p3" value="1" />
              <input type="hidden" name="t3" value="Y" />
              <input type="hidden" name="src" value="1" />
              <input type="hidden" name="sra" value="1" />
              <input type="hidden" name="return" value={RETURN_URL} />
              <input type="hidden" name="cancel_return" value={CANCEL_URL} />
              <input type="hidden" name="rm" value="1" /> {/* force GET return */}
            </form>

            {/* Monthly recurring (≈ annual/12 rounded) */}
            <form
              ref={(el) => { forms.current[`${tier.code}-monthly`] = el; }}
              action={PAYPAL_BASE}
              method="post"
              target="_blank"
              className="hidden"
            >
              <input type="hidden" name="cmd" value="_xclick-subscriptions" />
              <input type="hidden" name="business" value={BUSINESS_EMAIL} />
              <input type="hidden" name="item_name" value={`YWI Membership — ${tier.name} (Monthly Recurring)`} />
              <input type="hidden" name="currency_code" value="USD" />
              <input type="hidden" name="a3" value={String(Math.max(1, Math.round(tier.price / 12)))} />
              <input type="hidden" name="p3" value="1" />
              <input type="hidden" name="t3" value="M" />
              <input type="hidden" name="src" value="1" />
              <input type="hidden" name="sra" value="1" />
              <input type="hidden" name="return" value={RETURN_URL} />
                                   <input type="hidden" name="cancel_return" value={CANCEL_URL} />
                                   <input type="hidden" name="rm" value="1" /> {/* force GET return */}
            </form>
          </article>
        ))}
      </section>

      <section className="card">
        <h2 className="font-head text-2xl text-forest mb-2">Questions?</h2>
        <p className="text-stone">
          You can cancel recurring memberships anytime in your PayPal account settings.
          For membership questions, email <strong>info@yubawatershedinstitute.org</strong>.
        </p>
      </section>
    </div>
  );
}
