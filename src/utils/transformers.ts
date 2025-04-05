import { AICapability, AICapabilityDetail } from '../types/capability';

export const transformToDetailFormat = (rawData: AICapability): AICapabilityDetail => {
  return {
    ...rawData,
    summary: rawData.description,
    industries: [
      { name: "製造業", description: "シフト制の工場勤務管理に最適" },
      { name: "小売・サービス業", description: "アルバイト・パート勤怠管理の効率化" },
      { name: "IT・システム開発", description: "フレックス勤務・リモートワーク管理" }
    ],
    roles: [
      { name: "人事労務担当者", description: "勤怠管理業務の効率化" },
      { name: "総務部門マネージャー", description: "バックオフィス業務の最適化" },
      { name: "経営企画担当者", description: "労務コスト分析の高度化" }
    ]
  };
}; 