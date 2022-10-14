import { Client } from '@notionhq/client'

const NOTION_KEY = 'secret_gZNAR6WBAbPPHeFGemwS3rjgnMMvAZLG9GGLTFfaMhA'

export const NOTION_ROOT_ID = '302e5568d84c4ef6a67812b2d31efcdd'

export const notion = new Client({ auth: NOTION_KEY })
