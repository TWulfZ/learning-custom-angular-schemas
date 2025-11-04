"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.crearModulo = crearModulo;
const schematics_1 = require("@angular-devkit/schematics");
// You don't have to export the function as default. You can also have more than one rule factory
// per file.
function crearModulo(_options) {
    return (tree, _context) => {
        const templateSource = (0, schematics_1.apply)((0, schematics_1.url)('./files'), [
            (0, schematics_1.template)(Object.assign(Object.assign({}, _options), schematics_1.strings)),
            (0, schematics_1.move)(`src/app/${schematics_1.strings.dasherize(_options.name)}`)
        ]);
        const rule = (0, schematics_1.chain)([
            (0, schematics_1.mergeWith)(templateSource)
        ]);
        return rule(tree, _context);
    };
}
//# sourceMappingURL=index.js.map