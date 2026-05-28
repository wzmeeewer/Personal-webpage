import { profile, about, projects, methods, notes, contact } from "../../data/profileData";

export const overlayContent = {
  about: {
    type: "book",
    coverTitle: "关于我",
    coverSubtitle: profile.name,
    coverColor: "#8b5e4b",
    pages: [
      {
        left: { title: profile.name, body: about.short },
        right: { title: "我的日常", body: about.mirror },
      },
      {
        left: {
          title: "核心能力",
          body: about.skills.map((s) => `· ${s}`).join("\n"),
        },
        right: {
          title: "工作方式",
          body: "先观察 → 拆规则 → 建标准 → 找偏差 → 迭代。\n\n每一轮数据生产都是一次标准的进化。",
        },
      },
    ],
  },
  projects: {
    type: "book",
    coverTitle: "项目作品集",
    coverSubtitle: "多模态 AI 训练数据建设",
    coverColor: "#6b3a3a",
    pages: projects.map((p) => ({
      left: { title: p.title, body: p.intro },
      right: {
        title: "项目亮点",
        body: p.tags.map((t) => `✦ ${t}`).join("\n"),
      },
    })),
  },
  methods: {
    type: "cards",
    title: "能力与方法",
    items: methods,
  },
  notes: {
    type: "notebook",
    title: notes.title,
    body: notes.intro,
  },
  contact: {
    type: "envelope",
    title: contact.title,
    intro: contact.intro,
    lines: [
      { label: "邮箱", value: contact.email, icon: "✉" },
      { label: "微信", value: contact.wechat, icon: "💬" },
      { label: "GitHub", value: contact.github, icon: "✦" },
    ],
  },
};
