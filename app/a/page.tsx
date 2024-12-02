"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Navbar from '@/components/nav';
import Background from '@/components/backgrounds/main';
import animations from "@/components/css/animations.module.css";
import ProxyNav from '@/components/proxy/ProxyNav';
import sendTo from '@/lib/proxySetup';
import Game from '@/types/game';
import Script from 'next/script';

export default function Home() {
  const [games, setGames] = useState<[string, Game][]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch('/js/apps.json')
      .then((response) => response.json())
      .then((data) => setGames(Object.entries(data) as [string, Game][]))
      .catch((error) => console.error('Error loading games:', error));
  }, []);

  const filteredApps = games.filter(([key]) =>
    key.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAppClick = async (game: Game) => {
    try {
      await sendTo(game.url);
      document.getElementById('frameContainer')!.style.display = 'block';
      document.getElementById('mainContainer')!.style.display = 'none';
    } catch (error) {
      console.error('Failed to set up game proxy:', error);
    }
  };

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
        <div className="p-4">
          <input
            type="text"
            placeholder="Search games..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 border border-gray-700 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-gray-600"
          />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
          {filteredApps.length > 0 ? (
            filteredApps.map(([name, app]) => (
              <button
                key={name}
                onClick={() => handleAppClick(app)}
                className="block p-2 border border-gray-700 rounded-lg bg-gray-800 text-white transition hover:bg-gray-700"
              >
                <Image
                  src={app.icon}
                  alt={name}
                  width={64}
                  height={64}
                  className="w-16 h-16 mx-auto mb-2"
                />
                <h3 className="text-sm font-semibold text-center">{name}</h3>
                <p className="text-xs text-center text-gray-400">{app.description}</p>
              </button>
            ))
          ) : (
            <p className="text-center text-gray-400 col-span-full">
              No games match your search query.
            </p>
          )}
        </div>
        <Script src="/uv/uv.bundle.js" />
      </div>
    </>
  );
}

