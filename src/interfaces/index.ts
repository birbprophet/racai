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
  loading?: boolean;
}
