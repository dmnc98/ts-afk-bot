# AFK-Bot

This project is an AFK bot which moves the mouse if there was no user input for 30 sek.

It now runs on [Deno](https://deno.com/). The npm packages (`@nut-tree-fork/nut-js`,
`@inquirer/prompts`) are pulled in through Deno's `npm:` specifiers, declared in the
import map inside `deno.json`.

## Prerequisites

Install Deno: <https://deno.com/manual/getting_started/installation>.

### Native dependencies for `@nut-tree-fork/nut-js`

`@nut-tree-fork/nut-js` links against libnut and needs a few system libraries before the
first run or compile.

**Linux** — install the X11/XTest/PNG/Xinerama dev headers:

- Debian / Ubuntu (`apt`):

  ```sh
  sudo apt-get install -y libx11-dev libxtst-dev libpng-dev libxinerama-dev
  ```

- Fedora / RHEL (`dnf`):

  ```sh
  sudo dnf install -y libX11-devel libXtst-devel libpng-devel libXinerama-devel
  ```

- openSUSE (`zypper`):

  ```sh
  sudo zypper install -y libX11-devel libXtst-devel libpng-devel libXinerama-devel
  ```

- Arch / Manjaro (`pacman`):

  ```sh
  sudo pacman -S --needed libx11 libxtst libpng libxinerama
  ```

- Alpine (`apk`):

  ```sh
  sudo apk add libx11-dev libxtst-dev libpng-dev libxinerama-dev
  ```

**macOS** — install the Xcode Command Line Tools, then grant the resulting binary
Accessibility permission (System Settings → Privacy & Security → Accessibility) so it can
synthesize input:

```sh
xcode-select --install
```

Homebrew is not required for nut-js itself.

**Windows** — no extra dependencies. nut-js ships a prebuilt native addon for
`x86_64-pc-windows-msvc`.

## Run

- `deno task start` — runs the app with the permissions it needs.
- `deno task dev` — same, but with `--watch` for auto-reload on file changes.

The first run may prompt for native module access; `@nut-tree-fork/nut-js` requires
`--allow-ffi` (already included in the task), and Deno will download the npm package on
first use.

## Type check & lint

- `deno task check` — type-check the entry module.
- `deno task lint` — run Deno's built-in linter.
- `deno task fmt` — run Deno's built-in formatter.

## Project layout

- `src/main.ts` — CLI entry; spawns the mouse-movement worker.
- `src/mouseMovement.ts` — worker module; runs the movement loop.
- `src/tools.ts` — config file helpers.
- `src/interfaces/config.interface.ts` — shared types.
- `mouseMovement.config` — runtime config written by the CLI prompts.

## Bundle to executable

Use `deno task compile` to produce a single binary.

Note: `@nut-tree-fork/nut-js` ships a native addon, so the resulting binary is only
portable to systems with a compatible runtime/loader.
