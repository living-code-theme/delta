// Native format regressions, exercised through this port's generator.
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {readFile} from 'node:fs/promises';
import test from 'node:test';
import {resolveAll,ANSI_ORDER} from '../scripts/palette.mjs';
import {generate} from '../src/generate.mjs';
import {mkdtemp} from 'node:fs/promises';
import {join} from 'node:path';
import {tmpdir} from 'node:os';
import {rm} from 'node:fs/promises';
import {writeFile} from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
const delta={files:()=>[],all:generate};

const flavors = resolveAll();

test("delta features parse as gitconfig without losing hex colors to comments", async (t) => {
  const dir = await mkdtemp(join(tmpdir(), "living-code-delta-"));
  t.after(() => rm(dir, { recursive: true, force: true }));
  const path = join(dir, "theme.gitconfig");
  await writeFile(path, delta.all(flavors)[0].content);
  const raw = execFileSync("git", ["config", "--file", path, "--null", "--list"], { encoding: "utf8" });
  const config = new Map(raw.split("\0").filter(Boolean).map((entry) => {
    const sep = entry.indexOf("\n");
    return [entry.slice(0, sep), entry.slice(sep + 1)];
  }));
  for (const f of flavors) {
    const get = (key) => config.get(`delta.${f.slug}.${key}`);
    assert.equal(get(f.light ? "light" : "dark"), "true");
    assert.equal(get(f.light ? "dark" : "light"), undefined);
    assert.equal(get("syntax-theme"), f.slug);
    for (const [sign, role] of [["minus", "removed"], ["plus", "added"]]) {
      assert.equal(get(`${sign}-style`), `syntax ${f.mix("bg", role, 0.12)}`);
      assert.equal(get(`${sign}-non-emph-style`), get(`${sign}-style`));
      assert.equal(get(`${sign}-emph-style`), `bold syntax ${f.mix("bg", role, 0.26)}`);
      assert.equal(get(`line-numbers-${sign}-style`), f.r(role));
    }
    assert.equal(get("zero-style"), "syntax");
    assert.equal(get("file-style"), `bold ${f.r("fg")}`);
    assert.equal(get("commit-style"), `bold ${f.r("accent")}`);
    assert.equal(get("hunk-header-file-style"), f.r("info"));
    assert.equal(get("hunk-header-line-number-style"), f.r("lineNumberActive"));
    assert.equal(get("line-numbers-zero-style"), f.r("lineNumber"));
    assert.equal(get("whitespace-error-style"), `reverse ${f.r("error")}`);
    assert.equal(get("blame-palette"), ["bg", "bgAlt", "lineHighlight", "border"].map(f.r).join(" "));
    assert.equal(get("grep-match-word-style"), `bold ${f.r("bg")} ${f.r("match")}`);
  }
});
