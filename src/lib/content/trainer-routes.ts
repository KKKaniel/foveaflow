import type { TrainingMode } from "../engine/presets";
import type { PatternId } from "../engine/types";
import type { PageSeoContent } from "./page-copy";
import { siteMetadata } from "./site";

const toTitleCase = (value: string) =>
  value
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

export type TrainerRoute = {
  slug: string;
  path: `/${string}/`;
  mode: TrainingMode;
  patternId?: PatternId;
  label: string;
  heading: string;
  title: string;
  description: string;
  indexable: boolean;
  seoContent: PageSeoContent;
};

const smoothPursuitSeoContent = {
  kicker: "平滑追踪",
  heading: "平滑追踪眼部训练",
  hero: "跟随一个移动目标，训练稳定的视觉追踪能力。",
  body: [
    "平滑追踪是 FoveaFlow 的移动目标训练模式。保持头部不动，用眼睛跟随目标，保持平滑而不是跳跃式追踪。",
    "选择简单路径建立节奏和控制感；选择更难的路径增加方向变化和目标搜索需求。",
    "将平滑追踪用于短暂的浏览器练习、游戏前热身或密集屏幕工作后的专注重置。",
  ],
  primaryCta: {
    label: "开始平滑追踪",
    href: "/smooth-pursuit/",
  },
  secondaryCta: {
    label: "查看完整指南",
    href: "/guide/",
  },
  trustNote:
    "更新于 2026 年 5 月 14 日。这是练习软件，非医疗手段。如训练感到不适，请停止。",
  faq: [
    {
      question: "平滑追踪是什么？",
      answer: "平滑追踪是一种训练，要求你尽可能平滑地用眼睛跟随一个移动目标。",
    },
    {
      question: "什么时候应该使用平滑追踪？",
      answer: "当你想要无其他干扰地练习稳定移动目标追踪时使用。",
    },
    {
      question: "哪些设置最重要？",
      answer: "速度、目标大小和路径影响最大，因为它们能快速改变难度。",
    },
    {
      question: "初学者最适合哪种路径？",
      answer: "先从可预测路径（如圆形或椭圆）开始，再逐步挑战更难的路径。",
    },
    {
      question: "平滑追踪适合作为热身吗？",
      answer: "是的。它非常适合在游戏或高强度屏幕工作前进行短暂的视觉热身。",
    },
    {
      question: "这是医疗治疗吗？",
      answer: "不是。FoveaFlow 是练习软件，不能替代专业医疗。",
    },
  ],
} satisfies PageSeoContent;

const reactionJumpsSeoContent = {
  kicker: "反应跳跃",
  heading: "反应跳跃眼部训练",
  hero: "快速锁定下一个目标，训练快速对焦能力。",
  body: [
    "反应跳跃是当平滑移动不再是重点时的训练模式。目标静止后跳到新位置。",
    "当你想要更快的目标捕捉和更干净的重新对焦时，这个模式很有用。慢速练习准确性，提速后进行更高要求的训练。",
    "反应跳跃适合作为游戏前的短暂热身或任务切换间的快速视觉重置。",
  ],
  primaryCta: {
    label: "开始反应跳跃",
    href: "/reaction-jumps/",
  },
  secondaryCta: {
    label: "对比所有训练",
    href: "/guide/",
  },
  trustNote:
    "更新于 2026 年 5 月 14 日。保持训练简短而受控。如训练引起疲劳或不适，请停止。",
  faq: [
    {
      question: "反应跳跃训练什么？",
      answer: "反应跳跃训练快速目标捕捉和从一个目标位置快速重新对焦到下一个的能力。",
    },
    {
      question: "什么时候选择它而非平滑追踪？",
      answer: "当你想要离散的目标变化而非连续运动时，选择反应跳跃。",
    },
    {
      question: "如何降低难度？",
      answer: "降低速度并增大目标大小，给自己更多时间在每次跳跃后稳定对焦。",
    },
    {
      question: "如何提高难度？",
      answer: "提高速度并缩小目标大小，要求你更快找到每个新位置。",
    },
    {
      question: "反应跳跃适合游戏前热身吗？",
      answer: "是的。它是注重快速视觉反应的游戏的良好热身训练。",
    },
    {
      question: "这是改善视力的手段吗？",
      answer: "不是。它专为练习设计，不承诺改善视力效果。",
    },
  ],
} satisfies PageSeoContent;

