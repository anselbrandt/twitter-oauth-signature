// https://developer.twitter.com/en/docs/authentication/oauth-1-0a/creating-a-signature

import crypto from "crypto";

function fixedEncodeURIComponent(str: string) {
  return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
    return "%" + c.charCodeAt(0).toString(16);
  });
}

const consumerSecret = "kAcSOqF21Fu85e7zjz7ZN2U4ZRhfV3WpwPAoE3Z7kBw";
const oauthTokenSecret = "LswwdoUaIvS8ltyTt5jkRh4J50vUPVVHtR2YPi5kE";

async function main() {
  const method = "POST";
  const baseURL = "https://api.twitter.com/1.1/statuses/update.json";

  const params = {
    status: `Hello Ladies + Gentlemen, a signed OAuth request!`,
    include_entities: true,
    oauth_consumer_key: "xvz1evFS4wEEPTGEFPHBog",
    oauth_nonce: "kYjzVBB8Y0ZFabxSWbWovY3uYSQ2pTgmZeNu2VS4cg",
    oauth_signature_method: "HMAC-SHA1",
    oauth_timestamp: "1318622958",
    oauth_token: "370773112-GmHxMAgYyLbNEtIKZeRNFsMKPR9EyMZeS9weJAEb",
    oauth_version: "1.0",
  };

  const paramString = Object.entries(params)
    .map(([k, v]: [any, any]) => [
      fixedEncodeURIComponent(k),
      fixedEncodeURIComponent(v),
    ])
    .sort()
    .map((entry) => entry.join("="))
    .join("&");

  const baseString = `${method}&${fixedEncodeURIComponent(
    baseURL
  )}&${fixedEncodeURIComponent(paramString)}`;

  const signingKey = `${fixedEncodeURIComponent(
    consumerSecret
  )}&${fixedEncodeURIComponent(oauthTokenSecret)}`;

  const signature = crypto
    .createHmac("sha1", signingKey)
    .update(baseString)
    .digest("base64");

  const expectedParamString = `include_entities=true&oauth_consumer_key=xvz1evFS4wEEPTGEFPHBog&oauth_nonce=kYjzVBB8Y0ZFabxSWbWovY3uYSQ2pTgmZeNu2VS4cg&oauth_signature_method=HMAC-SHA1&oauth_timestamp=1318622958&oauth_token=370773112-GmHxMAgYyLbNEtIKZeRNFsMKPR9EyMZeS9weJAEb&oauth_version=1.0&status=Hello%20Ladies%20%2B%20Gentlemen%2C%20a%20signed%20OAuth%20request%21`;
  const expectedBaseString = `POST&https%3A%2F%2Fapi.twitter.com%2F1.1%2Fstatuses%2Fupdate.json&include_entities%3Dtrue%26oauth_consumer_key%3Dxvz1evFS4wEEPTGEFPHBog%26oauth_nonce%3DkYjzVBB8Y0ZFabxSWbWovY3uYSQ2pTgmZeNu2VS4cg%26oauth_signature_method%3DHMAC-SHA1%26oauth_timestamp%3D1318622958%26oauth_token%3D370773112-GmHxMAgYyLbNEtIKZeRNFsMKPR9EyMZeS9weJAEb%26oauth_version%3D1.0%26status%3DHello%2520Ladies%2520%252B%2520Gentlemen%252C%2520a%2520signed%2520OAuth%2520request%2521`;
  const expectedSigningKey = `kAcSOqF21Fu85e7zjz7ZN2U4ZRhfV3WpwPAoE3Z7kBw&LswwdoUaIvS8ltyTt5jkRh4J50vUPVVHtR2YPi5kE`;
  const expectedSignature = `hCtSmYh+iHYCEqBWrE7C7hYmtUk=`;

  const tests = [
    ["Param string", paramString, expectedParamString],
    ["Base string ", baseString, expectedBaseString],
    ["Signing key ", signingKey, expectedSigningKey],
    ["Signature   ", signature, expectedSignature],
  ].map(([testName, calculated, expected]) =>
    calculated === expected ? `${testName}: passed` : `${testName}: failed`
  );
  tests.forEach((test) => console.log(test));
}

main().catch((error) => console.error(error));
