import * as _ from 'lodash';
import * as Debug from 'debug';
import * as types from '../plugins/types';

const debug = Debug('snyk-module-info');

export function ModuleInfo(plugin: types.Plugin, policy) {
  return {
    async inspect(root, targetFile, options: types.Options) {
      const pluginOptions = {
        args: options._doubleDashArgs,
        ...options,
      };

      debug('calling plugin inspect()', {root, targetFile, pluginOptions});
      const info = await plugin.inspect(root, targetFile, pluginOptions);
      debug('plugin inspect() done');

      // attach policy if not provided by plugin
      if (policy && !info.package.policy) {
        info.package.policy = policy.toString();
      }

      return info;
    },
  };
}
