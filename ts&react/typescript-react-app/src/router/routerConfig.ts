import Home from "../views/Home";
import MyShop from "../views/MyShop";


export default {
  routes: [
    {
      path: "/play/:id",
      component: Home
    },
    {
      path: "/look",
      component: Home,
      children: [
        {
          path: "/look/song",
          component: Home
        }, {
          path: "/look/story",
          component: Home
        }, {
          path: "/look/cartoon",
          component: Home
        },
        {
          path: "/look",
          redirect: "/look/song"
        }
      ]
    },
    {
      path: "/listen",
      component: MyShop
    },
    {
      path: "/me",
      component: Home
    },
    {
      path: "/",
      redirect: "/look"
    },
  ],
  routes2: []
}
