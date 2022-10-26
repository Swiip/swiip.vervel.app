import { Client } from '@notionhq/client'

const NOTION_KEY = process.env.NOTION_KEY

export const NOTION_ROOT_ID = process.env.NOTION_ROOT_ID

export const notion = new Client({ auth: NOTION_KEY })
