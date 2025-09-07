import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Fragment, MouseEventHandler, PropsWithChildren } from "react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

type MenuDropdownProps = PropsWithChildren<{
  items: {
    href?: string;
    label: string;
    separator?: boolean;
    handleClick?: () => void;
    rel?: string;
    target?: string;
  }[];
  handleLogOut?: MouseEventHandler<HTMLButtonElement>;
  isLogOut?: boolean;
}>;

const MenuDropdown = ({ items, handleLogOut, isLogOut, children }: MenuDropdownProps) => {
  const t = useTranslations("fe.navigation");
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-52 mr-5">
        {items.map((item, index) => (
          <Fragment key={item.href ?? item.label ?? index}>
            {item.href ? (
              <DropdownMenuItem>
                <Link
                  href={item.href}
                  className={cn("text-sm font-medium py-1")}
                  target={item.target}
                  rel={item.rel}
                >
                  {item.label}
                </Link>
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem>
                <button
                  onClick={item.handleClick}
                  className={cn("text-sm font-medium py-1")}
                >
                  {item.label}
                </button>
              </DropdownMenuItem>
            )}
            {item.separator && <DropdownMenuSeparator />}
          </Fragment>
        ))}

        {isLogOut && (
          <DropdownMenuItem>
            <button
              onClick={handleLogOut}
              className={cn("text-sm font-medium py-1")}
            >
              {t("logout")}
            </button>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MenuDropdown;