import type { Calibration } from "./calibration";
import type { SizeProfile, SpeedProfile } from "./profiles";
import type { PatternId, SpeedSetting, TargetShape } from "./types";

export type TrainingMode = "pursuit" | "reactionTime" | "mot" | "lilacChaser";
export type LetterWeight = 400 | 500 | 600 | 700 | 800;

export type ExercisePreset = {
  id: TrainingMode;
  name: string;
  patternId: PatternId;
  speed: SpeedSetting;
  baseRadiusPx: number;
  speedProfile: SpeedProfile;
  sizeProfile: SizeProfile;
  targetCount: number;
  distractorCount: number;
  colorA: string;
  colorB: string;
};

export type TrainerSettings = {
  presetId: TrainingMode;
  patternId: PatternId;
  speed: SpeedSetting;
  baseRadiusPx: number;
  speedProfile: SpeedProfile;
  sizeProfile: SizeProfile;
  targetCount: number;
  distractorCount: number;
  showTrail: boolean;
  ballColor: string;
  distractorBrightness: number;
  targetOpacity: number;
  targetShape: TargetShape;
  motionDirection: 1 | -1;
  letterEnabled: boolean;
  letterColor: string;
  letterWeight: LetterWeight;
  letterScale: number;
  lilacChaserScale: number;
  lilacChaserBallColor: string;
  calibration: Calibration;
};

export const DEFAULT_BALL_COLOR = "#76d900";
export const DEFAULT_LETTER_SCALE = 0.5;

export const exercisePresets = [
  {
    id: "pursuit",
    name: "平滑追踪",
    patternId: "randomWalk",
    speed: { unit: "deg/s", value: 20 },
    baseRadiusPx: 35,
    speedProfile: { kind: "constant" },
    sizeProfile: { kind: "constant" },
    targetCount: 1,
    distractorCount: 0,
    colorA: "#f5c842",
    colorB: "#3ddbd9",
  },
  {
    id: "reactionTime",
    name: "反应跳跃",
    patternId: "teleport",
    speed: { unit: "deg/s", value: 20 },
    baseRadiusPx: 35,
    speedProfile: { kind: "constant" },
    sizeProfile: { kind: "constant" },
    targetCount: 1,
    distractorCount: 0,
    colorA: "#f5c842",
    colorB: "#3ddbd9",
  },
  {
    id: "mot",
    name: "多目标追踪",
    patternId: "multipleObjectTracking",
    speed: { unit: "deg/s", value: 20 },
    baseRadiusPx: 35,
    speedProfile: { kind: "constant" },
    sizeProfile: { kind: "constant" },
    targetCount: 1,
    distractorCount: 5,
    colorA: "#3ddbd9",
    colorB: "#f5c842",
  },
  {
    id: "lilacChaser",
    name: "幻影追踪",
    patternId: "circle",
    speed: { unit: "deg/s", value: 20 },
    baseRadiusPx: 35,
    speedProfile: { kind: "constant" },
    sizeProfile: { kind: "constant" },
    targetCount: 1,
    distractorCount: 0,
    colorA: "#f65ac2",
    colorB: "#111111",
  },
] satisfies ExercisePreset[];

export const patternOptions: Array<{ id: PatternId; name: string }> = [
  { id: "randomWalk", name: "随机" },
  { id: "circle", name: "圆形" },
  { id: "ellipse", name: "椭圆" },
  { id: "figureEight", name: "八字形" },
  { id: "wave", name: "波浪" },
  { id: "diagonal", name: "对角线" },
  { id: "bounce", name: "弹跳" },
  { id: "directionChange", name: "急转弯" },
  { id: "horizontalSweep", name: "水平扫描" },
  { id: "verticalSweep", name: "垂直扫描" },
  { id: "downRightSweep", name: "右下扫描" },
  { id: "downLeftSweep", name: "左下扫描" },
  { id: "perimeterLoop", name: "边缘环绕" },
  { id: "diamondLoop", name: "菱形环绕" },
  { id: "clover", name: "四叶草" },
  { id: "zigZag", name: "锯齿" },
  { id: "stairStep", name: "阶梯" },
  { id: "lissajous", name: "利萨如曲线" },
  { id: "hourglass", name: "沙漏" },
  { id: "cornerTour", name: "角落巡游" },
  { id: "multipleObjectTracking", name: "多目标追踪" },
];

export const firstPreset = exercisePresets[0];

export const getPreset = (id: string) => {
  return exercisePresets.find((preset) => preset.id === id) ?? firstPreset;
};

export const settingsFromPreset = (
  preset: ExercisePreset,
  calibration: Calibration,
  overrides: Partial<TrainerSettings> = {},
): TrainerSettings => ({
  presetId: preset.id,
  patternId: preset.patternId,
  speed: { ...preset.speed },
  baseRadiusPx: preset.baseRadiusPx,
  speedProfile: { ...preset.speedProfile },
  sizeProfile: { ...preset.sizeProfile },
  targetCount: preset.targetCount,
  distractorCount: preset.distractorCount,
  showTrail: false,
  ballColor: DEFAULT_BALL_COLOR,
  distractorBrightness: 0.7,
  targetOpacity: 1,
  targetShape: "circle",
  motionDirection: 1,
  letterEnabled: false,
  letterColor: "#000000",
  letterWeight: 600,
  letterScale: DEFAULT_LETTER_SCALE,
  lilacChaserScale: 1,
  lilacChaserBallColor: "#ff00fe",
  calibration,
  ...overrides,
});
