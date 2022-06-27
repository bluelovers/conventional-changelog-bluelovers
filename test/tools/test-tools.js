"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gitInit = exports.gitDummyCommit = exports.exec = exports.prepareMessageArgs = exports.fixMessage = void 0;
const child_process_1 = require("child_process");
const fs_1 = require("fs");
function fixMessage(msg) {
    if (!msg || typeof msg !== 'string') {
        msg = 'Test commit';
    }
    // we need to escape backtick for bash but not for windows
    // probably this should be done in git-dummy-commit or shelljs
    if (process.platform !== 'win32') {
        msg = msg.replace(/`/g, '\\`');
    }
    return `"${msg}"`;
}
exports.fixMessage = fixMessage;
function prepareMessageArgs(msg) {
    const args = [];
    if (Array.isArray(msg)) {
        if (msg.length > 0) {
            for (const m of msg) {
                args.push('-m', fixMessage(m));
            }
        }
        else {
            args.push('-m', fixMessage());
        }
    }
    else {
        args.push('-m', fixMessage(msg));
    }
    return args;
}
exports.prepareMessageArgs = prepareMessageArgs;
function exec(command) {
    return (0, child_process_1.execSync)(command, {
        stdio: 'pipe',
        encoding: 'utf-8'
    });
}
exports.exec = exec;
function gitDummyCommit(msg) {
    const args = prepareMessageArgs(msg);
    args.push('--allow-empty', '--no-gpg-sign');
    return exec(`git commit ${args.join(' ')}`);
}
exports.gitDummyCommit = gitDummyCommit;
function gitInit() {
    (0, fs_1.mkdirSync)('git-templates');
    return exec('git init --template=./git-templates');
}
exports.gitInit = gitInit;
//# sourceMappingURL=test-tools.js.map