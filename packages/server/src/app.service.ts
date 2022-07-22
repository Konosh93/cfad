import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hi!';
  }

  listMachines(offset: number, limit: number) {
    const all = [
      { id: 9273, name: 'Leg Press' },
      { id: 4313, name: 'Abductor Adductor machine' },
      { id: 4907, name: 'Ez Curl Bar', tag: 'free' },
      { id: 8419, name: 'Bench Press' },
      { id: 7290, name: 'Barbells' },
      { id: 1766, name: 'Flat Bench', tag: 'free' },
      { id: 9310, name: 'Incline/Decline bench' },
      { id: 3625, name: 'Cable Pulley Machine' },
      { id: 9039, name: 'Leg/Hamstrig Curl' },
      { id: 2166, name: 'Chest Press Machine' },
      { id: 4351, name: 'Lat Pulldown Machine' },
      { id: 6789, name: 'Peck Deck Machine' },
    ];
    return all.slice(+offset, +offset + +limit);
  }
}
