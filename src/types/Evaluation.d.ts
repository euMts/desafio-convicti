export interface Evaluation {
  id: number;
  device_id: number;
  description: string;
  evaluation: number;
  improvements: string;
  created_at: string;
  updated_at: string;
  platform: "ANDROID" | "IOS" | "Android" | "iOS";
}

export interface FirstEvaluationResponse {
  evaluations: Evaluation[];
}

export interface EvaluationCount {
  totalAndroid: number;
  totalIos: number;
  average: string;
}
