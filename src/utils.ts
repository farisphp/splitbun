function collapseWhiteSpace(value: string | null) {
  if (!value) return "";
  return value.trim().replace(/\s+/g, " ");
}

export function extractLines(
  source: Element,
  wrapperClass?: string,
  innerClass?: string
) {
  const textNode = source.firstChild;
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
  const textContent = textNode.textContent || "";

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
  if (resultLines.length > 0) source.removeChild(source.firstChild);

  resultLines.forEach((line) => {
    const lineElement = document.createElement("span");
    lineElement.classList.add("line-wrapper");
    if (wrapperClass) {
      lineElement.classList.add(wrapperClass);
    }
    lineElement.style.display = "block";
    lineElement.style.width = "100%";

    const innerElement = document.createElement("span");
    innerElement.classList.add("line-inner");
    if (innerClass) {
      innerElement.classList.add(innerClass);
    }
    innerElement.style.display = "block";
    innerElement.style.width = "100%";
    innerElement.textContent = line;

    lineElement.appendChild(innerElement);
    source.appendChild(lineElement);
  });
}

export function extractWords(
  source: Element,
  wrapperClass?: string,
  innerClass?: string
) {
  const textNode = source.firstChild;
  if (!textNode || textNode.nodeType !== 3) {
    return;
  }

  const textContent = textNode.textContent || "";
  const wordsWithSpaces = textContent.match(/\S+|\s+/g);
  if (!wordsWithSpaces) {
    return;
  }
  source.removeChild(source.firstChild);

  wordsWithSpaces.forEach((word) => {
    const lineElement = document.createElement("span");
    lineElement.classList.add("word-wrapper");
    if (wrapperClass) {
      lineElement.classList.add(wrapperClass);
    }

    const innerElement = document.createElement("span");
    innerElement.classList.add("word-inner");
    if (innerClass) {
      innerElement.classList.add(innerClass);
    }
    innerElement.textContent = word;

    lineElement.appendChild(innerElement);
    source.appendChild(lineElement);
  });
}

export function extractChars(
  source: Element,
  wrapperClass?: string,
  innerClass?: string
) {
  const textNode = source?.firstChild;
  if (!textNode || textNode.nodeType !== 3) {
    return;
  }

  const textContent = textNode.textContent || "";

  const charsWithSpaces = textContent.split("");
  if (!charsWithSpaces) return;

  source.removeChild(textNode);

  charsWithSpaces.forEach((char) => {
    const lineElement = document.createElement("span");
    lineElement.classList.add("char-wrapper");
    if (wrapperClass) {
      lineElement.classList.add(wrapperClass);
    }

    const innerElement = document.createElement("span");
    innerElement.classList.add("char-inner");
    if (innerClass) {
      innerElement.classList.add(innerClass);
    }
    innerElement.textContent = char;

    lineElement.appendChild(innerElement);
    source.appendChild(lineElement);
  });
}
