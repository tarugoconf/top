import lume from "lume/mod.ts";
import top from "top/mod.ts";

const site = lume();

site.use(top());
site.copy("top.svg");

export default site;
