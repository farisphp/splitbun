function collapseWhiteSpace(value: string | null) {
  if (!value) return "";
  return value.trim().replace(/\s+/g, " ");
}

function saveText(source: HTMLElement) {
  if (!source.dataset.originaltext) {
    source.dataset.originaltext = source.innerHTML;
  }
}

function addClasslist(element: HTMLElement, className: string) {
  className.split(" ").map((c) => element.classList.add(c));
}

export type StylesProps = Partial<CSSStyleDeclaration>;

function addMultipleStyles(element: HTMLElement, styles: StylesProps): void {
  for (const [key, value] of Object.entries(styles)) {
    element.style[key as any] = value as string;
  }
}

function processTextNode(
  textNode: Text,
  source: HTMLElement,
  wrapperClass?: string,
  innerClass?: string,
  wrapperStyle?: StylesProps,
  innerStyle?: StylesProps
) {
  const originalText = source.dataset["originaltext"];
  let textContent = textNode.textContent || "";

  if (originalText) textContent = originalText;

  const range = document.createRange();
  let rawLines: string[][] = [];
  let resultLines: string[] = [];
  let lineCharacters: string[] = [];

  // Ensure the text content is consistent and whitespace is collapsed
  textNode.textContent = collapseWhiteSpace(textContent);

  // Use the updated text content length
  const textLength = textNode.textContent?.length || 0;

  for (let i = 0; i < textLength; i++) {
    range.setStart(textNode, 0);
    range.setEnd(textNode, i + 1);

    const lineIndex = range.getClientRects().length - 1;

    if (!rawLines[lineIndex]) {
      rawLines[lineIndex] = []; // Ensure a new array is created for each line
    }

    rawLines[lineIndex].push(textNode.textContent?.charAt(i) || "");
  }
  console.log(rawLines);

  resultLines = rawLines.map(function operator(characters) {
    return collapseWhiteSpace(characters.join(""));
  });

  if (resultLines.length < 1) return;

  if (originalText) {
    source.textContent = "";
  } else {
    source.removeChild(textNode);
  }

  resultLines.forEach((line) => {
    const lineElement = document.createElement("span");
    lineElement.classList.add("line-wrapper");
    if (wrapperClass) {
      addClasslist(lineElement, wrapperClass);
    }
    lineElement.style.display = "block";
    lineElement.style.width = "100%";
    if (wrapperStyle) {
      addMultipleStyles(lineElement, wrapperStyle);
    }

    const innerElement = document.createElement("span");
    innerElement.classList.add("line-inner");
    if (innerClass) {
      addClasslist(innerElement, innerClass);
    }

    innerElement.style.display = "block";
    innerElement.style.width = "100%";
    if (innerStyle) {
      addMultipleStyles(innerElement, innerStyle);
    }

    innerElement.innerHTML = line;

    lineElement.appendChild(innerElement);
    source.appendChild(lineElement);
  });
}

function collectTextNodes(element: HTMLElement): Text[] {
  const textNodes: Text[] = [];
  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null);

  let textNode: Text | null;
  while ((textNode = walker.nextNode() as Text | null)) {
    textNodes.push(textNode);
  }

  return textNodes;
}

export function extractLines(
  source: HTMLElement,
  wrapperClass?: string,
  innerClass?: string,
  wrapperStyle?: StylesProps,
  innerStyle?: StylesProps
) {
  // Save the full text content of the element before processing
  saveText(source);

  const textNodes = collectTextNodes(source);

  textNodes.forEach((textNode) => {
    processTextNode(
      textNode,
      source,
      wrapperClass,
      innerClass,
      wrapperStyle,
      innerStyle
    );
  });
}

export function extractWords(
  source: HTMLElement,
  wrapperClass?: string,
  innerClass?: string,
  wrapperStyle?: StylesProps,
  innerStyle?: StylesProps
) {
  // Save the full text content of the element before processing
  saveText(source);

  const textNodes = collectTextNodes(source);

  textNodes.forEach((textNode) => {
    let textContent = textNode.textContent || "";
    const originalText = source.dataset["originaltext"];

    if (originalText) textContent = originalText;

    const wordsWithSpaces = textContent.match(/\S+|\s+/g);
    if (!wordsWithSpaces) {
      return;
    }

    if (originalText) {
      source.textContent = "";
    } else {
      source.removeChild(textNode);
    }

    wordsWithSpaces.forEach((word) => {
      const lineElement = document.createElement("span");
      lineElement.classList.add("word-wrapper");

      if (wrapperClass) {
        addClasslist(lineElement, wrapperClass);
      }
      if (wrapperStyle) {
        addMultipleStyles(lineElement, wrapperStyle);
      }

      const innerElement = document.createElement("span");
      innerElement.classList.add("word-inner");
      if (innerClass) {
        addClasslist(innerElement, innerClass);
      }
      if (innerStyle) {
        addMultipleStyles(innerElement, innerStyle);
      }
      innerElement.textContent = word;

      lineElement.appendChild(innerElement);
      source.appendChild(lineElement);
    });
  });
}

export function extractChars(
  source: HTMLElement,
  wrapperClass?: string,
  innerClass?: string,
  wrapperStyle?: StylesProps,
  innerStyle?: StylesProps
) {
  // Save the full text content of the element before processing
  saveText(source);

  const textNodes = collectTextNodes(source);

  textNodes.forEach((textNode) => {
    let textContent = textNode.textContent || "";
    const originalText = source.dataset["originaltext"];

    if (originalText) textContent = originalText;

    const charsWithSpaces = textContent.split("");
    if (!charsWithSpaces) return;

    if (originalText) {
      source.textContent = "";
    } else {
      source.removeChild(textNode);
    }

    charsWithSpaces.forEach((char) => {
      const lineElement = document.createElement("span");
      lineElement.classList.add("char-wrapper");
      if (wrapperClass) {
        addClasslist(lineElement, wrapperClass);
      }
      if (wrapperStyle) {
        addMultipleStyles(lineElement, wrapperStyle);
      }

      const innerElement = document.createElement("span");
      innerElement.classList.add("char-inner");

      if (innerClass) {
        addClasslist(innerElement, innerClass);
      }
      if (innerStyle) {
        addMultipleStyles(innerElement, innerStyle);
      }
      innerElement.textContent = char;

      lineElement.appendChild(innerElement);
      source.appendChild(lineElement);
    });
  });
}
