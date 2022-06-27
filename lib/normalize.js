"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeNoteTitle = exports.EnumNoteTitle = void 0;
var EnumNoteTitle;
(function (EnumNoteTitle) {
    EnumNoteTitle["BREAKING_CHANGES"] = "BREAKING CHANGES";
    EnumNoteTitle["TODO"] = "TODO";
    EnumNoteTitle["FIXME"] = "FIXME";
})(EnumNoteTitle = exports.EnumNoteTitle || (exports.EnumNoteTitle = {}));
function normalizeNoteTitle(title) {
    const title_upper = title.toLocaleUpperCase();
    switch (title_upper) {
        case 'BREAKING CHANGES':
        case 'BREAKING CHANGE':
        case 'BREAKING-CHANGE':
        case 'BREAKING-CHANGES':
        case 'BREAKING_CHANGE':
        case 'BREAKING_CHANGES':
            return EnumNoteTitle.BREAKING_CHANGES;
        case 'TODO':
            return EnumNoteTitle.TODO;
        case 'FIXME':
            return EnumNoteTitle.FIXME;
    }
    return title || EnumNoteTitle.BREAKING_CHANGES;
}
exports.normalizeNoteTitle = normalizeNoteTitle;
//# sourceMappingURL=normalize.js.map