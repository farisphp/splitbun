import { extractChars, extractLines, extractWords } from "./utils";

export default function splitBun(
  selector: string | NodeListOf<Element>,
  options?: {
    type?: "chars" | "words" | "lines";
    onComplete?: () => any;
    wrapperClass?: string;
    innerClass?: string;
  }
) {
  let elements = selector as NodeListOf<Element>;
  if (typeof selector === "string") {
    elements = document.querySelectorAll(selector);
  }

  let type = options?.type || "lines";
  let extract = (
    source: HTMLElement,
    wrapperClass?: string,
    innerClass?: string
  ) => {};
  switch (type) {
    case "lines":
      extract = extractLines;
      break;
    case "words":
      extract = extractWords;
      break;
    case "chars":
      extract = extractChars;
    default:
      break;
  }

  elements.forEach((element) => {
    extract(element as HTMLElement, options?.wrapperClass, options?.innerClass);
  });

  options?.onComplete && options.onComplete();
}
