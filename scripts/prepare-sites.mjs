import { mkdir, readdir, rename, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";

const dist = new URL("../dist/", import.meta.url);
const client = new URL("./client/", dist);
const server = new URL("./server/", dist);

await rm(client, { recursive: true, force: true });
await rm(server, { recursive: true, force: true });
await mkdir(client, { recursive: true });

for (const entry of await readdir(dist, { withFileTypes: true })) {
  if (entry.name === "client" || entry.name === "server") continue;
  await rename(join(dist.pathname, entry.name), join(client.pathname, entry.name));
}

await mkdir(server, { recursive: true });
await writeFile(
  new URL("./index.js", server),
  `export default {
  async fetch(request, env) {
    if (!env?.ASSETS?.fetch) {
      return new Response("Static asset service unavailable", { status: 503 });
    }

    return env.ASSETS.fetch(request);
  },
};
`,
);
