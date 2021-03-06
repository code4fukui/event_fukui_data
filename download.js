import { CSV } from "https://js.sabae.cc/CSV.js";
import HTMLParser from "https://dev.jspm.io/node-html-parser";

const url = "https://www.fuku-e.com/070_event/";

const escapeURLtoFilename = (url) => {
  return url.replace(/[\?\//:;]/g, "_");
};
const cachedFetch = async (url) => {
  const fn = escapeURLtoFilename(url);
  const dir = "cache/";
  try {
    await Deno.mkdir(dir);
  } catch (e) {
  }
  try {
    const txt = await Deno.readTextFile(dir + fn);
    return txt;
  } catch (e) {
  }
  const txt = await (await fetch(url)).text();
  await Deno.writeTextFile(dir + fn, txt);
  return txt;
};

//const txt = await (await fetch(url)).text();
const txt = await cachedFetch(url);
//console.log(txt);
//await Deno.writeTextFile("cache/index.html", txt);
//const txt = await Deno.readTextFile("cache/index.html");

const dom = HTMLParser.parse(txt);

const showSummary = (dom) => {
  const para = dom.querySelectorAll(".ParagraphGroup");
  for (const p of para) {
    //console.log(p);
    console.log(p.querySelector("a").attributes.href);
    const id = p.querySelector("a").attributes.href.match(/,(\d+)\);/)[1];
    const img = p.querySelector(".Image img").attributes.src;
    const title = p.querySelector(".Heading").text.trim();
    const other = p.querySelector(".OtherText").text;
    const description = p.querySelector(".DefaultText").text;
    console.log({ id, img, title, other, description });
  }
};

const getActiveIDs = (dom) => {
  const res = [];
  const para = dom.querySelectorAll(".ParagraphGroup");
  for (const p of para) {
    const id = p.querySelector("a").attributes.href.match(/,(\d+)\);/)[1];
    res.push(id);
  }
  return res;
};

const ids = getActiveIDs(dom);
const data = [];
for (const id of ids) {
  const url = "https://www.fuku-e.com/070_event/?i=" + id;
  const txt = await cachedFetch(url);
  const dom = HTMLParser.parse(txt);
  const d = {};
  d["schema:url"] = url;
  const metas = dom.querySelectorAll("meta");
  const metamap = {
    //"description": "schema:description",
    "og:title": "schema:name",
    //"og:image": "thumbnail", // same as img
    //"keywords": "keywords", // same as description
  };
  for (const map in metamap) {
    const meta = metas.find(m => m.attributes.property == map || m.attributes.name == map);
    if (meta) {
      d[metamap[map]] = meta.attributes.content;
    }
  }
  d.id = id;
  d["schema:description"] = dom.querySelector(".ParagraphContents .DefaultText").text;
  const img = dom.querySelector(".ParagraphContents .LargeImage img");
  d["schema:image"] = img ? "https://www.fuku-e.com/" + img.attributes.src.substring(3) : "";
  const trs = dom.querySelectorAll(".DefaultTable tr");
  const namemap = {
    "????????????": "schema:duration",
    "????????????": "schema:location",
    "??????": "schema:price",
    "?????????????????????": "schema:attendee",
    "E?????????": "schema:email",
    "????????????": "schema:telephone",
  };
  for (const tr of trs) {
    const name = tr.querySelector("th").text;
    const val = tr.querySelector("td").text;
    const name2 = namemap[name];
    if (!name2) {
      throw new Error("not found: " + name);
    }
    d[name2] = val;
  }

  const map2basereg = (d) => {
    const map = {
      "id": "ic:ID",
      "schema:name": "???????????????",
      "schema:image": "ic:??????",
      "schema:description": "??????",
      "schema:price": "??????",
      "schema:duration": "????????????",
      "schema:location": "????????????",
      "schema:attendee": "???????????????",
      "schema:telephone": "?????????????????????",
      "schema:email": "??????????????????????????????",
      "schema:url": "ic:??????",
    };
    const d2 = {};
    Object.keys(d).forEach(key => {
      const key2 = map[key];
      if (!key2) {
        throw new Error("not found: " + key);
      }
      d2[key2] = d[key];
    });
    return d2;
  };
  const d2 = map2basereg(d);
  data.push(d2);
  console.log(d2);
}

await Deno.writeTextFile("data/event_fukuidotcom.csv", CSV.stringify(data));

const d2 = CSV.toJSON(await CSV.fetch("data/event_code4fukui.csv"));
console.log(d2);
const data2 = [];
d2.forEach(d => data2.push(d));
data.forEach(d => data2.push(d));
await Deno.writeTextFile("data/event_fukui.csv", CSV.stringify(data2));
