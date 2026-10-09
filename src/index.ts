// Components
export { Hai, HaiBack, Furo, Tehai } from "./components";

// Tile images（画像の参照先）。画像本体は別エントリ `./bundled-images`
export {
  TileImageProvider,
  useTileImage,
  toTileImageUri,
  toTileImageSource,
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
  type TileImageKind,
} from "./assets/tiles/file-names";

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
