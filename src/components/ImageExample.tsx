import React from 'react'
import logo from '../assets/images/logo.svg'

export default function ImageExample() {
  return (
    <div style={{display: 'flex', gap: 16, alignItems: 'center'}}>
      <div>
        <p>Importée depuis <code>src/assets</code> (bundlée):</p>
        <img src={logo} alt="Logo" width={160} />
      </div>

      <div>
        <p>Servie depuis <code>public/images</code> (URL):</p>
        <img src="/images/logo-public.svg" alt="Logo public" width={200} />
      </div>
    </div>
  )
}
