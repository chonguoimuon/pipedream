import bingx from "../../bingx.app.mjs";

export default {
  name: "BingX Trade NewOrder",
  version: "0.0.3",
  key: "bingx-trade-new-order",
  description: "Place a New Order [reference](https://bingx-api.github.io/docs/swap/trade-api.html#_1-place-a-new-order).",
  props: {
    bingx,
    symbol: {
      propDefinition: [
        bingx,
        "symbol",
      ],
    },
    side: {
      propDefinition: [
        bingx,
        "side",
      ],
    },
    entrustPrice: {
      propDefinition: [
        bingx,
        "entrustPrice",
      ],
    },
    entrustVolume: {
      propDefinition: [
        bingx,
        "entrustVolume",
      ],
    },
    takerProfitPrice: {
      propDefinition: [
        bingx,
        "takerProfitPrice",
      ],
    },
    stopLossPrice: {
      propDefinition: [
        bingx,
        "stopLossPrice",
      ],
    },
    tradeType: {
      propDefinition: [
        bingx,
        "tradeType",
      ],
    },
    action: {
      propDefinition: [
        bingx,
        "action",
      ],
    },

  },
  type: "action",
  methods: {},
  async run({ $ }) {
    let tpPrice = this.takerProfitPrice;
    let slPrice = this.stopLossPrice;
    const API_METHOD = "POST";
    const API_PATH = "/api/v1/user/trade";
    const parameters = {
      "symbol": this.symbol,
      "side": this.side,
      "entrustPrice": this.bingx.convertToFloat(this.entrustPrice),
      "entrustVolume": this.bingx.convertToFloat(this.entrustVolume),
      "tradeType": this.tradeType,
      "action": this.action,
    };
    if (!tpPrice)
      parameters = {
        "symbol": this.symbol,
        "side": this.side,
        "entrustPrice": this.bingx.convertToFloat(this.entrustPrice),
        "entrustVolume": this.bingx.convertToFloat(this.entrustVolume),
        "tradeType": this.tradeType,
        "action": this.action,
        "takerProfitPrice": this.bingx.convertToFloat(this.takerProfitPrice),
      };
    if (!slPrice)
      parameters = {
        "symbol": this.symbol,
        "side": this.side,
        "entrustPrice": this.bingx.convertToFloat(this.entrustPrice),
        "entrustVolume": this.bingx.convertToFloat(this.entrustVolume),
        "tradeType": this.tradeType,
        "action": this.action,
        "stopLossPrice": this.bingx.convertToFloat(this.stopLossPrice),
      };   
    if (!tpPrice && !slPrice)
      parameters = {
        "symbol": this.symbol,
        "side": this.side,
        "entrustPrice": this.bingx.convertToFloat(this.entrustPrice),
        "entrustVolume": this.bingx.convertToFloat(this.entrustVolume),
        "tradeType": this.tradeType,
        "action": this.action,
        "takerProfitPrice": this.bingx.convertToFloat(this.takerProfitPrice),
        "stopLossPrice": this.bingx.convertToFloat(this.stopLossPrice),
      };         
    let returnValue = await this.bingx.makeRequest(API_METHOD, API_PATH, parameters);
    $.export("$summary", `New Future Order for ${this.symbol}`);
    return returnValue;
  },
};
