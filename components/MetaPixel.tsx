"use client";

import { useEffect } from "react";
import { FB_PIXEL_ID } from "@/lib/constants";

export default function MetaPixel() {
  useEffect(() => {
    // Charger le script Facebook Pixel uniquement côté client
    if (!FB_PIXEL_ID) return;

    // Vérifier si fbq n'existe pas déjà
    if (window.fbq) {
      window.fbq("init", FB_PIXEL_ID);
      window.fbq("track", "PageView");
      return;
    }

    // Initialiser Facebook Pixel
    (function (f: Window, b: Document, e: string, v: string) {
      const n: any = (f.fbq = function () {
        n.callMethod
          ? n.callMethod.apply(n, arguments)
          : n.queue.push(arguments);
      });
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = true;
      n.version = "2.0";
      n.queue = [];
      const t: HTMLScriptElement = b.createElement(e) as HTMLScriptElement;
      t.async = true;
      t.src = v;
      const s = b.getElementsByTagName(e)[0];
      s.parentNode?.insertBefore(t, s);
    })(
      window,
      document,
      "script",
      "https://connect.facebook.net/en_US/fbevents.js"
    );

    window.fbq!("init", FB_PIXEL_ID);
    window.fbq!("track", "PageView");
  }, []);

  return (
    <noscript>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt=""
        height="1"
        width="1"
        style={{ display: "none" }}
        src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
        loading="lazy"
      />
    </noscript>
  );
}
