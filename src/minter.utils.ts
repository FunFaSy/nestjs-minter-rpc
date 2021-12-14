import { MinterRpcModuleOptions, MinterRpcProvider } from './minter.interfaces';
import * as minterSdk from '@funfasy/minter-sdk-js';

import {
  MINTER_MODULE_CONNECTION,
  MINTER_MODULE_CONNECTION_TOKEN,
  MINTER_MODULE_OPTIONS_TOKEN,
} from './minter.constants';

export function getMinterRpcOptionsToken(connection: string): string {
  return `${connection ||
    MINTER_MODULE_CONNECTION}_${MINTER_MODULE_OPTIONS_TOKEN}`;
}

export function getMinterRpcConnectionToken(connection: string): string {
  return `${connection ||
    MINTER_MODULE_CONNECTION}_${MINTER_MODULE_CONNECTION_TOKEN}`;
}

export function createMinterRpcConnection(
  options: MinterRpcModuleOptions,
): MinterRpcProvider {
  const { config } = options;

  return new minterSdk.JsonRpcProvider(config);
}
