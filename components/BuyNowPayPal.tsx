type Props = {
  hostedButtonId: string
  sandbox?: boolean
  label?: string
  /** If true, use a direct GET link instead of POST (useful for debugging) */
  useGetLink?: boolean
}

export default function BuyNowPayPal({
  hostedButtonId,
  sandbox,
  label = "Buy the Book",
  useGetLink = false
}: Props) {
  const base = sandbox
    ? "https://www.sandbox.paypal.com/cgi-bin/webscr"
    : "https://www.paypal.com/cgi-bin/webscr"

  if (useGetLink) {
    const href = `${base}?cmd=_s-xclick&hosted_button_id=${encodeURIComponent(hostedButtonId)}&currency_code=USD`
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="btn-primary">
        {label}
      </a>
    )
  }

  return (
    <form action={base} method="post" target="_blank" className="inline-block">
      <input type="hidden" name="cmd" value="_s-xclick" />
      <input type="hidden" name="hosted_button_id" value={hostedButtonId} />
      <input type="hidden" name="currency_code" value="USD" />
      <button type="submit" className="btn-primary">{label}</button>
    </form>
  )
}
