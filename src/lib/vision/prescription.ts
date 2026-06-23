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

/** 单个 2 分钟训练模块 */
export type SessionModule = {
  /** 模块序号（1-基） */
  index: number;
  /** 模块标题 */
  label: string;
  /** 目标大小 (px) */
  baseRadiusPx: number;
  /** 训练速度 (deg/s) */
  speedValue: number;
  speedUnit: "deg/s";
  /** 模块时长（秒），固定 120 秒 */
  durationSec: number;
  /** 训练类型描述 */
  focusLabel: string;
};

/** 每日训练计划 */
export type DailySession = {
  modules: SessionModule[];
  totalModules: number;
  dailyMinutes: number;
};

const MODULE_DURATION_SEC = 120; // 2 分钟

const MODULE_FOCUS_LABELS = [
  "平滑追踪",
  "速度振荡",
  "大小适应",
  "高速冲刺",
  "放松测试",
  "综合训练",
];

/**
 * 根据推荐参数构建每日训练计划。
 * dailyMinutes 除以 2 得到模块数，每个模块在基准参数上做微小变化以增加多样性。
 */
export const buildDailySession = (
  rec: TrainingRecommendation,
): DailySession => {
  const totalModules = Math.max(1, Math.round(rec.dailyMinutes / 2));
  const modules: SessionModule[] = [];

  for (let i = 0; i < totalModules; i++) {
    // 每个模块速度微弱变化：从 -10% 到 +10%
    const speedFactor = 1 + (i / Math.max(1, totalModules - 1) - 0.5) * 0.2;
    const speedValue =
      Math.round(rec.speedValue * speedFactor * 10) / 10;

    // 模块大小交替大/小
    const radiusFactor = i % 2 === 0 ? 1 : 0.85;
    const baseRadiusPx = Math.round(rec.baseRadiusPx * radiusFactor);

    const focusLabel =
      MODULE_FOCUS_LABELS[i % MODULE_FOCUS_LABELS.length];

    modules.push({
      index: i + 1,
      label: `第 ${i + 1} 组`,
      baseRadiusPx,
      speedValue,
      speedUnit: "deg/s",
      durationSec: MODULE_DURATION_SEC,
      focusLabel,
    });
  }

  return {
    modules,
    totalModules,
    dailyMinutes: rec.dailyMinutes,
  };
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
    dailyMinutes: 4,
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
