/**
 * 视力处方模块
 * 根据用户输入的近视和散光度数，自动计算合适的训练 size、speed 与周期。
 *
 * 注意：此功能仅为训练参考，非医疗建议。
 */

export type PrescriptionInput = {
  /** 近视度数（度，正数，例如 300 表示 300 度） */
  myopia: number;
  /** 散光度数（度，正数，例如 75 表示 75 度） */
  astigmatism: number;
};

export type PrescriptionLevel = "mild" | "moderate" | "high" | "very-high";

export type TrainingRecommendation = {
  level: PrescriptionLevel;
  /** 建议的目标径 (px) */
  baseRadiusPx: number;
  /** 建议的速度 (deg/s) */
  speedValue: number;
  speedUnit: "deg/s";
  /** 建议训练周期（周） */
  durationWeeks: number;
  /** 每日建议训练时长（分钟） */
  dailyMinutes: number;
  /** 展示给用户的描述 */
  levelLabel: string;
  levelDescription: string;
  cycleDescription: string;
};

const computeEquivalentLoad = (myopia: number, astigmatism: number): number => {
  return myopia + astigmatism * 0.5;
};

const getLevel = (load: number): PrescriptionLevel => {
  if (load < 200) return "mild";
  if (load < 450) return "moderate";
  if (load < 700) return "high";
  return "very-high";
};

const lerp = (
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
): number => {
  const t = Math.max(0, Math.min(1, (value - inMin) / (inMax - inMin)));
  return outMin + t * (outMax - outMin);
};

const levelMeta: Record<
  PrescriptionLevel,
  Pick<
    TrainingRecommendation,
    | "levelLabel"
    | "levelDescription"
    | "durationWeeks"
    | "dailyMinutes"
  >
> = {
  mild: {
    levelLabel: "轻度",
    levelDescription: "近视 / 散光程度较轻，视觉追踪能力通常较好。",
    durationWeeks: 4,
    dailyMinutes: 5,
  },
  moderate: {
    levelLabel: "中度",
    levelDescription: "近视 / 散光程度中等，建议适度降低速度并增大目标进行练习。",
    durationWeeks: 6,
    dailyMinutes: 8,
  },
  high: {
    levelLabel: "高度",
    levelDescription: "近视 / 散光程度较高，运动目标应较大、速度应较慢以确保追踪质量。",
    durationWeeks: 8,
    dailyMinutes: 10,
  },
  "very-high": {
    levelLabel: "极高度",
    levelDescription:
      "近视 / 散光程度极高，建议使用最大目标和最慢速度，并在配戴眼镜的状态下练习。",
    durationWeeks: 12,
    dailyMinutes: 12,
  },
};

export const computeRecommendation = (
  input: PrescriptionInput,
): TrainingRecommendation => {
  const myopia = Math.max(0, input.myopia);
  const astigmatism = Math.max(0, input.astigmatism);
  const load = computeEquivalentLoad(myopia, astigmatism);
  const level = getLevel(load);

  const baseRadiusPx = Math.round(lerp(load, 0, 900, 44, 14));
  const speedValue = Math.round(lerp(load, 0, 900, 12, 2) * 10) / 10;

  const meta = levelMeta[level];

  const cycleDescription =
    `建议周期：${meta.durationWeeks} 周，` +
    `每日 ${meta.dailyMinutes} 分钟，` +
    `共 ${meta.durationWeeks * 7 * meta.dailyMinutes} 分钟。` +
    `每周可逐渐提高速度 0.5–1 deg/s。`;

  return {
    level,
    baseRadiusPx,
    speedValue,
    speedUnit: "deg/s",
    durationWeeks: meta.durationWeeks,
    dailyMinutes: meta.dailyMinutes,
    levelLabel: meta.levelLabel,
    levelDescription: meta.levelDescription,
    cycleDescription,
  };
};

export const validatePrescriptionInput = (
  myopiaRaw: string,
  astigmatismRaw: string,
): { valid: true; input: PrescriptionInput } | { valid: false; error: string } => {
  const myopia = parseFloat(myopiaRaw);
  const astigmatism = parseFloat(astigmatismRaw);

  if (!Number.isFinite(myopia) || myopia < 0) {
    return { valid: false, error: "近视度数应为 0 或以上的数字" };
  }
  if (myopia > 3000) {
    return { valid: false, error: "近视度数请不要超过 3000 度" };
  }
  if (!Number.isFinite(astigmatism) || astigmatism < 0) {
    return { valid: false, error: "散光度数应为 0 或以上的数字" };
  }
  if (astigmatism > 1000) {
    return { valid: false, error: "散光度数请不要超过 1000 度" };
  }

  return { valid: true, input: { myopia, astigmatism } };
};
