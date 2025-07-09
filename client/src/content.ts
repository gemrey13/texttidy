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
        range.deleteContents();
        range.insertNode(document.createTextNode(message.text));
      }
    }

    return false;
  }
);
