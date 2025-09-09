"use client";
import { ReactNode, useEffect, useRef, useState } from "react";
import { Rnd } from "react-rnd";
import { useResponsiveStore } from "@/store/responsive-screen";
import { cn } from "@/lib/utils";

interface ResponsiveWrapperProps {
  snippetId: string;
  children: ReactNode;
}

export default function ResponsiveWrapper({ snippetId, children }: ResponsiveWrapperProps) {
  const view = useResponsiveStore((s) => s.getView(snippetId));
  const setView = useResponsiveStore((s) => s.setView);

  const defaultWidth = view === "mobile" ? 375 : view === "tablet" ? 500 : 795;
  const [width, setWidth] = useState(defaultWidth);
  const containerRef = useRef<HTMLDivElement>(null);
  const [maxWidth, setMaxWidth] = useState(795);

  useEffect(() => {
  console.log(`Snippet ${snippetId} width: ${width} → view: ${view}`);
}, [width, view]);

  // Met à jour width par défaut si la view change
  useEffect(() => {
    setWidth(defaultWidth);
  }, [defaultWidth]);

  // Détecte la largeur parent pour maxWidth
  useEffect(() => {
    function updateMaxWidth() {
      if (containerRef.current) {
        const parentWidth = containerRef.current.parentElement?.clientWidth ?? 795;
        setMaxWidth(Math.min(795, parentWidth));
      }
    }
    updateMaxWidth();
    window.addEventListener("resize", updateMaxWidth);
    return () => window.removeEventListener("resize", updateMaxWidth);
  }, []);

  return (
    <div ref={containerRef} className="flex justify-center w-full overflow-hidden mx-auto py-4">
      <div
        className={cn(
          "w-full min-h-[350px] max-h-[350px] flex justify-center items-center"
        )}
      >
        <Rnd
          bounds="parent"
          minWidth={320}
          maxWidth={maxWidth}
          size={{ width, height: 350 }}
          enableResizing={{ right: true }}
          onResize={(e, direction, ref) => {
            const newWidth = ref.offsetWidth;
            setWidth(newWidth);

            // Mise à jour fluide de la view
            if (newWidth < 400) setView(snippetId, "mobile");
            else if (newWidth < 600) setView(snippetId, "tablet");
            else setView(snippetId, "desktop");
          }}
          disableDragging
          className={cn(
            "border rounded-lg shadow-sm relative",
            "min-h-[350px] max-h-[350px]"
          )}
          resizeHandleStyles={{
            right: {
              background: "#e5e5e5",
              borderRadius: "4px",
              width: "8px",
              cursor: "ew-resize",
              height: "30px",
              top: "50%",
              transform: "translateY(-50%)",
              position: "absolute",
              right: "-14px", 
              zIndex: 10,
            },
          }}
          style={{
            height: 350,
          }}
        >
          <div className="overflow-y-auto h-full max-h-[350px] w-full mx-auto overflow-auto">
            {children}
          </div>
        </Rnd>
      </div>
    </div>
  );
}
