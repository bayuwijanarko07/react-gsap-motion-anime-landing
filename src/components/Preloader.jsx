import { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './Preloader.scss';

export default function Preloader() {
  // langsung cek saat inisialisasi (no flicker)
  const hasSeenSequence = sessionStorage.getItem('loading-sequence-seen') === 'true';

  const [shouldRender, setShouldRender] = useState(!hasSeenSequence);
  const counterRef = useRef(null);
  const containerRef = useRef(null);

  useGSAP(() => {
    if (!shouldRender) return;

    const progress = { value: 0 };

    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem('loading-sequence-seen', 'true');
        setShouldRender(false);
      }
    });

    tl.to(progress, {
      value: 100,
      duration: 2,
      ease: "power2.inOut",
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.innerText = `${Math.round(progress.value)}%`;
        }
      }
    })
    .to(containerRef.current, {
      yPercent: -100,
      duration: 1.2,
      ease: "power4.inOut"
    }, "+=0.2");

  }, [shouldRender]);

  // kalau sudah pernah lihat → langsung null
  if (!shouldRender) return null;

  return (
    <div className="preloader" ref={containerRef}>
      <div className="preloader__percentage" ref={counterRef}>
        0%
      </div>
    </div>
  );
}