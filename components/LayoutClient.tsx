"use client";
import { FC, useEffect } from "react";
import TiktokPixel from "tiktok-pixel";

interface LayoutClientProps {
  children: React.ReactNode;
}

const LayoutClient: FC<LayoutClientProps> = ({ children }) => {
  useEffect(() => {
    TiktokPixel.init(process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID!);
  }, []);

  return <main>{children}</main>;
};

export default LayoutClient;
