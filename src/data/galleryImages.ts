// Photos of Massimo Paparello

import { publicAsset } from "@/lib/asset"

export interface MediaItem {
  src: string
  width: number
  height: number
  alt?: string
  objectPosition?: string
}

export const galleryImages: MediaItem[] = [
  {
    src: publicAsset("images/massimo-06.jpg"),
    width: 4,
    height: 5,
    alt: "Massimo Paparello",
  },
  {
    src: publicAsset("images/massimo-02.jpg"),
    width: 4,
    height: 5,
    alt: "Massimo Paparello",
  },
  {
    src: publicAsset("images/massimo-03.jpg"),
    width: 4,
    height: 5,
    alt: "Massimo Paparello",
  },
  {
    src: publicAsset("images/massimo-04.jpg"),
    width: 4,
    height: 5,
    alt: "Massimo Paparello",
  },
  {
    src: publicAsset("images/massimo-05.jpg"),
    width: 4,
    height: 5,
    alt: "Massimo Paparello",
  },
  {
    src: publicAsset("images/massimo-01.jpg"),
    width: 4,
    height: 5,
    alt: "Massimo Paparello",
  },
  {
    src: publicAsset("images/massimo-07.jpg"),
    width: 4,
    height: 5,
    alt: "Massimo Paparello",
  },
  {
    src: publicAsset("images/massimo-09.jpg"),
    width: 4,
    height: 5,
    alt: "Massimo Paparello",
  },
  {
    src: publicAsset("images/massimo-10.jpg"),
    width: 4,
    height: 5,
    alt: "Massimo Paparello",
    objectPosition: "80% center",
  },
]
