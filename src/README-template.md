# ChatGPT-Batea

ChatGPT-Batea allows you to strip away all the extraneous stuff from your ChatGPT conversation window, so that you can save it as a clean single page screenshot (using Firefox's screenshot capability or something similar for other browsers) and share it with anyone.

## Usage

To use the bookmarklet, simply drag the following link to your bookmarks bar (which won't appear as a link on `www.github.com` due to security concerns):

[ChatGPT Batea]({{ BookmarkletLink }})

I like to use https://github.com/gildas-lormeau/SingleFile to save the results. Note that with this bookmarklet, you will need to refresh if you want to be able to continue the conversation.

## Building

To build the bookmarklet, run the following command:

```npm run build```

To generate a `README.md` file with an embedded link to the bookmarklet, run the following command instead:

```npm run build-readme```