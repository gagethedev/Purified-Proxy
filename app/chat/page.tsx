"use client"

import Navbar from '@/components/nav'
import Background from '@/components/backgrounds/main'
import { useEffect, useRef, useState } from 'react'
import AuthForm from '@/components/chat/AuthForm';

export default function Home() {
    const loaderRef = useRef<HTMLDivElement>(null);
    const [isHidden, setHidden] = useState(true);
    
    useEffect(() => {
        const token = localStorage.getItem("token");
        const loader = loaderRef.current;
        if(!loader) {
            return;
        };
        if(!token) {
            loader.style.display = "none";
            setHidden(false)
        }
    }, [])
    return (
        <div className="min-h-screen">
            <Background />
            <Navbar />
            <main className="px-4 py-8">
                <div ref={loaderRef} className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10 flex flex-col text-white">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white mb-8"></div>
                    <h1 className="text-2xl">Loading Purified chat...</h1>
                </div>
            </main>
            <AuthForm hidden={isHidden} />
        </div>
    )
}