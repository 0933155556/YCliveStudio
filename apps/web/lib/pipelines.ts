import type { Pipeline } from "./types";
import pipelinesData from "./pipelines.zh.json";

export const pipelines: Pipeline[] = pipelinesData as Pipeline[];

export function getPipelineById(id: string): Pipeline | undefined {
  return pipelines.find((p) => p.id === id);
}

export function getPipelinesByCategory(category: string): Pipeline[] {
  return pipelines.filter((p) => p.category === category);
}

export function getStablePipelines(): Pipeline[] {
  return pipelines.filter((p) => p.stability === "production");
}
