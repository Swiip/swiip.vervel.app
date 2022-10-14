import { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'

export type Block = BlockObjectResponse & { children?: Block[] }
