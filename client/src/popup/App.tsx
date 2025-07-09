import { useState } from "react";
import axios from "axios";

function App() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleClick = async () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs: chrome.tabs.Tab[]) => {
      if (!tabs[0].id) return;

      const tabId = tabs[0].id as number; 

      chrome.tabs.sendMessage(
        tabs[0].id,
        { type: "simplify" },
        async (response: { text: string }) => {
          if (!response?.text) {
            setText("Please select some text first.");
            return;
          }

          try {
            setLoading(true);
            setError("");

            const result = await axios.post(
              "http://127.0.0.1:5000/simplify",
              { text: response.text },
              { headers: { "Content-Type": "application/json" } }
            );

            setText(result.data.simplified);
            console.log(result.data);

            // 👇 Send simplified text back to content script to replace selection
            chrome.tabs.sendMessage(tabId, {
              type: "replace",
              text: result.data.simplified,
            });
          } catch (error) {
            console.error("Request failed:", error);
            setError("Error simplifying text.");
          } finally {
            setLoading(false);
          }
        }
      );
    });
  };

  const handleClickTranslate = async () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs: chrome.tabs.Tab[]) => {
      if (!tabs[0].id) return;

      const tabId = tabs[0].id as number; 

      chrome.tabs.sendMessage(
        tabs[0].id,
        { type: "simplify" },
        async (response: { text: string }) => {
          if (!response?.text) {
            setText("Please select some text first.");
            return;
          }

          try {
            setLoading(true);
            setError("");

            const result = await axios.post(
              "http://127.0.0.1:5000/translate",
              { text: response.text },
              { headers: { "Content-Type": "application/json" } }
            );

            setText(result.data.translated);
            console.log(result.data);

            // 👇 Send simplified text back to content script to replace selection
            chrome.tabs.sendMessage(tabId, {
              type: "replace",
              text: result.data.translated,
            });
          } catch (error) {
            console.error("Request failed:", error);
            setError("Error translated text.");
          } finally {
            setLoading(false);
          }
        }
      );
    });
  };

  return (
    <div className="p-4 w-80 bg-white shadow rounded">
      <button onClick={handleClick} className="m-4 bg-slate-600 text-white px-4 py-2 rounded">
        Simplify
      </button>
      <button onClick={handleClickTranslate} className="m-4 bg-slate-600 text-white px-4 py-2 rounded">
        Translate
      </button>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <p className="">{text}</p>
    </div>
  );
}

export default App;
