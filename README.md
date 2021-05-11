# Twitter OAuth Signature

This repo contains the Twitter recommended procedure for calculating OAuth signatures from OAuth request parameters. Sample values are from the Twitter docs page on [Authentication for OAuth 1.0a](https://developer.twitter.com/en/docs/authentication/oauth-1-0a/creating-a-signature)

Calculating OAuth signatures can fail as the JavaScript `encodeURIComponent()` function does not adhere to [RFC 3986](https://datatracker.ietf.org/doc/html/rfc3986).

[Mozilla](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent) recommends the following fix:

```javascript
function fixedEncodeURIComponent(str) {
  return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
    return "%" + c.charCodeAt(0).toString(16);
  });
}
```

### Development

Main entry file is:

`.src/index.ts`

To compile and watch for file changes, run:

`npm run-script watch` or `yarn watch`

In a seperate terminal, to start your app, run:

`npm run-script dev` or `yarn dev`
