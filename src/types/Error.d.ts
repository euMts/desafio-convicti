export interface Error {
  id: number;
  device_id: number;
  details: string;
  created_at: string;
  updated_at: string;
  platform: "ANDROID" | "IOS" | "Android" | "iOS";
}

export interface FirstErrorResponse {
  total: number;
}

export interface ErrorCount {
  totalAndroid: number;
  totalIos: number;
}
