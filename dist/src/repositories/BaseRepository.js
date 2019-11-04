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
const logger_1 = require("@ylz/logger");
const utilities_1 = require("../libs/utilities");
class BaseRepository {
    constructor(model) {
        this.model = model;
    }
    get(input) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.debug("BaseRepository - get:", JSON.stringify(input));
            return this.getById(input.id);
        });
    }
    getOne(conditions, populate) {
        logger_1.default.debug("BaseRepository - getOne:", JSON.stringify(conditions), JSON.stringify(populate));
        return populate ? utilities_1.lean(this.model.findOne(conditions).populate(populate)) : utilities_1.lean(this.model.findOne(conditions));
    }
    list(input) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.debug("BaseRepository - list:", JSON.stringify(input));
            const conditions = utilities_1.clone(input);
            delete conditions.limit;
            delete conditions.skip;
            const options = {
                skip: input.skip || 0,
                limit: input.limit || 0,
                sort: { createdAt: -1 }
            };
            return this.getAll(conditions, null, options);
        });
    }
    create(input) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.debug("BaseRepository - create:", JSON.stringify(input));
            const id = input.id || String(utilities_1.generateObjectId());
            return yield this.model.create(Object.assign({ _id: id }, input));
        });
    }
    update(input) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.debug("BaseRepository - update:", JSON.stringify(input));
            return this.model.findOneAndUpdate({ _id: input.id }, input, { new: true });
        });
    }
    delete(input) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.debug("BaseRepository - delete:", JSON.stringify(input));
            return this.model.findByIdAndRemove(input.id);
        });
    }
    getById(id) {
        return utilities_1.lean(this.model.findById(id));
    }
    getByIds(ids) {
        return this.getAll({ _id: { $in: ids } });
    }
    getAll(conditions, projection, options, populate) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.debug("BaseRepository - getAll:", JSON.stringify(conditions), JSON.stringify(projection), JSON.stringify(options));
            return populate
                ? (yield this.model
                    .find(conditions, projection, options)
                    .populate(populate)
                    .lean()).map(utilities_1.leanObject)
                : (yield this.model.find(conditions, projection, options).lean()).map(utilities_1.leanObject);
        });
    }
    insertMany(input, options) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.debug("BaseRepository - insertMany:", JSON.stringify(input), JSON.stringify(options));
            const docsToInsert = input.map(item => {
                const id = item.id || utilities_1.generateObjectId();
                return Object.assign({}, item, { _id: id });
            });
            return this.model.insertMany(docsToInsert, options);
        });
    }
    count(conditions = {}) {
        logger_1.default.debug("BaseRepository - count:", JSON.stringify(conditions));
        return this.model.count(conditions);
    }
}
exports.default = BaseRepository;
//# sourceMappingURL=BaseRepository.js.map