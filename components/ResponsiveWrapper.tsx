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
  const defaultWidth = view === "mobile" ? 375 : view === "tablet" ? 768 : 1280;

  const [width, setWidth] = useState(defaultWidth);
  const containerRef = useRef<HTMLDivElement>(null);
  const [maxWidth, setMaxWidth] = useState(1500);

  useEffect(() => {
    setWidth(defaultWidth);
  }, [defaultWidth]);

  useEffect(() => {
    function updateMaxWidth() {
      if (containerRef.current) {
        const parentWidth = containerRef.current.parentElement?.clientWidth ?? 1500;
        setMaxWidth(Math.min(1500, parentWidth));
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
          onResizeStop={(e, direction, ref) => {
            setWidth(ref.offsetWidth);
          }}
          disableDragging
          className={cn(
            "border rounded-lg shadow-sm bg-white dark:bg-neutral-900",
            "overflow-y-auto",
            "min-h-[350px]",
            "max-h-[350px]"
          )}
          resizeHandleStyles={{
            right: {
                background: "#e5e5e5",
                borderRadius: "4px",
                width: "8px",
                marginRight: "-8px",
                cursor: "ew-resize",
                height: "60px",
                top: "50%",
                transform: "translateY(-50%)",
                position: "absolute",
                right: 10, 
                zIndex: 10,
            },
          }}
          style={{
            height: 350,
          }}
        >
          <div className="w-full h-full flex justify-center items-center">
            {children}
          </div>
        </Rnd>
      </div>
    </div>
  );
}
