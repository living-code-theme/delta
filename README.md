<!-- living-code-readme:1 -->
# 🔺 Living Code for delta

**Calm slate. Living color.** Living Code for delta. Repository-owned theme files, installation instructions and four color flavors.

[Installation](#installation) · [Flavors](#flavors) · [Configuration](#configuration) · [All ports](https://github.com/living-code-theme)

## Previews

<table data-lc-flavors>
<tr>
<td width="50%" valign="top">
<strong>Night</strong><br><sub>Dark · full palette</sub><br><br>
<a href="images/night.png"><img src="images/night.png" alt="delta running Living Code Night" width="640"></a>
</td>
<td width="50%" valign="top">
<strong>Frost</strong><br><sub>Dark · softer chroma</sub><br><br>
<a href="images/frost.png"><img src="images/frost.png" alt="delta running Living Code Frost" width="640"></a>
</td>
</tr>
<tr>
<td width="50%" valign="top">
<strong>Paper</strong><br><sub>Light · near-white slate</sub><br><br>
<a href="images/paper.png"><img src="images/paper.png" alt="delta running Living Code Paper" width="640"></a>
</td>
<td width="50%" valign="top">
<strong>Signal</strong><br><sub>Dark · teal accent</sub><br><br>
<a href="images/signal.png"><img src="images/signal.png" alt="delta running Living Code Signal" width="640"></a>
</td>
</tr>
</table>

Select any preview to view the image at full size.

## Installation

First install the [tmTheme port](https://github.com/living-code-theme/tmtheme) into bat's cache for syntax colors. This port adds delta's diff backgrounds, word highlights, headers and gutters.

```sh
curl -fsSL --create-dirs -o "${XDG_CONFIG_HOME:-$HOME/.config}/delta/living-code.gitconfig" "https://raw.githubusercontent.com/living-code-theme/delta/main/living-code.gitconfig"
git config --global --add include.path "${XDG_CONFIG_HOME:-$HOME/.config}/delta/living-code.gitconfig"
git config --global core.pager delta
git config --global interactive.diffFilter "delta --color-only"
git config --global delta.features living-code-night
```

That includes the file in `~/.gitconfig` and selects a flavor. Skip the `core.pager` and `diffFilter` lines if delta is already set up.

Each flavor is a delta feature: `living-code-night`, `living-code-signal`, `living-code-frost`, `living-code-paper`.

## Flavors

Expand a flavor for its full-size preview and activation instructions.

<details data-lc-flavor="night">
<summary><strong>Night</strong> · Dark · full palette</summary>

<p><a href="images/night.png"><img src="images/night.png" alt="delta running Living Code Night" width="1280"></a></p>

```sh
git config --global delta.features living-code-night
```

</details>

<details data-lc-flavor="frost">
<summary><strong>Frost</strong> · Dark · softer chroma</summary>

<p><a href="images/frost.png"><img src="images/frost.png" alt="delta running Living Code Frost" width="1280"></a></p>

```sh
git config --global delta.features living-code-frost
```

</details>

<details data-lc-flavor="paper">
<summary><strong>Paper</strong> · Light · near-white slate</summary>

<p><a href="images/paper.png"><img src="images/paper.png" alt="delta running Living Code Paper" width="1280"></a></p>

```sh
git config --global delta.features living-code-paper
```

</details>

<details data-lc-flavor="signal">
<summary><strong>Signal</strong> · Dark · teal accent</summary>

<p><a href="images/signal.png"><img src="images/signal.png" alt="delta running Living Code Signal" width="1280"></a></p>

```sh
git config --global delta.features living-code-signal
```

</details>

## Configuration

See [delta's documentation](https://github.com/dandavison/delta) for application settings and reload behavior. The activation instructions above identify each supported flavor; keep your other application configuration.

## Compatibility

This port supplies theme files for delta, not the application itself. Install the application separately and follow the installation instructions for its supported configuration format.

## Contributing

Found a problem? [Open an issue](https://github.com/living-code-theme/delta/issues/new/choose) with the app version, the flavor and a screenshot. Want Living Code somewhere else? [Request a port](https://github.com/living-code-theme/core/issues/new?template=port-request.yml).

Pull requests are welcome. Keep this README, `port.json` and `images/` in sync, and use real screenshots of the app, never mockups.

🦎 **One chameleon, many habitats.** Part of [Living Code](https://github.com/living-code-theme).

## License

[MIT](LICENSE) © Elliot Luque
