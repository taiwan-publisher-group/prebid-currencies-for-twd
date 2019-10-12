import * as request from "request-promise";
import { promises } from "fs";

const path = "docs/latest.json";

request("https://rate.bot.com.tw/xrt/flcsv/0/day")
  .then(body => {
    const usdInfo = body.split(/\r?\n/)[1];
    return {
      dataAsOf: new Date().toLocaleDateString(),
      conversions: { USD: { TWD: usdInfo.split(",")[3] } }
    };
  })
  .then(data => promises.writeFile(path, JSON.stringify(data)));
