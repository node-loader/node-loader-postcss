import postcss from "postcss";
import path from "path";

export async function transformSource(
  originalSource,
  context,
  defaultTransformSource
) {
  if (useLoader(context.url)) {
    const postCssConfigFilePath = path.resolve(
      process.cwd(),
      process.env.POSTCSS_CONFIG || "postcss.config.js"
    );

    const { default: postCssConfig } = await import(postCssConfigFilePath);
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
    };
  }

  return defaultTransformSource(
    originalSource,
    context,
    defaultTransformSource
  );
}

export function getFormat(url, context, defaultGetFormat) {
  if (useLoader(url)) {
    return {
      format: "module",
    };
  } else {
    return defaultGetFormat(url, context, defaultGetFormat);
  }
}

function useLoader(url) {
  return url.endsWith(".css");
}
