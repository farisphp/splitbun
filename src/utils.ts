function collapseWhiteSpace(value: string | null) {
  if (!value) return "";
  return value.trim().replace(/\s+/g, " ");
}

function saveText(source: HTMLElement, text: string) {
  if (!source.dataset.originaltext) source.dataset.originaltext = text;
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

export function extractLines(
  source: HTMLElement,
  wrapperClass?: string,
  innerClass?: string,
  wrapperStyle?: StylesProps,
  innerStyle?: StylesProps
) {
  const originalText = source.dataset["originaltext"];
  let textNode = source.firstChild;
  if (originalText) {
    textNode = document.createTextNode(originalText);
    source.appendChild(textNode);
  }

  if (!textNode || textNode.nodeType !== 3) {
    return;
  }

  // BECAUSE SAFARI: None of the "modern" browsers seem to care about the actual
  // layout of the underlying markup. However, Safari seems to create range
  // rectangles based on the physical structure of the markup (even when it
  // makes no difference in the rendering of the text). As such, let's rewrite
  // the text content of the node to REMOVE SUPERFLUOS WHITE-SPACE. This will
  // allow Safari's .getClientRects() to work like the other modern browsers.
  textNode.textContent = collapseWhiteSpace(textNode.textContent);

  // A Range represents a fragment of the document which contains nodes and
  // parts of text nodes. One thing that's really cool about a Range is that we
  // can access the bounding boxes that contain the contents of the Range. By
  // incrementally adding characters - from our text node - into the range, and
  // then looking at the Range's client rectangles, we can determine which
  // characters belong in which rendered line.
  let textContent = textNode.textContent || "";

  if (originalText) textContent = originalText;

  saveText(source, textContent);

  const range = document.createRange();
  let rawLines: string[][] = [];
  let resultLines: string[] = [];
  let lineCharacters: string[] = [];

  // Iterate over every character in the text node.
  for (let i = 0; i < textContent.length; i++) {
    // Set the range to span from the beginning of the text node up to and
    // including the current character (offset).
    range.setStart(textNode, 0);
    range.setEnd(textNode, i + 1);

    // At this point, the Range's client rectangles will include a rectangle
    // for each visually-rendered line of text. Which means, the last
    // character in our Range (the current character in our for-loop) will be
    // the last character in the last line of text (in our Range). As such, we
    // can use the current rectangle count to determine the line of text.
    const lineIndex = range.getClientRects().length - 1;

    // If this is the first character in this line, create a new buffer for
    // this line.
    if (!rawLines[lineIndex]) {
      rawLines.push((lineCharacters = []));
    }

    // Add this character to the currently pending line of text.
    lineCharacters.push(textContent.charAt(i));
  }

  // At this point, we have an array (lines) of arrays (characters). Let's
  // collapse the character buffers down into a single text value.
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

    innerElement.textContent = line;

    lineElement.appendChild(innerElement);
    source.appendChild(lineElement);
  });
}

export function extractWords(
  source: HTMLElement,
  wrapperClass?: string,
  innerClass?: string,
  wrapperStyle?: StylesProps,
  innerStyle?: StylesProps
) {
  const originalText = source.dataset["originaltext"];
  let textNode = source.firstChild;

  if (originalText) {
    textNode = document.createTextNode(originalText);
    source.appendChild(textNode);
  }

  if (!textNode || textNode.nodeType !== 3) {
    return;
  }

  let textContent = textNode.textContent || "";
  if (originalText) textContent = originalText;

  saveText(source, textContent);

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
}

export function extractChars(
  source: HTMLElement,
  wrapperClass?: string,
  innerClass?: string,
  wrapperStyle?: StylesProps,
  innerStyle?: StylesProps
) {
  const originalText = source.dataset["originaltext"];
  let textNode = source.firstChild;

  if (originalText) {
    textNode = document.createTextNode(originalText);
    source.appendChild(textNode);
  }

  if (!textNode || textNode.nodeType !== 3) {
    return;
  }

  let textContent = textNode.textContent || "";
  if (originalText) textContent = originalText;

  const charsWithSpaces = textContent.split("");
  if (!charsWithSpaces) return;

  if (originalText) textContent = originalText;

  saveText(source, textContent);

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
}
