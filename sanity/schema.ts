import { defineField, defineType } from "sanity";

import { companies } from "../lib/companies";

const companyOptions = [
  { title: "Nii Plants Group (all companies)", value: "group" },
  ...companies.map((c) => ({ title: c.name, value: c.slug })),
];

/**
 * News article schema — field titles/descriptions are written for
 * non-technical editors.
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
      options: { list: companyOptions, layout: "dropdown" },
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
            defineField({ name: "alt", title: "Describe the photo", type: "string" }),
          ],
        },
      ],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: { select: { title: "title", subtitle: "company", media: "coverImage" } },
  orderings: [
    {
      title: "Publish date (newest first)",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
});

/**
 * Job opening schema — posting a role publishes it to /careers and makes
 * it eligible for Google Jobs via JobPosting structured data.
 */
export const job = defineType({
  name: "job",
  title: "Job opening",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Job title",
      type: "string",
      validation: (rule) => rule.required().max(100),
    }),
    defineField({
      name: "slug",
      title: "Web address (auto-generated from the job title)",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "company",
      title: "Hiring company",
      type: "string",
      options: { list: companyOptions, layout: "dropdown" },
      initialValue: "group",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      initialValue: "Accra, Ghana",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "employmentType",
      title: "Employment type",
      type: "string",
      options: {
        list: [
          { title: "Full time", value: "FULL_TIME" },
          { title: "Part time", value: "PART_TIME" },
          { title: "Contract", value: "CONTRACTOR" },
          { title: "Temporary", value: "TEMPORARY" },
          { title: "Internship", value: "INTERN" },
          { title: "National service", value: "OTHER" },
        ],
        layout: "dropdown",
      },
      initialValue: "FULL_TIME",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Date posted",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "closingDate",
      title: "Applications close (optional)",
      type: "date",
    }),
    defineField({
      name: "summary",
      title: "One-line summary (shown in the list)",
      type: "text",
      rows: 2,
      validation: (rule) => rule.required().max(180),
    }),
    defineField({
      name: "description",
      title: "Full description — responsibilities, requirements, how to apply",
      type: "array",
      of: [{ type: "block" }],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: { select: { title: "title", subtitle: "location" } },
  orderings: [
    {
      title: "Date posted (newest first)",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
});

export const schemaTypes = [post, job];
