import { ItemStatus } from '../constants/itemStatus';

export interface IResponse {
  data: {
    id: number;
    name: string;
    due: string;
    status: ItemStatus.ACTIVE | ItemStatus.COMPLETED | ItemStatus.WARNING;
  }[];
  count: number;
}
