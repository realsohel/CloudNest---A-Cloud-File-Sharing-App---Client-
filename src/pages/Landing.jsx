import React from 'react'
import HeroSection from '../components/landing/HeroSection'
import FeatureSection from '../components/landing/FeatureSection'
import PricingSection from '../components/landing/PricingSection'
import TestimonialsSection from '../components/landing/TestimonialsSection'
import CtaSection from '../components/landing/CtaSection'
import Footer from '../components/landing/Footer'

const Landing = () => {
  return (
    <div className='landing-page bg-linear-to-b from-gray-50 to-gray-100'>
      {/* Hero Section */}
      <HeroSection/>

      {/* Features Section */}
      <FeatureSection/>

      {/* Pricing Section */}
      <PricingSection/>

      {/* Testimonials Section */}
      <TestimonialsSection/>

      {/* CTA Section */}
      <CtaSection/>

      {/* Footer */}
      <Footer/>
      
    </div>
  )
}

export default Landing
