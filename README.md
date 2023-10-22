# SplitBun - Text Splitter JavaScript Library

SplitBun is a lightweight JavaScript library that allows you to split text elements into individual lines, words, or characters with ease. This library is perfect for adding animation effects, creating typewriter-like text animations, or any other creative text manipulation you can imagine.

## Features

- Split text into lines, words, or characters.
- Easily integrate into JavaScript projects.
- Alternative for GSAP Text Spliter

## Installation

#### NPM/Yarn
To use Text Splitter in your project, you can install it via npm.

```
npm i splitbun
```

#### CDN
Or, include the following <script> tag to load splitBun from a CDN.
```
<script src="https://unpkg.com/splitbun"></script>
```

## Usage

To use SplitBun, you need to select the text element you want to split and initialize it. Here's a basic example:

```
import splitBun from 'splitbun'

splitBun('#target',{
    type: 'lines'
})
```

## API Reference

SplitBun(target, [options])

#### Target

The target element(s) for the SplitBun call. This can be a selector string or a collection of elements (ie NodeList, jQuery object, or array).

#### Options

| Name         | Type                  | Description                                                                            |
| :----------- | :-------------------- | :------------------------------------------------------------------------------------- |
| `type`       | lines, words, or chars | **Default to lines**. splits text element into individual lines, words, or characters. |
| `onComplete` | `function`            | Function that will be executed after text splitting is completed.                      |
| `wrapperClass` | `string`            | Custom class for wrapper element                      |
| `innerClass` | `string`            | Custom class for inner element                      |

## Example

Here are a few examples of how you can use SplitBun:

#### Splitting text into lines

```
splitBun("[text-split]", {
    type: 'lines',
});
```

#### Splitting text into words

```
splitBun("[text-split]", {
    type: 'words',
});
```

#### Splitting text into characters

```
splitBun("[text-split]", {
    type: 'chars',
});
```

#### Using onComplete callback

```
splitBun("[text-split]", {
    type: 'lines',
    onComplete: () => {
        console.log('split text completed)
    },
});
```

#### Using custom class

```
splitBun("[text-split]", {
    type: 'lines',
    innerClass: 'text-slide-up'
});
```

Thank you for using SplitBun! We hope you find it helpful for your text animation and manipulation needs. If you have any questions or encounter issues, please don't hesitate to get in touch.
