/**
 * Created by user on 2020/6/15.
 */
import emoji from './emoji';
import { ITSPartialRecord } from 'ts-type/lib/type/record';
export declare const EnumCommitType: {
    fix: string;
    feat: string;
    improvement: string;
    perf: string;
    revert: string;
    refactor: string;
    conflict: string;
    docs: string;
    style: string;
    test: string;
    build: string;
    ci: string;
    WIP: string;
    chore: string;
    deps: string;
    dep: string;
    misc: string;
};
export type ICommitTypes = keyof typeof EnumCommitType;
export type IEmoji = emoji;
export declare const EnumCommitTypeEmoji: Record<ICommitTypes, IEmoji | string>;
export declare const EnumCommitEmojiToType: ITSPartialRecord<IEmoji, ICommitTypes>;
