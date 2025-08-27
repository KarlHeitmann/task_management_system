import { type RouteConfig, index, route } from '@react-router/dev/routes';

const myRoutes = [
  index('./app.tsx'),
  route('login', './login.tsx'),
  route('book-detail/:id', './routes/book-detail.tsx'),
  route('logout', './routes/logout.tsx'),
  route('help', './routes/help.tsx'),
]

console.log("myRoutes: ", myRoutes)

export default myRoutes satisfies RouteConfig;
