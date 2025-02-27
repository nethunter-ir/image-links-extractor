document.addEventListener("DOMContentLoaded", () => {
  const textarea = document.getElementById("image-links");
  const copyButton = document.getElementById("copy-button");
  const message = document.getElementById("message");

  // Send a message to the content script to collect image links
  browser.tabs.executeScript({ 
    code: `
      Array.from(document.images)
        .map(img => img.src)
        .filter(src => /\.(jpg|png|webp)$/i.test(src))
    `
  }).then(results => {
    // Display the links in the textarea
    const links = results[0] || [];
    textarea.value = links.join("\n"); // Use newline to separate links
  }).catch(error => {
    console.error("Error extracting image links:", error);
    textarea.value = "Error extracting links.";
  });

  // Copy the links to the clipboard
  copyButton.addEventListener("click", () => {
    textarea.select();
    document.execCommand("copy");

    // Show a temporary message
    message.style.display = "block";
    setTimeout(() => {
      message.style.display = "none"; // Hide the message after 2 seconds
    }, 2000);
  });
});
