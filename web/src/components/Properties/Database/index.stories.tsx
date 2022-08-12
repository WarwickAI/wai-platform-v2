import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import DatabaseProperty from ".";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../../utils/createUrqlClient";

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "Database Property",
  component: DatabaseProperty,
  argTypes: {
    value: { control: "number" },
    isEdit: { control: "boolean" },
  },
} as ComponentMeta<typeof DatabaseProperty>;

const Template: ComponentStory<typeof DatabaseProperty> = (args) => (
  <DatabaseProperty {...args} />
);

export const Primary = Template.bind({});
Primary.parameters = {
  urql: () => {
    ({
      data: {
        getDatabases: [
          {
            id: 5,
            createdAt: "1659222431485",
            updatedAt: "1659302587474",
            parent: null,
            type: "Database",
            index: 0,
            data: {
              title: { type: "Text", value: "Pages dddddddhdd" },
              attributes: {
                type: "DatabaseAttributeTypes",
                value: {
                  title: { type: "Text", value: "" },
                  coverImg: { type: "Image", value: "" },
                  iconImg: { type: "Image", value: "" },
                  dSS8D: { type: "Number", value: 0 },
                  GdTT4: { type: "Text", value: "" },
                },
              },
              childrenBaseType: { type: "DatabaseBaseType", value: "Page" },
            },
            canViewGroups: [],
            canInteractGroups: [],
            canEditGroups: [],
            createdBy: {
              id: 1,
              uniId: 1912354,
              firstName: "Edward",
              lastName: "Upton",
              email: "Edward.Upton@warwick.ac.uk",
              role: "exec",
              memberFromDate: "1634034840000",
              isMember: true,
              __typename: "User",
            },
            __typename: "Element",
          },
          {
            id: 41,
            createdAt: "1660170144856",
            updatedAt: "1660170144856",
            parent: null,
            type: "Database",
            index: 0,
            data: {
              title: { type: "Text", value: "Some DB" },
              attributes: {
                type: "DatabaseAttributes",
                value: {
                  title: { type: "Text", value: "" },
                  coverImg: { type: "Image", value: "" },
                  iconImg: { type: "Image", value: "" },
                },
              },
              childrenBaseType: { type: "DatabaseBaseType", value: "Page" },
            },
            canViewGroups: [],
            canInteractGroups: [],
            canEditGroups: [],
            createdBy: {
              id: 1,
              uniId: 1912354,
              firstName: "Edward",
              lastName: "Upton",
              email: "Edward.Upton@warwick.ac.uk",
              role: "exec",
              memberFromDate: "1634034840000",
              isMember: true,
              __typename: "User",
            },
            __typename: "Element",
          },
        ],
      },
    });
  },
};

Primary.args = {
  value: -1,
  isEdit: false,
};
