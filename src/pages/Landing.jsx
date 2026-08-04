import React, { useEffect } from 'react'
import HeroSection from '../components/landing/HeroSection'
import FeatureSection from '../components/landing/FeatureSection'
import PricingSection from '../components/landing/PricingSection'
import TestimonialsSection from '../components/landing/TestimonialsSection'
import CtaSection from '../components/landing/CtaSection'
import Footer from '../components/landing/Footer'
import { features, FOOTER_CONSTANTS, pricingPlans, testimonials } from '../assets/data'
import { useClerk, useUser } from '@clerk/react'
import { useNavigate } from 'react-router-dom'

const Landing = () => {

  const{openSignIn, openSignUp} = useClerk();
  const {isSignedIn} = useUser();
  const navigate = useNavigate();

  useEffect(()=>{
    if(isSignedIn){
      navigate('/dashboard');
    }

  },[]);


  return (
    <div className='landing-page bg-linear-to-b from-gray-50 to-gray-100'>
      {/* Hero Section */}
      <HeroSection openSignIn={openSignIn} openSignUp={openSignUp}/>

      {/* Features Section */}
      <FeatureSection features={features}/>

      {/* Pricing Section */}
      <PricingSection pricingPlans={pricingPlans} openSignUp={openSignUp}/>

      {/* Testimonials Section */}
      <TestimonialsSection testimonials={testimonials}/>

      {/* CTA Section */}
      <CtaSection openSignUp={openSignUp}/>

      {/* Footer */}
      <Footer footers={FOOTER_CONSTANTS}/>
      
    </div>
  )
}

export default Landing
