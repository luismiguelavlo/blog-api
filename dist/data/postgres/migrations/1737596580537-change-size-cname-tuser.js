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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangeSizeCnameTuser1737596580537 = void 0;
class ChangeSizeCnameTuser1737596580537 {
    constructor() {
        this.name = "ChangeSizeCnameTuser1737596580537";
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "name" TYPE character varying(100)`);
            yield queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "name" SET NOT NULL`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "name" TYPE character varying(80)`);
            yield queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "name" SET NOT NULL`);
        });
    }
}
exports.ChangeSizeCnameTuser1737596580537 = ChangeSizeCnameTuser1737596580537;
