import * as ts from 'typescript';
export declare function collectDeepNodes<T extends ts.Node>(node: ts.Node, kind: ts.SyntaxKind): T[];
export declare function addPureComment<T extends ts.Node>(node: T): T;
export declare function hasPureComment(node: ts.Node): boolean;
export declare function isHelperName(name: string): boolean;
