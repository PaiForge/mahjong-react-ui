import { describe, expect, it } from "vitest";
import { HaiKind } from "@pai-forge/riichi-mahjong";
import { getHaiName } from "./haiKind";

describe("getHaiName", () => {
  it("数牌は漢数字と色の接尾辞で表す", () => {
    expect(getHaiName(HaiKind.ManZu1)).toBe("一萬");
    expect(getHaiName(HaiKind.PinZu5)).toBe("五筒");
    expect(getHaiName(HaiKind.SouZu9)).toBe("九索");
  });

  it("字牌はその名前を返す", () => {
    expect(getHaiName(HaiKind.Ton)).toBe("東");
    expect(getHaiName(HaiKind.Haku)).toBe("白");
    expect(getHaiName(HaiKind.Chun)).toBe("中");
  });
});
