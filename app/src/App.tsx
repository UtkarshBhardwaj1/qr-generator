// import { useState, useRef } from 'react'
// import './App.css'
// import QRCode from 'react-qr-code'

// function App() {
//   const [qrText, setQrText] = useState('')
//   const qrWrapperRef = useRef<HTMLDivElement | null>(null)

//   const downloadQR = () => {
//     const svg = qrWrapperRef.current?.querySelector('svg')
//     if (!svg) return

//     const svgData = new XMLSerializer().serializeToString(svg)
//     const canvas = document.createElement('canvas')
//     const ctx = canvas.getContext('2d')

//     const img = new Image()
//     const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' })
//     const url = URL.createObjectURL(svgBlob)

//     img.onload = () => {
//       canvas.width = img.width
//       canvas.height = img.height
//       ctx?.drawImage(img, 0, 0)
//       URL.revokeObjectURL(url)

//       const pngUrl = canvas.toDataURL('image/png')
//       const link = document.createElement('a')
//       link.download = 'qrcode.png'
//       link.href = pngUrl
//       link.click()
//     }

//     img.src = url
//   }

//   return (
//     <div className="app">
//       <h1>QR Code Generator</h1>

//       <div className="qr-section">
//         <input
//           type="text"
//           placeholder="Enter text or URL"
//           value={qrText}
//           onChange={(e) => setQrText(e.target.value)}
//         />

//         {qrText && (
//           <div className="qr-preview" ref={qrWrapperRef}>
//             <QRCode value={qrText} size={200} bgColor="#ffffff" fgColor="#000000" />
//           </div>
//         )}

//         {qrText && (
//           <button className="download-btn" onClick={downloadQR}>
//             Download QR Code
//           </button>
//         )}
//       </div>
//     </div>
//   )
// }

// export default App


import React, { useState, useRef, useEffect } from 'react';
import QRCode from 'react-qr-code';
import './App.css'; // Import the separate CSS file

function App() {
  const [qrText, setQrText] = useState<string>('');
  const qrWrapperRef = useRef<HTMLDivElement | null>(null);
  const downloadButtonRef = useRef<HTMLButtonElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (downloadButtonRef.current) {
      downloadButtonRef.current.disabled = !qrText;
    }
  }, [qrText]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQrText(e.target.value);
  };

  const downloadQR = () => {
    const svg = qrWrapperRef.current?.querySelector('svg');
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const img = new Image();
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);

      const pngUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = 'qrcode.png';
      link.href = pngUrl;
      link.click();
    };

    img.src = url;
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">Generate Your QR Code</h1>
        <p className="app-subtitle">Enter text or a URL to create a scannable QR code.</p>
      </header>

      <main className="app-body">
        <section className="input-section">
          <input
            type="text"
            ref={inputRef}
            className="input-field"
            placeholder="Enter text or URL"
            value={qrText}
            onChange={handleInputChange}
          />
        </section>

        <section className="qr-display-section">
          <div ref={qrWrapperRef} className="qr-preview-card">
            {qrText ? (
              <QRCode value={qrText} size={256} bgColor="#ffffff" fgColor="#000000" level="H" />
            ) : (
              <p className="placeholder-text">Enter text to generate QR code</p>
            )}
          </div>
        </section>

        <section className="action-section">
          <button
            ref={downloadButtonRef}
            className="download-button"
            onClick={downloadQR}
            disabled={!qrText}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="download-icon">
              <path fillRule="evenodd" d="M12 15.5a.75.75 0 01-.75-.75V4.5a.75.75 0 011.5 0v10.25a.75.75 0 01-.75.75zM4.5 19.5a.75.75 0 01.75-.75h13.5a.75.75 0 010 1.5H5.25a.75.75 0 01-.75-.75zM2.25 10.25a.75.75 0 01.75-.75h3a.75.75 0 010 1.5H3a.75.75 0 01-.75-.75zM6.75 6a.75.75 0 01.75-.75h3a.75.75 0 010 1.5H7.5a.75.75 0 01-.75-.75zm9.75 3.75a.75.75 0 01.75-.75h3a.75.75 0 010 1.5h-3a.75.75 0 01-.75-.75zM16.5 15a.75.75 0 01.75-.75h3a.75.75 0 010 1.5h-3a.75.75 0 01-.75-.75z" clipRule="evenodd" />
            </svg>
            Download
          </button>
        </section>
      </main>

    </div>
  );
}

export default App;