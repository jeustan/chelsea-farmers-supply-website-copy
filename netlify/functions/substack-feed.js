// netlify/functions/substack-feed.js
const FEED_URL = "https://chelseafarmerssupply.substack.com/feed";

exports.handler = async () => {
  const res = await fetch(FEED_URL);
  const xml = await res.text();
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xml, "text/xml");

  return {
    statusCode: res.status,
    headers: {
      "content-type": "text/xml; charset=utf-8",
    },
    body: xml,
  };
};