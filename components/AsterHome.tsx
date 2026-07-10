"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { MouseEvent, PointerEvent, WheelEvent } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import {
  ArrowRight,
  BookOpen,
  ChartNoAxesCombined,
  Monitor,
  MousePointer2,
  WandSparkles,
} from "lucide-react";
import { LivingAtmosphere } from "@/components/LivingAtmosphere";

const floatingCards = [
  { title: "Branding", body: "Build identity\nthat lasts.", icon: WandSparkles, position: "branding" },
  { title: "Digital Growth", body: "Strategies that\ndrive results.", icon: ChartNoAxesCombined, position: "growth" },
  { title: "Web Design", body: "Beautiful websites\nthat perform.", icon: Monitor, position: "design" },
  { title: "Content & Story", body: "Stories that connect\nand inspire.", icon: BookOpen, position: "story" },
];

export function AsterHome() {
  const router = useRouter();
  const rootRef = useRef<HTMLElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const sceneMediaRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ active: false, x: 0, y: 0, rx: 0, ry: 0 });
  const zoomRef = useRef(1);
  const [activeCard, setActiveCard] = useState<string>();
  const [lowPower, setLowPower] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const limitedCpu = navigator.hardwareConcurrency !== undefined && navigator.hardwareConcurrency <= 4;
    const compactScreen = window.innerWidth < 720;
    setLowPower(reducedMotion || limitedCpu || compactScreen);
  }, []);

  useLayoutEffect(() => {
    if (!rootRef.current || !sceneMediaRef.current) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const context = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: "power2.out" } });
      timeline
        .fromTo(sceneMediaRef.current, { opacity: 0, scale: 1.085 }, { opacity: 1, scale: 1, duration: 1.55 })
        .fromTo(".replica-atmosphere", { opacity: 0 }, { opacity: 1, duration: 1.05 }, 0.12)
        .fromTo(".replica-nav", { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.52 }, 0.32)
        .fromTo(".replica-copy > *", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.07 }, 0.42)
        .fromTo(".replica-card", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.48, stagger: 0.065 }, 0.62)
        .fromTo(".replica-scroll, .replica-control-hint", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.055 }, 0.78);
    }, rootRef);

    return () => context.revert();
  }, []);

  function updateScene(rx: number, ry: number) {
    const scene = sceneRef.current;
    if (!scene) return;
    scene.style.setProperty("--scene-rx", `${rx}deg`);
    scene.style.setProperty("--scene-ry", `${ry}deg`);
  }

  function handlePointerDown(event: PointerEvent<HTMLElement>) {
    if ((event.target as HTMLElement).closest("a, button")) return;
    dragRef.current.active = true;
    dragRef.current.x = event.clientX;
    dragRef.current.y = event.clientY;
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    const scene = sceneRef.current;
    if (!scene) return;
    if (dragRef.current.active) {
      const dx = (event.clientX - dragRef.current.x) * 0.018;
      const dy = (event.clientY - dragRef.current.y) * 0.012;
      dragRef.current.ry = Math.max(-4, Math.min(4, dragRef.current.ry + dx));
      dragRef.current.rx = Math.max(-2.2, Math.min(2.2, dragRef.current.rx - dy));
      dragRef.current.x = event.clientX;
      dragRef.current.y = event.clientY;
      updateScene(dragRef.current.rx, dragRef.current.ry);
      return;
    }
    const px = event.clientX / window.innerWidth - 0.5;
    const py = event.clientY / window.innerHeight - 0.5;
    scene.style.setProperty("--parallax-x", `${px * -10}px`);
    scene.style.setProperty("--parallax-y", `${py * -7}px`);
  }

  function handlePointerUp(event: PointerEvent<HTMLElement>) {
    dragRef.current.active = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  }

  function handleWheel(event: WheelEvent<HTMLElement>) {
    zoomRef.current = Math.max(0.96, Math.min(1.08, zoomRef.current - event.deltaY * 0.00016));
    sceneRef.current?.style.setProperty("--scene-zoom", String(zoomRef.current));
    sceneRef.current?.style.setProperty("--camera-y", `${(zoomRef.current - 1) * -70}px`);
  }

  function focusCard(position: string, href?: string) {
    if (activeCard) return;
    setActiveCard(position);

    const focus: Record<string, { x: number; y: number; zoom: number }> = {
      branding: { x: 12, y: 8, zoom: 1.045 },
      growth: { x: -16, y: 5, zoom: 1.055 },
      design: { x: -4, y: -10, zoom: 1.06 },
      story: { x: -15, y: -15, zoom: 1.065 },
    };
    const target = focus[position];
    if (sceneRef.current && target) {
      gsap.to(sceneRef.current, {
        "--focus-x": `${target.x}px`,
        "--focus-y": `${target.y}px`,
        "--scene-zoom": target.zoom,
        duration: 0.8,
        ease: "power3.inOut",
      });
    }
    if (href) window.setTimeout(() => router.push(href), 820);
  }

  function handleCardClick(event: MouseEvent<HTMLButtonElement>, position: string) {
    event.preventDefault();
    focusCard(position);
  }

  return (
    <main
      ref={rootRef}
      className="replica-home"
      data-performance={lowPower ? "low" : "high"}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onWheel={handleWheel}
    >
      <LivingAtmosphere lowPower={lowPower} />
      <div className="replica-scene" ref={sceneRef} aria-label="可拖动和缩放的 Aster Shore 星球">
        <div className="replica-scene-media" ref={sceneMediaRef}>
          <img src="/images/aster-shore-world-v2.png" alt="漂浮在宇宙中的海岸星球" draggable={false} />
          <div className="replica-ocean-light replica-ocean-light-a" />
          <div className="replica-ocean-light replica-ocean-light-b" />
          <div className="replica-cloud-layer replica-cloud-layer-near" />
          <div className="replica-cloud-layer replica-cloud-layer-far" />
          <div className="replica-lighthouse-beam" />
          <div className="replica-boat-wake" />
          <div className="replica-building-lights"><i /><i /><i /><i /></div>
          <div className="replica-scene-glow" />
        </div>
      </div>
      <div className="replica-vignette" />

      <header className="replica-nav">
        <Link href="/" className="replica-brand" aria-label="Aster Shore 首页">
          <span className="replica-mark">✧</span>
          <span>Aster Shore</span>
        </Link>
        <nav className="replica-links" aria-label="主导航">
          <Link className="active" href="/">Home</Link>
        </nav>
        <div className="replica-actions"><span className="replica-nav-space" aria-hidden="true" /></div>
      </header>

      <section className="replica-copy">
        <h1>李玥宁<br /><em>Digital shore.</em></h1>
        <p>We craft digital experiences that<br />inspire, connect and grow your brand<br />beyond the horizon.</p>
        <button type="button" className="replica-cta" onClick={() => focusCard("branding")}>Explore Journeys <span><ArrowRight size={16} /></span></button>
      </section>

      <div className="replica-floating-cards" aria-label="服务模块">
        {floatingCards.map(({ title, body, icon: Icon, position }) => (
          <button
            type="button"
            className={`replica-card replica-card-${position}${activeCard === position ? " is-active" : ""}`}
            key={title}
            onClick={(event) => handleCardClick(event, position)}
          >
            <span className="replica-card-icon"><Icon size={17} /></span>
            <span><b>{title}</b><small>{body}</small></span>
            <i />
          </button>
        ))}
      </div>

      <div className="replica-scroll"><span>◆</span>Scroll to explore</div>

      <div className="replica-control-hint">
        <span className="replica-orbit"><MousePointer2 size={13} /></span>
        <span><b>Drag to rotate</b><small>Scroll to zoom</small></span>
      </div>
    </main>
  );
}
