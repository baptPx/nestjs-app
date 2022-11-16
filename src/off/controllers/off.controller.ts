import {CACHE_MANAGER, Controller, Get, Inject, Param, UseGuards} from '@nestjs/common';
import {OffService} from "../off.service";
import { Cache } from "cache-manager";
import {AuthGuard} from "@nestjs/passport";

@Controller('off')
export class OffController {

    constructor(
        private readonly offService: OffService,
    ) {}

    @Get(':codeBar')
    @UseGuards(AuthGuard('jwt'))
    async updateUser(
        @Param('codeBar') codeBar: string) {

        return this.offService.getFoodFact(codeBar);
    }
}