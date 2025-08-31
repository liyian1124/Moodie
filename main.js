import "./assets/scss/all.scss";
import "bootstrap/dist/js/bootstrap.min.js";

console.log("Hello world");

const BASE = import.meta.env.BASE_URL; // dev: '/', prod: '/Moodie/'
link.href = BASE + "pages/recommend/recom-excit.html";

export default defineConfig({
  base: "/Moodie/",
  server: {
    open: "/Moodie/pages/recommend/recom-excit.html", // 換成你要的頁
  },
  // build.rollupOptions.input 只影響 build，不影響 dev
});
