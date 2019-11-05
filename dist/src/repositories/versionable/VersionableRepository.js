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
const logger = require("@ylz/logger");
const BaseRepository_1 = require("../BaseRepository");
const utilities_1 = require("../../libs/utilities");
class VersionableRepository extends BaseRepository_1.BaseRepository {
    constructor(model) {
        super(model);
    }
    create(input) {
        const _super = Object.create(null, {
            create: { get: () => super.create }
        });
        return __awaiter(this, void 0, void 0, function* () {
            logger.debug("VersionableRepository - create:", JSON.stringify(input));
            const id = input.id || String(utilities_1.generateObjectId());
            const create = Object.assign({}, input, { id, originalId: id });
            return _super.create.call(this, create);
        });
    }
    insertMany(docs, options) {
        const _super = Object.create(null, {
            insertMany: { get: () => super.insertMany }
        });
        return __awaiter(this, void 0, void 0, function* () {
            logger.debug("VersionableRepository - insertMany:");
            const docsToInsert = docs.map(item => {
                const id = item.id || String(utilities_1.generateObjectId());
                return Object.assign({}, item, { _id: id, originalId: id });
            });
            return _super.insertMany.call(this, docsToInsert, options);
        });
    }
    update(input) {
        return __awaiter(this, void 0, void 0, function* () {
            logger.debug("VersionableRepository - update:", JSON.stringify(input));
            logger.debug("Searching for previous valid object...");
            const previous = yield this.getById(input.originalId);
            logger.debug("Invalidating previous valid object...");
            yield this.invalidate(input.originalId);
            const newInstance = Object.assign({}, previous, input);
            newInstance["_id"] = utilities_1.generateObjectId();
            delete previous.deletedAt;
            const model = new this.model(newInstance);
            logger.debug("Creating new object...");
            return yield model.save();
        });
    }
    delete(input) {
        return __awaiter(this, void 0, void 0, function* () {
            logger.debug("VersionableRepository - delete:", JSON.stringify(input));
            logger.debug("Searching for previous valid object...");
            const previous = yield this.getById(input.originalId);
            logger.debug("Invalidating previous valid object...");
            yield this.invalidate(input.originalId);
            const newId = utilities_1.generateObjectId();
            const newInstance = Object.assign({}, previous, { _id: newId, isSoftDeleted: true });
            const model = new this.model(newInstance);
            return model.save();
        });
    }
    count(conditions) {
        logger.debug("VersionableRepository - count:", JSON.stringify(conditions));
        const updatedQuery = Object.assign({ deletedAt: null }, conditions);
        return super.count(updatedQuery);
    }
    getAll(conditions, projection, options, populate) {
        logger.debug("VersionableRepository - getAll:", JSON.stringify(conditions));
        const updatedQuery = Object.assign({ deletedAt: null }, conditions);
        return super.getAll(updatedQuery, projection, options, populate);
    }
    getById(originalId, populate) {
        logger.debug("VersionableRepository - getById:", originalId, populate);
        return super.getOne({ originalId, deletedAt: null }, populate);
    }
    getByIds(originalIds) {
        logger.debug("VersionableRepository - getByIds:", originalIds);
        return this.getAll({ originalId: { $in: originalIds } });
    }
    invalidate(originalId) {
        const now = new Date();
        return utilities_1.lean(this.model.update({ originalId, deletedAt: null }, { deletedAt: now }));
    }
}
exports.VersionableRepository = VersionableRepository;
//# sourceMappingURL=VersionableRepository.js.map