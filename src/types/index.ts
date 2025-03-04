export type City = {
  id: number;
  city: string;
  timeZone: number;
};

export enum Status {
  LOADING = "loading",
  SUCCESS = "completed",
  ERROR = "error",
}

export type Time = {
  hours: number;
  minutes: number;
  seconds: number;
};