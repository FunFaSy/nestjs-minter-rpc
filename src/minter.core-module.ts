import { Global, Module, DynamicModule, Provider } from '@nestjs/common';
import {
  MinterRpcModuleAsyncOptions,
  MinterRpcModuleOptions,
  MinterRpcModuleOptionsFactory,
} from './minter.interfaces';
import { createMinterRpcConnection, getMinterRpcOptionsToken, getMinterRpcConnectionToken } from './minter.utils';

@Global()
@Module({})
export class MinterRpcCoreModule {
  /* forRoot */
  static forRoot(options: MinterRpcModuleOptions, connection?: string): DynamicModule {
    const minterOptionsProvider: Provider = {
      provide: getMinterRpcOptionsToken(connection),
      useValue: options,
    };

    const minterConnectionProvider: Provider = {
      provide: getMinterRpcConnectionToken(connection),
      useValue: createMinterRpcConnection(options),
    };

    return {
      module: MinterRpcCoreModule,
      providers: [minterOptionsProvider, minterConnectionProvider],
      exports: [minterOptionsProvider, minterConnectionProvider],
    };
  }

  /* forRootAsync */
  public static forRootAsync(options: MinterRpcModuleAsyncOptions, connection: string): DynamicModule {
    const minterConnectionProvider: Provider = {
      provide: getMinterRpcConnectionToken(connection),
      useFactory(options: MinterRpcModuleOptions) {
        return createMinterRpcConnection(options);
      },
      inject: [getMinterRpcOptionsToken(connection)],
    };

    return {
      module: MinterRpcCoreModule,
      imports: options.imports,
      providers: [...this.createAsyncProviders(options, connection), minterConnectionProvider],
      exports: [minterConnectionProvider],
    };
  }

  /* createAsyncProviders */
  public static createAsyncProviders(options: MinterRpcModuleAsyncOptions, connection?: string): Provider[] {
    if (!(options.useExisting || options.useFactory || options.useClass)) {
      throw new Error('Invalid configuration. Must provide useFactory, useClass or useExisting');
    }

    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options, connection)];
    }

    return [
      this.createAsyncOptionsProvider(options, connection),
      { provide: options.useClass, useClass: options.useClass },
    ];
  }

  /* createAsyncOptionsProvider */
  public static createAsyncOptionsProvider(options: MinterRpcModuleAsyncOptions, connection?: string): Provider {
    if (!(options.useExisting || options.useFactory || options.useClass)) {
      throw new Error('Invalid configuration. Must provide useFactory, useClass or useExisting');
    }

    if (options.useFactory) {
      return {
        provide: getMinterRpcOptionsToken(connection),
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }

    return {
      provide: getMinterRpcOptionsToken(connection),
      async useFactory(optionsFactory: MinterRpcModuleOptionsFactory): Promise<MinterRpcModuleOptions> {
        return await optionsFactory.createMinterRpcModuleOptions();
      },
      inject: [options.useClass || options.useExisting],
    };
  }
}
