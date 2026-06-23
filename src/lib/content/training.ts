import type { TrainingMode } from "../engine/presets";

export const audienceNotes = [
  {
    title: "游戏玩家",
    body: "在 FPS 游戏前用追踪、快速对焦、周边视野感知和移动目标识别训练来热身，提升视觉表现。",
  },
  {
    title: "IT 从业者",
    body: "在代码、日志、仪表盘、终端、工单和多显示器工作之间，快速切换并保持专注。",
  },
  {
    title: "长时间使用屏幕的人",
    body: "在长时间阅读、会议或多标签工作后，给疲劳的眼睛做一次短暂的主动休息。",
  },
] as const;

export const trainingModeGuides = [
  {
    mode: "pursuit",
    title: "平滑追踪",
    summary: "通过跟随一个移动目标来训练平滑的视觉追踪能力。",
    steps: [
      "保持头部不动，让眼睛完成所有动作。",
      "尽可能平滑地追踪目标，而不是提前跳跃预判。",
      "使用可预测的路径来建立稳定节奏；使用随机路径或急转弯来增加目标搜索难度。",
    ],
    benefits:
      "平滑追踪有助于训练稳定追踪、移动目标对焦和在更大视觉范围内的控制眼动能力。可预测路径建立节奏感和控制力；随机路径和急转弯则增加视觉搜索和反应需求。",
  },
  {
    mode: "reactionTime",
    title: "反应跳跃",
    summary: "通过将视线快速锁定到每个新目标位置来训练快速对焦能力。",
    steps: [
      "保持头部不动，视线从目标开始。",
      "当目标跳跃时，找到新位置并在下次跳跃前真正对焦上去。",
      "用较慢速度练习干净对焦；提高速度时可作为更强的反应训练。",
    ],
    benefits:
      "反应跳跃训练快速目标捕捉、跳跃性眼动（扫视）、周边检测和快速重新对焦能力。适合需要在不移动头部的情况下快速响应新视觉目标的场景。",
  },
  {
    mode: "mot",
    title: "多目标追踪",
    summary: "在移动干扰物中追踪最亮的目标，从而提升选择性专注力。",
    steps: [
      "保持头部不动，锁定主目标（最亮的球）。",
      "像平滑追踪一样跟随它，但不要让颜色较暗的球吸引视线。",
      "从少量干扰物开始，当能稳定锁定目标后再逐渐增加。",
    ],
    benefits:
      "多目标追踪训练选择性注意力、在视觉干扰下的追踪能力和目标身份识别。任务不仅仅是跟随运动，还需要在相似物体争夺注意力时持续选择正确的目标。",
  },
  {
    mode: "lilacChaser",
    title: "幻影追踪",
    summary: "通过将视线固定在中心十字上来训练周边视野感知。",
    steps: [
      "只看中间的黑色十字。",
      "不要用眼睛追随球体。",
      "让消失的间隙在固定圆圈周围移动。保持稳定凝视时，彩色球可能会淡出，缺失的位置可能看起来像一个移动的绿色残影。",
    ],
    benefits:
      "幻影追踪训练固视能力、周边视野感知、视觉注意力和觉察注视点以外变化的能力。对于游戏玩家，它可以作为短暂热身，帮助捕捉视野边缘的运动，而无需不断移动视线。",
  },
] as const;

export type TrainingModeGuide = (typeof trainingModeGuides)[number];

export const trainingModeNotes = trainingModeGuides.map((guide) => ({
  title: guide.title,
  body: guide.summary,
}));

export const getTrainingModeGuide = (mode: TrainingMode) =>
  trainingModeGuides.find((guide) => guide.mode === mode) ??
  trainingModeGuides[0];

export const safetyNote =
  "本工具为练习软件，非医疗手段。如感到眼部疲劳、头晕、头痛、恶心或任何不适，请立即停止。";

export const referenceLinks = [
  {
    label: "平滑追踪眼动的视觉引导",
    url: "https://pubmed.ncbi.nlm.nih.gov/20510853/",
  },
  {
    label: "平滑追踪中的空间注意力分配",
    url: "https://pubmed.ncbi.nlm.nih.gov/19533852/",
  },
  {
    label: "扫视反应时间影响因素",
    url: "https://pubmed.ncbi.nlm.nih.gov/33324183/",
  },
  {
    label: "周边视觉在扫视规划中的作用",
    url: "https://pubmed.ncbi.nlm.nih.gov/19146326/",
  },
  {
    label: "多目标追踪中的视觉学习",
    url: "https://pubmed.ncbi.nlm.nih.gov/18493599/",
  },
  {
    label: "幻影追踪视错觉",
    url: "https://en.wikipedia.org/wiki/Lilac_chaser",
  },
  {
    label: "FPS 眼部训练热身（HIGH FPS）",
    url: "https://www.youtube.com/watch?v=WAPKAZhOFM4",
  },
] as const;
