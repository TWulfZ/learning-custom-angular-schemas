import {
  apply,
  chain,
  MergeStrategy,
  mergeWith,
  move,
  Rule,
  SchematicContext,
  SchematicsException,
  strings,
  template,
  Tree,
  url,
} from "@angular-devkit/schematics";
import { createDefaultPath, getWorkspace } from "@schematics/angular/utility/workspace";
import { parseName } from "@schematics/angular/utility/parse-name";
import { Schema } from "./schema";

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function httpResource(_options: Schema): Rule {
  return async (tree: Tree, _context: SchematicContext) => {
    const workspace = await getWorkspace(tree);
    if (!_options.project) {
      _options.project = workspace.projects.keys().next().value;
    }

    const project = workspace.projects.get(_options.project);
    if (!project) {
      throw new SchematicsException(`Invalid project name: ${_options.project}`);
    }

    if (_options.path === undefined) {
      _options.path = await createDefaultPath(tree, _options.project);
    }

    const parsePath = parseName(_options.path, _options.name);
    _options.name = parsePath.name;
    _options.path = parsePath.path;

    const sourceTemplate = url("./files");
    const sourceParametirizedTemplate = apply(sourceTemplate, [
      template({
        ..._options,
        ...strings,
      }),
      move(parsePath.path),
    ]);

    return chain([mergeWith(sourceParametirizedTemplate, MergeStrategy.Overwrite)]);
  };
}
