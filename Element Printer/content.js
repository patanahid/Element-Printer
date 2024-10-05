(function () {
    // Styles for the extension's modal UI
    const modalStyles = `
      #elementSelector {
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 10000;
        font-family: 'Inter', sans-serif;
        width: 320px;
        background-color: #ffffff;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        overflow: hidden;
        cursor: default; /* Default cursor */
      }
  
      .dark #elementSelector {
        background-color: #1f2937;
      }
  
      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px;
        background-color: #f5f5f5;
        border-bottom: 1px solid #e5e7eb;
        cursor: move; /* Indicate draggable area */
      }
  
      .dark .title{
      color: white;
      }
      .dark .header {
        background-color: #111827;
      }
  
      .title {
        font-size: 18px;
        font-weight: 600;
        margin: 0;
        user-select: none; /* Prevent text selection while dragging */
        flex-grow: 1;
      }
  
      .controls {
        display: flex;
        gap: 8px;
      }
  
      .btn {
        background: none;
        border: none;
        cursor: pointer;
        padding: 6px;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background-color 0.2s, border-color 0.2s;
        width: 32px; /* Make buttons square */
        height: 32px;
        padding: 0; /* Remove padding to make square */
      }
  
      .btn svg {
        stroke: #6b7280;
        transition: stroke 0.3s;
        width: 20px;
        height: 20px;
      }
  
      .dark .btn svg {
        stroke: #e5e7eb;
      }
  
      .btn:hover {
        background-color: #f5f5f5;
      }
  
      .dark .btn:hover {
        background-color: #374151;
      }
  
      .close-btn {
        border: 2px solid #ef4444;
      }
  
      .minimize-btn {
        border: 2px solid #3b82f6;
      }

  
      .content {
        padding: 16px;
        display: block;
      }
  
      .form-group {
        margin-bottom: 12px;
      }
  
      label {
        display: block;
        font-size: 14px;
        font-weight: 500;
        margin-bottom: 6px;
        color: #374151;
      }
  
      .dark label {
        color: #e5e7eb;
      }
  
      input[type='text'],
      input[type='number'] {
      position: relative;
        width: 95%;
        padding: 8px;
        border: 1px solid #e5e7eb;
        border-radius: 4px;
        background-color: #ffffff;
        color: #374151;
      }
  
      .dark input[type='text'],
      .dark input[type='number'] {
        background-color: #374151;
        color: #e5e7eb;
      }
  
      .switch {
        position: relative;
        display: inline-block;
        width: 40px;
        height: 20px;
        margin-left: 8px;
      }
  
      .switch input {
        opacity: 0;
        width: 0;
        height: 0;
      }
  
      .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #e5e7eb;
        transition: 0.4s;
        border-radius: 20px;
      }
  
      .slider:before {
        position: absolute;
        content: '';
        height: 16px;
        width: 16px;
        left: 2px;
        bottom: 2px;
        background-color: #ffffff;
        transition: 0.4s;
        border-radius: 50%;
      }
  
      input:checked + .slider {
        background-color: #3b82f6;
      }
  
      input:checked + .slider:before {
        transform: translateX(20px);
      }
  
      .range-slider {
        -webkit-appearance: none;
        width: 100%;
        height: 4px;
        border-radius: 5px;
        background: #e5e7eb;
        outline: none;
        opacity: 0.7;
        transition: opacity 0.2s;
      }
  
      .range-slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: #3b82f6;
        cursor: pointer;
      }
  
      .range-slider::-moz-range-thumb {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: #3b82f6;
        cursor: pointer;
      }
  
      .button-group {
        display: flex;
        justify-content: space-between;
        gap: 8px;
        margin-top: 12px;
      }
  
      .action-btn {
        flex: 1;
        padding: 8px 12px;
        border: 1px solid #e5e7eb;
        border-radius: 4px;
        background-color: #ffffff;
        color: #374151;
        cursor: pointer;
        transition: background-color 0.2s, color 0.2s;
        font-weight: 500;
      }
  
      .dark .action-btn {
        background-color: #374151;
        color: #e5e7eb;
      }
  
      .action-btn:hover {
        background-color: #3b82f6;
        color: #ffffff;
        border-color: #3b82f6;
      }
  
      .action-btn.accent {
        background-color: #2563eb;
        color: #ffffff;
        border: none;
      }
  
      .action-btn.accent:hover {
        opacity: 0.9;
      }
  
      .label-with-toggle {
        display: flex;
        align-items: center;
      }
  
      .tooltip {
        position: relative;
        display: inline-block;
      }
  
      .tooltip .tooltiptext {
        visibility: hidden;
        width: 180px;
        background-color: #374151;
        color: #ffffff;
        text-align: center;
        border-radius: 4px;
        padding: 8px;
        position: absolute;
        z-index: 10001;
        top: 100%; /* Position below the button */
        left: 50%;
        transform: translateX(-50%);
        margin-top: 8px; /* Space between button and tooltip */
        opacity: 0;
        transition: opacity 0.3s;
        font-size: 12px;
      }
        
  
      .tooltip:hover .tooltiptext {
        visibility: visible;
        opacity: 1;
      }
  
      .info-icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background-color: #e5e7eb;
        color: #374151;
        font-size: 12px;
        font-weight: bold;
        margin-left: 4px;
        cursor: help;
      }
  
      .dark .info-icon {
        background-color: #374151;
        color: #e5e7eb;
      }
    `;

    // Inheritable CSS properties for element preservation
    const inheritableProperties = [
        'font',
        'font-family',
        'font-size',
        'font-style',
        'font-weight',
        'letter-spacing',
        'line-height',
        'cursor',
        'color',
        'text-align',
        'visibility',
        'white-space',
        'word-spacing',
        'text-transform',
        'text-decoration',
        'text-indent',
    ];

    // CSS properties to skip when preserving styles
    const skipProperties = [
        'animation-delay',
        'animation-direction',
        'animation-duration',
        'animation-fill-mode',
        'animation-iteration-count',
        'animation-name',
        'animation-play-state',
        'animation-timing-function',
        'transition-delay',
        'transition-duration',
        'transition-property',
        'transition-timing-function',
    ];

    // Create the modal element and inject it into the DOM
    const modal = document.createElement('div');
    modal.id = 'elementSelector';
    modal.innerHTML = `
      <div class="header" id="modalHeader">
        <h2 class="title">Element Selector</h2>
        <div class="controls">
          <button class="btn tooltip" id="themeToggle" aria-label="Toggle theme">
            <span class="tooltiptext">Toggle dark mode</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
          </button>
          <button class="btn howToUse-btn tooltip" id="howToUseButton" aria-label="How to Use">
            <span class="tooltiptext">Learn how to use Element Selector</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
          </button>
          <button class="btn minimize-btn tooltip" id="minimizeToggle" aria-label="Minimize">
            <span class="tooltiptext">Minimize Element Selector</span>
            <svg   xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"
>
  <polyline points="4 14 10 14 10 20" />
  <polyline points="20 10 14 10 14 4" />
  <line x1="14" x2="21" y1="10" y2="3" />
  <line x1="3" x2="10" y1="21" y2="14" />
</svg>
          </button>
          <button class="btn close-btn tooltip" id="closeButton" aria-label="Close">
            <span class="tooltiptext">Close Element Selector</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
      </div>
      <div class="content" id="selectorContent">
        <div class="form-group">
          <label for="selectedElement">Selected Element</label>
          <input type="text" id="selectedElement" placeholder="No element selected" readonly>
        </div>
        <div class="form-group">
          <div class="label-with-toggle">
            <label for="preserveCss">
              Preserve Styling
              <span class="info-icon tooltip">i
                <span class="tooltiptext">Keep original CSS styles (styling) of the selected element</span>
              </span>
            </label>
            <label class="switch">
              <input type="checkbox" id="preserveCss" checked>
              <span class="slider"></span>
            </label>
          </div>
        </div>
        <div class="form-group">
          <label for="printDelay">
            Print delay (s)
            <span class="info-icon tooltip">i
              <span class="tooltiptext">Set the time given to print the page after clicking print</span>
            </span>
          </label>
          <input type="number" id="printDelay" min="0" max="60" value="10" placeholder="Delay in seconds">
        </div>
        <div class="form-group">
          <label for="imageType">
            Image Type
            <span class="info-icon tooltip">i
              <span class="tooltiptext">Select the image format for capturing the element</span>
            </span>
          </label>
          <select id="imageType">
            <option value="png">PNG</option>
            <option value="jpg">JPG</option>
          </select>
        </div>
        <div class="form-group">
          <label for="elementDepth">
            Element depth
            <span class="info-icon tooltip">i
              <span class="tooltiptext">The larger the value, the more elements would be selected</span>
            </span>
          </label>
          <input type="range" id="elementDepth" class="range-slider" min="0" max="100" value="0">
        </div>
        <div class="button-group">
          <button class="action-btn tooltip" id="pickAgain">
            Pick Again
          </button>
          <button class="action-btn tooltip" id="preview">
            Preview
          </button>
          <button class="action-btn tooltip" id="getImage">
            Get Image
          </button>
          <button class="action-btn accent tooltip" id="print">
            Print
          </button>
        </div>
      </div>
    `;

    // Add HTML2Canvas library
    const script = document.createElement('script');
    script.src = 'https://html2canvas.hertzen.com/dist/html2canvas.min.js';
    script.async = true;
    document.head.appendChild(script);

    document.body.appendChild(modal);

    // Add modal styles to the document
    const style = document.createElement('style');
    style.textContent = modalStyles;
    document.head.appendChild(style);

    // Get references to modal elements
    const themeToggle = document.getElementById('themeToggle');
    const minimizeToggle = document.getElementById('minimizeToggle');
    const closeButton = document.getElementById('closeButton');
    const howToUseButton = document.getElementById('howToUseButton');
    const selectorContent = document.getElementById('selectorContent');
    const selectedElementInput = document.getElementById('selectedElement');
    const preserv eCssCheckbox = document.getElementById('preserveCss');
    const printDelayInput = document.getElementById('printDelay');
    const imageTypeSelect = document.getElementById('imageType');
    const elementDepthSlider = document.getElementById('elementDepth');
    const pickAgainButton = document.getElementById('pickAgain');
    const previewButton = document.getElementById('preview');
    const getImageButton = document.getElementById('getImage');
    const printButton = document.getElementById('print');
    const modalHeader = document.getElementById('modalHeader');

    // Variables to keep track of selected element and highlighting
    let selectedElement = null;
    let highlightedElement = null;
    let initialSelectedElement = null;

    // Function to strip unnecessary CSS properties
    const stripCSS = (element, referenceElement, isChild = false) => {
        const referenceStyles = window.getComputedStyle(referenceElement);
        element.removeAttribute('style');

        for (const property of referenceStyles) {
            if (skipProperties.includes(property)) continue;

            if (isChild && inheritableProperties.includes(property)) {
                element.style.setProperty(property, referenceStyles.getPropertyValue(property));
                continue;
            }

            const value = referenceStyles.getPropertyValue(property);
            if (value === 'auto' || value === 'none' || value === '0px' || value === '0' || value === 'normal') continue;

            element.style.setProperty(property, value);
        }

        Array.from(element.children).forEach((child, index) => {
            stripCSS(child, referenceElement.children[index], true);
        });
    };

    // Function to clone an element with its styles
    const cloneElementWithCSS = (originalElement) => {
        const clonedElement = originalElement.cloneNode(true);
        stripCSS(clonedElement, originalElement, false);
        return clonedElement;
    };

    // Function to handle theme toggling
    const toggleTheme = () => {
        document.body.classList.toggle('dark');
    };

    // Function to toggle modal content visibility
    const toggleContentVisibility = () => {
        selectorContent.style.display = selectorContent.style.display === 'none' ? 'block' : 'none';
    };

    // Function to close the modal
    const closeModal = () => {
        modal.remove();
        stopSelection();
    };

    // Function to open "How to Use" link
    const openHowToUse = () => {
        const howToUseURL = 'https://your-link-here.com'; // Replace with your actual link
        window.open(howToUseURL, '_blank');
    };

    // Function to get the depth of an element in the DOM
    const getElementDepth = (element) => {
        let depth = 0;
        while (element.parentElement) {
            element = element.parentElement;
            depth++;
        }
        return depth;
    };

    // Function to generate a CSS selector for an element
    const generateSelector = (element) => {
        if (element.id) return `#${element.id}`;
        if (element === document.body) return 'body';

        let selector = element.tagName.toLowerCase();
        if (element.className) selector += `.${element.className.trim().replace(/\s+/g, '.')}`;
        return selector;
    };

    // Function to start the element selection process
    const startSelection = () => {
        document.body.style.cursor = 'crosshair';
        document.addEventListener('mouseover', highlightElement);
        document.addEventListener('click', selectElement, true);
    };

    // Function to stop the element selection process
    const stopSelection = () => {
        document.body.style.cursor = 'default';
        document.removeEventListener('mouseover', highlightElement);
        document.removeEventListener('click', selectElement, true);
        if (highlightedElement) highlightedElement.style.outline = '';
    };

    // Function to highlight an element on mouseover
    const highlightElement = (event) => {
        event.preventDefault();
        event.stopPropagation();

        if (event.target === modal || modal.contains(event.target)) return;

        if (highlightedElement) highlightedElement.style.outline = '';

        highlightedElement = event.target;
        highlightedElement.style.outline = '2px solid #3b82f6';
    };

    if (modal.classList.contains('minimize')) {
        modal.classList.remove('minimize');
    }

    // Function to select an element on click
    const selectElement = (event) => {
        event.preventDefault();
        event.stopPropagation();

        if (event.target === modal || modal.contains(event.target)) return;

        selectedElement = event.target;
        initialSelectedElement = event.target;
        elementDepthSlider.value = 0;
        elementDepthSlider.max = getElementDepth(initialSelectedElement);
        updateSelectedElementInput();
        stopSelection();
    };

    // Function to update the selected element input field
    const updateSelectedElementInput = () => {
        if (!initialSelectedElement) return;

        let currentElement = initialSelectedElement;
        for (let i = 0; i < parseInt(elementDepthSlider.value, 10); i++) {
            if (currentElement.parentElement) {
                currentElement = currentElement.parentElement;
            } else {
                break;
            }
        }

        selectedElement = currentElement;
        selectedElementInput.value = generateSelector(currentElement);

        if (highlightedElement) highlightedElement.style.outline = '';
        highlightedElement = currentElement;
        highlightedElement.style.outline = '2px solid #3b82f6';
    };

    // Function to extract all styles from the document
    const getFullCSS = () => {
        let fullCSS = '';
        for (let i = 0; i < document.styleSheets.length; i++) {
            const sheet = document.styleSheets[i];
            try {
                const rules = sheet.cssRules || sheet.rules;
                for (let j = 0; j < rules.length; j++) {
                    fullCSS += `${rules[j].cssText}\n`;
                }
            } catch (e) {
                console.error('Error accessing stylesheet:', e);
            }
        }
        return fullCSS;
    };

    // Function to print the selected element
    const printElement = () => {
        if (!selectedElement) return;

        const clonedElement = cloneElementWithCSS(selectedElement);
        const content = clonedElement.outerHTML;
        const css = preserveCssCheckbox.checked ? `<style>${getFullCSS()}</style>` : '';

        const printWindow = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
        printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Print Preview</title>
          ${css}
        </head>
        <body>
          ${content}
          <script>
            setTimeout(() => {
              window.print();
              setTimeout(() => window.close(), ${parseInt(printDelayInput.value, 10) * 1000});
            }, 1000);
          </script>
        </body>
        </html>
      `);
        printWindow.document.close();
        printWindow.focus();
    };

    // Function to capture and download the selected element as an image
    const captureElementAsImage = () => {
        if (!selectedElement) return;

        html2canvas(selectedElement, {
            useCORS: true,
            allowTaint: true,
            backgroundColor: null,
        }).then(canvas => {
            const imageType = imageTypeSelect.value;
            const imageDataUrl = canvas.toDataURL(`image/${imageType}`);
            const link = document.createElement('a');
            link.href = imageDataUrl;
            link.download = `captured-element.${imageType}`;
            link.click();
        });
    };

    // Function to preview the selected element
    const previewElement = () => {
        if (!selectedElement) return;

        const clonedElement = cloneElementWithCSS(selectedElement);
        const css = preserveCssCheckbox.checked ? `<style>${getFullCSS()}</style>` : '';

        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        overlay.style.display = 'flex';
        overlay.style.justifyContent = 'center';
        overlay.style.alignItems = 'center';
        overlay.style.zIndex = '10001';

        const previewContainer = document.createElement('div');
        previewContainer.style.backgroundColor = '#ffffff';
        previewContainer.style.padding = '20px';
        previewContainer.style.borderRadius = '8px';
        previewContainer.style.maxHeight = '80%';
        previewContainer.style.maxWidth = '80%';
        previewContainer.style.overflow = 'auto';
        previewContainer.innerHTML = `${css}${clonedElement.outerHTML}`;

        overlay.appendChild(previewContainer);
        document.body.appendChild(overlay);

        const closePreview = () => {
            document.body.removeChild(overlay);
        };

        overlay.addEventListener('click', (event) => {
            if (event.target === overlay) {
                closePreview();
            }
        });
    };

    // Function to handle dragging
    const makeModalDraggable = (element, handle) => {
        let isDragging = false;
        let startX, startY, initialRight, initialBottom;

        handle.addEventListener('mousedown', (e) => {
            // Only start dragging if not clicking on a button
            if (e.target.closest('.btn')) return;

            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;

            const style = window.getComputedStyle(element);
            initialRight = parseInt(style.right, 10);
            initialBottom = parseInt(style.bottom, 10);

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        });

        const onMouseMove = (e) => {
            if (!isDragging) return;
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;

            element.style.right = `${initialRight - dx}px`;
            element.style.bottom = `${initialBottom - dy}px`;
        };

        const onMouseUp = () => {
            isDragging = false;
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };
    };

    // Event listeners for modal interactions
    themeToggle.addEventListener('click', toggleTheme);
    minimizeToggle.addEventListener('click', toggleContentVisibility);
    closeButton.addEventListener('click', closeModal);
    howToUseButton.addEventListener('click', openHowToUse);
    pickAgainButton.addEventListener('click', startSelection);
    previewButton.addEventListener('click', previewElement);
    getImageButton.addEventListener('click', captureElementAsImage);
    printButton.addEventListener('click', printElement);
    elementDepthSlider.addEventListener('input', updateSelectedElementInput);

    // Make the modal draggable
    makeModalDraggable(modal, modalHeader);

    toggleTheme();
    // Initial actions: hide content and start selection
    startSelection();
})();
