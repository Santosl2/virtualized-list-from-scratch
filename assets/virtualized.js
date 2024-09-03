const container = document.getElementById("container");
const viewport = document.getElementById("viewport");

const itemHeight = 50; // Height of each item
const bufferSize = 20; // Number of items to render above and below the visible area
const numberOfItems = 100000; // Total number of items

console.log("Renderizando", numberOfItems, "itens");
let startIndex = 0;

function renderItems(startIndex, endIndex) {
  viewport.innerHTML = ""; // Clear the viewport
  for (let i = startIndex; i < endIndex; i++) {
    const item = document.createElement("div");
    item.className = "item";
    item.textContent = `Item ${i + 1}`;
    viewport.appendChild(item);
  }
  viewport.style.transform = `translateY(${startIndex * itemHeight}px)`;
}

function onScroll(e) {
  const scrollTop = container.scrollTop;
  const startIndex = Math.max(
    Math.floor(scrollTop / itemHeight) - bufferSize,
    0
  );
  const endIndex = Math.min(
    startIndex +
      bufferSize * 2 +
      Math.ceil(container.clientHeight / itemHeight),
    numberOfItems
  );

  renderItems(startIndex, endIndex);
}

container.addEventListener("scroll", onScroll);

onScroll();
