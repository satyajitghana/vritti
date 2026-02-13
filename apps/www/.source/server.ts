// @ts-nocheck
import * as __fd_glob_2 from "../content/docs/getting-started/introduction.mdx?collection=docs"
import * as __fd_glob_1 from "../content/docs/getting-started/installation.mdx?collection=docs"
import * as __fd_glob_0 from "../content/docs/index.mdx?collection=docs"
import { server } from 'fumadocs-mdx/runtime/server';
import type * as Config from '../source.config';

const create = server<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>({"doc":{"passthroughs":["extractedReferences"]}});

export const docs = await create.doc("docs", "content/docs", {"index.mdx": __fd_glob_0, "getting-started/installation.mdx": __fd_glob_1, "getting-started/introduction.mdx": __fd_glob_2, });

export const meta = await create.meta("meta", "content/docs", {});