import type { Slide } from '../../components/HeroSlider'

import { Catalog } from '../../components/Catalog'
import { HeroSlider } from '../../components/HeroSlider'

const slides: Slide[] = [
  {
    id: 1,
    image: '/backgrounds/hero-slider-1.jpg',
    title: 'Quality drinks that are time-tested',
    description: 'In our store, we believe \nthat every bottle of wine tells a story',
  },
  {
    id: 2,
    image: '/backgrounds/hero-slider-2.jpg',
    title: 'The sweetest gifts of the sun',
    description: 'Indulge in exquisite flavors, \ncrafted with passion',
  },
  {
    id: 3,
    image: '/backgrounds/hero-slider-3.jpg',
    title: 'A culture that lives on for centuries',
    description: 'Experience the art of winemaking at its best',
  },
]

export function Home() {
  return (
    <>
      <HeroSlider slides={slides} />
      <Catalog />
    </>
  )
}
