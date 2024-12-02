import Navbar from '@/components/nav'
import Background from '@/components/backgrounds/main'
import animations from "@/components/css/animations.module.css"
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div>
      <Background />
      <Navbar />
      <section className={`flex min-h-screen items-center justify-center flex-col ${animations.fadein}`}>
        <h1 className="text-6xl font-bold text-white mb-6">Purified</h1>
        <p className="text-gray-400 mb-6 text-xl">The premier method for an unfiltered, untracked internet</p>
        <div className="flex items-center justify-center flex-row">
          <Link href="/p">
            <Button variant="default" size="lg" className="mr-5">
              Search
            </Button>
          </Link>
          <Link href="/g">
            <Button variant="default" size="lg" className="mr-5">
              Play
            </Button>
          </Link>
          <Link href="/a">
            <Button variant="default" size="lg" className="mr-5">
              Apps
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}