import { extractWords } from "..";
describe("extractWords", () => {
  // Extracts words from a text node and creates a span element for each word
  it("should extract words when text node has multiple words and spaces", () => {
    // Arrange
    const source = document.createElement("div");
    const textNode = document.createTextNode("Hello world");
    source.appendChild(textNode);

    // Act
    extractWords(source);

    // Assert
    expect(source.childNodes.length).toBe(3);
    expect(source.childNodes[0].textContent).toBe("Hello");
    expect(source.childNodes[1].textContent).toBe(" ");
    expect(source.childNodes[2].textContent).toBe("world");
  });

  // Handles text nodes with multiple words and spaces
  it("should handle text nodes with multiple words and spaces", () => {
    // Arrange
    const source = document.createElement("div");
    const textNode = document.createTextNode("Hello   world");
    source.appendChild(textNode);

    // Act
    extractWords(source);

    // Assert
    expect(source.childNodes.length).toBe(3);
    expect(source.childNodes[0].textContent).toBe("Hello");
    expect(source.childNodes[1].textContent).toBe("   ");
    expect(source.childNodes[2].textContent).toBe("world");
  });

  // Handles text nodes with only one word
  it("should handle text nodes with only one word", () => {
    // Arrange
    const source = document.createElement("div");
    const textNode = document.createTextNode("Hello");
    source.appendChild(textNode);

    // Act
    extractWords(source);

    // Assert
    expect(source.childNodes.length).toBe(1);
    expect(source.childNodes[0].textContent).toBe("Hello");
  });

  // Handles text nodes with no content
  it("should handle text nodes with no content", () => {
    // Arrange
    const source = document.createElement("div");
    const textNode = document.createTextNode("");
    source.appendChild(textNode);

    // Act
    extractWords(source);

    // Assert
    expect(source.childNodes.length).toBe(1);
  });

  // Handles text nodes with only white space
  it("should handle text nodes with only white space", () => {
    // Arrange
    const source = document.createElement("div");
    const textNode = document.createTextNode("   ");
    source.appendChild(textNode);

    // Act
    extractWords(source);

    // Assert
    expect(source.childNodes.length).toBe(1);
    expect(source.childNodes[0].textContent).toBe("   ");
  });

  // Handles text nodes with only one character
  it("should handle text nodes with only one character", () => {
    // Arrange
    const source = document.createElement("div");
    const textNode = document.createTextNode("H");
    source.appendChild(textNode);

    // Act
    extractWords(source);

    // Assert
    expect(source.childNodes.length).toBe(1);
    expect(source.childNodes[0].textContent).toBe("H");
  });
});
