import * as types from '../../lib/types';

export interface Options {
  file?: string;
  docker?: boolean;
  dev?: boolean;
  debug?: boolean;
  packageManager?: string;
  _doubleDashArgs?: string[];
}

export interface NodejsPluginOptions extends Options {
  traverseNodeModules?: boolean;
  strictOutOfSync?: boolean | 'true' | 'false';
}

export interface GradlePluginOptions extends Options {
  multiDepRoots?: boolean;
}

export interface Plugin {
  inspect: (root: string, targetFile: string, options?: Options) => Promise<types.SingleInspectResult>;
}
