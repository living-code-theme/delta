// This port owns its application mappings. Inputs come only from the pinned local palette.


const EMPH = 0.26;

const ROW = 0.12;

function deltaFeature(f) {
  const r = f.r;
  const tint = (role, t) => f.mix("bg", role, t);
  const styles = {
    [f.light ? "light" : "dark"]: true,
    "syntax-theme": f.slug,
    "minus-style": `syntax ${tint("removed", ROW)}`,
    "minus-non-emph-style": `syntax ${tint("removed", ROW)}`,
    "minus-emph-style": `bold syntax ${tint("removed", EMPH)}`,
    "minus-empty-line-marker-style": `normal ${tint("removed", ROW)}`,
    "plus-style": `syntax ${tint("added", ROW)}`,
    "plus-non-emph-style": `syntax ${tint("added", ROW)}`,
    "plus-emph-style": `bold syntax ${tint("added", EMPH)}`,
    "plus-empty-line-marker-style": `normal ${tint("added", ROW)}`,
    "zero-style": "syntax",
    "whitespace-error-style": `reverse ${r("error")}`,
    "line-numbers-minus-style": r("removed"),
    "line-numbers-plus-style": r("added"),
    "line-numbers-zero-style": r("lineNumber"),
    "line-numbers-left-style": r("border"),
    "line-numbers-right-style": r("border"),
    "file-style": `bold ${r("fg")}`,
    "file-decoration-style": `${r("accent")} ul`,
    "hunk-header-style": "file line-number syntax",
    "hunk-header-decoration-style": `${r("border")} box`,
    "hunk-header-file-style": r("info"),
    "hunk-header-line-number-style": r("lineNumberActive"),
    "commit-style": `bold ${r("accent")}`,
    "commit-decoration-style": `${r("accent")} box`,
    "blame-palette": ["bg", "bgAlt", "lineHighlight", "border"].map(r).join(" "),
    "blame-code-style": "syntax",
    "inline-hint-style": r("fgSubtle"),
    "grep-file-style": r("accent"),
    "grep-line-number-style": r("lineNumberActive"),
    "grep-match-line-style": `syntax ${r("lineHighlight")}`,
    "grep-match-word-style": `bold ${r("bg")} ${r("match")}`,
    "merge-conflict-ours-diff-header-style": `bold ${r("warning")}`,
    "merge-conflict-ours-diff-header-decoration-style": `${r("border")} box`,
    "merge-conflict-theirs-diff-header-style": `bold ${r("info")}`,
    "merge-conflict-theirs-diff-header-decoration-style": `${r("border")} box`,
  };
  // Quote the entire value: unquoted hex colors are comments in gitconfig.
  return `[delta "${f.slug}"]\n${Object.entries(styles).map(([k, v]) => `\t${k} = ${JSON.stringify(v)}`).join("\n")}\n`;
}

const delta = {
files: () => [],
all: (fs) => [{
    path: "living-code.gitconfig",
    content: `# Living Code for delta. Maintained in this repository.
# Syntax colors come from the matching tmTheme; install it into bat first.

${fs.map(deltaFeature).join("\n")}`,
  }]
};

export function generate(flavors) {
  return [...flavors.flatMap(f => delta.files(f)), ...(delta.all?.(flavors) ?? [])].filter(f => !["LICENSE", "README.md", "package.json", "extension.toml"].includes(f.path.split("/").at(-1)));
}
