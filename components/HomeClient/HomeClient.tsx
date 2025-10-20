"use client";

// import { useCommentsPage } from '@/hooks/useCommentsPage';
import React from 'react'
import Footer from '../Footer';
import Hero from '../Hero';
import ProjectOverview from '../ProjectOverview';
import GreenMap from './GreenMap';
import WhyChoose from './WhyChoose';
import ConnectivityHighlights from './ConnectivityHighlights';

export default function HomeClient() {
    // useCommentsPage("Home");
    return (
        <>
            <main className="bg-white">
                <Hero />
                <GreenMap />
                <WhyChoose />
                <ConnectivityHighlights />
            </main>
            <footer>
                <Footer />
            </footer>
        </>
    )
}
