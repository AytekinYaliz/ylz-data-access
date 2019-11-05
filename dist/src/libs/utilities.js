"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
exports.generateObjectId = () => mongoose.Types.ObjectId();
exports.isValidObjectId = (id) => new RegExp("^[0-9a-fA-F]{24}$").test(id);
function lean(document) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return leanObject(yield document.lean());
        }
        catch (err) {
            return err;
        }
    });
}
exports.lean = lean;
function leanObject(doc) {
    try {
        if (doc && doc._id) {
            doc.id = doc._id;
            delete doc._id;
            delete doc.__v;
        }
        return doc;
    }
    catch (err) {
        return err;
    }
}
exports.leanObject = leanObject;
//# sourceMappingURL=utilities.js.map