"use client"

import { useState } from "react"
import Image from "next/image"
import Lightbox from "yet-another-react-lightbox"
import "yet-another-react-lightbox/styles.css"

export default function GalleryLightbox({ images, title }: { images: string[]; title: string }) {
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)

  if (!images?.length) return null

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((src, i) => (
          <button
            key={i}
            type="button"
            className="relative h-36 w-full cursor-pointer focus:outline-none"
            onClick={() => {
              setIndex(i)
              setOpen(true)
            }}
            aria-label={`Open ${title} photo ${i + 1}`}
          >
            <Image src={src} alt={`${title} photo ${i + 1}`} fill className="object-cover rounded-lg" />
          </button>
        ))}
      </div>
      <Lightbox
        open={open}
        index={index}
        close={() => setOpen(false)}
        slides={images.map((src) => ({ src }))}
      />
    </>
  )
}
