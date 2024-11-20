# CSP Inline Styles Issue Workaround POC

From a developer perspective there is currently an issue with CSPs with regard to setting styles inline via `document.head.appendChild(style)`.
This repository arised from a discussion here: <https://github.com/guilhermerodz/input-otp/issues/48>

## How to reproduce?

1. Implement a basic CSP policy such as `default-src 'self'; script-src 'self' 'nonce-${nonce}'; style-src 'self' 'nonce-${nonce}';`
2. Embed trusted script with nonce into the HTML, that dynamically writes a stylesheet to the document via `document.head.appendChild(style)`
3. This will fail with the error message below! As the inserted style sheet does not satisfy the CSP rule, because it is missing the required nonce! However as suggested [here](https://github.com/w3c/webappsec-csp/issues/399), it feels very natural to trust stylesheets that were embedded by trusted scripts.

```console
Refused to apply inline style because it violates the following Content Security Policy directive: "style-src 'self' 'nonce-random-nonce'". Either the 'unsafe-inline' keyword, a hash ('sha256-vZTKCH86gFqkPdnOAj3uzrfCytC5X7h6ODG286QQdhk='), or a nonce ('nonce-...') is required to enable inline execution.
```

As this is currently not possible I created a POC that shows how to transfer the trust of the script to the embedded stylesheets by doing

```javascript
const nonce = document.currentScript.nonce;
const style = document.createElement("style");
style.setAttribute("nonce", nonce);
```
