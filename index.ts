const express = require("express");

const app = express();

app.get("/", (req, res) => {
  // Generate a unique nonce
  const nonce = "random-nonce";

  // Set CSP header with the nonce
  res.setHeader(
    "Content-Security-Policy",
    `default-src 'self'; script-src 'self' 'nonce-${nonce}'; style-src 'self' 'nonce-${nonce}';`
  );

  // Return HTML with the nonce applied
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Secure CSP with Nonce</title>
        <script nonce="${nonce}">
          const nonce = document.currentScript.nonce;
          // Set styles dynamically with nonce
          const style = document.createElement('style');
          style.setAttribute('nonce', nonce);
          style.textContent = 'body { background-color: lightblue; font-family: Arial; }';
          document.head.appendChild(style);
        </script>
      </head>
      <body>
        <h1>Welcome to a Secure CSP Example</h1>
      </body>
    </html>
  `);
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
