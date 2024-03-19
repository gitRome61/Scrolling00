// Array contenente i percorsi delle immagini da precaricare
const imagePaths = [
  'images/pippo0.jpg',
  'images/pippo1.jpg',
  'images/pippo2.jpg',
  'images/pippo3.jpg',
  'images/pippo4.jpg',
  'images/pippo5.jpg'
];

// Funzione per precaricare le immagini
function preloadImages(paths) {
  paths.forEach(path => {
    const img = new Image();
    img.src = path;
  });
}

// Chiamata alla funzione preloadImages per avviare il preload delle immagini
preloadImages(imagePaths);

// Global variables
var inner;       // var globale, è l'oggetto generato dal tag del testo scorrevole definito in html
var outer_width; // var globale, larghezza del div contenitore del testo scorrevole
var content_w;   // Actual width of the inner division (content)

// Initialize scroller
function initScroller() {
  // Get inner and outer divs
  inner = document.getElementById('scrollContent'); // testo con id=scrollContent nel div html
  var outer = document.getElementById('scrollBox'); //oggetto generato dal div che contiene il testo scorrevole definito in html

  inner.style.right = '0';          // Set initial position of inner div
  outer_width = outer.offsetWidth;  // Get width of outer div

  content_w = getTextWidth(inner.textContent); // or inner.innerText

  console.log("outer_width:", outer_width, ", content_w:", content_w)

  // Start scrolling animation
  setInterval(function () { scroll(1); }, 9); // Reduced time interval for smoother scrolling

  // Add event listener for window resize
  window.addEventListener('resize', handleResize);

}

// Function to handle window resize event
function handleResize() {
  // Refresh the page
  location.reload();
}

// Function to perform scrolling
function scroll(step) {
  inner.style.right = (parseInt(inner.style.right) + step) + 'px';

  if (parseInt(inner.style.right) >= (content_w)) {
    inner.style.right = -(outer_width) + 'px'; // Reset position to left of outer box
  }
}

// Function to get text width
function getTextWidth(text) {// Create a temporary span element
  var tempSpan = document.createElement('span'); // Set the text content
  tempSpan.textContent = text; // Set style to ensure it doesn't affect layout
  tempSpan.style.visibility = 'hidden';
  tempSpan.style.position = 'absolute';
  tempSpan.style.whiteSpace = 'nowrap';
  tempSpan.style.fontFamily = "'Roboto', sans-serif";
  tempSpan.style.fontSize = '1.3rem';
  document.body.appendChild(tempSpan);   // Append to body to get computed width
  var width = tempSpan.offsetWidth;   // Get the width
  document.body.removeChild(tempSpan); // Remove the temporary element
  return width; // Return the width
}


// Initialize scroller when the page loads
window.onload = function () {
  initScroller();
};