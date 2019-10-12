# Prebid.js 台幣匯率 API

提供台灣的媒體們可以使用的 Prebid.js 即時匯率資訊。

## 緣由

Prebid.js 所支援的 bidder 多數是以美金計價，然而：

1. 若串接的 Google Ad Manager 設定採用新台幣計價，且不支援多重幣別功能
2. 或是 bidder 中有混合使用台幣與美金計價的 bidder

以上任一情形發生，都需要進行 client-side 的匯率轉換。

然而，Prebid.js 官方的[匯率轉換模組](http://prebid.org/dev-docs/modules/currency.html)及其所提供的 [API](https://currency.prebid.org/latest.json) 並[不支援新台幣](https://github.com/prebid/currency-file-generator/pull/6)。

## 資料與更新週期

目前本份資料包含了美元轉新台幣的匯率資料，每日透過 [GitHub Actions](https://github.com/features/actions) 自動更新，並放在 [GitHub Pages](https://pages.github.com/) 上。

資料來源：[台灣銀行牌告匯率](https://rate.bot.com.tw/xrt?Lang=zh-TW)

## 使用方式

請參考 Prebid.js [官方文件](http://prebid.org/dev-docs/modules/currency.html)，並於其設定當中填上：

```js
{
  currency: {
    adServerCurrency: 'TWD',
    conversionRateFile: 'https://cdn.jsdelivr.net/gh/taiwan-publisher-group/prebid-currencies-for-twd/docs/latest.json'
  }
}
```

## 授權

本專案程式碼以 MIT 授權釋出，詳情請參考 `LICENSE` 檔案。
