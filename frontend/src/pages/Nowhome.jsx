import React, { useEffect } from "react";
import Sidebar from "../components/sidebar";
import img from "../components/img.jpg";
import "./Nowhome.css";

const Nowhome = () => {
    useEffect(() => {
        // Enhanced animation with smoother transitions
        const title = document.querySelector(".title-animation");
        const image = document.querySelector(".image-animation");
        const taglines = document.querySelectorAll(".tagline-animation");
        const ctaButton = document.querySelector(".cta-button");
        
        // Staggered animations with smoother timing
        setTimeout(() => title.classList.add("animate"), 400);
        setTimeout(() => image.classList.add("animate"), 800);
        
        taglines.forEach((tagline, index) => {
        setTimeout(() => tagline.classList.add("animate"), 1200 + (index * 300));
        });
        
        // Add animation for CTA button
        setTimeout(() => ctaButton.classList.add("animate"), 1800);
    }, []);

    return (
        <div className="home-container">
        <div className="bg-particles"></div>
        <Sidebar />
        
        <div className="content-container">
            <div className="title-container">
            <h1 className="title-animation">
                <span className="title-gradient">Pharma</span>
                <span className="title-gradient-alt">Hub</span>
            </h1>
            </div>
            
            <div className="main-content">
            <div className="image-container">
                <div className="blob-bg"></div>
                <img 
                src={img} 
                alt="Pharma Image" 
                className="image-animation" 
                />
                <div className="glow"></div>
            </div>
            
            <div className="taglines-container">
                <p className="tagline-animation">Prescription Clarity</p>
                <p className="tagline-animation">Patient Power</p>
                <p className="tagline-animation">Healthcare Simplified</p>
            </div>
            </div>
        </div>
        </div>
    );
};

export default Nowhome;