"use client";

// import { useCommentsPage } from '@/hooks/useCommentsPage';
import React from 'react'
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

export default function HomeClient({ galleriesByTab }: { galleriesByTab: GalleriesByTab }) {
    // useCommentsPage("Home");
    return (
        <>
            <main className="bg-white">
                <Hero />
                <GreenMap />
                <WhyChoose />
                <ConnectivityHighlights />
                <AmenitiesCarousel initialData={galleriesByTab}/>
                <LocationSection />
                <ContactUsSection />
                <StatsTiles />
                <DisclaimerSection />
            </main>
            <footer>
                <Footer />
            </footer>
        </>
    )
}
