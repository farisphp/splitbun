import { extractChars } from "..";

describe("extractChars", () => {
  // extracts characters from a text node and wraps each character in a span element
  it("should extract characters from a text node and wrap each character in a span element", () => {
    // Arrange
    const source = document.createElement("div");
    const textNode = document.createTextNode("Hello");
    source.appendChild(textNode);

    // Act
    extractChars(source);

    // Assert
    expect(source.childNodes.length).toBe(5);
    source.childNodes.forEach((node) => {
      expect(node.nodeName).toBe("SPAN");
      expect(node.textContent).toHaveLength(1);
      expect(node.firstChild?.nodeName).toBe("SPAN");
      expect(node.firstChild?.textContent).toHaveLength(1);
    });
  });

  // extracts characters from a text node containing only one character
  it("should extract the single character from a text node containing only one character", () => {
    // Arrange
    const source = document.createElement("div");
    const textNode = document.createTextNode("A");
    source.appendChild(textNode);

    // Act
    extractChars(source);

    // Assert
    expect(source.childNodes.length).toBe(1);
    const spanElement = source.firstChild;
    expect(spanElement?.nodeName).toBe("SPAN");
    expect(spanElement?.textContent).toBe("A");
  });

  // extracts characters from a text node containing only spaces
  it("should extract each space character from a text node containing only spaces", () => {
    // Arrange
    const source = document.createElement("div");
    const textNode = document.createTextNode("   ");
    source.appendChild(textNode);

    // Act
    extractChars(source);

    // Assert
    expect(source.childNodes.length).toBe(3);
    source.childNodes.forEach((node) => {
      expect(node.nodeName).toBe("SPAN");
      expect(node.textContent).toBe(" ");
    });
  });

  // does not extract characters from an empty text node
  it("should not extract any characters from an empty text node", () => {
    // Arrange
    const source = document.createElement("div");
    const textNode = document.createTextNode("");
    source.appendChild(textNode);

    // Act
    extractChars(source);

    // Assert
    expect(source.childNodes.length).toBe(0);
  });

  // does not extract characters from a non-text node
  it("should not extract any characters from a non-text node", () => {
    // Arrange
    const source = document.createElement("div");
    const childNode = document.createElement("span");
    source.appendChild(childNode);

    // Act
    extractChars(source);

    // Assert
    expect(source.childNodes.length).toBe(1);
    expect(source.firstChild).toBe(childNode);
  });
});
