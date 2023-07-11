async function readClipboard(): Promise<string> {
  if ("clipboard" in navigator) {
    try {
      const text = await navigator.clipboard.readText();
      return await text;
    } catch (error) {
      console.error(error);
    }
  } else {
    // Use the fallback method with document.execCommand
    const textarea = document.createElement("textarea");
    document.body.appendChild(textarea);
    textarea.select();
    try {
      const result = document.execCommand("paste");
      if (result) {
        const text = textarea.value;
        return text;
      } else {
        console.error("Unable to paste from clipboard");
      }
    } catch (error) {
      console.error(error);
    }
    document.body.removeChild(textarea);
  }
  return "";
}

export default readClipboard;
