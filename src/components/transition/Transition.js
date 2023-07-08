import React, { useRef, useEffect, useMemo } from "react";
import "./Transition.css";
import { gsap, ScrollTrigger, ScrollToPlugin, Draggable } from "gsap/all";
import Slider from "../slider/Slider";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, Draggable);

const Transition = () => {
  const albums = useMemo(
    () => [
      {
        id: "slide1",
        image:
          "https://i.scdn.co/image/ab67616d0000b273a8d74e789b99484e0e169001",
        heading: "The Difference",
        h2: "Flume",
        spotifyEmbedCode:
          '<iframe style="border-radius:12px" src="https://open.spotify.com/embed/track/4nlvKIIetOWGIMyhjQXgOZ?utm_source=generator"  width="300" height="200" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>',
      },
      {
        id: "slide2",
        image:
          "https://i.scdn.co/image/ab67616d0000b2738df1fdc14be33eb2c991d60f",
        heading: "Yellow Ledbetter",
        h2: "Pearl Jam",
        spotifyEmbedCode:
          '<iframe style="border-radius:12px" src="https://open.spotify.com/embed/track/3bE5slaVEfaDreqARl6k4M?utm_source=generator" width="300" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>',
      },
      {
        id: "slide3",
        image:
          "https://i.scdn.co/image/ab67616d0000b27326f7f19c7f0381e56156c94a",
        heading: "I Wonder",
        h2: "Kanye West",
        spotifyEmbedCode:
          '<iframe style="border-radius:12px" src="https://open.spotify.com/embed/track/7rbECVPkY5UODxoOUVKZnA?utm_source=generator" width="300" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>',
      },
      {
        id: "slide4",
        image:
          "https://i.scdn.co/image/ab67616d00001e0254070da29d0a763a4180f4da",
        heading: "Velma",
        h2: "Walter the producer",
        spotifyEmbedCode:
          '<iframe style="border-radius:12px" src="https://open.spotify.com/embed/track/3F4fxUGO7G5wqMd1UKj6hn?utm_source=generator" width="300" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>',
      },
      {
        id: "slide5",
        image:
          "https://i.scdn.co/image/ab67616d0000b27339372cb9fc75f395a5090a8d",
        heading: "Je te lasserai des mots",
        h2: "Patrick Watson",
        spotifyEmbedCode:
          '<iframe style="border-radius:12px" src="https://open.spotify.com/embed/track/0V5cvmTKsYmF5FmGGEAfmS?utm_source=generator" width="300" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>',
      },
      {
        id: "slide6",
        image:
          "https://i.scdn.co/image/ab67616d0000b27342bf3f893586a144871b35a8",
        heading: "Sunday Candy",
        h2: "Nico Segal and The Social Experiment",
        spotifyEmbedCode:
          '<iframe style="border-radius:12px" src="https://open.spotify.com/embed/track/6fTdcGsjxlAD9PSkoPaLMX?utm_source=generator" width="300" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>',
      },
      {
        id: "slide7",
        image:
          "https://i.scdn.co/image/ab67616d0000b273e2a3788f1a9dea9028099d4e",
        heading: "Night Dancer",
        h2: "imase",
        spotifyEmbedCode:
          '<iframe style="border-radius:12px" src="https://open.spotify.com/embed/track/348NF6vX0Yh22xvH0EZEro?utm_source=generator" width="300" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>',
      },
      {
        id: "slide8",
        image:
          "https://i.scdn.co/image/ab67616d0000b2731764a4e742fe4c69e4d16316",
        heading: "Walking on a dream",
        h2: "Empire of the Sun",
        spotifyEmbedCode:
          '<iframe style="border-radius:12px" src="https://open.spotify.com/embed/track/5r5cp9IpziiIsR6b93vcnQ?utm_source=generator" width="300" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>',
      },
    ],
    []
  );

  const sliderRef = useRef(null);
  const slideRefs = useRef([]);
  const iterationRef = useRef(0);

  useEffect(() => {
    const iteration = iterationRef.current;

    const spacing = 0.1;
    const snapTime = gsap.utils.snap(spacing);
    const animateFunc = (element) => {
      const tl = gsap.timeline();
      tl.fromTo(
        element,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          zIndex: 100,
          duration: 0.5,
          yoyo: true,
          repeat: 1,
          ease: "power1.in",
          immediateRender: false,
        }
      ).fromTo(
        element,
        { xPercent: 400 },
        { xPercent: -400, duration: 1, ease: "none", immediateRender: false },
        0
      );
      return tl;
    };

    const slides = slideRefs.current;

    const seamlessLoop = buildSeamlessLoop(slides, spacing, animateFunc);
    const playhead = { offset: 0 };
    const wrapTime = gsap.utils.wrap(0, seamlessLoop.duration());
    const scrub = gsap.to(playhead, {
      offset: 0,
      onUpdate() {
        seamlessLoop.time(wrapTime(playhead.offset));
      },
      duration: 0.5,
      ease: "power3",
      paused: true,
    });

    const trigger = ScrollTrigger.create({
      start: 0,
      onUpdate(self) {
        scrub.vars.offset =
          (iteration + self.progress) * seamlessLoop.duration();
        scrub.invalidate().restart();
      },
      end: "+=4000", 
      pin: ".slider-wrapper",
    });

    ScrollTrigger.addEventListener("scrollEnd", () =>
      scrollToOffset(scrub.vars.offset)
    );

    function scrollToOffset(offset) {
      let snappedTime = snapTime(offset);
      let progress =
        (snappedTime - seamlessLoop.duration() * iteration) /
        seamlessLoop.duration();

      if (progress < 0) {
        seamlessLoop.totalProgress(1);
        let scroll = trigger.start + (progressToScroll(progress) % trigger.end);
        trigger.scroll(scroll);
      } else {
        let scroll = progressToScroll(progress);
        trigger.scroll(scroll);
      }
    }

    function progressToScroll(progress) {
      return gsap.utils.clamp(
        1,
        trigger.end - 1,
        gsap.utils.wrap(0, 1, progress) * trigger.end
      );
    }

    function buildSeamlessLoop(items, spacing, animateFunc) {
      let rawSequence = gsap.timeline({ paused: true }),
        seamlessLoop = gsap.timeline({
          paused: true,
          repeat: -1,
          onRepeat() {
            this._time === this._dur && (this._tTime += this._dur - 0.01);
          },
          onReverseComplete() {
            this.totalTime(this.rawTime() + this.duration() * 100);
          },
        }),
        cycleDuration = spacing * items.length,
        dur;

      items
        .concat(items)
        .concat(items)
        .forEach((item, i) => {
          let anim = animateFunc(items[i % items.length]);
          rawSequence.add(anim, i * spacing);
          dur || (dur = anim.duration());
        });

      seamlessLoop.fromTo(
        rawSequence,
        {
          time: cycleDuration + dur / 2,
        },
        {
          time: `+=${cycleDuration}`,
          duration: cycleDuration,
          ease: "none",
        }
      );
      return seamlessLoop;
    }

    return () => {
      trigger.kill();
      scrub.kill();
      ScrollTrigger.removeEventListener("scrollEnd", () =>
        scrollToOffset(scrub.vars.offset)
      );
    };
  }, []);

  return (
    <div className="slider-wrapper" ref={sliderRef}>
      <h1 className="header">JAMS</h1>
      <div className="slider-container">
        {albums.map((album, index) => (
          <Slider
            key={album.id}
            className={`slide ${album.id}`}
            ref={(el) => (slideRefs.current[index] = el)}
            image={album.image}
            heading={album.heading}
            h2={album.h2}
            spotifyEmbedCode={album.spotifyEmbedCode}
          />
        ))}
      </div>
      <h1 className="footer">Click on the profile to listen! </h1>
    </div>
  );
};

export default Transition;
