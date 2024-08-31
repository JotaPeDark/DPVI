"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardController = void 0;
const common_1 = require("@nestjs/common");
const cards_service_1 = require("./cards.service");
const jwt_auth_guard_1 = require("../users/auth/jwt-auth.guard");
const roles_decorator_1 = require("../users/decorators/roles.decorator");
const roles_enum_1 = require("../users/enums/roles.enum");
const roles_guard_1 = require("../users/guards/roles.guard");
let CardController = class CardController {
    constructor(cardService) {
        this.cardService = cardService;
    }
    async getCard() {
        return this.cardService.getCommanderAndDeck();
    }
    async createDeck(req, createDeckDto) {
        return this.cardService.createDeck(req.user.userId, createDeckDto);
    }
    async updateDeck(id, req, updateDeckDto) {
        return this.cardService.updateDeck(req.user.userId, id, updateDeckDto);
    }
    async deleteDeck(id, req) {
        return this.cardService.deleteDeck(req.user.userId, id);
    }
    async createCard(req, createCardDto) {
        return this.cardService.create(req.user.userId, createCardDto);
    }
};
exports.CardController = CardController;
__decorate([
    (0, common_1.Get)('get-deck'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CardController.prototype, "getCard", null);
__decorate([
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.User, roles_enum_1.Role.Admin),
    (0, common_1.Post)('create-deck'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CardController.prototype, "createDeck", null);
__decorate([
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.User, roles_enum_1.Role.Admin),
    (0, common_1.Put)('update-deck/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], CardController.prototype, "updateDeck", null);
__decorate([
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.User, roles_enum_1.Role.Admin),
    (0, common_1.Delete)('delete-deck/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CardController.prototype, "deleteDeck", null);
__decorate([
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.Admin),
    (0, common_1.Post)('create-card'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CardController.prototype, "createCard", null);
exports.CardController = CardController = __decorate([
    (0, common_1.Controller)('commander'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [cards_service_1.CardService])
], CardController);
//# sourceMappingURL=cards.controller.js.map