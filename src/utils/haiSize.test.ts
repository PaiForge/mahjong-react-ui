import { describe, expect, it } from "vitest";
import { getHaiSizePixels, getOrientedHaiSizePixels } from "./haiSize";

describe("getOrientedHaiSizePixels", () => {
  it("非回転時は元の寸法をそのまま返す", () => {
    expect(getOrientedHaiSizePixels("md", false)).toEqual(
      getHaiSizePixels("md"),
    );
  });

  it("回転時は幅と高さを入れ替える", () => {
    const { width, height } = getHaiSizePixels("md");
    expect(getOrientedHaiSizePixels("md", true)).toEqual({
      width: height,
      height: width,
    });
  });
});
