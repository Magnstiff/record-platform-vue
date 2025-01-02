import { queryExe } from "./sql.js";
import { getUuid } from "./utils.js";
import fs from "fs";
import { Buffer } from "buffer";

const dest = "public/photos/";
function submit(req, res) {
  // 处理备案信息
  let data = req.body;
  try {
    queryExe(
      `insert into info (time, location, floor, level, probability) values (now(), '${data.location}', ${data.floor}, ${data.level}, ${data.probability});`,
    );
  } catch (e) {
    console.log("Error:", e);
    res.json({ data: "error" });
  }
  // 处理图片(base64) data.photos
  let photos = data.photos;
  let photoNames = [];
  for (let i = 0; i < photos.length; i++) {
    let base64Data = photos[i].replace(/^data:image\/\w+;base64,/, "");
    let dataBuffer = Buffer.from(base64Data, "base64");
    let UUID = getUuid();
    let photoName = `${UUID}.png`;
    photoNames.push(photoName);
    fs.writeFileSync(dest + photoName, dataBuffer);
    queryExe(
      `insert into photos (id, name) values ((select max(id) from info), '${photoName}');`,
    );
  }
  res.json({ data: "ok" });
}

export { submit };
