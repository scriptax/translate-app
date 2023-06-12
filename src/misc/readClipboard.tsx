async function readClipboard(): Promise<string> {
  // Define a function that handles the button click

  // Check if the browser supports the Clipboard API
  if ("clipboard" in navigator) {
    // Try to get the text from the clipboard
    try {
      // Use the readText method to get the text as a promise
      const text = await navigator.clipboard.readText();
      // Set the state with the text value
      return await text;
    } catch (error) {
      // Handle any errors
      console.error(error);
    }
  } else {
    // Use the fallback method with document.execCommand
    // Create a temporary textarea element
    const textarea = document.createElement("textarea");
    // Append it to the document body
    document.body.appendChild(textarea);
    // Select the textarea content
    textarea.select();
    // Try to execute the paste command
    try {
      // Use document.execCommand('paste') to paste the text
      const result = document.execCommand("paste");
      // Check if the command was successful
      if (result) {
        // Get the textarea value
        const text = textarea.value;
        // Set the state with the text value
        return text;
      } else {
        // Handle unsuccessful command
        console.error("Unable to paste from clipboard");
      }
    } catch (error) {
      // Handle any errors
      console.error(error);
    }
    // Remove the textarea element from the document body
    document.body.removeChild(textarea);
  }
  return "";
}

export default readClipboard;
