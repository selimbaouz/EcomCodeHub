import Link from 'next/link';
import { Button } from './ui/button';
import { HTMLAttributeAnchorTarget } from 'react';

export const GetAPiMesssage = ({
  icon,
  title,
  description,
  buttonLabel,
  buttonHref,
  targetHref
}: {
    icon: React.ReactNode,
    title: string,
    description: string,
    buttonLabel?: string,
    buttonHref?: string,
    targetHref?: HTMLAttributeAnchorTarget
  }) => (
  <div className="flex flex-col items-center justify-center text-center space-y-6">
    {icon}
    <h2 className="text-xl font-bold my-2">{title}</h2>
    <p className="mb-4">{description}</p>
    {buttonLabel && (
      <Button size="xl" variant="default" className="w-full font-medium px-4 py-4 lg:text-base text-white" asChild>
        <Link href={buttonHref ? buttonHref : ""} target={targetHref}>
          {buttonLabel}
        </Link>
      </Button>
    )}
  </div>
);