"use client";

import { useState } from "react";

// Lightweight YouTube embed: shows the thumbnail until clicked, then loads the player.
export function VideoEmbed({ id, title }: { id: string; title: string }) {
  const [play, setPlay] = useState(false);

  return (
    <div className="video">
      {play ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button className="video-poster" onClick={() => setPlay(true)} aria-label={`Play video: ${title}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" loading="lazy" onError={(e) => (e.currentTarget.style.display = "none")} />
          <span className="video-play" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="28" height="28"><path d="M8 5.5v13l11-6.5z" fill="currentColor" /></svg>
          </span>
        </button>
      )}
    </div>
  );
}
