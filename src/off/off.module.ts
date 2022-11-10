import {CacheModule, Module} from '@nestjs/common';
import { OffService } from './off.service';
import {OffController} from "./controllers/off.controller";
import {HttpModule} from "@nestjs/axios";
import {AuthModule} from "../auth/auth.module";

@Module({
  providers: [OffService],
  imports: [  HttpModule.register({
    timeout: 5000,
    maxRedirects: 5,
  }),
    CacheModule.register()],
  controllers: [OffController]
})
export class OffModule {}
