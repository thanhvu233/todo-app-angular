import { ItemStatus } from '../constants/itemStatus';

export interface Item {
  id: number;
  name: string;
  due: string;
  status: ItemStatus.ACTIVE | ItemStatus.COMPLETED;
  isWarning: boolean;
}
