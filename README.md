# AFK-Bot

This project is an AFK bot which moves the mouse if there was no user input for 30 sek.

It now runs on [Deno](https://deno.com/). The npm packages (`@nut-tree-fork/nut-js`,
`@inquirer/prompts`) are pulled in through Deno's `npm:` specifiers, declared in the
import map inside `deno.json`.

## Prerequisites

Install Deno: <https://deno.com/manual/getting_started/installation>.

## Run

- `deno task start` — runs the app with the permissions it needs.
- `deno task dev` — same, but with `--watch` for auto-reload on file changes.

The first run may prompt for native module access; `@nut-tree-fork/nut-js` requires
`--allow-ffi` (already included in the task), and Deno will download the npm package
on first use.

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
