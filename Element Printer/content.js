(function () {
  // Improved Modal CSS with media queries, larger tap targets, and refined typography
  const modalStyles = `
    /* Base styles */
    #es-modal {
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 2147483647; /* Maximum z-index value */
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
      width: 300px;
      max-width: 90%;
      background-color: #111827;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      overflow: hidden;
      cursor: default;
      transition: all 0.3s ease;
      touch-action: manipulation;
      -webkit-tap-highlight-color: transparent;
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      user-select: none;
    }
    #es-modal.light {
      background-color: #ffffff;
      color: #111827;
    }
    #es-modal.light #es-header {
      background-color: #f3f4f6;
      border-bottom: 1px solid #e5e7eb;
    }
    #es-modal.light #es-title {
      color: #111827;
    }
    #es-modal.light .es-btn svg {
      stroke: #4b5563;
    }
    #es-modal.light #es-content {
      background-color: #ffffff;
      color: #111827;
    }
    #es-modal.light input[type="text"],
    #es-modal.light input[type="number"],
    #es-modal.light select {
      background-color: #f9fafb;
      border-color: #e5e7eb;
      color: #111827;
    }
    #es-modal.light .es-slider {
      background-color: #e5e7eb;
    }
    #es-modal.light .es-action-btn {
      background-color: #f3f4f6;
      color: #111827;
      border-color: #e5e7eb;
    }
    #es-modal.light .es-action-btn:hover {
      background-color: #e5e7eb;
    }
    #es-modal.light .es-action-btn.accent {
      background-color: #3b82f6;
      color: #ffffff;
    }
    /* Header */
    #es-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 12px;
      background-color: #111827;
      border-bottom: 1px solid #374151;
      cursor: move;
      touch-action: none;
    }
    #es-title {
      font-size: 16px;
      font-weight: 600;
      margin: 0;
      flex-grow: 1;
      color: #ffffff;
    }
    /* Controls */
    #es-controls {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .es-btn {
      background: none;
      border: none;
      cursor: pointer;
      width: 32px;
      height: 32px;
      border-radius: 4px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      position: relative;
    }
    .es-btn svg {
      stroke: #e5e7eb;
      width: 20px;
      height: 20px;
      display: block;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .es-btn:hover { 
      background-color: #374151; 
    }
    #es-close { 
      border: 2px solid #ef4444;
    }
    #es-close svg {
      stroke: #ef4444;
    }
    #es-minimize { 
      border: 2px solid #3b82f6;
    }
    #es-minimize svg {
      stroke: #3b82f6;
    }
    /* Content */
    #es-content {
      padding: 16px;
      display: none;
      background-color: #111827;
      color: #e5e7eb;
    }
    .es-form-group {
      margin-bottom: 16px;
    }
    #es-content label {
      display: block;
      font-size: 14px;
      font-weight: 500;
      margin-bottom: 6px;
    }
    #es-content input[type="text"],
    #es-content input[type="number"],
    #es-content select {
      width: 100%;
      padding: 8px;
      border: 1px solid #374151;
      border-radius: 4px;
      background-color: #1f2937;
      color: #e5e7eb;
    }
    /* Toggle switch */
    .es-switch {
      display: inline-block;
      width: 40px;
      height: 20px;
      margin-left: 8px;
      position: relative;
    }
    .es-switch input {
      opacity: 0;
      width: 0;
      height: 0;
    }
    .es-slider {
      position: absolute;
      cursor: pointer;
      top: 0; left: 0; right: 0; bottom: 0;
      background-color: #374151;
      transition: .4s;
      border-radius: 20px;
    }
    .es-slider:before {
      position: absolute;
      content: "";
      height: 16px;
      width: 16px;
      left: 2px;
      bottom: 2px;
      background-color: #e5e7eb;
      transition: .4s;
      border-radius: 50%;
    }
    input:checked + .es-slider {
      background-color: #3b82f6;
    }
    input:checked + .es-slider:before {
      transform: translateX(20px);
    }
    /* Range slider */
    .es-range-slider {
      -webkit-appearance: none;
      width: 100%;
      height: 4px;
      border-radius: 5px;
      background: #374151;
      outline: none;
      opacity: 0.8;
      transition: opacity 0.2s;
    }
    .es-range-slider::-webkit-slider-thumb,
    .es-range-slider::-moz-range-thumb {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: #3b82f6;
      cursor: pointer;
      border: none;
    }
    /* Button group */
    .es-button-group {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      gap: 8px;
      margin-top: 16px;
    }
    .es-action-btn {
      flex: 1;
      padding: 10px 12px;
      border: 1px solid #374151;
      border-radius: 4px;
      background-color: #1f2937;
      color: #e5e7eb;
      cursor: pointer;
      transition: background-color 0.2s, color 0.2s;
      font-weight: 500;
      text-align: center;
    }
    .es-action-btn:hover {
      background-color: #3b82f6;
      color: #ffffff;
      border-color: #3b82f6;
    }
    .es-action-btn.accent {
      background-color: #2563eb;
      border: none;
    }
    .es-action-btn.accent:hover {
      opacity: 0.9;
    }
    /* Tooltip */
    .es-tooltip {
      position: relative;
      display: inline-block;
    }
    .es-tooltip .es-tooltiptext {
      visibility: hidden;
      width: 180px;
      background-color: #374151;
      color: #ffffff;
      text-align: center;
      border-radius: 4px;
      padding: 8px;
      position: absolute;
      z-index: 10001;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      margin-top: 8px;
      opacity: 0;
      transition: opacity 0.3s;
      font-size: 12px;
    }
    .es-tooltip:hover .es-tooltiptext {
      visibility: visible;
      opacity: 1;
    }
    .es-info-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: #374151;
      color: #e5e7eb;
      font-size: 12px;
      margin-left: 4px;
      cursor: help;
    }
    /* Responsive adjustments for mobile */
    @media (max-width: 480px) {
      #es-modal {
        width: 85%;
        right: 10px;
        bottom: 10px;
        font-size: 14px;
      }
      .es-btn {
        width: 44px;
        height: 44px;
        margin: 0 2px;
      }
      .es-btn svg {
        width: 24px;
        height: 24px;
      }
      #es-content {
        padding: 12px;
      }
      .es-action-btn {
        padding: 12px 16px;
        font-size: 14px;
        min-height: 44px;
      }
      input[type="range"] {
        height: 30px;
      }
      input[type="range"]::-webkit-slider-thumb {
        width: 24px;
        height: 24px;
      }
      .es-switch {
        width: 52px;
        height: 26px;
      }
      .es-slider:before {
        width: 20px;
        height: 20px;
      }
    }
    /* Optional: Better layout on tablets */
    @media (min-width: 481px) and (max-width: 768px) {
      #es-modal {
        width: 350px;
      }
      .es-action-btn {
        font-size: 15px;
      }
    }
  `;
  const styleEl = document.createElement('style');
  styleEl.textContent = modalStyles;
  document.head.appendChild(styleEl);

  // Create the modal
  const modal = document.createElement('div');
  modal.id = 'es-modal';
  modal.innerHTML = `
    <div id="es-header">
      <h2 id="es-title">Element Selector</h2>
      <div id="es-controls">
        <es-button class="es-btn es-tooltip" id="es-themeToggle" aria-label="Toggle theme">
          <span class="es-tooltiptext">Toggle dark mode</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        </es-button>
        <es-button class="es-btn es-tooltip" id="es-howToUseButton" aria-label="How to Use">
          <span class="es-tooltiptext">Learn how to use</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-info"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
        </es-button>
        <es-button class="es-btn es-tooltip" id="es-minimize" aria-label="Expand">
          <span class="es-tooltiptext">Expand</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <polyline points="4 14 10 14 10 20" />
            <polyline points="20 10 14 10 14 4" />
            <line x1="14" y1="10" x2="21" y2="3" />
            <line x1="3" y1="21" x2="10" y2="14" />
          </svg>
        </es-button>
        <es-button class="es-btn es-tooltip" id="es-close" aria-label="Close">
          <span class="es-tooltiptext">Close</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </es-button>
      </div>
    </div>
    <div id="es-content">
      <div class="es-form-group">
        <label for="es-selectedElement">Selected Element</label>
        <input type="text" id="es-selectedElement" placeholder="No element selected" readonly>
      </div>
      <div class="es-form-group">
        <div class="es-label-toggle">
          <label for="es-preserveCss">
            Preserve Styling
            <span class="es-info-icon es-tooltip">i
              <span class="es-tooltiptext">Keep original CSS of the element</span>
            </span>
          </label>
          <label class="es-switch">
            <input type="checkbox" id="es-preserveCss" checked>
            <span class="es-slider"></span>
          </label>
        </div>
      </div>
      <div class="es-form-group">
        <label for="es-printDelay">
          Print delay (s)
          <span class="es-info-icon es-tooltip">i
            <span class="es-tooltiptext">Delay before printing</span>
          </span>
        </label>
        <input type="number" id="es-printDelay" min="0" max="60" value="10">
      </div>
      <div class="es-form-group">
        <label for="es-imageType">
          Image Type
          <span class="es-info-icon es-tooltip">i
            <span class="es-tooltiptext">Select image format</span>
          </span>
        </label>
        <select id="es-imageType">
          <option value="png">PNG</option>
          <option value="jpg">JPG</option>
        </select>
      </div>
      <div class="es-form-group">
        <label for="es-elementDepth">
          Element depth
          <span class="es-info-icon es-tooltip">i
            <span class="es-tooltiptext">Increase to select parent element</span>
          </span>
        </label>
        <input type="range" id="es-elementDepth" class="es-range-slider" min="0" max="100" value="0">
      </div>
      <div class="es-button-group">
        <es-button class="es-action-btn" id="es-pickAgain">Pick Again</es-button>
        <es-button class="es-action-btn" id="es-preview">Preview</es-button>
        <es-button class="es-action-btn" id="es-getImage">Get Image</es-button>
        <es-button class="es-action-btn accent" id="es-print">Print</es-button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  // Force dark theme
  document.body.classList.add('dark');

  // References
  const themeToggle = document.getElementById('es-themeToggle');
  const minimizeToggle = document.getElementById('es-minimize');
  const closeButton = document.getElementById('es-close');
  const howToUseButton = document.getElementById('es-howToUseButton');
  const contentArea = document.getElementById('es-content');
  const selectedElementInput = document.getElementById('es-selectedElement');
  const preserveCssCheckbox = document.getElementById('es-preserveCss');
  const printDelayInput = document.getElementById('es-printDelay');
  const imageTypeSelect = document.getElementById('es-imageType');
  const elementDepthSlider = document.getElementById('es-elementDepth');
  const pickAgainButton = document.getElementById('es-pickAgain');
  const previewButton = document.getElementById('es-preview');
  const getImageButton = document.getElementById('es-getImage');
  const printButton = document.getElementById('es-print');
  const modalHeader = document.getElementById('es-header');

  let selectedElement = null,
      highlightedElement = null,
      initialSelectedElement = null;

  // CSS utilities for cloning with styles
  const inheritableProperties = [
    'font','font-family','font-size','font-style','font-weight',
    'letter-spacing','line-height','cursor','color','text-align',
    'visibility','white-space','word-spacing','text-transform',
    'text-decoration','text-indent'
  ];
  const skipProperties = [
    'animation-delay','animation-direction','animation-duration',
    'animation-fill-mode','animation-iteration-count','animation-name',
    'animation-play-state','animation-timing-function','transition-delay',
    'transition-duration','transition-property','transition-timing-function'
  ];

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
      if (['auto','none','0px','0','normal'].includes(value)) continue;
      element.style.setProperty(property, value);
    }
    Array.from(element.children).forEach((child, index) => {
      if (referenceElement.children[index])
        stripCSS(child, referenceElement.children[index], true);
    });
  };

  const cloneElementWithCSS = (originalElement) => {
    const clonedElement = originalElement.cloneNode(true);
    stripCSS(clonedElement, originalElement, false);
    return clonedElement;
  };

  const generateSelector = (element) => {
    if (element.id) return `#${element.id}`;
    if (element === document.body) return 'body';
    let selector = element.tagName.toLowerCase();
    if (element.className)
      selector += `.${element.className.trim().replace(/\s+/g,'.')}`;
    return selector;
  };

  const getElementDepth = (element) => {
    let depth = 0;
    while (element.parentElement) { element = element.parentElement; depth++; }
    return depth;
  };

  // Element picking
  const startSelection = () => {
    document.body.style.cursor = 'crosshair';
    document.addEventListener('mouseover', highlightElement);
    document.addEventListener('click', selectElement, true);
    modal.style.pointerEvents = 'auto'; // Keep modal interactive
  };

  const stopSelection = () => {
    document.body.style.cursor = 'default';
    document.removeEventListener('mouseover', highlightElement);
    document.removeEventListener('click', selectElement, true);
    if (highlightedElement) highlightedElement.style.outline = '';
  };

  const highlightElement = (event) => {
    if (event.target === modal || modal.contains(event.target)) {
      if (highlightedElement) highlightedElement.style.outline = '';
      highlightedElement = null;
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    if (highlightedElement) highlightedElement.style.outline = '';
    highlightedElement = event.target;
    highlightedElement.style.outline = '2px solid #3b82f6';
  };

  const selectElement = (event) => {
    if (event.target === modal || modal.contains(event.target)) return;
    event.preventDefault();
    event.stopPropagation();
    selectedElement = event.target;
    initialSelectedElement = event.target;
    elementDepthSlider.value = 0;
    elementDepthSlider.max = getElementDepth(initialSelectedElement);
    updateSelectedElementInput();
    stopSelection(); // Stop selection after clicking
    contentArea.style.display = 'block';
  };

  const updateSelectedElementInput = () => {
    if (!initialSelectedElement) return;
    let currentElement = initialSelectedElement;
    for (let i = 0; i < parseInt(elementDepthSlider.value, 10); i++) {
      if (currentElement.parentElement) { currentElement = currentElement.parentElement; }
      else break;
    }
    selectedElement = currentElement;
    selectedElementInput.value = generateSelector(currentElement);
    if (highlightedElement) highlightedElement.style.outline = '';
    highlightedElement = currentElement;
    highlightedElement.style.outline = '2px solid #3b82f6';
  };

  // Filter same-origin stylesheets and handle CSP errors safely
  const getFullCSS = async () => {
    let fullCSS = '';
    const sheets = Array.from(document.styleSheets);
    
    for (const sheet of sheets) {
      try {
        // Skip external stylesheets from different origins
        if (sheet.href) {
          const sheetUrl = new URL(sheet.href);
          const currentUrl = new URL(window.location.href);
          
          // Only process same-origin stylesheets
          if (sheetUrl.origin === currentUrl.origin) {
            try {
              const response = await fetch(sheet.href);
              if (response.ok) {
                fullCSS += await response.text() + '\n';
              }
            } catch (e) {
              console.warn('Could not fetch same-origin stylesheet:', sheet.href);
              // Try to get rules directly if fetch fails
              try {
                const rules = sheet.cssRules || sheet.rules;
                for (let j = 0; j < rules.length; j++) {
                  fullCSS += rules[j].cssText + '\n';
                }
              } catch (ruleError) {
                console.warn('Could not access stylesheet rules:', ruleError);
              }
            }
          } else {
            // For cross-origin stylesheets, try to get rules directly
            try {
              const rules = sheet.cssRules || sheet.rules;
              for (let j = 0; j < rules.length; j++) {
                fullCSS += rules[j].cssText + '\n';
              }
            } catch (corsError) {
              // Silently skip cross-origin stylesheets we can't access
              continue;
            }
          }
          continue;
        }
        
        // Handle inline styles
        try {
          const rules = sheet.cssRules || sheet.rules;
          for (let j = 0; j < rules.length; j++) {
            fullCSS += rules[j].cssText + '\n';
          }
        } catch (e) {
          console.warn('Could not access inline stylesheet rules:', e);
        }
      } catch (e) {
        console.warn('Error processing stylesheet:', e);
        continue;
      }
    }

    // Add essential styles for preview
    fullCSS += `
      * { box-sizing: border-box; }
      img { max-width: 100%; height: auto; }
      video { max-width: 100%; height: auto; }
      iframe { max-width: 100%; }
    `;
    
    return fullCSS;
  };

  // Load required libraries
  const loadLibraries = async () => {
    // Load html2canvas
    const html2canvasScript = document.createElement('script');
    html2canvasScript.src = chrome.runtime.getURL('html2canvas.min.js');
    
    // Load html2pdf
    const html2pdfScript = document.createElement('script');
    html2pdfScript.src = chrome.runtime.getURL('html2pdf.bundle.min.js');
    
    // Wait for both scripts to load
    await Promise.all([
      new Promise(resolve => {
        html2canvasScript.onload = resolve;
        document.head.appendChild(html2canvasScript);
      }),
      new Promise(resolve => {
        html2pdfScript.onload = resolve;
        document.head.appendChild(html2pdfScript);
      })
    ]);
  };

  // Print element using browser's native print
  const printElement = async () => {
    if (!selectedElement) return;
    
    try {
      // Create a new window for printing
      const printWindow = window.open('', '_blank');
      if (!printWindow) {
        alert('Please allow popups for this site to use the print feature.');
        return;
      }

      // Setup the print window document
      printWindow.document.open();
      printWindow.document.write('<html><head><title>Print Element</title>');
      
      // Copy all stylesheets from the original page
      if (preserveCssCheckbox.checked) {
        const css = await getFullCSS();
        printWindow.document.write(`<style>${css}</style>`);
      }
      
      // Add print-specific styles
      printWindow.document.write(`
        <style>
          @media print {
            body { margin: 0; padding: 20px; }
            * { 
              -webkit-print-color-adjust: exact !important;
              color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            img { max-width: 100%; }
          }
        </style>
      `);
      
      printWindow.document.write('</head><body>');
      
      // Clone the element and its styles
      const clonedElement = cloneElementWithCSS(selectedElement);
      printWindow.document.write(clonedElement.outerHTML);
      
      printWindow.document.write('</body></html>');
      printWindow.document.close();

      // Wait for resources to load
      printWindow.onload = () => {
        // Print the window
        printWindow.print();
        // Close the window after printing (with a delay to ensure print dialog is handled)
        setTimeout(() => {
          printWindow.close();
        }, 500);
      };

    } catch (error) {
      console.error('Print error:', error);
      alert('An error occurred while preparing to print. Please try again.');
    }
  };

  // Initialize libraries and UI
  loadLibraries().then(() => {
    // Enable print button after libraries are loaded
    document.getElementById('es-print').disabled = false;
  }).catch(error => {
    console.error('Failed to load libraries:', error);
    alert('Failed to load required libraries. Some features may not work.');
  });

  // Load html2canvas from current directory and enable Get Image button
  const loadHtml2Canvas = () => {
    const script = document.createElement('script');
    script.src = chrome.runtime.getURL('html2canvas.min.js');
    
    // Wait for script to load
    script.onload = () => {
      getImageButton.addEventListener('click', () => {
        if (!selectedElement) return;
        html2canvas(selectedElement, {
          useCORS: true,
          allowTaint: true,
          backgroundColor: null
        }).then(canvas => {
          const imageType = imageTypeSelect.value;
          const imageDataUrl = canvas.toDataURL(`image/${imageType}`);
          const link = document.createElement('a');
          link.href = imageDataUrl;
          link.download = `captured-element.${imageType}`;
          link.click();
        });
      });
    };
    document.head.appendChild(script);
  };

  loadHtml2Canvas();

  const previewElement = () => {
    if (!selectedElement) {
      alert('Please select an element first');
      return;
    }
    const clonedElement = cloneElementWithCSS(selectedElement);
    
    // Create and show preview while CSS is loading
    const overlay = document.createElement('div');
    overlay.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;background-color:rgba(0,0,0,0.7);display:flex;justify-content:center;align-items:center;z-index:10001;";
    
    const previewContainer = document.createElement('div');
    previewContainer.style.cssText = "position:relative;background-color:#111827;padding:20px;border-radius:8px;max-height:80%;max-width:80%;overflow:auto;color:#e5e7eb;";
    
    // Create wrapper for content
    const contentWrapper = document.createElement('div');
    contentWrapper.style.cssText = "margin-top: 20px;"; // Space for close button
    
    // Show loading state
    contentWrapper.innerHTML = '<div style="text-align:center;padding:20px;">Loading styles...</div>';
    
    // Add close button
    const closeButton = document.createElement('button');
    closeButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" width="24" height="24">
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>`;
    closeButton.style.cssText = "position:absolute;top:10px;right:10px;background:none;border:none;color:#fff;cursor:pointer;padding:5px;border-radius:4px;display:flex;align-items:center;justify-content:center;z-index:1;";
    
    previewContainer.appendChild(closeButton);
    previewContainer.appendChild(contentWrapper);
    overlay.appendChild(previewContainer);
    
    // Add event listeners
    closeButton.addEventListener('click', (e) => {
      e.stopPropagation();
      document.body.removeChild(overlay);
    });
    closeButton.addEventListener('mouseover', () => closeButton.style.backgroundColor = '#374151');
    closeButton.addEventListener('mouseout', () => closeButton.style.backgroundColor = 'transparent');
    
    document.body.appendChild(overlay);
    
    // Load CSS asynchronously
    getFullCSS().then(css => {
      contentWrapper.innerHTML = `<style>${css}</style>${clonedElement.outerHTML}`;
    }).catch(error => {
      console.warn('Error loading styles:', error);
      // Show content without external styles if there's an error
      contentWrapper.innerHTML = clonedElement.outerHTML;
    });
    
    // Close on overlay click (outside preview container)
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) document.body.removeChild(overlay);
    });
    
    // Prevent closing when clicking inside preview container
    previewContainer.addEventListener('click', (e) => e.stopPropagation());
  };

  // Make modal draggable with mouse and touch support
  const makeModalDraggable = (element, handle) => {
    let isDragging = false, startX, startY, initialRight, initialBottom;
    let lastTouchTime = 0;

    const onDragStart = (clientX, clientY) => {
      isDragging = true;
      startX = clientX;
      startY = clientY;
      const style = window.getComputedStyle(element);
      initialRight = parseInt(style.right, 10);
      initialBottom = parseInt(style.bottom, 10);
      
      // Prevent scrolling while dragging
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    };

    const onDragMove = (clientX, clientY) => {
      if (!isDragging) return;
      
      const dx = clientX - startX;
      const dy = clientY - startY;
      
      // Calculate new position
      const newRight = initialRight - dx;
      const newBottom = initialBottom - dy;
      
      // Add bounds checking to keep modal on screen
      const modalRect = element.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      
      // Keep modal within viewport bounds
      if (newRight >= -modalRect.width/2 && newRight <= viewportWidth - modalRect.width/2) {
        element.style.right = `${newRight}px`;
      }
      if (newBottom >= 0 && newBottom <= viewportHeight - modalRect.height/2) {
        element.style.bottom = `${newBottom}px`;
      }
    };

    const onDragEnd = () => {
      isDragging = false;
      // Restore scrolling
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };

    // Mouse events
    handle.addEventListener('mousedown', (e) => {
      if (e.target.closest('.es-btn')) return;
      e.preventDefault(); // Prevent text selection
      onDragStart(e.clientX, e.clientY);
      document.addEventListener('mousemove', mouseMoveHandler);
      document.addEventListener('mouseup', mouseUpHandler);
    });

    const mouseMoveHandler = (e) => {
      e.preventDefault();
      onDragMove(e.clientX, e.clientY);
    };

    const mouseUpHandler = () => {
      onDragEnd();
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    // Touch events
    handle.addEventListener('touchstart', (e) => {
      if (e.target.closest('.es-btn')) return;
      e.preventDefault();
      const touch = e.touches[0];
      lastTouchTime = Date.now();
      onDragStart(touch.clientX, touch.clientY);
    }, { passive: false });

    handle.addEventListener('touchmove', (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      onDragMove(touch.clientX, touch.clientY);
    }, { passive: false });

    handle.addEventListener('touchend', () => {
      onDragEnd();
      // If this was a quick tap (less than 300ms), treat it as a click
      if (Date.now() - lastTouchTime < 300) {
        handle.click();
      }
    });
  };

  // Event listeners for modal buttons
  document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('es-modal');
    const themeToggle = document.getElementById('es-themeToggle');
    const themeIcon = themeToggle.querySelector('svg');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('es-theme');
    if (savedTheme === 'light') {
      modal.classList.add('light');
      updateThemeIcon(true);
    }

    themeToggle.addEventListener('click', () => {
      const isLight = modal.classList.toggle('light');
      localStorage.setItem('es-theme', isLight ? 'light' : 'dark');
      updateThemeIcon(isLight);
    });

    function updateThemeIcon(isLight) {
      if (isLight) {
        themeIcon.innerHTML = '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>';
      } else {
        themeIcon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>';
      }
    }
  });
  minimizeToggle.addEventListener('click', () => {
    contentArea.style.display = contentArea.style.display === 'none' || !contentArea.style.display ? 'block' : 'none';
  });
  closeButton.addEventListener('click', () => {
    modal.remove();
    stopSelection();
    // Clean up any highlighted elements
    if (highlightedElement) {
      highlightedElement.style.outline = '';
    }
    // Remove any event listeners
    document.removeEventListener('mouseover', highlightElement);
    document.removeEventListener('click', selectElement, true);
  });
  howToUseButton.addEventListener('click', () => window.open('https://peach-relish-f0e.notion.site/Element-Selector-Chrome-Extension-18df8b5be97680aa89feec5cb0833865', '_blank'));
  pickAgainButton.addEventListener('click', () => {
    // Clear current selection but keep selection mode active
    if (highlightedElement) highlightedElement.style.outline = '';
    highlightedElement = null;
    selectedElement = null;
    initialSelectedElement = null;
    selectedElementInput.value = '';
    startSelection();
  });
  previewButton.addEventListener('click', previewElement);
  printButton.addEventListener('click', printElement);
  elementDepthSlider.addEventListener('input', updateSelectedElementInput);

  makeModalDraggable(modal, modalHeader);
  startSelection();

  let isSelecting = false;

  function handleElementSelect(event) {
    if (!isSelecting) return;
    event.preventDefault();
    event.stopPropagation();
    
    const elementDepth = parseInt(document.getElementById('es-elementDepth').value);
    let target = event.target;
    
    // Traverse up the DOM tree based on element depth
    for (let i = 0; i < elementDepth; i++) {
      if (target.parentElement) target = target.parentElement;
    }
    
    // Don't select the modal or its children
    if (target === modal || modal.contains(target)) return;
    
    selectedElement = target;
    document.getElementById('es-selectedElement').value = getElementDescription(target);
    isSelecting = false;
    document.body.style.cursor = 'default';
  }

  function getElementDescription(element) {
    const tag = element.tagName.toLowerCase();
    const id = element.id ? `#${element.id}` : '';
    const classes = Array.from(element.classList).map(c => `.${c}`).join('');
    return `${tag}${id}${classes}`;
  }

  async function captureElement() {
    if (!selectedElement) {
      alert('Please select an element first');
      return;
    }

    // Create loading indicator
    const loadingOverlay = document.createElement('div');
    loadingOverlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 2147483647;
    `;
    const loadingSpinner = document.createElement('div');
    loadingSpinner.style.cssText = `
      width: 40px;
      height: 40px;
      border: 4px solid #f3f3f3;
      border-top: 4px solid #3498db;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    `;
    loadingOverlay.appendChild(loadingSpinner);
    
    // Add keyframes for spinner
    const style = document.createElement('style');
    style.textContent = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(style);

    try {
      document.body.appendChild(loadingOverlay);

      // Clone the element and its computed styles
      const clone = selectedElement.cloneNode(true);
      
      // Create an offscreen container
      const container = document.createElement('div');
      container.style.cssText = `
        position: fixed;
        top: -9999px;
        left: -9999px;
        width: ${selectedElement.offsetWidth}px;
        height: ${selectedElement.offsetHeight}px;
        overflow: hidden;
        pointer-events: none;
      `;
      
      // If preserve CSS is checked, copy computed styles
      if (document.getElementById('es-preserveCss').checked) {
        const computedStyle = window.getComputedStyle(selectedElement);
        
        // Copy only essential styles for printing
        const essentialStyles = [
          'font-family', 'font-size', 'font-weight', 'color',
          'background-color', 'padding', 'margin', 'border',
          'width', 'height', 'display', 'flex-direction',
          'justify-content', 'align-items', 'text-align'
        ];
        
        essentialStyles.forEach(style => {
          clone.style[style] = computedStyle.getPropertyValue(style);
        });
        
        // Handle background images
        if (computedStyle.backgroundImage !== 'none') {
          clone.style.backgroundImage = computedStyle.backgroundImage;
        }
      }

      // Add clone to container
      container.appendChild(clone);
      document.body.appendChild(container);

      // Wait for images to load
      const images = clone.getElementsByTagName('img');
      await Promise.all(Array.from(images).map(img => {
        if (img.complete) return Promise.resolve();
        return new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = resolve; // Continue even if image fails
          // Set timeout for image loading
          setTimeout(resolve, 3000); // 3s timeout
        });
      }));

      // Capture with optimized settings
      const canvas = await html2canvas(clone, {
        allowTaint: true,
        useCORS: true,
        logging: false,
        scale: 2, // Fixed scale for better quality
        backgroundColor: null,
        imageTimeout: 3000, // 3s timeout for images
        removeContainer: true,
        onclone: (clonedDoc) => {
          const clonedElement = clonedDoc.querySelector(getElementDescription(selectedElement));
          if (clonedElement) {
            clonedElement.style.transform = 'none';
            clonedElement.style.margin = '0';
          }
        }
      });

      // Clean up container
      container.remove();

      // Convert to blob with quality settings
      const imageType = document.getElementById('es-imageType').value;
      const blob = await new Promise(resolve => {
        const quality = imageType === 'jpeg' ? 0.95 : undefined;
        canvas.toBlob(resolve, `image/${imageType}`, quality);
      });
      
      // Create object URL
      const url = URL.createObjectURL(blob);

      // Send message to background script
      chrome.runtime.sendMessage({
        action: 'downloadImage',
        url: url,
        filename: `element-${Date.now()}.${imageType}`
      }, (response) => {
        if (chrome.runtime.lastError) {
          console.error('Error sending message:', chrome.runtime.lastError);
          alert('Failed to process image. Please try again.');
        }
      });

    } catch (error) {
      console.error('Error capturing element:', error);
      alert('Failed to capture element. Please try again.');
    } finally {
      // Clean up
      loadingOverlay.remove();
      style.remove();
    }
  }

  // Event listeners
  document.addEventListener('click', handleElementSelect, true);
  
  document.getElementById('es-pickAgain').addEventListener('click', () => {
    isSelecting = true;
    document.body.style.cursor = 'crosshair';
  });

  document.getElementById('es-print').addEventListener('click', async () => {
    const delay = parseInt(document.getElementById('es-printDelay').value) * 1000;
    if (delay > 0) {
      await new Promise(resolve => setTimeout(resolve, delay));
    }
    captureElement();
  });

  // Prevent modal from interfering with page scrolling
  modal.addEventListener('touchmove', (e) => {
    e.stopPropagation();
  }, { passive: true });

  // Improved drag functionality for mobile
  let isDragging = false;
  let currentX;
  let currentY;
  let initialX;
  let initialY;
  let xOffset = 0;
  let yOffset = 0;

  const dragStart = (e) => {
    if (e.type === "touchstart") {
      initialX = e.touches[0].clientX - xOffset;
      initialY = e.touches[0].clientY - yOffset;
    } else {
      initialX = e.clientX - xOffset;
      initialY = e.clientY - yOffset;
    }
    
    if (e.target.closest('#es-header')) {
      isDragging = true;
    }
  };

  const drag = (e) => {
    if (isDragging) {
      e.preventDefault();
      
      if (e.type === "touchmove") {
        currentX = e.touches[0].clientX - initialX;
        currentY = e.touches[0].clientY - initialY;
      } else {
        currentX = e.clientX - initialX;
        currentY = e.clientY - initialY;
      }

      xOffset = currentX;
      yOffset = currentY;

      setTranslate(currentX, currentY, modal);
    }
  };

  const dragEnd = () => {
    isDragging = false;
  };

  const setTranslate = (xPos, yPos, el) => {
    el.style.transform = `translate(${xPos}px, ${yPos}px)`;
  };

  modal.addEventListener("touchstart", dragStart, { passive: true });
  modal.addEventListener("touchend", dragEnd, { passive: true });
  modal.addEventListener("touchmove", drag, { passive: false });
  modal.addEventListener("mousedown", dragStart);
  modal.addEventListener("mouseup", dragEnd);
  modal.addEventListener("mousemove", drag);
})();
