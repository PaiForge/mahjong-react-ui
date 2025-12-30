import type { Meta, StoryObj } from "@storybook/react";
import { HaiBack } from ".";

const meta: Meta<typeof HaiBack> = {
    title: "Components/HaiBack",
    component: HaiBack,
    tags: ["autodocs"],
    argTypes: {
        size: {
            control: { type: "select" },
            options: ["xs", "sm", "md", "lg", "xl"],
        },
        color: {
            control: { type: "select" },
            options: ["red", "blue", "yellow"],
        },
        rotated: {
            control: { type: "boolean" },
        },
    },
};

export default meta;
type Story = StoryObj<typeof HaiBack>;

export const Default: Story = {
    args: {
        size: "md",
        color: "red",
    },
};

export const Colors: Story = {
    render: () => (
        <div className="flex items-end gap-4">
            <div className="flex flex-col items-center gap-1">
                <HaiBack size="md" color="red" />
                <span className="text-sm">Red</span>
            </div>
            <div className="flex flex-col items-center gap-1">
                <HaiBack size="md" color="blue" />
                <span className="text-sm">Blue</span>
            </div>
            <div className="flex flex-col items-center gap-1">
                <HaiBack size="md" color="yellow" />
                <span className="text-sm">Yellow</span>
            </div>
        </div>
    ),
};

export const Sizes: Story = {
    render: () => (
        <div className="flex items-end gap-2">
            <HaiBack size="xs" color="blue" />
            <HaiBack size="sm" color="blue" />
            <HaiBack size="md" color="blue" />
            <HaiBack size="lg" color="blue" />
            <HaiBack size="xl" color="blue" />
        </div>
    ),
};

export const Rotated: Story = {
    render: () => (
        <div className="flex items-end gap-4">
            <div className="flex flex-col items-center gap-1">
                <HaiBack size="md" color="blue" />
                <span className="text-sm">Normal</span>
            </div>
            <div className="flex flex-col items-center gap-1">
                <HaiBack size="md" color="blue" rotated />
                <span className="text-sm">Rotated</span>
            </div>
        </div>
    ),
};
