import NewsletterBar from '@/components/NewsletterBar'

export default function FooterSubscribe() {
  return (
    <div className="mt-8 pt-6 border-t">
      <NewsletterBar
        action="https://YOUR_DC.list-manage.com/subscribe/post?u=YOUR_U&id=YOUR_ID"
        title="Get YWI updates"
        subtitle="Occasional emails on projects, events, and Tree Rings."
      />
    </div>
  )
}
