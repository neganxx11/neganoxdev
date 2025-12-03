
export interface HardwareConfig {
  cpu: string;
  gpu: string;
  ram: string;
  resolution: string;
}

export enum PerformanceTier {
  UNPLAYABLE = 'UNPLAYABLE',
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  ULTRA = 'ULTRA',
  ESPORTS = 'ESPORTS'
}

export interface GameBenchmark {
  gameTitle: string;
  averageFps: number;
  minFps: number;
  settings: string;
  tier: PerformanceTier;
  analysis: string;
  vramUsage: string; // e.g. "6.5GB"
}

export interface UpgradeSuggestion {
  component: 'CPU' | 'GPU' | 'RAM';
  suggestedModel: string;
  reason: string;
  estimatedPerformanceBoost: string; // e.g. "+35%"
}

export interface SystemMetrics {
  estimatedWattage: number; // Total TDP
  thermalProfile: string; // e.g. "High Heat Output"
  bottleneckScore: number; // 0-100, where 100 is severe bottleneck
}

export interface BenchmarkResult {
  systemScore: number;
  bottleneck: string;
  games: GameBenchmark[];
  summary: string;
  upgrades: UpgradeSuggestion[];
  metrics: SystemMetrics;
}
