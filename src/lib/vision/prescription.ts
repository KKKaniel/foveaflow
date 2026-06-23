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
  /** 模块编号，从 1 开始 */
  index: number;
  /** 模块标题 */
  label: string;
  /** 目标大小 (px) */
  baseRadiusPx: number;
  /** 速度 (deg/s) */
  speedValue: number;
  speedUnit: "deg/s";
  /** 训练时长（秒），固定 120 */
  durationSec: number;
  /** 模块说明 */
  description: string;
};

/** 今日训练计划 */
export type DailySession = {
  modules: SessionModule[];
  totalMinutes: number;
  durationWeeks: number;
};

const MODULE_DURATION_SEC = 120; // 2 分钟

/**
 * 根据训练推荐生成今日的模块列表。
 * 每个模块 2 分钟，共 dailyMinutes/2 个模块。
 * 各模块在基础速度/大小基础上渐进变化：
 *   - 模块 1：基础参数（热身）
 *   - 模块 2：速度 +10%（提高挑战）
 *   - 模块 3：目标缩小 15%（精度训练）
 *   - 模块 4：速度 +10% 且目标缩小 15%（应战训练）
 *   - 居其后按循环模式带差异重复
 */
export const buildDailySession = (
  rec: TrainingRecommendation,
): DailySession => {
  const count = Math.max(1, Math.round(rec.dailyMinutes / 2));
  const modules: SessionModule[] = [];

  const moduleTemplates = [
    {
      label: "热身模块",
      description: "基础参数训练，帮助眼部逐渐适应运动轨迹。",
      radiusMult: 1.0,
      speedMult: 1.0,
    },
    {
      label: "速度挑战",
      description: "提高运动速度，增强眼部快速跟踪能力。",
      radiusMult: 1.0,
      speedMult: 1.1,
    },
    {
      label: "精度训练",
      description: "缩小目标，训练眼部对小目标的精确追踪能力。",
      radiusMult: 0.85,
      speedMult: 1.0,
    },
    {
      label: "应战训练",
      description: "高速小目标，全面提升眼部追踪应变能力。",
      radiusMult: 0.85,
      speedMult: 1.1,
    },
  ];

  for (let i = 0; i < count; i++) {
    const tpl = moduleTemplates[i % moduleTemplates.length];
    // 连续循环时给予少许差异避免完全重复
    const cycleBonus = Math.floor(i / moduleTemplates.length);
    const speedBonus = cycleBonus * 0.5;

    modules.push({
      index: i + 1,
      label: tpl.label,
      baseRadiusPx: Math.round(rec.baseRadiusPx * tpl.radiusMult),
      speedValue:
        Math.round((rec.speedValue * tpl.speedMult + speedBonus) * 10) / 10,
      speedUnit: "deg/s",
      durationSec: MODULE_DURATION_SEC,
      description: tpl.description,
    });
  }

  return {
    modules,
    totalMinutes: rec.dailyMinutes,
    durationWeeks: rec.durationWeeks,
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
