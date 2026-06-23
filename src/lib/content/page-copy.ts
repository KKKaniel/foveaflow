export const faqItems = [
  {
    question: "FoveaFlow 是什么？",
    answer:
      "FoveaFlow 是一款免费的在线眼部训练应用，专注于视觉追踪、对焦、反应速度和周边视野感知。包含平滑追踪、反应跳跃、幻影追踪和干扰目标追踪，无需注册或安装。",
  },
  {
    question: "FoveaFlow 免费吗？",
    answer:
      "是的。FoveaFlow 完全免费，无需账号、订阅或付费方案。",
  },
  {
    question: "平滑追踪模式是什么？",
    answer:
      "平滑追踪是一种移动目标眼部训练。保持头部不动，用眼睛追踪目标。可预测路径建立稳定控制力；随机路径和急转弯增加目标搜索难度。",
  },
  {
    question: "反应跳跃模式是什么？",
    answer:
      "反应跳跃训练快速对焦能力。目标静止后跳到新位置，你需要快速找到并在下次移动前对焦上去。",
  },
  {
    question: "多目标追踪模式是什么？",
    answer:
      "多目标追踪是在视觉干扰下的专注训练。跟随最亮的球，同时其他较暗的球也在同一空间移动，争夺你的注意力。",
  },
  {
    question: "幻影追踪模式是什么？",
    answer:
      "幻影追踪是一种周边视觉和对焦训练。将视线保持在中心十字上，固定圆圈上每次消失一个球。稳定凝视时，许多人会在消失的球的位置感知到一个移动的绿色残影。",
  },
  {
    question: "FoveaFlow 能改善视力或反应时间吗？",
    answer:
      "FoveaFlow 可能帮助训练追踪、重新对焦、周边感知、处理速度和反应时机等视觉技能。效果因人而异，如有眼部疾病或持续症状，不能替代专业医疗诊治。",
  },
  {
    question: "FoveaFlow 适合游戏玩家吗？",
    answer:
      "是的。在 FPS 游戏或其他需要追踪目标和判断移动的游戏前，将 FoveaFlow 作为快速视觉热身工具使用。",
  },
  {
    question: "FoveaFlow 对 IT 从业者有用吗？",
    answer:
      "是的。它为开发者、系统管理员和支持团队提供在代码、日志、仪表盘、终端、工单和多窗口之间的短暂视觉重置。",
  },
  {
    question: "FoveaFlow 能缓解屏幕引起的眼部疲劳吗？",
    answer:
      "FoveaFlow 可以在长时间使用屏幕期间作为短暂的主动休息。如果使用屏幕引起疼痛、头晕、头痛或持续症状，请停止并寻求专业建议。",
  },
  {
    question: "需要账号或安装应用吗？",
    answer:
      "不需要。该工具在现代浏览器中运行，设置保存在本地浏览器中。",
  },
  {
    question: "可以调整哪些设置？",
    answer:
      "可以调整模式、运动路径、目标大小、速度、形状、颜色、透明度、轨迹、干扰物数量、观看距离、屏幕比例，以及幻影追踪的大小和颜色。",
  },
  {
    question: "可以在手机上使用 FoveaFlow 吗？",
    answer:
      "可以，但更大的屏幕能给移动目标提供更多空间。桌面、笔记本或平板通常更适合较长的追踪路径。",
  },
] as const;

export const guideFaqItems = [
  {
    question: "哪种训练最适合稳定追踪？",
    answer:
      "当目标是尽可能平稳地跟随一个移动目标时，平滑追踪是最佳起点。",
  },
  {
    question: "哪种训练最适合快速对焦？",
    answer:
      "反应跳跃最适合需要快速找到新目标位置并在下次移动前锁定的场景。",
  },
  {
    question: "屏幕内容繁杂时哪种训练最好？",
    answer:
      "多目标追踪是在视觉干扰下练习选择性注意力的最佳选择。",
  },
  {
    question: "哪种训练最适合固视和边缘视野感知？",
    answer:
      "幻影追踪最适合希望将视线保持在中心并觉察周围变化的场景。",
  },
  {
    question: "应该先调整哪些设置？",
    answer:
      "先调整速度和目标大小。它们通常对难度和控制感影响最大。",
  },
  {
    question: "训练时长应该多长？",
    answer:
      "保持短暂而专注的训练。目标是有意识的练习，而不是硬撑过不适感。",
  },
] as const;

export type PageFaqItem = {
  question: string;
  answer: string;
};

export type PageSeoContent = {
  kicker: string;
  heading: string;
  hero: string;
  body: readonly string[];
  primaryCta: {
    label: string;
    href: `/${string}`;
  };
  secondaryCta?: {
    label: string;
    href: `/${string}`;
  };
  trustNote: string;
  faq: readonly PageFaqItem[];
};

export const homepageSeoContent = {
  kicker: "免费浏览器工具",
  heading: "免费在线视觉训练工具",
  hero: "在浏览器中训练视觉追踪、快速对焦、周边视野感知和干扰下的专注力。",
  body: [
    "FoveaFlow 是一款免费在线视觉训练工具，专注于视觉追踪、快速对焦、周边视野感知和干扰下的专注训练。无需注册或安装，直接在浏览器中运行。",
    "使用平滑追踪跟随单个移动目标，使用反应跳跃将视线快速锁定到新目标位置，使用多目标追踪在视觉干扰中追踪正确目标，使用幻影追踪在保持固视的同时感知周边变化。",
    "将 FoveaFlow 用作短暂的 FPS 热身、主动护眼休息，或专注的视觉训练课程。",
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
    "更新于 2026 年 5 月 14 日。FoveaFlow 是练习软件，非医疗手段。如训练引起眼部疲劳、头晕、头痛、恶心或任何不适，请立即停止。",
  faq: faqItems,
} satisfies PageSeoContent;

export const guideMetadata = {
  title: "FoveaFlow 指南 - 眼部训练模式与视觉追踪设置",
  heading: "FoveaFlow 指南",
  description:
    "选择适合你的 FoveaFlow 训练模式，涵盖视觉追踪、快速对焦、周边视野感知、FPS 热身和干扰下专注训练。",
  summary:
    "使用本指南选择适合视觉追踪、快速对焦、周边视野感知、FPS 热身或干扰下专注训练的 FoveaFlow 模式。",
} as const;
