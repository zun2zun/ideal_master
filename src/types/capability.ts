export interface AICapability {
  id: string;
  title: string;
  description: string;
  category: string[];
  technologies: string[];
  thumbnail: {
    url: string;
  };
  detail: string;
  gallery?: {
    url: string;
  }[];
  relatedCases?: {
    id: string;
    title: string;
    thumbnail: {
      url: string;
    };
  }[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
}

export interface AICapabilityResponse {
  contents: AICapability[];
  totalCount: number;
  offset: number;
  limit: number;
}