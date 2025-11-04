import { Rule, SchematicContext, strings, Tree, url, move, template, apply, chain, mergeWith } from '@angular-devkit/schematics';


// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function crearModulo(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const templateSource = apply(url('./files'), [
      template({
        ..._options,
        ...strings
      }),
      move(`src/app/${strings.dasherize(_options.name)}`)
    ]);

    const rule = chain([
      mergeWith(templateSource)
    ]);

    return rule(tree, _context)
  };
}
