// Components
export { Hai, HaiBack, Furo, Tehai } from "./components";

// Tile images（画像の参照先の差し替え）
export {
  TileImageProvider,
  useTileImage,
  toTileImageUri,
  createTileImageResolver,
} from "./components";
export type {
  TileImageSource,
  TileImageResolver,
  TileImageProviderProps,
  CreateTileImageResolverOptions,
} from "./components";
export {
  TILE_IMAGE_FILE_NAMES,
  getBundledTileImage,
  type TileImageKind,
} from "./assets/tiles";

// Types
export type {
  HaiSize,
  HaiProps,
  HaiBackProps,
  TehaiProps,
  FuroProps,
} from "./types";

// Utilities
export {
  kindIdToHaiType,
  haiKindToNumber,
  getJihaiName,
  getHaiName,
  getHaiSizeClasses,
  getHaiSizePixels,
} from "./utils";

// Styles
import "./styles.css";
