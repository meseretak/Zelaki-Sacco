"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: { translate?: { TranslateElement?: new (cfg: unknown, el: string) => unknown } };
  }
}

/**
 * Loads the Google Translate widget (hidden) and aggressively removes every
 * piece of Google's own UI — the top banner, logo, "View original" toolbar,
 * tooltips and body offset — so the translation is completely seamless and
 * only our custom LanguageSwitcher is visible.
 */
export function GoogleTranslateLoader() {
  useEffect(() => {
    // 1. define the init callback
    window.googleTranslateElementInit = () => {
      if (window.google?.translate?.TranslateElement) {
        try {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: "auto",
              includedLanguages: "en,am,om,ti,ar,fr",
              layout: 0,
              autoDisplay: false,
            },
            "google_translate_element"
          );
        } catch {
          /* ignore */
        }
      }
    };

    // 2. inject the script once
    if (!document.getElementById("gt-script")) {
      const s = document.createElement("script");
      s.id = "gt-script";
      s.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      s.async = true;
      document.body.appendChild(s);
    }

    // 3. aggressively strip Google's UI as it appears
    const stripGoogleUI = () => {
      // remove the top banner iframe(s)
      document
        .querySelectorAll("iframe.goog-te-banner-frame, iframe.skiptranslate, .goog-te-banner-frame")
        .forEach((el) => {
          (el as HTMLElement).style.display = "none";
          (el as HTMLElement).style.visibility = "hidden";
          (el as HTMLElement).style.height = "0";
          (el as HTMLElement).style.width = "0";
          (el as HTMLElement).style.opacity = "0";
        });
      // reset any inline top/body offset Google injected
      const body = document.body;
      if (body.style.top && body.style.top !== "0px") body.style.top = "0px";
      if (body.style.marginTop && body.style.marginTop !== "0px") body.style.marginTop = "0px";
      if (body.style.paddingTop && body.style.paddingTop !== "0px") body.style.paddingTop = "0px";
      // remove balloon/tooltip frames
      document
        .querySelectorAll(".goog-te-balloon-frame, #goog-gt-tt, .goog-tooltip, .goog-te-spell-check")
        .forEach((el) => ((el as HTMLElement).style.display = "none"));
    };

    // run frequently for the first few seconds (banner appears after translate),
    // then keep a light observer running
    stripGoogleUI();
    const fastInterval = setInterval(stripGoogleUI, 200);
    const stopFast = setTimeout(() => clearInterval(fastInterval), 8000);

    // long-lived observer to catch any banner reappearing (e.g. on language change)
    const observer = new MutationObserver(() => stripGoogleUI());
    observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["style", "class"] });

    return () => {
      clearInterval(fastInterval);
      clearTimeout(stopFast);
      observer.disconnect();
    };
  }, []);

  return <div id="google_translate_element" className="hidden" aria-hidden="true" />;
}
