import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { ReadonlyURLSearchParams } from 'next/navigation';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const ensureStartsWith = (stringToCheck: string, startsWith: string) =>
  stringToCheck.startsWith(startsWith) ? stringToCheck : `${startsWith}${stringToCheck}`;

export const createUrl = (pathname: string, params: URLSearchParams | ReadonlyURLSearchParams) => {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? '?' : ''}${paramsString}`;

  return `${pathname}${queryString}`;
};

export function renderSnippet(
  template: string,
  items: { title: string; text: string; image?: string }[],
  snippetTitle: string
) {
  let code = template;

  // Remplacement du titre de la section
  code = code.replace(/{sectionTitle}/g, snippetTitle);

  // Remplacement de la 1ère image et description hors boucle
  if (items.length > 0) {
    code = code.replace(/{items\.0\.image}/g, items[0].image || "");
    code = code.replace(/{items\.0\.description}/g, items[0].text);
  } else {
    code = code.replace(/{items\.0\.image}/g, "");
    code = code.replace(/{items\.0\.description}/g, "");
  }

  // Remplacement de la boucle items
  code = code.replace(/{loop:items}([\s\S]*?){\/loop:items}/g, (_, loopContent) => {
    return items
      .map((item, index) =>
        loopContent
          .replace(/{title}/g, item.title)
          .replace(/{description}/g, item.text)
          .replace(/{image}/g, item.image || "")
          .replace(/{loopIndex}/g, index.toString())
          // Ajout automatique des data-attributes pour les boutons LG
          .replace(
            /<button([\s\S]*?)>(.*?)<\/button>/,
            `<button$1 data-text="${item.text}" data-img="${item.image || ''}">$2</button>`
          )
          // Supprime onclick si présent
          .replace(/onclick=".*?"/g, "")
      )
      .join("\n");
  });

  return code;
}