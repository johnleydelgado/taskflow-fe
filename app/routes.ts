import { route, index, type RouteConfig } from "@react-router/dev/routes";

export default [
  // GET /            → app/routes/home.tsx
  index("./routes/home/home.tsx"),

  // GET /login       → app/routes/login.tsx
  route("login", "./routes/login.tsx"),

  // GET /approval    → app/routes/approval/ApprovalPathPage.tsx
  route("approval/:token", "./routes/approval/index.tsx"),
] satisfies RouteConfig;
