import * as request from 'request-promise';
import * as fs from "fs";

exports.helloPubSub = () => {
    request('https://rate.bot.com.tw/xrt/flcsv/0/day').then((body) => {
        const usdInfo = body.split(/\r?\n/)[1];
        const data = {dataAsOf: new Date().toLocaleDateString(), conversions: {USD: {TWD: usdInfo.split(',')[2]}}};
        fs.writeFileSync("latest.json", JSON.stringify(data));
    })
};

exports.helloPubSub();