"use client"

import React, { useEffect, useState } from 'react'

export default function Background() {
  const [circles, setCircles] = useState<Array<{ cx: number; cy: number; r: number; opacity: number }>>([])
  const [stars, setStars] = useState<Array<{ x: number; y: number; opacity: number }>>([])

  useEffect(() => {
    const generatedCircles = [...Array(15)].map(() => ({
      cx: Math.random() * 1000,
      cy: Math.random() * 2000,
      r: Math.random() * 4 + 1,
      opacity: Math.random() * 0.3 + 0.1,
    }))
    setCircles(generatedCircles)

    const generatedStars = [...Array(50)].map(() => ({
      x: Math.random() * 1000,
      y: Math.random() * 2000,
      opacity: Math.random() * 0.5 + 0.5,
    }))
    setStars(generatedStars)
  }, [])

  return (
    <div className="fixed inset-0 z-[-1] bg-[#000814] overflow-hidden">
      <svg
        viewBox="0 0 1000 2000"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-[400%]"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id="grad1" cx="50%" cy="25%" r="50%" fx="50%" fy="25%">
            <stop offset="0%" stopColor="#004080" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#000814" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#001f3f" />
            <stop offset="100%" stopColor="#003569" />
          </linearGradient>
          <linearGradient id="grad3" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0077b6" />
            <stop offset="100%" stopColor="#004080" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect width="100%" height="100%" fill="url(#grad1)" />

        {[...Array(8)].map((_, i) => (
          <g key={i}>
            <path
              d={`M${i * 250},0 Q${i * 250 + 125},${1000 + i * 100} ${i * 250 + 250},2000`}
              fill="none"
              stroke="url(#grad2)"
              strokeWidth="3"
              opacity="0.6"
            >
              <animate
                attributeName="d"
                dur={`${30 + i * 5}s`}
                repeatCount="indefinite"
                values={`M${i * 250},0 Q${i * 250 + 125},${1000 + i * 100} ${i * 250 + 250},2000;
                         M${i * 250},0 Q${i * 250 + 175},${950 + i * 100} ${i * 250 + 250},2000;
                         M${i * 250},0 Q${i * 250 + 75},${1050 + i * 100} ${i * 250 + 250},2000;
                         M${i * 250},0 Q${i * 250 + 125},${1000 + i * 100} ${i * 250 + 250},2000`}
              />
            </path>
          </g>
        ))}

        <path
          d="M0,1300 Q250,1200 500,1300 T1000,1300 L1000,2000 L0,2000 Z"
          fill="url(#grad3)"
          opacity="0.7"
        >
          <animate
            attributeName="d"
            dur="25s"
            repeatCount="indefinite"
            values="
              M0,1300 Q250,1200 500,1300 T1000,1300 L1000,2000 L0,2000 Z;
              M0,1300 Q250,1400 500,1300 T1000,1300 L1000,2000 L0,2000 Z;
              M0,1300 Q250,1200 500,1300 T1000,1300 L1000,2000 L0,2000 Z
            "
          />
        </path>

        {circles.map((circle, i) => (
          <circle
            key={i}
            cx={circle.cx}
            cy={circle.cy}
            r={circle.r}
            fill="#ffffff"
            opacity={circle.opacity}
          >
            <animate
              attributeName="opacity"
              dur={`${Math.random() * 5 + 2}s`}
              repeatCount="indefinite"
              values="0.1;0.4;0.1"
            />
            <animate
              attributeName="cy"
              dur={`${Math.random() * 20 + 10}s`}
              repeatCount="indefinite"
              values={`${circle.cy};${circle.cy - 200};${circle.cy}`}
            />
          </circle>
        ))}

        {stars.map((star, i) => (
          <circle
            key={i}
            cx={star.x}
            cy={star.y}
            r="1"
            fill="#ffffff"
            opacity={star.opacity}
            filter="url(#glow)"
          >
            <animate
              attributeName="opacity"
              dur={`${Math.random() * 3 + 1}s`}
              repeatCount="indefinite"
              values={`${star.opacity};${star.opacity * 0.5};${star.opacity}`}
            />
          </circle>
        ))}

        <circle cx="80%" cy="15%" r="100" fill="url(#grad1)" opacity="0.6">
          <animate
            attributeName="cy"
            dur="20s"
            values="15%;18%;15%"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </div>
  )
}