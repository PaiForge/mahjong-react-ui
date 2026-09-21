import { HaiKind, type HaiKindId } from "@pai-forge/riichi-mahjong";

// 萬子
import Man1 from "./Man1.png";
import Man2 from "./Man2.png";
import Man3 from "./Man3.png";
import Man4 from "./Man4.png";
import Man5 from "./Man5.png";
import Man6 from "./Man6.png";
import Man7 from "./Man7.png";
import Man8 from "./Man8.png";
import Man9 from "./Man9.png";

// 筒子
import Pin1 from "./Pin1.png";
import Pin2 from "./Pin2.png";
import Pin3 from "./Pin3.png";
import Pin4 from "./Pin4.png";
import Pin5 from "./Pin5.png";
import Pin6 from "./Pin6.png";
import Pin7 from "./Pin7.png";
import Pin8 from "./Pin8.png";
import Pin9 from "./Pin9.png";

// 索子
import Sou1 from "./Sou1.png";
import Sou2 from "./Sou2.png";
import Sou3 from "./Sou3.png";
import Sou4 from "./Sou4.png";
import Sou5 from "./Sou5.png";
import Sou6 from "./Sou6.png";
import Sou7 from "./Sou7.png";
import Sou8 from "./Sou8.png";
import Sou9 from "./Sou9.png";

// 字牌
import Ton from "./Ton.png";
import Nan from "./Nan.png";
import Shaa from "./Shaa.png";
import Pei from "./Pei.png";
import Haku from "./Haku.png";
import Hatsu from "./Hatsu.png";
import Chun from "./Chun.png";

// 裏面
import Back from "./Back.png";

/** 画像を持つ牌の種類。34 種の牌に裏面（`"back"`）を加えたもの */
export type TileImageKind = HaiKindId | "back";

/** 同梱画像（ビルド時に base64 の data URI へ埋め込まれる） */
const bundledTileImageMap: Record<TileImageKind, string> = {
  // 萬子
  [HaiKind.ManZu1]: Man1,
  [HaiKind.ManZu2]: Man2,
  [HaiKind.ManZu3]: Man3,
  [HaiKind.ManZu4]: Man4,
  [HaiKind.ManZu5]: Man5,
  [HaiKind.ManZu6]: Man6,
  [HaiKind.ManZu7]: Man7,
  [HaiKind.ManZu8]: Man8,
  [HaiKind.ManZu9]: Man9,

  // 筒子
  [HaiKind.PinZu1]: Pin1,
  [HaiKind.PinZu2]: Pin2,
  [HaiKind.PinZu3]: Pin3,
  [HaiKind.PinZu4]: Pin4,
  [HaiKind.PinZu5]: Pin5,
  [HaiKind.PinZu6]: Pin6,
  [HaiKind.PinZu7]: Pin7,
  [HaiKind.PinZu8]: Pin8,
  [HaiKind.PinZu9]: Pin9,

  // 索子
  [HaiKind.SouZu1]: Sou1,
  [HaiKind.SouZu2]: Sou2,
  [HaiKind.SouZu3]: Sou3,
  [HaiKind.SouZu4]: Sou4,
  [HaiKind.SouZu5]: Sou5,
  [HaiKind.SouZu6]: Sou6,
  [HaiKind.SouZu7]: Sou7,
  [HaiKind.SouZu8]: Sou8,
  [HaiKind.SouZu9]: Sou9,

  // 字牌
  [HaiKind.Ton]: Ton,
  [HaiKind.Nan]: Nan,
  [HaiKind.Sha]: Shaa,
  [HaiKind.Pei]: Pei,
  [HaiKind.Haku]: Haku,
  [HaiKind.Hatsu]: Hatsu,
  [HaiKind.Chun]: Chun,
  back: Back,
};

/**
 * 牌の種類ごとの画像ファイル名（`assets/tiles/` 配下）
 *
 * 利用側が画像を自分の静的ファイルとして配信するときの対応表。npm パッケージには
 * 同じ名前の PNG を `assets/tiles/` に同梱している（600×800）。
 * `createTileImageResolver` はこの表からパスを組み立てる。
 */
export const TILE_IMAGE_FILE_NAMES: Readonly<Record<TileImageKind, string>> = {
  [HaiKind.ManZu1]: "Man1.png",
  [HaiKind.ManZu2]: "Man2.png",
  [HaiKind.ManZu3]: "Man3.png",
  [HaiKind.ManZu4]: "Man4.png",
  [HaiKind.ManZu5]: "Man5.png",
  [HaiKind.ManZu6]: "Man6.png",
  [HaiKind.ManZu7]: "Man7.png",
  [HaiKind.ManZu8]: "Man8.png",
  [HaiKind.ManZu9]: "Man9.png",
  [HaiKind.PinZu1]: "Pin1.png",
  [HaiKind.PinZu2]: "Pin2.png",
  [HaiKind.PinZu3]: "Pin3.png",
  [HaiKind.PinZu4]: "Pin4.png",
  [HaiKind.PinZu5]: "Pin5.png",
  [HaiKind.PinZu6]: "Pin6.png",
  [HaiKind.PinZu7]: "Pin7.png",
  [HaiKind.PinZu8]: "Pin8.png",
  [HaiKind.PinZu9]: "Pin9.png",
  [HaiKind.SouZu1]: "Sou1.png",
  [HaiKind.SouZu2]: "Sou2.png",
  [HaiKind.SouZu3]: "Sou3.png",
  [HaiKind.SouZu4]: "Sou4.png",
  [HaiKind.SouZu5]: "Sou5.png",
  [HaiKind.SouZu6]: "Sou6.png",
  [HaiKind.SouZu7]: "Sou7.png",
  [HaiKind.SouZu8]: "Sou8.png",
  [HaiKind.SouZu9]: "Sou9.png",
  [HaiKind.Ton]: "Ton.png",
  [HaiKind.Nan]: "Nan.png",
  [HaiKind.Sha]: "Shaa.png",
  [HaiKind.Pei]: "Pei.png",
  [HaiKind.Haku]: "Haku.png",
  [HaiKind.Hatsu]: "Hatsu.png",
  [HaiKind.Chun]: "Chun.png",
  back: "Back.png",
};

/**
 * 同梱画像（base64 の data URI）を返す
 *
 * `TileImageProvider` が無いときの既定。data URI は HTML / JS に画像本体ごと
 * 埋め込まれるため、牌を多く並べるページでは転送量が大きくなる。牌の枚数が多い
 * アプリは `TileImageProvider` で静的ファイルへ切り替えること。
 */
export function getBundledTileImage(kind: TileImageKind): string {
  return bundledTileImageMap[kind];
}

/** @deprecated `getBundledTileImage` に改名した。次のメジャーで削除する */
export function getTileImage(haiKind: HaiKindId): string {
  return getBundledTileImage(haiKind);
}

export { Back as BackImage };
