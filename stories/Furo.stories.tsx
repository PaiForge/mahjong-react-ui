import type { Meta, StoryObj } from "@storybook/react";
import { HaiKind, MentsuType, FuroType, Tacha } from "riichi-mahjong";
import { Furo } from "../src/components/Furo";

const meta: Meta<typeof Furo> = {
  title: "Components/Furo",
  component: Furo,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["xs", "sm", "md", "lg", "xl"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Furo>;

export const ChiFromKamicha: Story = {
  args: {
    mentsu: {
      type: MentsuType.Shuntsu,
      hais: [HaiKind.ManZu1, HaiKind.ManZu2, HaiKind.ManZu3],
    },
    furo: { type: FuroType.Chi, from: Tacha.Kamicha },
    size: "md",
  },
};

export const PonFromToimen: Story = {
  args: {
    mentsu: {
      type: MentsuType.Koutsu,
      hais: [HaiKind.Chun, HaiKind.Chun, HaiKind.Chun],
    },
    furo: { type: FuroType.Pon, from: Tacha.Toimen },
    size: "md",
  },
};

export const PonFromShimocha: Story = {
  args: {
    mentsu: {
      type: MentsuType.Koutsu,
      hais: [HaiKind.Haku, HaiKind.Haku, HaiKind.Haku],
    },
    furo: { type: FuroType.Pon, from: Tacha.Shimocha },
    size: "md",
  },
};

export const DaiminkanFromKamicha: Story = {
  args: {
    mentsu: {
      type: MentsuType.Kantsu,
      hais: [HaiKind.Hatsu, HaiKind.Hatsu, HaiKind.Hatsu, HaiKind.Hatsu],
    },
    furo: { type: FuroType.Daiminkan, from: Tacha.Kamicha },
    size: "md",
  },
};

export const Ankan: Story = {
  args: {
    mentsu: {
      type: MentsuType.Kantsu,
      hais: [HaiKind.Ton, HaiKind.Ton, HaiKind.Ton, HaiKind.Ton],
    },
    size: "md",
  },
};

export const AllFuroTypes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <span className="text-sm text-gray-600">Chi (from Kamicha)</span>
        <Furo
          mentsu={{
            type: MentsuType.Shuntsu,
            hais: [HaiKind.PinZu1, HaiKind.PinZu2, HaiKind.PinZu3],
          }}
          furo={{ type: FuroType.Chi, from: Tacha.Kamicha }}
          size="md"
        />
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-sm text-gray-600">Pon (from Toimen)</span>
        <Furo
          mentsu={{
            type: MentsuType.Koutsu,
            hais: [HaiKind.SouZu5, HaiKind.SouZu5, HaiKind.SouZu5],
          }}
          furo={{ type: FuroType.Pon, from: Tacha.Toimen }}
          size="md"
        />
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-sm text-gray-600">Pon (from Shimocha)</span>
        <Furo
          mentsu={{
            type: MentsuType.Koutsu,
            hais: [HaiKind.ManZu9, HaiKind.ManZu9, HaiKind.ManZu9],
          }}
          furo={{ type: FuroType.Pon, from: Tacha.Shimocha }}
          size="md"
        />
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-sm text-gray-600">Daiminkan (from Kamicha)</span>
        <Furo
          mentsu={{
            type: MentsuType.Kantsu,
            hais: [HaiKind.Nan, HaiKind.Nan, HaiKind.Nan, HaiKind.Nan],
          }}
          furo={{ type: FuroType.Daiminkan, from: Tacha.Kamicha }}
          size="md"
        />
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-sm text-gray-600">Ankan</span>
        <Furo
          mentsu={{
            type: MentsuType.Kantsu,
            hais: [HaiKind.Chun, HaiKind.Chun, HaiKind.Chun, HaiKind.Chun],
          }}
          size="md"
        />
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
        <div key={size} className="flex flex-col gap-1">
          <span className="text-sm text-gray-600">{size}</span>
          <Furo
            mentsu={{
              type: MentsuType.Koutsu,
              hais: [HaiKind.Chun, HaiKind.Chun, HaiKind.Chun],
            }}
            furo={{ type: FuroType.Pon, from: Tacha.Kamicha }}
            size={size}
          />
        </div>
      ))}
    </div>
  ),
};
