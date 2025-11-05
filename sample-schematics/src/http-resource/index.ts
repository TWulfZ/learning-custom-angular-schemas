import { apply, mergeWith, Rule, SchematicContext, strings, template, Tree, url } from '@angular-devkit/schematics';


// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function httpResource(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const sourceTemplate = url('./files');

    const parameterizedTemplate = apply(sourceTemplate, [
      template({
        ..._options,
        ...strings
      })
    ]);
    
    tree = mergeWith(parameterizedTemplate)(tree, _context) as Tree;
    return tree;
  };
}