const multipleDistractionsSeoContent = {
  kicker: "多目标追踪",
  heading: "干扰目标追踪眼部训练",
  hero: "即使屏幕变得繁忙，也要锁定正确目标。",
  body: [
    "多目标追踪是 FoveaFlow 的干扰模式。一个目标最为重要，但其他移动物体共享屏幕并试图吸引你的注意力。",
    "当你想要练习选择性注意力和在视觉噪音下的目标身份识别时，这个模式非常合适。",
    "当平滑追踪感觉太简单，需要更真实的视觉注意挑战时，使用此训练。",
  ],
  primaryCta: {
    label: "开始干扰追踪",
    href: "/multiple-distractions/",
  },
  secondaryCta: {
    label: "先试试平滑追踪",
    href: "/smooth-pursuit/",
  },
  trustNote:
    "更新于 2026 年 5 月 14 日。从较少的干扰物或较大的目标开始，如训练变得不适请停止。",
  faq: [
    {
      question: "干扰追踪是什么？",
      answer: "在相似的移动物体争夺注意力时，跟随正确目标的任务。",
    },
    {
      question: "多目标追踪训练什么？",
      answer: "训练选择性注意力、目标身份识别和在干扰下的稳定追踪。",
    },
    {
      question: "初学者如何开始？",
      answer: "从较少的干扰物、较慢的速度和较大的主目标开始。",
    },
    {
      question: "什么时候使用这个模式？",
      answer: "当你想要比平滑追踪更繁忙、更难的追踪任务时使用。",
    },
    {
      question: "这对游戏玩家有用吗？",
      answer: "是的。对于视觉干扰较多的游戏，它可以是短暂的热身训练。",
    },
    {
      question: "这是医疗工具吗？",
      answer: "不是。它是练习软件，不是治疗或诊断工具。",
    },
  ],
} satisfies PageSeoContent;

const lilacChaserSeoContent = {
  kicker: "幻影追踪",
  heading: "幻影追踪固视与周边视野感知",
  hero: "在中心保持稳定注视，感知周围的变化。",
  body: [
    "幻影追踪与移动目标训练不同。你不是追随物体，而是将视线保持在中心十字上，同时外圈发生变化。",
    "当你抵制追随消失间隙的冲动时，这个模式效果最好。保持视线居中，放松，让效果自然发生。",
    "将幻影追踪用于短暂的固视训练、感知重置，或在更活跃的模式之间快速切换节奏。",
  ],
  primaryCta: {
    label: "开始幻影追踪",
    href: "/lilac-chaser/",
  },
  secondaryCta: {
    label: "试试其他训练",
    href: "/guide/",
  },
  trustNote:
    "更新于 2026 年 5 月 14 日。如视觉效果感觉奇怪或不适，请停止并休息。",
  faq: [
    {
      question: "幻影追踪是什么？",
      answer: "幻影追踪是一种固视训练，要求你将视线保持在中心十字上，同时外圈的图案发生变化。",
    },
    {
      question: "这个模式的目标是什么？",
      answer: "目标是稳定固视，以及更好地感知注视点以外的变化。",
    },
    {
      question: "我应该追随外圈形状吗？",
      answer: "不应该。将视线保持在中心十字上，让视觉效果在周边发生。",
    },
    {
      question: "什么时候使用这个模式？",
      answer: "当你想要以固视为主的训练而非移动目标追踪时使用。",
    },
    {
      question: "这和医疗周边视野训练一样吗？",
      answer: "不一样。这是浏览器端练习工具，不是医疗治疗。",
    },
    {
      question: "如果效果感觉奇怪或不适怎么办？",
      answer: "停止训练并休息。不要硬撑过不适感。",
    },
  ],
} satisfies PageSeoContent;

