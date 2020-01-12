export interface IDailySpecial {
  name: string;
  description: string;
  imgSrc: string;
  ingredients: string[];
  collectionDate: string;
  collectionTime: string;
  collectionLocation: string;
  hoursLeft: number;
  minutesLeft: number;
  id: string;
  loading: boolean;
  price: number;
}

export interface IDailyOrder {
  userName: string;
  userEmail: string;
  orderTime: string;
  dailyName: string;
  dailyDate: string;
  paid: boolean;
  ready: boolean;
  received: boolean;
  hoursLeft: number;
  minutesLeft: number;
  id: string;
  orderId: string;
  price: number;
}
