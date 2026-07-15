# Dataset — Company-wise Previous Year Coding Questions

> Extracted from [Google Doc](https://docs.google.com/document/d/1JFyZTIxCKj6Q2UJTOmA3lvhmI99etfBtnsSxCeDX4-o) · Research by **Rohit Jadhav** · Original guides by **Let's Code** (lets-code.co.in)

## What's here

| File | Purpose |
|------|---------|
| `raw-data.json` | Complete extracted dataset — 64 companies, 9 resources, 4 social links, usage guide |
| `types.ts` | TypeScript types for the dataset structure |

## Structure

- **64 companies** across 3 categories:
  - Product & Tech (30): Google, Meta, Apple, Amazon, Microsoft, Uber, etc.
  - BFSI & Consulting (13): Goldman Sachs, Morgan Stanley, JP Morgan, etc.
  - IT Services & MNCs (21): TCS, Infosys, Wipro, Cognizant, Accenture, etc.
- **9 additional resources**: Mock tests, ATS checker, roadmaps, etc.
- **4 social links**: Om Kute's LinkedIn, Instagram, X, Substack

## App integration

The typed content module lives at `content/coding-questions/index.ts` and is used by:
- `/dashboard/interview` — Company coding questions browser

## Copyright

© 2026 Rohit Jadhav — Apply (apply.neexmeet.com). Research & data extraction by Rohit Jadhav. Original question guides curated by Let's Code (lets-code.co.in).
