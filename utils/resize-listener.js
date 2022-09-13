class ResizeListener {
  constructor() {
    this.resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.contentRect && entry.contentRect.height) {
          window.parent.postMessage({
            type: 'frame-height',
            height: entry.contentRect.height,
          }, '*');
        }
      });
    });

    this.mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (!mutation.addedNodes) return;

        if (mutation.target && this.isValidNode(mutation.target)) {
          this.subscribe(mutation.target);
          return;
        }

        mutation.addedNodes.forEach((node) => {
          if (this.isValidNode(node)) {
            this.subscribe(node);
          }
        });
      });
    });
  }

  isValidNode(node) {
    return node.classList && node.classList.contains('content');
  }

  subscribe(node) {
    this.mutationObserver.disconnect();
    // eslint-disable-next-line no-param-reassign
    node.style.alignSelf = 'flex-start';
    this.resizeObserver.observe(node);
  }

  listen() {
    this.mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: false,
      characterData: false,
    });
  }
}

const listener = new ResizeListener();
listener.listen();
