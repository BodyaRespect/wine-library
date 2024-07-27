import type { Slide } from '../../components/HeroSlider'

import { Catalog } from '../../components/Catalog'
import { Footer } from '../../components/Footer'
import { HeroSlider } from '../../components/HeroSlider'

import firstImg from '/backgrounds/hero-slider-1.jpg'
import secondImg from '/backgrounds/hero-slider-2.jpg'
import thirdImg from '/backgrounds/hero-slider-3.jpg'

export const slides: Slide[] = [
  {
    id: 1,
    image: firstImg,
    title: 'Quality drinks that are time-tested',
    description: 'In our store, we believe \nthat every bottle of wine tells a story',
  },
  {
    id: 2,
    image: secondImg,
    title: 'The sweetest gifts of the sun',
    description: 'Indulge in exquisite flavors, \ncrafted with passion',
  },
  {
    id: 3,
    image: thirdImg,
    title: 'A culture that lives on for centuries',
    description: 'Experience the art of winemaking at its best',
  },
]

export function Home() {
  return (
    <>
      <HeroSlider slides={slides} />
      <Catalog />
      <Footer />
    </>
  )
}
