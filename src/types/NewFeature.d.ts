export interface NewFeature {
  id: number;
  name: string;
  is_new: number;
  created_at: string;
  updated_at: string;
  total_usage: number;
  usage_percentage?: string;
}

export interface FirstNewFeatureResponse {
  newFeatures: NewFeature[];
}
