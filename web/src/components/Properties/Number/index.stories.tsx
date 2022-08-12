import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import NumberProperty from ".";

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "Number Property",
  component: NumberProperty,
  argTypes: {
    value: { control: "number" },
    isEdit: { control: "boolean" },
  },
} as ComponentMeta<typeof NumberProperty>;

const Template: ComponentStory<typeof NumberProperty> = (args) => (
  <NumberProperty {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  value: 99,
  isEdit: false,
  isTitle: false,
};
