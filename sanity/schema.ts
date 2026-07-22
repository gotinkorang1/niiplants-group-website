import { defineField, defineType } from "sanity";

import { companies } from "../lib/companies";

/**
 * News article schema — the only content type editors see.
 * Field titles/descriptions are written for non-technical editors.
 */
export const post = defineType({
  name: "post",
  title: "News article",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Headline",
      type: "string",
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: "slug",
      title: "Web address (auto-generated from the headline)",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Publish date",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "company",
      title: "Which company is this about?",
      type: "string",
      options: {
        list: [
          { title: "Nii Plants Group (all companies)", value: "group" },
          ...companies.map((c) => ({ title: c.name, value: c.slug })),
        ],
        layout: "dropdown",
      },
      initialValue: "group",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Short summary (shown on the newsroom page and in Google results)",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().max(200),
    }),
    defineField({
      name: "coverImage",
      title: "Cover photo",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Describe the photo (for accessibility and Google)",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "body",
      title: "Article",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Describe the photo",
              type: "string",
            }),
          ],
        },
      ],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "company", media: "coverImage" },
  },
  orderings: [
    {
      title: "Publish date (newest first)",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
});

export const schemaTypes = [post];
