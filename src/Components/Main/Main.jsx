import React from "react";
import Navbar from "../Navbar/Navbar";
import Slider from "../Slider/Slider";
import NavigateButtons from "../NavigateButtons/NavigateButtons";
import ProductSection from "../ProductSection/ProductSection";
import Footer from "../Footer/Footer";
import SideNav from "../SideNav/SideNav";

const Main = () => {
  return (
    <div>
      <Navbar></Navbar>
      <SideNav></SideNav>
      <Slider></Slider>
      <NavigateButtons></NavigateButtons>
      <ProductSection></ProductSection>
      <Footer></Footer>
    </div>
  );
};

export default Main;
