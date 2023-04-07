# ChatGPT-Batea

ChatGPT-Batea allows you to strip away all the extraneous stuff from your ChatGPT conversation window, so that you can save it as a clean single page screenshot (using Firefox's screenshot capability or something similar for other browsers) and share it with anyone.

## Usage

To use the bookmarklet, simply drag the following link to your bookmarks bar (which won't appear as a link on `www.github.com` due to security concerns):

[ChatGPT Batea](javascript:document%0A%20%20.querySelectorAll%28&#39;.overflow-hidden&#39;%29%0A%20%20.forEach%28%28el%29%20%3D%3E%20%7B%0A%20%20%20%20el.className%20%3D%20el.className.replace%28%2F%5Cboverflow-hidden%5Cb%2Fg%2C%20&#39;&#39;%29%3B%0A%20%20%7D%29%3B%0A%0Adocument%0A%20%20.querySelectorAll%28&#39;.absolute&#39;%29%0A%20%20.forEach%28%28el%29%20%3D%3E%20%7B%0A%20%20%20%20el.className%20%3D%20el.className.replace%28%2F%5Cbabsolute%5Cb%2Fg%2C%20&#39;&#39;%29%3B%0A%20%20%7D%29%3B%0A%0Adocument.querySelectorAll%28&#39;nav&#39;%29.forEach%28%28el%29%20%3D%3E%20%7B%0A%20%20el.closest%28&#39;.bg-gray-900&#39;%29.remove%28%29%3B%0A%7D%29%3B%0A%0Adocument.querySelectorAll%28&#39;form&#39;%29.forEach%28%28el%29%20%3D%3E%20%7B%0A%20%20el.remove%28%29%3B%0A%7D%29%3B%0A)

## Building

To build the bookmarklet, run the following command:

```npm run build```

To generate a `README.md` file with an embedded link to the bookmarklet, run the following command instead:

```npm run build-readme```