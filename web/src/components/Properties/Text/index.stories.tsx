import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import TextProperty from ".";

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "Text Property",
  component: TextProperty,
  argTypes: {
    value: { control: "text" },
    isEdit: { control: "boolean" },
  },
} as ComponentMeta<typeof TextProperty>;

const Template: ComponentStory<typeof TextProperty> = (args) => (
  <TextProperty {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  value: "Some Text",
  isEdit: false,
  isTitle: false,
};
