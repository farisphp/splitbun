import { extractLines } from "..";
describe("extractLines", () => {
  it("should extract lines from a single-line text node", () => {
    const jsdom = require("jsdom");
    const { JSDOM } = jsdom;

    const dom = new JSDOM();
    global.document = dom.window.document;

    // Arrange
    const source = document.createElement("div");
    const textNode = document.createTextNode("This is a single line");
    source.appendChild(textNode);

    // Mock getClientRects method
    const mockGetClientRects = jest.fn(() => [{ width: 50, height: 20 }]);
    const mockRange = {
      setStart: jest.fn(),
      setEnd: jest.fn(),
      getClientRects: mockGetClientRects,
    } as unknown as Range;

    document.createRange = jest.fn(() => mockRange);

    // Act
    extractLines(source);

    // Assert
    expect(source.childNodes.length).toBe(1);
    expect(source.firstChild?.textContent).toBe("This is a single line");
    expect(mockRange.setStart).toHaveBeenCalledWith(textNode, 0);
    expect(mockRange.setEnd).toHaveBeenCalledWith(textNode, 1);
    expect(mockGetClientRects).toHaveBeenCalled();
  });

  // Extracts lines from a multi-line text node
  it("should extract lines from a multi-line text node", () => {
    // Arrange
    const source = document.createElement("div");
    const textNode = document.createTextNode(
      "This is\na multi-line\ntext node"
    );
    source.appendChild(textNode);

    // Act
    extractLines(source);

    // Assert
    expect(source.childNodes.length).toBe(1);
  });

  // Handles text nodes with no text content
  it("should handle text nodes with no text content", () => {
    // Arrange
    const source = document.createElement("div");
    const textNode = document.createTextNode("");
    source.appendChild(textNode);
    console.log("source.childNodes.length", source.childNodes.length);
    // Act
    extractLines(source);

    // Assert
    expect(source.childNodes.length).toBe(1);
    expect(source.firstChild?.textContent).toBe("");
  });

  // Handles text nodes with very long lines
  it("should handle text nodes with very long lines", () => {
    // Arrange
    const source = document.createElement("div");
    const textNode = document.createTextNode(
      "This is a very long line that exceeds the maximum width of the container"
    );
    source.appendChild(textNode);

    // Act
    extractLines(source);

    // Assert
    expect(source.childNodes.length).toBe(1);
    expect(source.firstChild?.textContent).toBe(
      "This is a very long line that exceeds the maximum width of the container"
    );
  });
});
