import lume from "lume/mod.ts";
import top from "top/mod.ts";

const site = lume();

site.use(top());

export default site;
