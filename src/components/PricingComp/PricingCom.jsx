import React from 'react'
import Footer from '../LandingPage/Footer'
import Header from './Heading/index'
import NavBar from '../../components/LandingPage/navbar/index'
import Pack from './Pack/index'
import PlansTab from './PlansTab/index'
const PricingCom = () => {
  return (
    <>
    <NavBar></NavBar>
      <Header></Header>
    <Pack></Pack>
    <PlansTab></PlansTab>
      <Footer></Footer>
    </>
  )
}

export default PricingCom
