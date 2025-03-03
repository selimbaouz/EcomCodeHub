import React from "react";
import { Highlight, themes } from "prism-react-renderer";

interface CodeBlockProps {
  code: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code }) => {
  return (
    <Highlight code={code} language="tsx" theme={themes.nightOwl}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={`${className} relative p-4 bg-gray-900 text-white text-sm rounded-lg overflow-auto size-full`} style={style}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
                <span className="text-gray-500 pr-4 select-none">{i + 1}</span>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};

export default CodeBlock;
