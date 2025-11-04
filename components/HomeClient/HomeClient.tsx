"use client";

// import { useCommentsPage } from '@/hooks/useCommentsPage';
import React, { useState, useEffect } from 'react'
import Footer from '../Footer';
import Hero from '../Hero';
import ProjectOverview from '../ProjectOverview';
import GreenMap from './GreenMap';
import WhyChoose from './WhyChoose';
import ConnectivityHighlights from './ConnectivityHighlights';
import AmenitiesCarousel from './AmenitiesCarousel';
import LocationSection from './LocationSection';
import ContactUsSection from './ContactUsSection';
import StatsTiles from './StatsTiles';
import DisclaimerSection from './DisclaimerSection';
import { GalleriesByTab } from '@/lib/galleries';
import PopupForm from '../PopupForm';

export default function HomeClient({ galleriesByTab }: { galleriesByTab: GalleriesByTab }) {
    const [showPopup, setShowPopup] = useState(false);

    const handlePopup = () => {
        setShowPopup(!showPopup);
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowPopup(true);
        }, 7000); // 7 seconds

        return () => clearTimeout(timer); // Clear timeout if component unmounts
    }, []);

    // useCommentsPage("Home");
    return (
        <>
            <main className="bg-white">
                <Hero handlePopup={handlePopup} />
                <GreenMap />
                <WhyChoose handlePopup={handlePopup} />
                <ConnectivityHighlights />
                <AmenitiesCarousel initialData={galleriesByTab}/>
                <LocationSection handlePopup={handlePopup} />
                <ContactUsSection />
                <StatsTiles />
                <DisclaimerSection />
            </main>
            <footer>
                <Footer />
            </footer>
            {showPopup && <PopupForm onClose={handlePopup} />}
        </>
    )
}
