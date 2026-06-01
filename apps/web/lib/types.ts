export interface Pipeline {
  id: string;
  name: string;
  nameEn: string;
  emoji: string;
  color: string;
  colorLight: string;
  category: string;
  stability: "production" | "beta" | "alpha";
  stableLabel: string;
  description: string;
  useCases: string[];
  stages: string[];
  stageCount: number;
  budgetUSD: number | null;
  costHint: string;
  referenceVideo: boolean;
  tags: string[];
}