const patternSummaries: Partial<Record<PatternId, string>> = {
  randomWalk:
    "随机路径去除了重复循环的舒适感。由于目标以较难预测的方式改变方向和位置，这个训练比简单的圆形或椭圆增加了更多目标搜索难度。",
  circle:
    "圆形是最简单的重复平滑追踪路径，也是大多数用户的最佳起点。循环可预测，适合热身和速度调整。",
  ellipse:
    "椭圆保留了圆形的平静节奏，但改变了运动的宽高比。当你想要熟悉的循环但范围更广时，这是一个很好的过渡路径。",
  figureEight:
    "八字形增加了一个交叉点，这意味着目标比简单的循环更频繁地穿过中心并改变方向。",
  wave: "波浪在水平运动上引入了重复的上下节奏。它保持可读性和平滑性，而没有急转弯的突兀感。",
  diagonal:
    "对角线使用更长的角到角运动，强调更广泛的屏幕覆盖和远距离的干净追踪。",
  bounce:
    "弹跳在边缘增加了重复的反向运动。当你想要比圆形或波浪更多的方向变化和更少连续流动时，它很有用。",
  directionChange:
    "急转弯是最具挑战性的平滑追踪路径之一，因为目标会突然改变方向。",
  horizontalSweep:
    "水平扫描保持简单宽广的运动，适合在更大视觉范围内进行左右追踪。",
  verticalSweep:
    "垂直扫描与水平扫描一样简单，但改变了运动方向，适合直接的上下追踪。",
  downRightSweep:
    "右下扫描沿简单对角线从左上角向右下角移动。",
  downLeftSweep:
    "左下扫描沿简单对角线从右上角向左下角移动。",
  perimeterLoop:
    "边缘环绕将目标沿边界推进，使训练比以中心为主的循环更宽广和边缘化。",
  diamondLoop:
    "菱形环绕结合了简单重复路线与清晰的角落过渡，比圆形有更明显的方向转变。",
  clover:
    "四叶草创造重复的循环叶片，实现比圆形更多形状变化的连续运动。",
  zigZag:
    "锯齿形频繁切换方向，因此比波浪或对角线感觉更激烈。",
  stairStep:
    "阶梯创造带有离散方向段的机械路线，比随机或急转弯更容易预测。",
  lissajous:
    "利萨如曲线是更复杂的流动路径之一，目标沿着随时间改变与中心关系的循环路径移动。",
  hourglass:
    "沙漏在中间收窄后再展开，创造具有受限形状的重复交叉行为。",
  cornerTour:
    "角落巡游给屏幕的每个角落一个明确的角色，使路线宽广而有结构。",
};

type PublicPursuitPatternRoute = {
  patternId: Exclude<PatternId, "multipleObjectTracking">;
  slug: string;
  label: string;
};

const publicPursuitPatternRoutes = [
  { patternId: "randomWalk", slug: "random", label: "随机" },
  { patternId: "circle", slug: "circle", label: "圆形" },
  { patternId: "ellipse", slug: "ellipse", label: "椭圆" },
  { patternId: "figureEight", slug: "figure-eight", label: "八字形" },
  { patternId: "wave", slug: "wave", label: "波浪" },
  { patternId: "diagonal", slug: "diagonal", label: "对角线" },
  { patternId: "bounce", slug: "bounce", label: "弹跳" },
  { patternId: "directionChange", slug: "hard-turns", label: "急转弯" },
  { patternId: "horizontalSweep", slug: "horizontal-sweep", label: "水平扫描" },
  { patternId: "verticalSweep", slug: "vertical-sweep", label: "垂直扫描" },
  { patternId: "downRightSweep", slug: "down-right-sweep", label: "右下扫描" },
  { patternId: "downLeftSweep", slug: "down-left-sweep", label: "左下扫描" },
  { patternId: "perimeterLoop", slug: "edge-loop", label: "边缘环绕" },
  { patternId: "diamondLoop", slug: "diamond-loop", label: "菱形环绕" },
  { patternId: "clover", slug: "clover", label: "四叶草" },
  { patternId: "zigZag", slug: "zigzag", label: "锯齿形" },
  { patternId: "stairStep", slug: "stair-steps", label: "阶梯" },
  { patternId: "lissajous", slug: "lissajous", label: "利萨如曲线" },
  { patternId: "hourglass", slug: "hourglass", label: "沙漏" },
  { patternId: "cornerTour", slug: "corner-tour", label: "角落巡游" },
] satisfies readonly PublicPursuitPatternRoute[];

const buildPatternSeoContent = (
  label: string,
  path: `/${string}/`,
  patternId: PatternId,
) =>
  ({
    kicker: "平滑追踪路径",
    heading: `${label}平滑追踪训练`,
    hero: `使用${label}路径进行短暂的平滑追踪练习。`,
    body: [
      patternSummaries[patternId] ??
        `${label}路径加载专属的平滑追踪模式，让你立即开始该类型的移动目标练习。`,
      "从舒适的速度和中等目标大小开始，只有当你能稳定锁定目标时再提升难度。",
    ],
    primaryCta: {
      label: `开始${label}`,
      href: path,
    },
    secondaryCta: {
      label: "打开平滑追踪",
      href: "/smooth-pursuit/",
    },
    trustNote:
      "更新于 2026 年 5 月 14 日。这是浏览器端练习工具，非医疗手段。",
    faq: [
      {
        question: `${label}训练是什么？`,
        answer:
          "这是一个平滑追踪路径页面，加载匹配路径后可立即开始该类型的移动目标练习。",
      },
      {
        question: `${label}路径有什么特别之处？`,
        answer:
          "路径形状改变了运动的可预测性以及目标改变方向的频率。",
      },
      {
        question: "如何让这个路径更简单？",
        answer:
          "降低速度、增大目标大小，并保持轨迹可见，直到你能稳定跟上目标为止。",
      },
      {
        question: "如何让这个路径更难？",
        answer:
          "提高速度、缩小目标大小，或从简单循环切换到更具挑战性的路径。",
      },
    ],
  }) satisfies PageSeoContent;

