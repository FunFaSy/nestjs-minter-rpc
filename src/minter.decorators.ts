import { Inject } from '@nestjs/common';
import { getMinterRpcConnectionToken } from './minter.utils';

export const InjectMinterRpc = (connectionToken?: string) => {
  return Inject(getMinterRpcConnectionToken(connectionToken));
};
