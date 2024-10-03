# Element Selector Chrome Extension

## Table of Contents
1. [Introduction](#introduction)
2. [Features](#features)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Configuration](#configuration)
6. [Development](#development)
7. [Contributing](#contributing)
8. [License](#license)

## Introduction

The Element Selector is a powerful Chrome extension designed to help web developers and designers easily select, preview, and extract HTML elements from any web page. With an intuitive interface and a range of useful features, this tool streamlines the process of web development and debugging.

## Features

- **Element Selection**: Click on any element on a web page to select it.
- **Depth Control**: Adjust the selection depth to target parent elements.
- **Style Preservation**: Option to preserve or strip original CSS styles.
- **Preview**: Instantly preview the selected element in isolation.
- **HTML Extraction**: Copy the HTML of the selected element with a single click.
- **Print Functionality**: Print the selected element with customizable delay.
- **Dark Mode**: Toggle between light and dark themes for comfortable viewing.
- **Draggable Interface**: Easily reposition the extension panel on the page.
- **Minimizable Panel**: Collapse the panel to save screen space when not in use.

## Installation

1. Clone this repository or download the ZIP file.
2. Open Chrome and navigate to `chrome://extensions`.
3. Enable "Developer mode" in the top right corner.
4. Click "Load unpacked" and select the directory containing the extension files.
5. The Element Selector icon should now appear in your Chrome toolbar.

## Usage

1. Click the Element Selector icon in the Chrome toolbar to activate the extension.
2. Click on any element on the web page to select it.
3. Use the depth slider to adjust the selection if needed.
4. Preview, copy HTML, or print the selected element using the provided buttons.
5. Toggle additional options like style preservation as needed.

## Configuration

- **Preserve Styling**: Toggle this option to keep or remove the original CSS styles of the selected element.
- **Print Delay**: Set a delay (in seconds) before the print dialog appears, allowing time for any dynamic content to load.
- **Element Depth**: Adjust this slider to select parent elements of the initially clicked element.

## Development

The extension is built using vanilla JavaScript and can be easily modified or extended. The main script is located in `content.js`.

To make changes:
1. Modify the `content.js` file as needed.
2. Save your changes and reload the extension in Chrome.
3. For substantial changes, increment the version number in `manifest.json`.

## Contributing

Contributions to the Element Selector are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

Please ensure your code adheres to the existing style and includes appropriate comments.


For more information or support, please open an issue in this repository.