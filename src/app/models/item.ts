import { ItemStatus } from '../constants/itemStatus';

export class Item {
  id: number;
  name: string;
  due: string;
  status: ItemStatus.ACTIVE | ItemStatus.COMPLETED | ItemStatus.WARNING;

  constructor(
    id: number,
    name: string,
    due: string,
    status: ItemStatus.ACTIVE | ItemStatus.COMPLETED | ItemStatus.WARNING
  ) {
    this.id = id;
    this.name = name;
    this.due = due;
    this.status = status;
  }
}
