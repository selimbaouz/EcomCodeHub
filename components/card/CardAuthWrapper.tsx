"use client";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { MouseEventHandler } from "react";
import { cn } from "@/lib/utils";

interface CardAuthWrapperProps {
    children: React.ReactNode;
    title?: string;
    description?: string;
    footerTitle?: string;
    footerLabel?: string;
    footerHref?: string;
    onClick?: MouseEventHandler<HTMLAnchorElement>;
    className?: string;
}

export default function CardAuthWrapper (props: CardAuthWrapperProps) {
  return (
    <Card className={cn("bg-background font-montserrat text-foreground shadow-md lg:w-[450px] w-full h-auto m-auto rounded-2xl", "md:border",  "dark:border-[#324e58]", props.className)}>
      <CardHeader className="text-center">
        <CardTitle className="text-[22px] mx-auto">{props.title}</CardTitle>
        <CardDescription className="mx-auto pt-2">{props.description}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-2">
        {props.children}
      </CardContent>
      <CardFooter>
        <div className="w-full gap-2 flex justify-center text-sm flex-wrap font-light">
          <p>
            {props.footerTitle}
          </p>
          <Link 
            href={props.footerHref ? props.footerHref : ""} 
            onClick={props.onClick} 
            className="text-primary font-semibold"
          >
            {props.footerLabel}
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
