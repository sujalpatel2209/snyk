import {inspectors, Spec} from './inspectors';
import * as types from '../../../lib/types';
import {MissingTargetFileError} from '../../errors/missing-targetfile-error';

export async function inspect(root: string, targetFile: string): Promise<types.SingleInspectResult> {
  if (!targetFile ) {
    throw MissingTargetFileError(root);
  }
  const specs = await gatherSpecs(root, targetFile);

  return {
    plugin: {
      name: 'bundled:rubygems',
      runtime: 'unknown',
      packageManager: 'rubygems',
    },
    package: {
      name: specs.packageName,
      targetFile: specs.targetFile,
      files: specs.files,
      version: '0.0.0',
    },
  };
}

async function gatherSpecs(root, targetFile): Promise<Spec> {
  for (const inspector of inspectors) {
    if (inspector.canHandle(targetFile)) {
      return await inspector.gatherSpecs(root, targetFile);
    }
  }

  throw new Error(`Could not handle file: ${targetFile}`);
}
