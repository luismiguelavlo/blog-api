"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRoutes = void 0;
const express_1 = require("express");
const router_1 = require("./post/router");
const route_1 = require("./user/route");
const routes_1 = require("./comment/routes");
class AppRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        router.use("/api/post", router_1.PostRoutes.routes);
        router.use("/api/user", route_1.UserRoutes.routes);
        router.use("/api/comment", routes_1.CommentRoutes.routes);
        return router;
    }
}
exports.AppRoutes = AppRoutes;
