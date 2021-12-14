import { DynamicModule, Module } from '@nestjs/common';
import { MinterRpcCoreModule } from './minter.core-module';
import { MinterRpcModuleAsyncOptions, MinterRpcModuleOptions } from './minter.interfaces';

@Module({})
export class MinterRpcModule {
  public static forRoot(options: MinterRpcModuleOptions, connection?: string): DynamicModule {
    return {
      module: MinterRpcModule,
      imports: [MinterRpcCoreModule.forRoot(options, connection)],
      exports: [MinterRpcCoreModule],
    };
  }

  public static forRootAsync(options: MinterRpcModuleAsyncOptions, connection?: string): DynamicModule {
    return {
      module: MinterRpcModule,
      imports: [MinterRpcCoreModule.forRootAsync(options, connection)],
      exports: [MinterRpcCoreModule],
    };
  }
}
