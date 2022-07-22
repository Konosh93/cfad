import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import {
  GetMyHealthResponseBody,
  ListMachinesQueryValidator,
  ListMachinesResponseBody,
} from '@mygym/specs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHelthCheck(): GetMyHealthResponseBody {
    return this.appService.getHello();
  }

  @Get('/machines')
  listMachines(
    @Query() query: ListMachinesQueryValidator,
  ): ListMachinesResponseBody {
    return this.appService.listMachines(query.offset, query.limit);
  }
}
