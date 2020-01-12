import "reactn";
import { IDailyOrder } from "./interfaces";

declare module "reactn/default" {
  export interface State {
    currentOrders: null | IDailyOrder[];
    refreshCount: number;
    refresherOpen: boolean;
    orderId: number | null;
  }
}
