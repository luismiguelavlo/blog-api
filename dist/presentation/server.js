"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const hpp_1 = __importDefault(require("hpp"));
const cors_1 = __importDefault(require("cors"));
const express_rate_limit_1 = require("express-rate-limit");
class Server {
    constructor(options) {
        this.app = (0, express_1.default)();
        this.acceptedOrigins = [
            "http://localhost:5173",
            "http://localhost:4200",
        ];
        this.port = options.port;
        this.routes = options.routes;
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            this.app.use(express_1.default.json());
            this.app.use(express_1.default.urlencoded({ extended: true }));
            const limiter = (0, express_rate_limit_1.rateLimit)({
                windowMs: 10 * 60 * 1000, // 10 minutes
                limit: 3000, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
                standardHeaders: "draft-8", // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
                legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
                // store: ... , // Redis, Memcached, etc. See below.
            });
            // Apply the rate limiting middleware to all requests.
            this.app.use(limiter);
            this.app.use((0, cors_1.default)({
                origin: (origin, callback) => {
                    if (!origin) {
                        return callback(null, true); //acepto el trafico y dejo pasar
                    }
                    if (this.acceptedOrigins.includes(origin)) {
                        return callback(null, true);
                    }
                    return callback(new Error("Not allowed by CORS"));
                },
            }));
            this.app.use((0, hpp_1.default)());
            this.app.use((0, helmet_1.default)());
            this.app.use(this.routes);
            this.app.listen(this.port, () => {
                console.log(`Server started on port ${this.port} 😊`);
            });
        });
    }
}
exports.Server = Server;
