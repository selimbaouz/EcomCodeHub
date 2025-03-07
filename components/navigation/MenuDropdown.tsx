import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { MouseEventHandler, PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

type MenuDropdownProps = PropsWithChildren<{
    items: {
        href?: string;
        label: string;
        separator?: boolean;
        handleClick?: () => void;
    }[];
    handleLogOut?: MouseEventHandler<HTMLButtonElement>;
    isLogOut?: boolean;
}>;

const MenuDropdown = (props: MenuDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {props.children}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-52 mr-5">
        {props.items.map((item, index) => (
          <>
            <DropdownMenuItem key={index}>
              {item.href ? (
                <Link href={item.href} className={cn("text-sm font-medium py-1")}>{item.label}</Link>
              ) : (
                <button onClick={item.handleClick} className={cn("text-sm font-medium py-1")}>{item.label}</button>
              )}
            </DropdownMenuItem>
            {item.separator && <DropdownMenuSeparator />}
          </>
        ))}
        {props.isLogOut && (
          <DropdownMenuItem>
            <button onClick={props.handleLogOut} className={cn("text-sm font-medium py-1")}>Se deconnecter</button>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MenuDropdown;