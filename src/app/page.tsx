import About from '@/components/home/About'
import Banner from '@/components/home/Banner'
import Cta from '@/components/home/Cta'
import Grid from '@/components/home/Grid'
import Section2 from '@/components/home/Section2'
import Stories from '@/components/home/Stories'
import Testimonial from '@/components/home/Testimonial'
import Image from 'next/image'

export default function Home() {
  return (
    <>
    <Banner/>
    <About/>
    {/* <Section2/> */}
    <Grid/>
    <Testimonial/>
    <Stories/>
    <Cta/>
    </>
  )
}
