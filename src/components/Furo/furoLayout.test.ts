import { describe, expect, it } from "vitest";
import {
  HaiKind,
  MentsuType,
  FuroType,
  Tacha,
  type CompletedMentsu,
  type Furo,
} from "@pai-forge/riichi-mahjong";
import { getRotatedHaiIndex, isAnkan, NO_ROTATED_INDEX } from "./furoLayout";

describe("getRotatedHaiIndex", () => {
  it("上家（左）からの鳴きは左端(0)を横向きにする", () => {
    const furo: Furo = { type: FuroType.Chi, from: Tacha.Kamicha };
    expect(getRotatedHaiIndex(furo, 3)).toBe(0);
  });

  it("対面からの鳴きは中央(1)を横向きにする", () => {
    const furo: Furo = { type: FuroType.Pon, from: Tacha.Toimen };
    expect(getRotatedHaiIndex(furo, 3)).toBe(1);
  });

  it("下家（右）からの鳴きは右端(末尾)を横向きにする", () => {
    const furo: Furo = { type: FuroType.Daiminkan, from: Tacha.Shimocha };
    expect(getRotatedHaiIndex(furo, 4)).toBe(3);
  });

  it("副露情報が無い場合は横向き牌なし", () => {
    expect(getRotatedHaiIndex(undefined, 4)).toBe(NO_ROTATED_INDEX);
  });
});

describe("isAnkan", () => {
  const kantsu: CompletedMentsu = {
    type: MentsuType.Kantsu,
    hais: [HaiKind.Hatsu, HaiKind.Hatsu, HaiKind.Hatsu, HaiKind.Hatsu],
  };

  it("カンツかつ副露情報なしは暗槓", () => {
    expect(isAnkan(kantsu, undefined)).toBe(true);
  });

  it("加槓は明槓なので暗槓ではない", () => {
    const furo: Furo = { type: FuroType.Kakan, from: Tacha.Toimen };
    expect(isAnkan(kantsu, furo)).toBe(false);
  });

  it("大明槓は明槓なので暗槓ではない", () => {
    const furo: Furo = { type: FuroType.Daiminkan, from: Tacha.Shimocha };
    expect(isAnkan(kantsu, furo)).toBe(false);
  });

  it("カンツ以外は暗槓ではない", () => {
    const koutsu: CompletedMentsu = {
      type: MentsuType.Koutsu,
      hais: [HaiKind.Chun, HaiKind.Chun, HaiKind.Chun],
    };
    expect(isAnkan(koutsu, undefined)).toBe(false);
  });
});
