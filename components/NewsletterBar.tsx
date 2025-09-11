import React from 'react'

type Props = {
  /** Mailchimp form action URL like: https://YOUR_DC.list-manage.com/subscribe/post?u=XXXX&id=YYYY */
  action: string
  title?: string
  subtitle?: string
}

export default function NewsletterBar({
  action,
  title = 'Stay in the loop',
  subtitle = 'Get updates on projects, events, and Tree Rings.'
}: Props) {
  return (
    <section className="rounded-2xl border p-4 sm:px-6 sm:py-5 bg-white/70">
      <div className="flex flex-col lg:flex-row items-start gap-4 lg:items-center justify-between">
        <div>
          <h2 className="font-head text-2xl text-forest">{title}</h2>
          <p className="opacity-80 mt-1">{subtitle}</p>
        </div>

        {/* Use the Mailchimp embedded form action; open in new tab to keep users on site */}
        <form
          action={action}
          method="post"
          target="_blank"
          className="flex w-full lg:w-auto gap-2"
        >
          <label htmlFor="mce-EMAIL" className="sr-only">Email</label>
          <input
            id="mce-EMAIL"
            name="EMAIL"
            type="email"
            required
            placeholder="you@example.org"
            className="flex-1 lg:w-72 rounded-xl border px-3 py-2"
          />

          {/* Honeypot anti-bot field (kept off-screen) */}
          <div aria-hidden="true" className="absolute left-[-5000px]">
            <input type="text" name="b_fake_field" tabIndex={-1} defaultValue="" />
          </div>

          <button type="submit" className="rounded-xl bg-forest text-white px-4 py-2">
            Subscribe
          </button>
        </form>
      </div>
    </section>
  )
}
