import type { Meta, StoryObj } from "@storybook/react";
import { HaiKind } from "riichi-mahjong";
import { Hai } from "../src/components/Hai";

const meta: Meta<typeof Hai> = {
  title: "Components/Hai",
  component: Hai,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    hai: {
      control: { type: "number", min: 0, max: 33 },
    },
    rotated: {
      control: { type: "boolean" },
    },
    highlighted: {
      control: { type: "boolean" },
    },
    dimmed: {
      control: { type: "boolean" },
    },
    selected: {
      control: { type: "boolean" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Hai>;

export const Default: Story = {
  args: {
    hai: HaiKind.ManZu1,
    size: "md",
  },
};

export const AllManzu: Story = {
  render: () => (
    <div className="flex gap-1">
      {Array.from({ length: 9 }, (_, i) => (
        <Hai
          key={i}
          hai={(HaiKind.ManZu1 + i) as typeof HaiKind.ManZu1}
          size="md"
        />
      ))}
    </div>
  ),
};

export const AllPinzu: Story = {
  render: () => (
    <div className="flex gap-1">
      {Array.from({ length: 9 }, (_, i) => (
        <Hai
          key={i}
          hai={(HaiKind.PinZu1 + i) as typeof HaiKind.PinZu1}
          size="md"
        />
      ))}
    </div>
  ),
};

export const AllSouzu: Story = {
  render: () => (
    <div className="flex gap-1">
      {Array.from({ length: 9 }, (_, i) => (
        <Hai
          key={i}
          hai={(HaiKind.SouZu1 + i) as typeof HaiKind.SouZu1}
          size="md"
        />
      ))}
    </div>
  ),
};

export const AllJihai: Story = {
  render: () => (
    <div className="flex gap-1">
      <Hai hai={HaiKind.Ton} size="md" />
      <Hai hai={HaiKind.Nan} size="md" />
      <Hai hai={HaiKind.Sha} size="md" />
      <Hai hai={HaiKind.Pei} size="md" />
      <Hai hai={HaiKind.Haku} size="md" />
      <Hai hai={HaiKind.Hatsu} size="md" />
      <Hai hai={HaiKind.Chun} size="md" />
    </div>
  ),
};

export const AllSuits: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <div className="flex gap-1">
        {Array.from({ length: 9 }, (_, i) => (
          <Hai
            key={i}
            hai={(HaiKind.ManZu1 + i) as typeof HaiKind.ManZu1}
            size="sm"
          />
        ))}
      </div>
      <div className="flex gap-1">
        {Array.from({ length: 9 }, (_, i) => (
          <Hai
            key={i}
            hai={(HaiKind.PinZu1 + i) as typeof HaiKind.PinZu1}
            size="sm"
          />
        ))}
      </div>
      <div className="flex gap-1">
        {Array.from({ length: 9 }, (_, i) => (
          <Hai
            key={i}
            hai={(HaiKind.SouZu1 + i) as typeof HaiKind.SouZu1}
            size="sm"
          />
        ))}
      </div>
      <div className="flex gap-1">
        <Hai hai={HaiKind.Ton} size="sm" />
        <Hai hai={HaiKind.Nan} size="sm" />
        <Hai hai={HaiKind.Sha} size="sm" />
        <Hai hai={HaiKind.Pei} size="sm" />
        <Hai hai={HaiKind.Haku} size="sm" />
        <Hai hai={HaiKind.Hatsu} size="sm" />
        <Hai hai={HaiKind.Chun} size="sm" />
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-2">
      <Hai hai={HaiKind.Chun} size="xs" />
      <Hai hai={HaiKind.Chun} size="sm" />
      <Hai hai={HaiKind.Chun} size="md" />
      <Hai hai={HaiKind.Chun} size="lg" />
      <Hai hai={HaiKind.Chun} size="xl" />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      <div className="flex flex-col items-center gap-1">
        <Hai hai={HaiKind.ManZu1} size="md" />
        <span className="text-sm">Normal</span>
      </div>
      <div className="flex flex-col items-center gap-1">
        <Hai hai={HaiKind.ManZu1} size="md" highlighted />
        <span className="text-sm">Highlighted</span>
      </div>
      <div className="flex flex-col items-center gap-1">
        <Hai hai={HaiKind.ManZu1} size="md" selected />
        <span className="text-sm">Selected</span>
      </div>
      <div className="flex flex-col items-center gap-1">
        <Hai hai={HaiKind.ManZu1} size="md" dimmed />
        <span className="text-sm">Dimmed</span>
      </div>
      <div className="flex flex-col items-center gap-1">
        <Hai hai={HaiKind.ManZu1} size="md" rotated />
        <span className="text-sm">Rotated</span>
      </div>
    </div>
  ),
};

export const Interactive: Story = {
  render: () => (
    <div className="flex gap-1">
      {Array.from({ length: 5 }, (_, i) => (
        <Hai
          key={i}
          hai={(HaiKind.ManZu1 + i) as typeof HaiKind.ManZu1}
          size="lg"
          onClick={(hai) => {
            alert(`Clicked tile: ${hai}`);
          }}
        />
      ))}
    </div>
  ),
};
