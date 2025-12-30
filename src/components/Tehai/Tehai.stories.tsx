import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { HaiKind, MentsuType, FuroType, Tacha } from "riichi-mahjong";
import { Tehai } from ".";

const meta: Meta<typeof Tehai> = {
    title: "Components/Tehai",
    component: Tehai,
    tags: ["autodocs"],
    argTypes: {
        size: {
            control: { type: "select" },
            options: ["xs", "sm", "md", "lg", "xl"],
        },
    },
};

export default meta;
type Story = StoryObj<typeof Tehai>;

export const ClosedHand: Story = {
    args: {
        tehai: {
            closed: [
                HaiKind.ManZu1,
                HaiKind.ManZu2,
                HaiKind.ManZu3,
                HaiKind.PinZu4,
                HaiKind.PinZu5,
                HaiKind.PinZu6,
                HaiKind.SouZu7,
                HaiKind.SouZu8,
                HaiKind.SouZu9,
                HaiKind.Ton,
                HaiKind.Ton,
                HaiKind.Haku,
                HaiKind.Haku,
            ],
            exposed: [],
        },
        size: "md",
    },
};

export const WithTsumo: Story = {
    args: {
        tehai: {
            closed: [
                HaiKind.ManZu1,
                HaiKind.ManZu2,
                HaiKind.ManZu3,
                HaiKind.PinZu4,
                HaiKind.PinZu5,
                HaiKind.PinZu6,
                HaiKind.SouZu7,
                HaiKind.SouZu8,
                HaiKind.SouZu9,
                HaiKind.Ton,
                HaiKind.Ton,
                HaiKind.Haku,
                HaiKind.Haku,
            ],
            exposed: [],
        },
        tsumo: HaiKind.Chun,
        size: "md",
    },
};

export const WithPon: Story = {
    args: {
        tehai: {
            closed: [
                HaiKind.ManZu1,
                HaiKind.ManZu2,
                HaiKind.ManZu3,
                HaiKind.PinZu4,
                HaiKind.PinZu5,
                HaiKind.PinZu6,
                HaiKind.Haku,
                HaiKind.Haku,
                HaiKind.Hatsu,
                HaiKind.Hatsu,
            ],
            exposed: [
                {
                    type: MentsuType.Koutsu,
                    hais: [HaiKind.Chun, HaiKind.Chun, HaiKind.Chun],
                    furo: { type: FuroType.Pon, from: Tacha.Kamicha },
                },
            ],
        },
        size: "md",
    },
};

export const WithChi: Story = {
    args: {
        tehai: {
            closed: [
                HaiKind.ManZu4,
                HaiKind.ManZu5,
                HaiKind.ManZu6,
                HaiKind.PinZu7,
                HaiKind.PinZu8,
                HaiKind.PinZu9,
                HaiKind.Ton,
                HaiKind.Ton,
                HaiKind.Nan,
                HaiKind.Nan,
            ],
            exposed: [
                {
                    type: MentsuType.Shuntsu,
                    hais: [HaiKind.SouZu1, HaiKind.SouZu2, HaiKind.SouZu3],
                    furo: { type: FuroType.Chi, from: Tacha.Kamicha },
                },
            ],
        },
        size: "md",
    },
};

export const WithMultipleFuro: Story = {
    args: {
        tehai: {
            closed: [
                HaiKind.ManZu1,
                HaiKind.ManZu2,
                HaiKind.ManZu3,
                HaiKind.Haku,
                HaiKind.Haku,
            ],
            exposed: [
                {
                    type: MentsuType.Koutsu,
                    hais: [HaiKind.Chun, HaiKind.Chun, HaiKind.Chun],
                    furo: { type: FuroType.Pon, from: Tacha.Toimen },
                },
                {
                    type: MentsuType.Shuntsu,
                    hais: [HaiKind.PinZu4, HaiKind.PinZu5, HaiKind.PinZu6],
                    furo: { type: FuroType.Chi, from: Tacha.Kamicha },
                },
            ],
        },
        size: "md",
    },
};

export const WithAnkan: Story = {
    args: {
        tehai: {
            closed: [
                HaiKind.ManZu1,
                HaiKind.ManZu2,
                HaiKind.ManZu3,
                HaiKind.PinZu4,
                HaiKind.PinZu5,
                HaiKind.PinZu6,
                HaiKind.Ton,
                HaiKind.Ton,
            ],
            exposed: [
                {
                    type: MentsuType.Kantsu,
                    hais: [HaiKind.Hatsu, HaiKind.Hatsu, HaiKind.Hatsu, HaiKind.Hatsu],
                },
            ],
        },
        tsumo: HaiKind.Ton,
        size: "md",
    },
};

export const Interactive: Story = {
    render: () => {
        const [selectedIndices, setSelectedIndices] = useState<number[]>([]);

        const handleClick = (_hai: number, index: number) => {
            setSelectedIndices((prev) =>
                prev.includes(index)
                    ? prev.filter((i) => i !== index)
                    : [...prev, index],
            );
        };

        return (
            <div className="flex flex-col gap-4">
                <Tehai
                    tehai={{
                        closed: [
                            HaiKind.ManZu1,
                            HaiKind.ManZu2,
                            HaiKind.ManZu3,
                            HaiKind.PinZu4,
                            HaiKind.PinZu5,
                            HaiKind.PinZu6,
                            HaiKind.SouZu7,
                            HaiKind.SouZu8,
                            HaiKind.SouZu9,
                            HaiKind.Ton,
                            HaiKind.Ton,
                            HaiKind.Haku,
                            HaiKind.Haku,
                        ],
                        exposed: [],
                    }}
                    size="lg"
                    onHaiClick={handleClick}
                    selectedIndices={selectedIndices}
                />
                <p className="text-sm text-gray-600">
                    Selected indices: {selectedIndices.join(", ") || "None"}
                </p>
            </div>
        );
    },
};

export const Sizes: Story = {
    render: () => (
        <div className="flex flex-col gap-4">
            {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
                <div key={size} className="flex flex-col gap-1">
                    <span className="text-sm text-gray-600">{size}</span>
                    <Tehai
                        tehai={{
                            closed: [
                                HaiKind.ManZu1,
                                HaiKind.ManZu2,
                                HaiKind.ManZu3,
                                HaiKind.PinZu4,
                                HaiKind.PinZu5,
                                HaiKind.Chun,
                                HaiKind.Chun,
                            ],
                            exposed: [],
                        }}
                        size={size}
                    />
                </div>
            ))}
        </div>
    ),
};
