import {CACHE_MANAGER, Inject, Injectable} from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import {map} from "rxjs";
import {OPEN_FOOD_FACT_API_URL} from "./constants";
import {Cache} from "cache-manager";

@Injectable()
export class OffService {
    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        private readonly httpService: HttpService) {}

    async getFoodFact(codeBar: string) {
        let content = await this.cacheManager.get(codeBar);
        if(content) {
            return content
        } else {
            let content = await this.httpService.get(`${OPEN_FOOD_FACT_API_URL}/api/v0/product/${codeBar}.json`)
                .pipe(map((res) => res.data))
            await this.cacheManager.set(codeBar, content);
            return content;
        }
    }
}
