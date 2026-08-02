import React from 'react'
import HeroSection from '../components/landing/HeroSection'
import FeatureSection from '../components/landing/FeatureSection'
import PricingSection from '../components/landing/PricingSection'
import TestimonialsSection from '../components/landing/TestimonialsSection'
import CtaSection from '../components/landing/CtaSection'
import Footer from '../components/landing/Footer'
import { features, FOOTER_CONSTANTS, pricingPlans, testimonials } from '../assets/data'

const Landing = () => {
  return (
    <div className='landing-page bg-linear-to-b from-gray-50 to-gray-100'>
      {/* Hero Section */}
      <HeroSection/>

      {/* Features Section */}
      <FeatureSection features={features}/>

      {/* Pricing Section */}
      <PricingSection pricingPlans={pricingPlans}/>

      {/* Testimonials Section */}
      <TestimonialsSection testimonials={testimonials}/>

      {/* CTA Section */}
      <CtaSection/>

      {/* Footer */}
      <Footer footers={FOOTER_CONSTANTS}/>
      
    </div>
  )
}

export default Landing
