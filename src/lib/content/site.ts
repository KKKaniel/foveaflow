export const siteMetadata = {
  name: "FoveaFlow",
  alternateName: "Fovea Flow",
  title: "FoveaFlow - 免费在线视觉训练工具",
  description:
    "免费在线视觉训练工具，专注于视觉追踪、快速对焦、周边视野感知和干扰下的专注训练。无需注册或安装，直接在浏览器中使用。",
  shortDescription:
    "免费在线视觉训练工具，专注于视觉追踪、快速对焦、周边视野感知和干扰下的专注训练。",
  imagePath: "/metadata/og.jpg",
  repositoryUrl: "https://github.com/Jesper-N/foveaflow",
  licenseUrl: "https://github.com/Jesper-N/foveaflow/blob/main/LICENSE",
  lastUpdated: "2026-05-28",
  entityDescription:
    "FoveaFlow 是一款免费在线视觉训练工具，适用于视觉追踪、快速对焦、干扰目标追踪和周边视野感知训练。专为游戏玩家、开发者、系统管理员、支持团队等长期使用屏幕的人群设计。",
  keywords: [
    "视觉训练",
    "免费视觉训练",
    "在线视觉训练",
    "免费在线视觉训练",
    "视觉训练应用",
    "FPS 视觉训练",
    "免费眼部追踪训练",
    "免费在线眼部训练",
    "眼部训练练习",
    "FPS 眼部训练练习",
    "眼部对焦练习",
    "视觉专注训练",
    "平滑追踪练习",
    "视觉追踪练习",
    "反应时间训练",
    "多目标追踪训练",
    "周边视野练习",
    "幻影追踪练习",
    "幻影追踪视错觉",
    "周边视野感知训练",
    "浏览器视觉训练",
    "游戏眼部追踪训练",
    "FPS 眼部热身训练",
    "IT 从业者视觉追踪练习",
    "屏幕疲劳眼部追踪练习",
    "疲劳眼睛视觉追踪练习",
    "视觉处理训练",
    "视觉反应时间练习",
  ],
  sameAs: ["https://github.com/Jesper-N/foveaflow"],
} as const;

export const aiCrawlerAccess = [
  {
    userAgent: "OAI-SearchBot",
    purpose: "OpenAI crawler for ChatGPT search",
  },
  {
    userAgent: "GPTBot",
    purpose: "OpenAI crawler for model training",
  },
  {
    userAgent: "ChatGPT-User",
    purpose:
      "OpenAI agent for user-requested page visits in ChatGPT and custom GPTs",
  },
  {
    userAgent: "ClaudeBot",
    purpose: "Anthropic crawler for model training",
  },
  {
    userAgent: "Claude-User",
    purpose: "Anthropic agent for user-requested page visits in Claude",
  },
  {
    userAgent: "Claude-SearchBot",
    purpose: "Anthropic crawler for Claude search",
  },
  {
    userAgent: "PerplexityBot",
    purpose: "Perplexity search crawler",
  },
  {
    userAgent: "Perplexity-User",
    purpose: "Perplexity user-requested fetcher",
  },
  {
    userAgent: "Googlebot",
    purpose: "Google Search crawler, including AI features in Search",
  },
  {
    userAgent: "Google-Extended",
    purpose: "Google token for Gemini training and grounding",
  },
  {
    userAgent: "Google-CloudVertexBot",
    purpose: "Google crawler for Vertex AI and Gemini grounding",
  },
  {
    userAgent: "bingbot",
    purpose: "Microsoft Bing crawler for Bing and Copilot",
  },
  {
    userAgent: "Bytespider",
    purpose: "ByteDance crawler for AI search and model training",
  },
  {
    userAgent: "CCBot",
    purpose: "Common Crawl crawler used by AI labs and search systems",
  },
  {
    userAgent: "Meta-ExternalAgent",
    purpose: "Meta crawler for AI model training",
  },
  {
    userAgent: "Meta-ExternalFetcher",
    purpose: "Meta agent for user-requested page visits",
  },
  {
    userAgent: "FacebookBot",
    purpose: "Meta crawler for AI and link preview systems",
  },
  {
    userAgent: "Applebot",
    purpose: "Apple crawler for search and Apple Intelligence features",
  },
  {
    userAgent: "Amazonbot",
    purpose: "Amazon crawler for AI and Alexa systems",
  },
  {
    userAgent: "DuckAssistBot",
    purpose: "DuckDuckGo crawler for DuckAssist AI answers",
  },
  {
    userAgent: "MistralAI-User",
    purpose: "Mistral agent for user-requested page visits",
  },
] as const;
