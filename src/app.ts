import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";

async function main() {
  const server = new Server({
    port: 3000,
    routes: AppRoutes.routes,
  });

  await server.start();
}

main();
