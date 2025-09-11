import Link from 'next/link'
import Image from 'next/image'

export default function WorkPage(){
  const cards = [
    {
      title: 'Forest Health & Fuels Reduction',
      img: 'fuels.jpg',
      alt: 'Crew conducting hand thinning in mixed-conifer forest',
      copy:
        "We plan and implement landscape-scale treatments—strategic fuel breaks, hand thinning, pile burning, and prescribed fire—to reduce wildfire risk, protect evacuation routes, and restore resilient forest structure and habitat."
    },
    {
      title: 'Education & Field Programs',
      img: 'community.jpg',
      alt: 'Participants at a YWI field program in the forest',
      copy:
        "We connect people to place through hands-on learning. Join our annual Fungus Foray, browse back issues of Tree Rings, and look for seasonal walks & talks on fire ecology, native plants, and watershed science."
    }
  ]

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
      <h1 className="font-head text-3xl text-forest mb-4">Our Work</h1>

      <p className="max-w-3xl mb-8">
        We care for the Yuba watershed by pairing on-the-ground forest stewardship with community education. Our projects
        focus on making forests safer and more resilient, and our programs invite people to learn, explore, and contribute.
      </p>

      <div className="grid lg:grid-cols-2 gap-8">
        {cards.map((p,i)=> (
          <article key={i} className="card">
            <Link href={p.title.startsWith('Forest') ? '/projects' : '/programs'} className="block group">
              <Image
                src={`/images/${p.img}`}
                alt={p.alt}
                width={1200}
                height={800}
                className="h-56 w-full object-cover rounded-lg mb-4"
              />
              <h3 className="font-head text-xl text-forest">{p.title}</h3>
              <p className="mt-2">{p.copy}</p>
              <span className="inline-block mt-3 text-forest underline">Explore →</span>
            </Link>
          </article>
        ))}
      </div>
    </div>
  )
}
