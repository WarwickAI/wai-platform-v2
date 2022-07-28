import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import FormattedText from "./FormattedText";

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "Formatted Text Property",
  component: FormattedText,
  argTypes: {
    value: { control: "text" },
    isEdit: { control: "boolean" },
  },
} as ComponentMeta<typeof FormattedText>;

const Template: ComponentStory<typeof FormattedText> = (args) => <FormattedText {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  value: `{"blocks":[{"key":"e0n4m","text":"Enter text...","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
  isEdit: false,
};