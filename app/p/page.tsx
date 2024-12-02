"use client"

import Navbar from '@/components/nav'
import Background from '@/components/backgrounds/main'
import animations from "@/components/css/animations.module.css"
import SearchBar from "@/components/proxy/SearchBar"
import ProxyNav from '@/components/proxy/ProxyNav'
import React, { FormEvent } from 'react'
import Script from 'next/script'
import sendTo from '@/lib/proxySetup'

export default function Home() {
  const handleSubmit = (input: string, event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    document.getElementById('frameContainer')!.style.display = 'block';
    document.getElementById('mainContainer')!.style.display = 'none';
    if (!isUrl(input)) {
      sendTo("https://google.com/search?q=" + input);
    } else {
      sendTo(input);
    }
  }
  return (
    <>
      <Background />
      <div id="frameContainer" className="hidden h-full w-full fixed z-10">
        <ProxyNav />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
        </div>
        <iframe
          className={`h-full w-full fixed ${animations.fadein} z-10`}
          id="searchFrame"
        />
      </div>
      <div id="mainContainer">
        <Navbar />
        <section className={`flex min-h-screen items-center justify-center flex-col ${animations.fadein}`}>
          <h1 className="text-4xl font-bold text-white mb-6">Search</h1>
          <div className="flex items-center justify-center flex-row">
            <SearchBar onSubmit={handleSubmit} />
          </div>
        </section>
        <Script src="/uv/uv.bundle.js" />
      </div>
    </>
  )
}
function isUrl(val: string = ""): boolean {
  return /^(https?:\/\/)?[\da-z\.-]+\.[a-z\.]{2,6}([\/\w \.-]*)*\/?$|^[^\s]+\.[^\s]+$/i.test(val.trim());
}