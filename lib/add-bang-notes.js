"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addBangNotes = void 0;
// @ts-ignore
const parser_opts_1 = require("../parser-opts");
function addBangNotes(commit) {
    const match = commit.header.match(parser_opts_1.breakingHeaderPattern);
    if (match && commit.notes.length === 0) {
        const noteText = match[3]; // the description of the change.
        commit.notes.push({
            text: noteText
        });
    }
}
exports.addBangNotes = addBangNotes;
//# sourceMappingURL=add-bang-notes.js.map