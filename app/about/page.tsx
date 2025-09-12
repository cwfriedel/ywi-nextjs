// app/about/page.tsx
import Image from "next/image";

type Staff = {
  name: string;
  role: string;
  email?: string;
  headshot?: string; // /public/images/people/...
  bio?: string;
};
type Board = { name: string; role?: string };

import staffData from '@/data/staff.json';

const STAFF: Staff[] = staffData as Staff[];

const BOARD: Board[] = [
  { name: "Daniel Nicholson", role: "President" },
  { name: "Amber Cone", role: "Vice President" },
  { name: "Ann Hobbs", role: "Treasurer" },
  { name: "Robert Erickson" },
  { name: "Kurt Lorenz" },
  { name: "Rebecca Wayman" },
  { name: "Robert Kelly" },
  // Add directors…
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-12">
      {/* Intro */}
      <h1 className="font-head text-3xl text-forest mb-4">About Us</h1>
      <p className="mb-4">
        The Yuba Watershed Institute (YWI) is a Nevada City–based 501(c)(3)
        nonprofit dedicated to the health of forests and waterways in the Yuba
        River watershed. We connect people to the land through hands-on
        stewardship and education.
      </p>

      <h2 className="font-head text-2xl text-forest mt-8 mb-3">What We Do</h2>
      <p className="mb-4">Our work focuses on two main program areas:</p>
      <ul className="list-disc pl-6 space-y-2 mb-6">
        <li>
          <span className="font-semibold">Forest Health:</span> fuels reduction,
          forest restoration, and collaborative projects that build resilience
          across public and private lands.
        </li>
        <li>
          <span className="font-semibold">Education:</span> public events such
          as the annual Fungus Foray, publications including{" "}
          <em>Tree Rings</em> and our books, and other community learning
          opportunities.
        </li>
      </ul>
      <p className="mb-10">
        Founded in 1990, YWI partners with landowners, agencies, and local
        organizations to advance ecological resilience and protect biological
        diversity for generations to come.
      </p>

      {/* Staff */}
      <section aria-labelledby="staff" className="mt-12">
        <h2 id="staff" className="font-head text-2xl text-forest mb-4">
          Staff
        </h2>

        <ul
          role="list"
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {STAFF.map((p) => (
            <li
              key={p.name}
              className="rounded-2xl border border-stone/200 bg-white/70 p-5 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 overflow-hidden rounded-full border border-stone/200 bg-stone/10">
                  {p.headshot ? (
                    <Image
                      src={p.headshot}
                      alt={p.name}
                      width={128}
                      height={128}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full" />
                  )}
                </div>
                <div>
                  <div className="font-semibold text-forest">{p.name}</div>
                  <div className="text-sm text-stone">{p.role}</div>
                  {p.email && (
                    <a
                      href={`mailto:${p.email}`}
                      className="text-sm link block mt-1"
                    >
                      {p.email}
                    </a>
                  )}
                </div>
              </div>

              {p.bio && (
                <details className="mt-4 group">
                  <summary className="cursor-pointer text-sm text-forest/90 hover:text-forest font-medium">
                    Bio
                  </summary>
                  <p className="mt-2 text-sm text-stone leading-relaxed">
                    {p.bio}
                  </p>
                </details>
              )}
            </li>
          ))}
        </ul>
      </section>

      {/* Board */}
      <section aria-labelledby="board" className="mt-12">
        <h2 id="board" className="font-head text-2xl text-forest mb-4">
          Board of Directors
        </h2>

        <div className="rounded-2xl border border-stone/200 bg-white/70 p-5">
          <ul
            role="list"
            className="grid gap-y-2 sm:grid-cols-2 lg:grid-cols-3"
          >
            {BOARD.map((b) => (
              <li key={b.name} className="text-stone">
                <span className="font-medium text-forest">{b.name}</span>
                {b.role ? <span className="text-stone"> — {b.role}</span> : null}
              </li>
            ))}
          </ul>
        </div>
      </section>

<section className="mt-16 border-t border-gray-200 pt-10">
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
    {/* Narrative history (2/3 width on large screens) */}
    <div className="lg:col-span-2 space-y-6">
      <h2 className="font-head text-3xl text-forest mb-6">Our History</h2>
      <p>
        The Yuba Watershed Institute was born in 1990, at the height of the
        “timber wars” that swept across the American West. On the San Juan Ridge,
        between the Middle and South Yuba Rivers, neighbors began meeting to
        discuss threats to nearby Bureau of Land Management parcels. At the time,
        the BLM was considering selling off forest tracts based on their timber
        value—an approach that would have led to heavy logging and subdivision.
        Alarmed residents, including writer Gary Snyder and forest ecologist Don
        Harkin, rallied to protect these lands and met with BLM field manager
        Deane Swickard, who encouraged them to form a nonprofit. Within a year,
        the Yuba Watershed Institute (YWI) was incorporated as a 501(c)(3).
      </p>
      <p>
        From the beginning, YWI embodied collaboration. In 1991 the group signed
        a cooperative agreement with BLM and the Timber Framers Guild to jointly
        manage nearly 2,000 acres of forest. They named the land the <em>’Inimim
        Forest</em>, after the Nisenan Maidu word for ponderosa pine. Volunteers,
        scientists, and local schools soon joined forces to inventory wildlife,
        map vegetation, and draft the first community-written management plan for
        federal forestlands in the United States (1995).
      </p>
      <p>
        The Institute quickly became more than a forest watchdog. Members launched
        <em> Tree Rings</em>, a journal blending science, essays, poetry, and art;
        hosted public conferences on forest health; and created community
        traditions like the annual <em>Fungus Foray</em>, which continues to inspire
        curiosity about local ecology.
      </p>
      <p>
        Over three decades, YWI has carried out forest thinning, prescribed burns,
        and invasive plant management across hundreds of acres of the ’Inimim,
        while also fostering a deep cultural sense of place. Its projects have
        connected residents to their watershed through workdays, field walks, and
        school programs.
      </p>
      <p>
        Today, the Institute’s legacy of data collection, mapping, and community
        engagement is paying dividends. With more than thirty years of experience
        and broad public trust, YWI is now leading efforts to prepare Sierra Nevada
        forests for the challenges of the 21st century: wildfire, drought, and
        climate change. From its beginnings around kitchen tables on the Ridge to
        its role as a regional leader in resilience planning, YWI continues to live
        up to its founding vision: to care for this watershed with both knowledge
        and love.
      </p>
    </div>

    {/* Timeline sidebar (1/3 width on large screens) */}
    <aside className="lg:col-span-1 bg-gray-50 rounded-xl p-6 shadow-sm">
      <h3 className="font-head text-2xl text-forest mb-4">Our History at a Glance</h3>
      <ul className="space-y-3 text-sm leading-relaxed">
        <li><strong>1990</strong> — Local residents on San Juan Ridge organize; YWI is founded.</li>
        <li><strong>1991</strong> — Cooperative agreement with BLM creates the <em>’Inimim Forest</em> (~2,000 acres).</li>
        <li><strong>1995</strong> — First <em>’Inimim Forest Management Plan</em> published.</li>
        <li><strong>Late 1990s</strong> — Ecological inventories map wildlife, old-growth stands, watershed conditions.</li>
        <li><strong>2000</strong> — Implementation plan guides thinning and restoration; first acres treated.</li>
        <li><strong>2000s</strong> — Launch of <em>Tree Rings</em>, art shows, and annual <em>Fungus Foray</em>.</li>
        <li><strong>2010</strong> — <em>The Nature of this Place</em> published, compiling YWI’s first decades.</li>
        <li><strong>2017–2018</strong> — New inventories and draft revised management plan completed.</li>
        <li><strong>2018–present</strong> — More than 900 acres treated; major funding secured for wildfire resilience.</li>
      </ul>
    </aside>
  </div>
</section>

    </div>
  );
}

