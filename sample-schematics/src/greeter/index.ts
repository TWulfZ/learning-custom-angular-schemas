import { strings } from '@angular-devkit/core';
import { apply, Rule, SchematicContext, Tree, url, template, mergeWith } from '@angular-devkit/schematics';
import { Schema } from './schema';


// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function greeter(_options: Schema): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const sourceTemplate = url('./files');
    const parametirizedTemplate = apply(sourceTemplate, [
      template({
        ..._options,
        ...strings,
      })
    ]);
    tree = mergeWith(parametirizedTemplate)(tree, _context) as Tree;
    return tree;
  };
}
