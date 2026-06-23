export type SupportPageSection = {
  heading: string;
  body?: readonly string[];
  list?: readonly string[];
  orderedList?: readonly string[];
};

export type ComparisonRow = {
  feature: string;
  foveaflow: string;
  alternative: string;
};

export type SupportPage = {
  slug: string;
  path: `/${string}/`;
  title: string;
  description: string;
  kicker: string;
  heading: string;
  summary: string;
  primaryCta: {
    label: string;
    href: `/${string}`;
  };
  secondaryCta?: {
    label: string;
    href: `/${string}`;
  };
  sections: readonly SupportPageSection[];
  comparisonLabel?: string;
  comparisonRows?: readonly ComparisonRow[];
  sourceLink?: {
    label: string;
    href: string;
  };
};

export const supportPages = [
  {
    slug: "fps-eye-training",
    path: "/fps-eye-training/",
    title: "FoveaFlow - FPS 眼部训练热身",
    description:
      "使用 FoveaFlow 作为免费的 FPS 眼部训练热身工具，涵盖视觉追踪、快速对焦、目标切换和干扰下的专注训练。",
    kicker: "FPS 热身",
    heading: "FPS 眼部训练热身",
    summary:
      "FoveaFlow 是一款免费的浏览器端 FPS 眼部训练热身工具。使用平滑追踪进行移动目标追踪，使用反应跳跃快速对焦，使用多目标追踪在视觉干扰中锁定正确目标。",
    primaryCta: {
      label: "开始热身",
      href: "/",
    },
    secondaryCta: {
      label: "查看指南",
      href: "/guide/",
    },
    sections: [
      {
        heading: "7 分钟 FPS 眼部热身方案",
        orderedList: [
          "3 分钟平滑追踪：平滑跟随目标。",
          "2 分钟反应跳跃：快速找到每个新目标位置。",
          "1 分钟多目标追踪：保持锁定最亮的目标。",
          "1 分钟幻影追踪：保持中心对焦并感知周边变化。",
        ],
      },
      {
        heading: "选择哪种训练",
        list: [
          "平滑追踪适合稳定的移动目标追踪。",
          "反应跳跃适合反应时间训练、快速对焦和目标切换。",
          "多目标追踪适合在屏幕繁忙时锁定正确目标。",
          "幻影追踪适合固视和周边视野感知。",
        ],
      },
      {
        heading: "保持简短",
        body: [
          "将 FoveaFlow 作为练习软件使用，而非医疗手段。如训练引起眼部疲劳、头晕、头痛、恶心或不适，请停止。",
        ],
      },
    ],
  },
  {
    slug: "blinkcamp-alternative",
    path: "/blinkcamp-alternative/",
    title: "FoveaFlow - BlinkCamp 眼部训练替代方案",
    description:
      "比较 FoveaFlow 和 BlinkCamp 在免费浏览器端眼部训练、视觉追踪、FPS 热身、反应跳跃和干扰追踪方面的差异。",
    kicker: "替代方案",
    heading: "FoveaFlow vs BlinkCamp",
    summary:
      "FoveaFlow 和 BlinkCamp 都是免费的浏览器端眼部训练工具。如果你需要直接的训练链接、FPS 热身用途、反应跳跃、干扰追踪以及对目标运动和外观的深度控制，FoveaFlow 更适合你。",
    primaryCta: {
      label: "试用 FoveaFlow",
      href: "/",
    },
    secondaryCta: {
      label: "对比训练模式",
      href: "/guide/",
    },
    sourceLink: {
      label: "访问 BlinkCamp",
      href: "https://blinkcamp.com/",
    },
    sections: [
      {
        heading: "最佳选择",
        body: [
          "如果你需要直接训练链接、可调节目标行为以及干净全屏画布进行短暂视觉追踪训练，选择 FoveaFlow。",
          "如果你需要一个以基础眼部训练例程和速度大小调整为核心的简洁浏览器工具，选择 BlinkCamp。",
        ],
      },
      {
        heading: "FoveaFlow 包含的功能",
        list: [
          "平滑追踪：单目标视觉追踪。",
          "反应跳跃：快速对焦训练。",
          "多目标追踪：在视觉干扰下保持专注。",
          "幻影追踪：固视和周边视野感知。",
          "速度单位、目标大小、形状、颜色、透明度、轨迹长度、运动路径、运动行为、干扰物数量、干扰物亮度、字母叠加、观看距离和屏幕比例等全面控制选项。",
        ],
      },
    ],
    comparisonLabel: "BlinkCamp",
    comparisonRows: [
      {
        feature: "可以在浏览器中免费使用吗？",
        foveaflow: "是的。无需账号或安装，直接在浏览器中运行。",
        alternative: "是的。BlinkCamp 也是免费的浏览器端眼部训练工具。",
      },
      {
        feature: "可以调整速度和目标大小吗？",
        foveaflow: "是的。速度可以用 deg/s、cm/s 或 screen/s 调整，目标大小可按训练会话设置。",
        alternative: "是的。BlinkCamp 提供简单的速度和大小控制。",
      },
      {
        feature: "可以更改目标外观吗？",
        foveaflow: "形状、颜色、透明度、轨迹长度和轨迹行为均可调整。",
        alternative: "BlinkCamp 的公开控制项较为简洁，主要集中在速度和大小上。",
      },
      {
        feature: "可以更改路径和运动行为吗？",
        foveaflow: "根据训练模式，可选择路径、方向变化、匀速、速度波动、爆发、渐进/重置和大小脉冲等选项。",
        alternative: "BlinkCamp 使用更简单的例程方式，而非暴露相同的路径和运动行为控制。",
      },
      {
        feature: "可以使用干扰物或字母叠加训练吗？",
        foveaflow: "多目标追踪包含干扰物数量和亮度控制；字母叠加包含颜色、粗细和缩放控制。",
        alternative: "BlinkCamp 更专注于简单的眼部训练例程，而非干扰物和字母叠加定制。",
      },
      {
        feature: "可以根据我的设置校准训练吗？",
        foveaflow: "观看距离和屏幕比例控制项可帮助将运动匹配到你的设置。",
        alternative: "BlinkCamp 的设置更轻量，不提供相同的观看距离和屏幕比例控制。",
      },
      {
        feature: "哪个训练模式更丰富？",
        foveaflow: "提供平滑追踪、反应跳跃、多目标追踪和幻影追踪四种独立模式。",
        alternative: "BlinkCamp 有其自己的练习集和更简洁的工作流程。",
      },
      {
        feature: "可以直接链接到某个训练吗？",
        foveaflow: "是的。主要模式和平滑追踪路径均有直接 URL。",
        alternative: "BlinkCamp 围绕其自身的例程界面组织。",
      },
      {
        feature: "有公开源代码链接吗？",
        foveaflow: "是的。GitHub 仓库链接在应用内提供。",
        alternative: "是的。BlinkCamp 也链接到 GitHub。",
      },
    ],
  },
  {
    slug: "eyetrainer-gg-alternative",
    path: "/eyetrainer-gg-alternative/",
    title: "FoveaFlow - EyeTrainer.gg FPS 眼部训练替代方案",
    description:
      "比较 FoveaFlow 和 EyeTrainer.gg 在 FPS 眼部训练、视觉追踪、反应训练、干扰控制和浏览器热身方面的差异。",
    kicker: "替代方案",
    heading: "FoveaFlow vs EyeTrainer.gg",
    summary:
      "FoveaFlow 是一款免费浏览器端眼部训练工具，适用于 FPS 热身、视觉追踪、反应跳跃、干扰追踪和周边视野感知。如果你想在浏览器中无需账号或安装即可开始训练，它是一个实用的替代选择。",
    primaryCta: {
      label: "试用 FoveaFlow",
      href: "/",
    },
    secondaryCta: {
      label: "查看 FPS 热身方案",
      href: "/fps-eye-training/",
    },
    sourceLink: {
      label: "访问 EyeTrainer.gg",
      href: "https://www.eyetrainer.gg/",
    },
    sections: [
      {
        heading: "最佳选择",
        body: [
          "如果你需要一个轻量网页应用，直接访问视觉追踪、反应、干扰和固视训练，选择 FoveaFlow。",
          "EyeTrainer.gg 也提供简单的浏览器训练模式，并在公开页面推广其即将上线的 Steam 版本。",
        ],
      },
      {
        heading: "FoveaFlow 包含的功能",
        list: [
          "平滑追踪：多种路径的移动目标追踪。",
          "反应跳跃：快速对焦训练。",
          "多目标追踪：在干扰中锁定目标。",
          "幻影追踪：固视和周边视野感知。",
          "速度单位、目标大小、形状、颜色、透明度、轨迹长度、运动路径、运动行为、干扰物、字母叠加、观看距离、屏幕比例以及幻影追踪球体缩放等模式专属选项。",
          "本地设置保存，无需账号或安装。",
        ],
      },
    ],
    comparisonLabel: "EyeTrainer.gg",
    comparisonRows: [
      {
        feature: "是否专注于 FPS 眼部训练？",
        foveaflow: "是的。FoveaFlow 包含适合追踪、对焦和干扰下专注的 FPS 热身训练。",
        alternative: "是的。EyeTrainer.gg 也定位于 FPS 眼部训练。",
      },
      {
        feature: "可以在浏览器中直接开始吗？",
        foveaflow: "是的。",
        alternative: "是的。公开页面包含简单的浏览器训练模式，同时推广 Steam 愿望清单。",
      },
      {
        feature: "需要账号或安装吗？",
        foveaflow: "不需要。FoveaFlow 在浏览器中运行，设置保存在本地。",
        alternative: "公开展示的简单浏览器模式不需要账号。Steam 版本为即将推出的应用做推广。",
      },
      {
        feature: "提供哪些训练模式？",
        foveaflow: "平滑追踪、反应跳跃、多目标追踪和幻影追踪，作为独立模式提供。",
        alternative: "EyeTrainer.gg 提供简单的路径选项，包括垂直波浪等模式。",
      },
      {
        feature: "可以自定义多少内容？",
        foveaflow: "速度单位、目标大小、形状、颜色、透明度、轨迹、路径、运动行为、干扰物、字母叠加、观看距离、屏幕比例和模式专属控制。",
        alternative: "公开浏览器页面控制简单：显示网格、暗色模式和路径选择。",
      },
      {
        feature: "可以调整目标外观和校准吗？",
        foveaflow: "目标外观、轨迹显示、干扰物亮度、字母样式、观看距离和屏幕比例均可调整。",
        alternative: "EyeTrainer.gg 的公开浏览器工具专注于简单的路径练习，而非详细的目标和显示校准。",
      },
    ],
  },
] as const satisfies readonly SupportPage[];

export const findSupportPage = (slug: string) =>
  supportPages.find((page) => page.slug === slug);
