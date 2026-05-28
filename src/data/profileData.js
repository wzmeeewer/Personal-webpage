export const profile = {
  name: "武智敏",
  role: "AI 多模态训练师 · 图像数据专家",
  intro:
    "一个把「主观感受」变成「客观标准」的多模态 AI 训练师。深耕图文生图与图生文数据建设，让模型学会看构图、辨细节、理解图文关系。",
  signature: "用观察和标准让 AI 更懂图像",
};

export const about = {
  title: "关于我",
  short:
    "我对图像细节和审美判断天然敏感，擅长把「这张图哪里不对劲」拆解成可标注、可培训、可质检的规则。",
  mirror:
    "我的工作习惯是先观察画面哪里出了问题，再把问题拆成规则、样例和质检维度。对我来说，AI 训练不是机械标注，而是让模型逐渐理解图像与文字之间的对应关系——一张好图为什么好，一条 Prompt 为什么能出对图，这些都需要被定义、被量化、被迭代。",
  skills: [
    "图像审美与构图判断",
    "Prompt 工程与数据标准设计",
    "多模态数据生产流程管理",
    "团队协作与 SOP 落地执行",
  ],
};

export const projects = [
  {
    id: "project-01",
    title: "跨境电商 Text-to-Image 多模态项目",
    intro:
      "主导电商文生图训练数据建设。从零搭建 Prompt 分类体系与评分 SOP，覆盖商品图、场景图、模特图三大场景。通过 8 轮迭代持续优化数据质量，最终将单条数据生产成本降低 70%，支撑模型生成效果达到商用标准。",
    tags: ["1 万条图文对", "8 轮迭代优化", "成本降低 70%"],
  },
  {
    id: "project-02",
    title: "电商图生文 AI 助手多模态项目",
    intro:
      "主导图生文训练数据建设，聚焦多图输入场景下的图文一致性判断与合规风控。管理 16 人标注团队，建立跨图关联校验规则与敏感内容分级标准，累计交付 4 万条高质量图文对，支撑 AI 文案助手上线。",
    tags: ["4 万条图文对", "16 人团队管理", "合规风控体系"],
  },
];

export const methods = [
  {
    title: "看见画面",
    description:
      "一眼判断清晰度、构图、光影、细节还原度——把「好看」「不好看」翻译成可检查的维度。",
  },
  {
    title: "拆解任务",
    description:
      "把模糊需求拆成 Prompt 结构、正负样例、评分维度和可执行的数据生产流程。",
  },
  {
    title: "建立标准",
    description:
      "让审美判断变成可培训的 SOP、可复盘的标注指南、可自动化质检的规则。",
  },
  {
    title: "发现偏差",
    description:
      "通过 Bad Case 归因反向推动规则迭代，让模型需求和标注标准持续对齐。",
  },
];

export const notes = {
  title: "工作笔记",
  intro:
    "记录 Prompt 偏差、图文不一致案例、规则盲区和质检问题。把每一次踩坑变成下一轮标准的养料——经验不沉淀，就等于没有经验。",
};

export const contact = {
  title: "联系我",
  intro: "欢迎围绕 AI 训练数据、图像理解、AIGC 项目合作交流。",
  email: "1871739311@qq.com",
  wechat: "15181099129",
  github: "1871739311@qq.com",
};

export default {
  profile,
  about,
  projects,
  methods,
  notes,
  contact,
};
