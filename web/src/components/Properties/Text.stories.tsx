import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import Text from "./Text";

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "Text Property",
  component: Text,
  argTypes: {
    value: { control: "text" },
    isEdit: { control: "boolean" },
  },
} as ComponentMeta<typeof Text>;

const Template: ComponentStory<typeof Text> = (args) => <Text {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  value: "Some Text",
  isEdit: false,
  isTitle: false,
};

export const Secondary = Template.bind({});
Secondary.args = {
  value: "Some Text",
  isEdit: false,
};
