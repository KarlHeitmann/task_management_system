import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('./app.tsx'),
  route('login', './routes/login.tsx'),
  route('help', './routes/help.tsx'),
] satisfies RouteConfig;
