import React, { useMemo } from 'react';
import katex from 'katex';

interface MathViewProps {
  formula?: string;
  block?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export const MathView: React.FC<MathViewProps> = ({
  formula,
  block = false,
  children,
  className = '',
}) => {
  // If direct formula provided
  if (formula) {
    const html = useMemo(() => {
      try {
        return katex.renderToString(formula, {
          displayMode: block,
          throwOnError: false,
        });
      } catch (err) {
        return `<span class="text-rose-600 font-mono text-sm">${formula}</span>`;
      }
    }, [formula, block]);

    return (
      <span
        className={`math-render ${block ? 'block my-2 overflow-x-auto py-1' : 'inline-block align-baseline'} ${className}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  // If text containing $inline$ or $$block$$ expressions
  if (typeof children === 'string') {
    const renderedContent = useMemo(() => {
      const text = children;
      // Split by $$...$$ or $...$
      // We regex parse: ($$[^$]+$$|\$[^$\n]+\$)
      const parts = text.split(/(\$\$[\s\S]*?\$\$|\$[^$\n]+\$)/g);

      return parts.map((part, index) => {
        if (part.startsWith('$$') && part.endsWith('$$')) {
          const rawLatex = part.slice(2, -2).trim();
          try {
            const html = katex.renderToString(rawLatex, {
              displayMode: true,
              throwOnError: false,
            });
            return (
              <span
                key={index}
                className="block my-2 overflow-x-auto text-center"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            );
          } catch {
            return <code key={index} className="text-rose-500 font-mono">{part}</code>;
          }
        } else if (part.startsWith('$') && part.endsWith('$')) {
          const rawLatex = part.slice(1, -1).trim();
          try {
            const html = katex.renderToString(rawLatex, {
              displayMode: false,
              throwOnError: false,
            });
            return (
              <span
                key={index}
                className="inline-block mx-0.5"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            );
          } catch {
            return <code key={index} className="text-rose-500 font-mono">{part}</code>;
          }
        }
        return <span key={index}>{part}</span>;
      });
    }, [children]);

    return <span className={`math-mixed ${className}`}>{renderedContent}</span>;
  }

  return <>{children}</>;
};
