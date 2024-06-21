import React, { useEffect, useState, useRef } from "react";
import NavBar from "../../components/LandingPage/navbar/";
import Heading from "../../components/LandingPage/heading";
import Steps from "../../components/LandingPage/steps";
import Advantages from "../../components/LandingPage/advantages";
import Desc from "../../components/LandingPage/description";
import Membership from "../../components/LandingPage/membership";
import Services from "../../components/LandingPage/services";
import Prices from "../../components/LandingPage/prices/prices";
import FAQ from "../../components/LandingPage/faq";
import Footer from "../../components/LandingPage/Footer";
import Button from "../../components/LandingPage/buttons";
import Card from "../../components/LandingPage/card";
import { useInView } from "react-intersection-observer";
import styles from "./style.module.scss";
import { useMediaQuery } from "react-responsive";

const LandingPage = () => {
  const [activeSection, setActiveSection] = useState("");

  const headingRef = useRef(null);
  const servicesRef = useRef(null);
  const advantagesRef = useRef(null);
  const pricingRef = useRef(null);
  const faqRef = useRef(null);
  const { ref: magicSectionRef, inView: magicSectionIsVisible } = useInView({
    threshold: 0.1, // Adjust the threshold as needed
  });

  const isBigScreen = useMediaQuery({ query: "(min-width: 750px)" });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "0px", threshold: 0.5 }
    );

    if (headingRef.current) observer.observe(headingRef.current);
    if (servicesRef.current) observer.observe(servicesRef.current);
    if (advantagesRef.current) observer.observe(advantagesRef.current);
    if (pricingRef.current) observer.observe(pricingRef.current);
    if (faqRef.current) observer.observe(faqRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    console.log(
      `Magic section is ${magicSectionIsVisible ? "in" : "out of"} view`
    );
  }, [magicSectionIsVisible]);

  return (
    <>
      <NavBar />
      {isBigScreen && (
        <>
          <div
            className={`${
              magicSectionIsVisible
                ? styles.ButtonFlex_FooterReached
                : styles.ButtonFlex
            }`}
          >
            <Button className="verticalText" background="#000" color="#FFF">
              SELECTED WORK 🐼​
            </Button>
          </div>
          <div
            className={`${
              magicSectionIsVisible
                ? styles.centerGrip7_FooterReached
                : styles.centerGrip7
            }`}
          >
            <Card color={"#000"} height="74px" width="60%">
              <div className="grid1-7">
                <div
                  style={{
                    width: "18%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  className="item1"
                >
                  <div
                    style={{
                      width: "90%",
                      marginLeft: "25%!important",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    className={styles.item1logo}
                  >
                    XSUSTAIN🐼
                  </div>
                </div>
                <div
                  style={{
                    width: "20%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  className="item2"
                >
                  <Button
                    background={activeSection === "heading" ? "#FFF" : "#000"}
                    color={activeSection === "heading" ? "#000" : "#FFF"}
                  >
                    How it works
                  </Button>
                </div>
                <div
                  style={{
                    width: "18%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  className="item3"
                >
                  {" "}
                  <Button
                    background={
                      activeSection === "advantages" ? "#FFF" : "#000"
                    }
                    color={activeSection === "advantages" ? "#000" : "#FFF"}
                  >
                    Benefits
                  </Button>
                </div>
                <div
                  style={{
                    width: "18%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  className="item4"
                >
                  {" "}
                  <Button
                    background={activeSection === "services" ? "#FFF" : "#000"}
                    color={activeSection === "services" ? "#000" : "#FFF"}
                  >
                    Services
                  </Button>
                </div>
                <div
                  style={{
                    width: "18%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  className="item5"
                >
                  <Button
                    background={activeSection === "pricing" ? "#FFF" : "#000"}
                    color={activeSection === "pricing" ? "#000" : "#FFF"}
                  >
                    Pricing
                  </Button>
                </div>
                <div
                  style={{
                    width: "18%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  className="item6"
                >
                  <Button
                    background={activeSection === "faq" ? "#FFF" : "#000"}
                    color={activeSection === "faq" ? "#000" : "#FFF"}
                  >
                    FAQs
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </>
      )}
      <div id="heading" ref={headingRef}>
        <Heading />
      </div>
      <Steps />
      <div id="advantages" ref={advantagesRef}>
        <Advantages />
      </div>
      <Desc />
      <Membership />
      <div id="services" ref={servicesRef}>
        <Services />
      </div>
      <div id="pricing" ref={pricingRef}>
        <Prices />
      </div>
      <div id="faq" ref={faqRef}>
        <FAQ />
      </div>
      <div className={styles.heading} ref={magicSectionRef}>
        .
      </div>
      <Footer />
    </>
  );
};

export default LandingPage;
