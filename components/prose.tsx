import clsx from 'clsx';
import type { FunctionComponent } from 'react';

interface TextProps {
  html: string;
  className?: string;
}

const Prose: FunctionComponent<TextProps> = ({ html, className }) => {
  return (
    <div
      className={clsx(
        'prose max-w-3xl text-base leading-loose text-gray-900 dark:text-gray-100',
        'prose-headings:mt-6 prose-headings:font-semibold prose-headings:tracking-wide prose-headings:text-gray-900 dark:prose-headings:text-gray-100',
        'prose-h1:text-5xl prose-h2:text-4xl prose-h3:text-3xl prose-h4:text-2xl prose-h5:text-xl prose-h6:text-lg',
        'prose-a:text-primary prose-a:underline hover:prose-a:text-blue-400 dark:prose-a:text-blue-300',
        'prose-strong:text-gray-900 dark:prose-strong:text-gray-100',
        'prose-ol:mt-6 prose-ol:list-decimal prose-ol:pl-5',
        'prose-ul:mt-6 prose-ul:list-disc prose-ul:ml-5',
        'prose-li:list-disc prose-li:mb-1',
        className
      )}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default Prose;
