import { ItemStatus } from '../constants/itemStatus';

export class Item {
  id: number;
  name: string;
  due: string;
  status: ItemStatus.ACTIVE | ItemStatus.COMPLETED;
  isWarning: boolean;

  constructor(
    id: number,
    name: string,
    due: string,
    status: ItemStatus.ACTIVE | ItemStatus.COMPLETED,
    isWarning: boolean
  ) {
    this.id = id;
    this.name = name;
    this.due = due;
    this.status = status;
    this.isWarning = isWarning;
  }
}
