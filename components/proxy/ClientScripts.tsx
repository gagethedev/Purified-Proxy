'use client'

import Script from 'next/script'

export default function ClientScripts() {
  return (
    <>
      
      <Script src="/uv/uv.config.js" />
      <Script src="baremux/index.js" />
      <Script src="epoxy/index.js" />
    </>
  )
}

