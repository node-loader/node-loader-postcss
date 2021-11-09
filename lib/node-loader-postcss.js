import postcss from "postcss";
import path from "path";
import fs from "fs/promises";
import urlModule from "url";

export async function load(url, context, defaultLoad) {
  if (useLoader(url)) {
    const postCssConfigFilePath = path.resolve(
      process.cwd(),
      process.env.POSTCSS_CONFIG || "postcss.config.js"
    );

    const { default: postCssConfig } = await import(postCssConfigFilePath);

    let originalSource;

    try {
      originalSource = (await defaultLoad(url, context, defaultLoad)).source;
    } catch (err) {
      originalSource = await fs.readFile(urlModule.fileURLToPath(url), {
        encoding: "utf-8",
      });
    }

    let css;
    try {
      const result = await postcss(postCssConfig.plugins).process(
        originalSource.toString(),
        {
          from: context.url,
          to: context.url,
        }
      );

      css = result.css;
    } catch (err) {
      console.error("@node-loader/postcss: PostCSS compilation error");
      console.error(err);
      throw err;
    }

    const source =
      "export default `" +
      css.replace(/\\/g, "\\\\").replace(/`/g, "\\`") +
      "`";

    return {
      source,
      format: "module",
    };
  }

  return defaultLoad(url, context, defaultLoad);
}

function useLoader(url) {
  return url.endsWith(".css");
}