export const trainerRoutes = [
  {
    slug: "smooth-pursuit",
    path: "/smooth-pursuit/",
    mode: "pursuit",
    patternId: "randomWalk",
    label: "平滑追踪",
    heading: "平滑追踪眼部训练",
    title: `${siteMetadata.name} - 免费在线平滑追踪视觉训练工具`,
    description:
      "免费在线视觉训练工具，专注于平滑追踪、视觉追踪和稳定移动目标练习。无需注册或安装，直接在浏览器中使用。",
    indexable: true,
    seoContent: smoothPursuitSeoContent,
  },
  ...publicPursuitPatternRoutes.map((patternRoute) => ({
    slug: patternRoute.slug,
    path: `/${patternRoute.slug}/` as const,
    mode: "pursuit" as const,
    patternId: patternRoute.patternId,
    label: patternRoute.label,
    heading: `${patternRoute.label}平滑追踪眼部训练`,
    title: `${siteMetadata.name} - ${patternRoute.label}平滑追踪训练`,
    description: `在线练习${patternRoute.label}平滑追踪路径。可调整速度、目标大小、颜色、轨迹和屏幕比例，进行短暂的视觉追踪训练。`,
    indexable: false,
    seoContent: buildPatternSeoContent(
      patternRoute.label,
      `/${patternRoute.slug}/`,
      patternRoute.patternId,
    ),
  })),
  {
    slug: "reaction-jumps",
    path: "/reaction-jumps/",
    mode: "reactionTime",
    label: "反应跳跃",
    heading: "反应跳跃眼部训练",
    title: `${siteMetadata.name} - 免费在线反应跳跃视觉训练工具`,
    description:
      "免费在线视觉训练工具，专注于快速对焦、目标捕捉和快速视觉反应练习。无需注册或安装，直接在浏览器中使用。",
    indexable: true,
    seoContent: reactionJumpsSeoContent,
  },
  {
    slug: "multiple-distractions",
    path: "/multiple-distractions/",
    mode: "mot",
    label: "多目标追踪",
    heading: "干扰目标追踪眼部训练",
    title: `${siteMetadata.name} - 免费在线多目标追踪视觉训练工具`,
    description:
      "免费在线视觉训练工具，专注于选择性注意力、干扰追踪和视觉干扰下的专注训练。无需注册或安装，直接在浏览器中使用。",
    indexable: true,
    seoContent: multipleDistractionsSeoContent,
  },
  {
    slug: "lilac-chaser",
    path: "/lilac-chaser/",
    mode: "lilacChaser",
    label: "幻影追踪",
    heading: "幻影追踪固视与周边视野感知",
    title: `${siteMetadata.name} - 免费在线幻影追踪视觉训练工具`,
    description:
      "免费在线视觉训练工具，专注于稳定固视、周边视野感知和觉察中心焦点以外的变化。无需注册或安装，直接在浏览器中使用。",
    indexable: true,
    seoContent: lilacChaserSeoContent,
  },
] satisfies TrainerRoute[];

export const indexableTrainerRoutes = trainerRoutes.filter(
  (route) => route.indexable,
);

export const findTrainerRoute = (slug: string | undefined) => {
  if (!slug) return null;
  return trainerRoutes.find((route) => route.slug === slug) ?? null;
};

export const getRouteSlugFromPath = (path: string) =>
  path.split("?")[0]?.split("/").filter(Boolean)[0] ?? "";

export const getTrainerRoute = (mode: TrainingMode, patternId: PatternId) => {
  if (mode === "reactionTime") return findTrainerRoute("reaction-jumps");
  if (mode === "mot") return findTrainerRoute("multiple-distractions");
  if (mode === "lilacChaser") return findTrainerRoute("lilac-chaser");

  return (
    trainerRoutes.find(
      (route) => route.mode === "pursuit" && route.patternId === patternId,
    ) ?? null
  );
};
