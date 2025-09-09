"use client";

import { useEffect, useState } from "react";
import ContainerSnippet from "../ContainerSnippet";

const words = [
  "confiance",
  "vitalité",
  "sérénité",
  "bien-être",
  "éclat",
  "estime d’eux-mêmes",
];

export default function TypingEffect() {
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    let word = words[index];
    let timeout: NodeJS.Timeout;

    if (typing) {
      if (displayText.length < word.length) {
        timeout = setTimeout(() => {
          setDisplayText(word.slice(0, displayText.length + 1));
        }, 80);
      } else {
        timeout = setTimeout(() => setTyping(false), 1500);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(word.slice(0, displayText.length - 1));
        }, 40);
      } else {
        setTyping(true);
        setIndex((prev) => (prev + 1) % words.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, typing]);

  return (
    <ContainerSnippet>
      <div className="text-center font-bold text-xl md:text-2xl mt-10">
        Ils ont retrouvé leur{" "}
        <span className="text-pink-500">{displayText}</span>
        <span className="animate-blink">|</span>
      </div>
    </ContainerSnippet>
  );
}
