import type {
  HaiKindId,
  Tehai as TehaiType,
  CompletedMentsu,
  Furo as FuroType,
} from "riichi-mahjong";

/**
 * 牌のサイズバリアント
 */
export type HaiSize = "xs" | "sm" | "md" | "lg" | "xl";

/**
 * 牌コンポーネントのProps
 */
export interface HaiProps {
  readonly hai: HaiKindId;
  readonly size?: HaiSize;
  readonly rotated?: boolean;
  readonly highlighted?: boolean;
  readonly dimmed?: boolean;
  readonly selected?: boolean;
  readonly onClick?: (hai: HaiKindId) => void;
  readonly className?: string;
}

/**
 * 牌の裏面コンポーネントのProps
 */
export interface HaiBackProps {
  readonly size?: HaiSize;
  readonly rotated?: boolean;
  readonly className?: string;
}

/**
 * 手牌コンポーネントのProps
 */
export interface TehaiProps {
  readonly tehai: TehaiType;
  readonly tsumo?: HaiKindId;
  readonly size?: HaiSize;
  readonly onHaiClick?: (hai: HaiKindId, index: number) => void;
  readonly selectedIndices?: readonly number[];
  readonly className?: string;
}

/**
 * 副露コンポーネントのProps
 */
export interface FuroProps {
  readonly mentsu: CompletedMentsu;
  readonly furo?: FuroType;
  readonly size?: HaiSize;
  readonly className?: string;
}
