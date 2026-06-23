import type { LetterWeight, TrainingMode } from "$lib/engine/presets";
import { getPreset, patternOptions } from "$lib/engine/presets";
import type { PatternId, SpeedUnit, TargetShape } from "$lib/engine/types";
import { behaviorOptions, type BehaviorId } from "$lib/trainer/behavior";

export type ControlIconId =
  | "target"
  | "motion"
  | "eye"
  | "calibration"
  | "theme"
  | "reset";

export type ControlSectionId =
  | "session"
  | "drill"
  | "targets"
  | "motion"
  | "screen"
  | "defaults";

export type ControlSection = {
  id: ControlSectionId;
  label: string;
  icon: ControlIconId;
  hideInLilacChaser?: boolean;
};

export const guideUseCasesByMode: Record<TrainingMode, readonly string[]> = {
  pursuit: ["视觉追踪", "游戏热身", "屏幕疲劳恢复"],
  reactionTime: ["快速重新对焦", "目标捕捉", "反应热身"],
  mot: ["选择性注意力", "视觉干扰训练", "游戏感知"],
  lilacChaser: ["稳定注视", "周边视野感知", "屏幕疲劳重置"],
};

export const homepageGuideUseCases = [
  "FPS 热身",
  "护眼休息",
  "视觉训练",
] as const;

const controlSections = [
  {
    id: "session",
    label: "训练会话",
    icon: "theme",
  },
  {
    id: "drill",
    label: "训练模式",
    icon: "target",
  },
  {
    id: "targets",
    label: "目标设置",
    icon: "eye",
    hideInLilacChaser: true,
  },
  {
    id: "motion",
    label: "运动控制",
    icon: "motion",
    hideInLilacChaser: true,
  },
  {
    id: "screen",
    label: "屏幕校准",
    icon: "calibration",
    hideInLilacChaser: true,
  },
  {
    id: "defaults",
    label: "恢复默认",
    icon: "reset",
  },
] as const satisfies readonly ControlSection[];

const lilacChaserControlSections = controlSections.filter(
  (section: ControlSection) => !section.hideInLilacChaser,
);

export const getAvailableControlSections = (isLilacChaserMode: boolean) => {
  return isLilacChaserMode ? lilacChaserControlSections : controlSections;
};

export const resolveControlSection = (
  activeSection: ControlSectionId,
  availableSections: readonly ControlSection[],
): ControlSectionId => {
  const fallback = availableSections[0]?.id ?? "session";
  return availableSections.some((section) => section.id === activeSection)
    ? activeSection
    : fallback;
};

export const getControlSectionLabel = (
  sectionId: ControlSectionId,
  availableSections: readonly ControlSection[],
) => {
  return (
    availableSections.find((section) => section.id === sectionId)?.label ??
    "设置"
  );
};

const getOptionName = (
  options: ReadonlyArray<{ id: string | number; name: string }>,
  id: string | number,
) => options.find((option) => option.id === id)?.name ?? String(id);

export const getPresetName = (id: string) => getPreset(id).name;

export const shapeOptions = [
  { id: "circle", name: "圆形" },
  { id: "ring", name: "圆环" },
  { id: "square", name: "方形" },
  { id: "diamond", name: "菱形" },
  { id: "triangle", name: "三角形" },
  { id: "cross", name: "十字形" },
] as const satisfies ReadonlyArray<{ id: TargetShape; name: string }>;

export const letterScaleByShape: Record<TargetShape, number> = {
  circle: 1,
  ring: 0.82,
  square: 1.05,
  diamond: 0.86,
  triangle: 0.76,
  cross: 0.72,
};

export const letterWeightOptions = [
  { id: 400, name: "常规" },
  { id: 500, name: "中等" },
  { id: 600, name: "半粗" },
  { id: 700, name: "粗体" },
  { id: 800, name: "特粗" },
] as const satisfies ReadonlyArray<{ id: LetterWeight; name: string }>;

export const getPatternName = (id: PatternId) =>
  getOptionName(patternOptions, id);

export const getBehaviorName = (id: BehaviorId) =>
  getOptionName(behaviorOptions, id);

export const getShapeName = (id: TargetShape) =>
  getOptionName(shapeOptions, id);

export const getLetterWeightName = (id: LetterWeight) =>
  getOptionName(letterWeightOptions, id);

export const maxSpeedByUnit: Record<SpeedUnit, number> = {
  "deg/s": 100,
  "cm/s": 143,
  "screen/s": 6,
};

export const speedStepByUnit: Record<SpeedUnit, number> = {
  "deg/s": 1,
  "cm/s": 1,
  "screen/s": 0.05,
};

const pursuitPatternOptions = patternOptions.filter(
  (option) => option.id !== "multipleObjectTracking",
);

const unpredictivePatternIds = [
  "randomWalk",
  "directionChange",
] as const satisfies readonly PatternId[];

const fixedDirectionPatternIds = [
  "randomWalk",
  "directionChange",
  "diagonal",
  "bounce",
  "horizontalSweep",
  "verticalSweep",
  "downRightSweep",
  "downLeftSweep",
] as const satisfies readonly PatternId[];

const unpredictivePatternIdSet: ReadonlySet<PatternId> = new Set(
  unpredictivePatternIds,
);
const pursuitPatternIdSet: ReadonlySet<PatternId> = new Set(
  pursuitPatternOptions.map((option) => option.id),
);
const fixedDirectionPatternIdSet: ReadonlySet<PatternId> = new Set(
  fixedDirectionPatternIds,
);

const isUnpredictivePattern = (patternId: PatternId) =>
  unpredictivePatternIdSet.has(patternId);

export const canPatternToggleDirection = (patternId: PatternId) =>
  pursuitPatternIdSet.has(patternId) &&
  !fixedDirectionPatternIdSet.has(patternId);

export const unpredictivePatternOptions = pursuitPatternOptions.filter(
  (option) => isUnpredictivePattern(option.id),
);

export const predictivePatternOptions = pursuitPatternOptions.filter(
  (option) => !isUnpredictivePattern(option.id),
);

export const lilacChaserColorOptions = [
  { id: "#ff00fe", name: "品红" },
  { id: "#ff3030", name: "红色" },
  { id: "#245cff", name: "蓝色" },
  { id: "#ffcc00", name: "金色" },
  { id: "#00d7ff", name: "青色" },
] as const;

export const getLilacChaserColorName = (id: string) =>
  getOptionName(lilacChaserColorOptions, id);
