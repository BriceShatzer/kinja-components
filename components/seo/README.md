# SEO metadata helpers and components

Components used in kinja-magma that generate metadata tags or in-page markup consumed by search engines, social networks etc.

## Structured Data
An introduction to Structured Data [can be found here](https://developers.google.com/search/docs/guides/intro-structured-data). We-re using the JSON-LD format to mark up content.
The mantle implementation can be found in `LdJson.scala`.

### Testing
There's a [Chrome extension](https://www.3whitehats.co.nz/tools/structured-data-testing-tool-extension.html) that's very useful when testing and debugging both local and production pages, but you can also use Google's own [Structured Data Testing Tool](https://search.google.com/structured-data/testing-tool) if you don't want more bloat on your machine.

If you want to test a page running locally without the extension installed, just curl that page it and paste the output into the 'code snippet' input field of the Google Structured Data Testing Tool.

**TIP:** Piping the output to [pbcopy](http://osxdaily.com/2007/03/05/manipulating-the-clipboard-from-the-command-line/) on a mac will make the page source available on the clipboard after the command runs.
```
$ curl http://gizmodo.localhost:9000/elon-musk-resigns-as-tesla-chairman-must-pay-20-milli-1829417007 | pbcopy
```
