"use client";

import { useTheme } from "next-themes";
import { CiWarning } from "react-icons/ci";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { VscError } from "react-icons/vsc";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group border-none"
      toastOptions={{
        classNames: {
          error: "group-[.toaster]:bg-red-500 group-[.toaster]:text-white",
          success: 'group-[.toaster]:bg-green-400 group-[.toaster]:text-white',
          warning: 'group-[.toaster]:bg-yellow-400 group-[.toaster]:text-white',
          info: 'group-[.toaster]:bg-blue-400 group-[.toaster]:text-white',
          title: 'text-sm font-montserrat font-medium',
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      icons={{
        error: <VscError className="text-xl" />,
        warning: <CiWarning className="text-xl" />,
        info: <IoIosInformationCircleOutline className="text-xl" />
      }}
      {...props}
    />
  );
};

export { Toaster };
