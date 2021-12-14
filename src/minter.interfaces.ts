import { ModuleMetadata, Type } from '@nestjs/common/interfaces';
import { JsonRpcProvider } from '@funfasy/minter-sdk-js/lib/providers/json-rpc-provider';
import { HttpTransportConfig } from '@funfasy/minter-sdk-js/lib/transport/http-transport';

export type MinterRpcProvider = JsonRpcProvider;

export interface MinterRpcModuleOptions {
  config: HttpTransportConfig;
}

export interface MinterRpcModuleOptionsFactory {
  createMinterRpcModuleOptions():
    | Promise<MinterRpcModuleOptions>
    | MinterRpcModuleOptions;
}

export interface MinterRpcModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[];
  useClass?: Type<MinterRpcModuleOptionsFactory>;
  useExisting?: Type<MinterRpcModuleOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<MinterRpcModuleOptions> | MinterRpcModuleOptions;
}
