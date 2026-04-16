import { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './Preloader.scss';
import { Canvas } from '@react-three/fiber';
import { CloudScene } from './CloudBackground';

export default function Preloader({ onFinish }) {
  const [isReady, setIsReady] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isEntering, setIsEntering] = useState(false);

  const counterRef = useRef(null);
  const containerRef = useRef(null);
  const coverTopRef = useRef(null);
  const coverBottomRef = useRef(null);

  useGSAP(() => {
    // Lock scroll while preloading
    document.body.style.overflow = 'hidden';

    const progress = { value: 0 };

    const tl = gsap.timeline({
      onComplete: () => {
        // Ketika 100%, buka tutup/cover (reveal) perlahan
        gsap.to(coverTopRef.current, { yPercent: -100, duration: 1.5, ease: "power4.inOut" });
        gsap.to(coverBottomRef.current, { yPercent: 100, duration: 1.5, ease: "power4.inOut" });

        // Sembunyikan counter
        gsap.to(counterRef.current, { opacity: 0, duration: 0.5 });

        // Munculkan tulisan "Tap to Enter" setelah tutup terbuka setengah jalan
        gsap.delayedCall(0.8, () => {
          setIsReady(true);
        });
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
    });

  }, []);

  const handleEnter = () => {
    // 🔥 valid user interaction → audio pasti jalan
    onFinish && onFinish();

    // Trigger fly-through animation di CloudScene
    setIsEntering(true);

    // Fade out tombol enter
    gsap.to('.preloader__enter', {
      opacity: 0,
      duration: 0.5
    });

    // Fade out seluruh preloader perlahan setelah fly-through terkesan cukup dalam
    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 2,
      delay: 1, // Tunggu sebentar sambil fly-through
      ease: "power2.inOut",
      onComplete: () => {
        setIsHidden(true);
        // Unlock scroll after reveal
        document.body.style.overflow = 'auto';
      }
    });
  };

  if (isHidden) return null;

  return (
    <div className="preloader" ref={containerRef}>

      {/* Cloud Background Layer */}
      <div style={{ position: 'absolute', inset: 0, zIndex: -2, background: 'linear-gradient(to bottom, #8fb8d8, #ebf5f9)' }}>
        <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
          <fog attach="fog" args={['#ebf5f9', 5, 40]} />
          <CloudScene isEntering={isEntering} />
        </Canvas>
      </div>

      {/* Cover Pintu (Top & Bottom) buat Quadplex effect */}
      <div className="preloader__cover top" ref={coverTopRef}></div>
      <div className="preloader__cover bottom" ref={coverBottomRef}></div>

      <div className="preloader__percentage" ref={counterRef} style={{ zIndex: 10 }}>
        0%
      </div>

      {isReady && (
        <div className="preloader__enter" onClick={handleEnter} style={{ zIndex: 10 }}>
          Tap to Enter
        </div>
      )}

    </div>
  );
}