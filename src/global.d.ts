import "reactn";
import { IDailyOrder, IDailySpecial } from "./interfaces";

declare module "reactn/default" {
  export interface State {
    currentOrders: null | IDailyOrder[];
    dailySpecials: IDailySpecial[];
    refreshCount: number;
    refresherOpen: boolean;
    orderId: number | null;
  }
}
