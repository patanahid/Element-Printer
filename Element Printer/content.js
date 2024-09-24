(function () {
    const style = document.createElement('style');
    style.textContent = `
        @import url('https://fonts.googleapis.com/css2?family=Futura:wght@400;700&display=swap');
        
        #element-selector-modal {
            font-family: 'Futura', sans-serif;
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 300px;
            background: #1f2937;
            color: #e5e7eb;
            border: 1px solid #374151;
            border-radius: 8px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            z-index: 10000;
        }
        #element-selector-modal * {
            box-sizing: border-box;
        }
        #element-selector-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px;
            background: #111827;
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
            cursor: move;
        }
        #element-selector-content {
            padding: 16px;
        }
        #element-selector-modal input[type="text"],
        #element-selector-modal input[type="number"] {
            width: 100%;
            padding: 8px;
            margin-bottom: 12px;
            background: #374151;
            color: #e5e7eb;
            border: 1px solid #4b5563;
            border-radius: 4px;
        }
        #element-selector-modal input[type="checkbox"] {
            margin-right: 8px;
        }
        #element-selector-modal label {
            display: flex;
            align-items: center;
            margin-bottom: 12px;
        }
        #element-selector-modal button {
            background: #3b82f6;
            color: white;
            border: none;
            padding: 8px 12px;
            margin: 4px;
            border-radius: 4px;
            cursor: pointer;
            transition: background-color 0.2s;
        }
        #element-selector-modal button:hover {
            background: #2563eb;
        }
        #element-selector-modal #element-depth-slider {
            width: 100%;
            margin-bottom: 12px;
        }
        #preview-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10001;
        }
        #preview-content {
            background: white;
            padding: 20px;
            border-radius: 8px;
            max-width: 90%;
            max-height: 90%;
            overflow: auto;
        }
    `;
    document.head.appendChild(style);

    const modal = document.createElement('div');
    modal.id = 'element-selector-modal';
    modal.innerHTML = `
        <div id="element-selector-header">
            <span>Element Selector</span>
            <div>
                <button id="minimize-button">_</button>
                <button id="close-button">X</button>
            </div>
        </div>
        <div id="element-selector-content">
            <input type="text" id="selector-input" readonly>
            <label>
                <input type="checkbox" id="preserve-css-checkbox" checked>
                Preserve CSS
            </label>
            <label>
                Print delay (seconds):
                <input type="number" id="print-delay-input" value="10" min="0">
            </label>
            <input type="range" id="element-depth-slider" min="0" max="10" value="0">
            <button id="pick-again-button">Pick Again</button>
            <button id="preview-button">Preview</button>
            <button id="copy-button">Copy HTML</button>
            <button id="print-button">Print</button>
        </div>
    `;

    document.body.appendChild(modal);

    const minimizeButton = document.getElementById('minimize-button');
    const closeButton = document.getElementById('close-button');
    const content = document.getElementById('element-selector-content');
    const selectorInput = document.getElementById('selector-input');
    const preserveCssCheckbox = document.getElementById('preserve-css-checkbox');
    const printDelayInput = document.getElementById('print-delay-input');
    const elementDepthSlider = document.getElementById('element-depth-slider');
    const pickAgainButton = document.getElementById('pick-again-button');
    const previewButton = document.getElementById('preview-button');
    const copyButton = document.getElementById('copy-button');
    const printButton = document.getElementById('print-button');

    let selectedElement = null;
    let highlightedElement = null;
    let initialSelectedElement = null;

    function makeModalDraggable() {
        let isDragging = false;
        let currentX;
        let currentY;
        let initialX;
        let initialY;
        let xOffset = 0;
        let yOffset = 0;

        const header = document.getElementById('element-selector-header');

        header.addEventListener('mousedown', dragStart);
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', dragEnd);

        function dragStart(e) {
            initialX = e.clientX - xOffset;
            initialY = e.clientY - yOffset;

            if (e.target === header) {
                isDragging = true;
            }
        }

        function drag(e) {
            if (isDragging) {
                e.preventDefault();
                currentX = e.clientX - initialX;
                currentY = e.clientY - initialY;

                xOffset = currentX;
                yOffset = currentY;

                setTranslate(currentX, currentY, modal);
            }
        }

        function dragEnd(e) {
            initialX = currentX;
            initialY = currentY;

            isDragging = false;
        }

        function setTranslate(xPos, yPos, el) {
            el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
        }
    }

    function startSelection() {
        document.body.style.cursor = 'crosshair';
        document.addEventListener('mouseover', highlightElement);
        document.addEventListener('click', selectElement, true);
    }

    function stopSelection() {
        document.body.style.cursor = 'default';
        document.removeEventListener('mouseover', highlightElement);
        document.removeEventListener('click', selectElement, true);
        if (highlightedElement && highlightedElement !== selectedElement) {
            highlightedElement.style.outline = '';
        }
    }

    function highlightElement(e) {
        e.preventDefault();
        e.stopPropagation();

        if (e.target === modal || modal.contains(e.target)) {
            return;
        }

        if (highlightedElement && highlightedElement !== selectedElement) {
            highlightedElement.style.outline = '';
        }
        highlightedElement = e.target;
        highlightedElement.style.outline = '2px solid #3b82f6';
    }
    function selectElement(e) {
        e.preventDefault();
        e.stopPropagation();

        if (e.target === modal || modal.contains(e.target)) {
            return;
        }

        selectedElement = e.target;
        initialSelectedElement = e.target;
        elementDepthSlider.value = 0;
        stopSelection();
        updateSelector();
    }

    function updateSelector() {
        if (!initialSelectedElement) return;

        const maxDepth = getElementDepth(initialSelectedElement);
        const currentDepth = parseInt(elementDepthSlider.value);

        let element = initialSelectedElement;
        for (let i = 0; i < currentDepth; i++) {
            if (element.parentElement) {
                element = element.parentElement;
            } else {
                break;
            }
        }

        const selector = generateSelector(element);
        selectorInput.value = selector;

        if (highlightedElement) {
            highlightedElement.style.outline = '';
        }
        highlightedElement = element;
        selectedElement = element;
        highlightedElement.style.outline = '2px solid #3b82f6';
    }

    function getElementDepth(element) {
        let depth = 0;
        while (element.parentElement) {
            element = element.parentElement;
            depth++;
        }
        return depth;
    }

    function generateSelector(el) {
        if (el.id) {
            return '#' + el.id;
        }
        if (el === document.body) {
            return 'body';
        }
        let selector = el.tagName.toLowerCase();
        if (el.className) {
            selector += '.' + el.className.trim().replace(/\s+/g, '.');
        }
        return selector;
    }

    function getFullCSS() {
        let fullCSS = '';
        for (let i = 0; i < document.styleSheets.length; i++) {
            let sheet = document.styleSheets[i];
            try {
                let rules = sheet.cssRules || sheet.rules;
                for (let j = 0; j < rules.length; j++) {
                    fullCSS += rules[j].cssText + '\n';
                }
            } catch (e) {
                console.log('Error accessing stylesheet:', e);
            }
        }
        return fullCSS;
    }

    function printElement(el) {
        if (!el) return;

        let content = el.outerHTML;
        let css = preserveCssCheckbox.checked ? `<style>${getFullCSS()}</style>` : '';

        let WinPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
        WinPrint.document.write(`
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
                    setTimeout(() => window.close(), ${printDelayInput.value * 1000});
                }, 1000);
                </script>
            </body>
            </html>
        `);
        WinPrint.document.close();
        WinPrint.focus();
    }

    function copyElementHTML(el) {
        if (!el) return;

        let content = el.outerHTML;
        if (preserveCssCheckbox.checked) {
            let css = getFullCSS();
            content = `<style>${css}</style>\n${content}`;
        }

        navigator.clipboard.writeText(content)
            .then(() => alert('HTML copied to clipboard!'))
            .catch(err => console.error('Failed to copy: ', err));
    }

    function previewElement(el) {
        if (!el) return;

        let content = el.outerHTML;
        let css = preserveCssCheckbox.checked ? `<style>${getFullCSS()}</style>` : '';

        let overlay = document.createElement('div');
        overlay.id = 'preview-overlay';
        overlay.innerHTML = `
            <div id="preview-content">
                ${css}
                ${content}
            </div>
        `;

        document.body.appendChild(overlay);

        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                document.body.removeChild(overlay);
            }
        });
    }

    minimizeButton.addEventListener('click', () => {
        if (content.style.display === 'none') {
            content.style.display = 'block';
            minimizeButton.textContent = '_';
        } else {
            content.style.display = 'none';
            minimizeButton.textContent = '□';
        }
    });

    closeButton.addEventListener('click', () => {
        try {
            if (highlightedElement) {
                highlightedElement.style.outline = '';
            }
            document.body.removeChild(modal);
        } catch (error) {
            console.error('Error closing modal:', error);
        }
    });

    pickAgainButton.addEventListener('click', () => {
        if (selectedElement) {
            selectedElement.style.outline = '';
        }
        if (highlightedElement) {
            highlightedElement.style.outline = '';
        }
        selectedElement = null;
        highlightedElement = null;
        initialSelectedElement = null;
        selectorInput.value = '';
        elementDepthSlider.value = 0;
        startSelection();
    });

    previewButton.addEventListener('click', () => previewElement(selectedElement));
    copyButton.addEventListener('click', () => copyElementHTML(selectedElement));
    printButton.addEventListener('click', () => printElement(selectedElement));

    elementDepthSlider.addEventListener('input', () => {
        if (initialSelectedElement) {
            const maxDepth = getElementDepth(initialSelectedElement);
            elementDepthSlider.max = maxDepth;
            updateSelector();
        }
    });

    makeModalDraggable();
    startSelection();
})();