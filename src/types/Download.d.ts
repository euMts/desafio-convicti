export interface Download {
  id: number;
  device_id: number;
  created_at: string;
  updated_at: string;
  platform: "ANDROID" | "IOS" | "Android" | "iOS";
}

export interface FirstDownloadResponse {
  total: number;
}

export interface DownloadCount {
  totalAndroid: number;
  totalIos: number;
}
