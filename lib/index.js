/**
 * Host half of the orca-aquarium-backdrop bundle.
 *
 * The backdrop is a rendering concern only, so this half registers nothing:
 * `lib/client.js` owns the Shell slot entry and the three.js scene. The row
 * still exists so the bundle shows up in Plugin Manager with its own title,
 * description, and icon.
 */
export function apply() { }
