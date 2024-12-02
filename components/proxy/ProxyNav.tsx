'use client'

import { XCircle as Exit } from 'lucide-react'

export default function ProxyNav() {
  function back() {
    const frame = document.getElementById("searchFrame")!;
    frame.setAttribute("src", "");
    const frameContainer = document.getElementById("frameContainer")!;
    const mainContainer = document.getElementById("mainContainer")!;
    frameContainer.style.display = "none";
    mainContainer.style.display = "block";
  }
  return (
    <Exit onClick={back} color="black" fill="white" size="36" className="absolute z-20 cursor-pointer pt-2 right-2" />
  )
}