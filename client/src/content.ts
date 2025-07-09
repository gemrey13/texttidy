chrome.runtime.onMessage.addListener(
  (
    message: { type: string; text?: string },
    _,
    sendResponse: (response: any) => void
  ) => {
    if (message.type === "simplify") {
      const selected = window.getSelection()?.toString() || "";
      sendResponse({ text: selected });
    }

    if (message.type === "replace" && message.text) {
      const selection = window.getSelection();
      if (selection?.rangeCount) {
        const range = selection.getRangeAt(0);
        const node = range.startContainer;

        if (node.nodeType === Node.TEXT_NODE) {
          // ✅ Replace only the selected part of the text node
          const originalText = node.textContent || "";
          const startOffset = range.startOffset;
          const endOffset = range.endOffset;

          const newText =
            originalText.slice(0, startOffset) +
            message.text +
            originalText.slice(endOffset);

          (node as Text).textContent = newText;
        }
      }
    }

    return false;
  }
);
