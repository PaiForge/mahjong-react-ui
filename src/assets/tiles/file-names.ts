import { HaiKind, type HaiKindId } from "@pai-forge/riichi-mahjong";

/** 画像を持つ牌の種類。34 種の牌に裏面（`"back"`）を加えたもの */
export type TileImageKind = HaiKindId | "back";

/**
 * 牌の種類ごとの画像ファイル名（`assets/tiles/` 配下）
 *
 * 利用側が画像を自分の静的ファイルとして配信するときの対応表。npm パッケージには
 * 同じ名前の PNG を `assets/tiles/` に同梱している（600×800）。
 * `createTileImageResolver` はこの表からパスを組み立てる。
 *
 * 画像本体（`./index.ts` の data URI）とは別のモジュールに置く。この表はメインの
 * エントリ（`TileImageProvider` / `createTileImageResolver`）から参照されるため、
 * 同じモジュールに画像があると、静的ファイルに切り替えたアプリまで 2MB 超の
 * data URI をバンドルに抱える。
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
