import { Inject } from '@nestjs/common';
import { getMinterRpcConnectionToken } from './minter.utils';

export const InjectMinterRpc = (connection?: string) => {
  return Inject(getMinterRpcConnectionToken(connection));
};
