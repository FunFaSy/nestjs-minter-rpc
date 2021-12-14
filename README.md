# NestJS Minter-RPC
[![NPM Package](https://img.shields.io/npm/v/@funfasy/nestjs-minter-rpc?style=flat-square)](https://www.npmjs.org/package/@funfasy/nestjs-minter-rpc)
[![License](https://img.shields.io/github/license/FunFaSy/nestjs-minter-rpc?style=flat-square)](https://github.com/FunFaSy/nestjs-minter-rpc/blob/master/LICENSE)

A Minter blockchain RPC Api provider for NestJs Framework.
 
## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Examples](#examples)
- [Examples](#examples)
- [Integration Test](#integration_test)
- [License](#license)

## Description
Integrates Minter with Nest

## Installation

```shell script
yarn add  @funfasy/nestjs-minter-rpc
## OR
npm install @funfasy/nestjs-minter-rpc
```


### MinterModule.forRoot(options, connection?)

```ts
// app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MinterRpcModule } from '@funfasy/nestjs-minter-rpc';

@Module({
    imports: [
        MinterRpcModule.forRoot({
          config: {
            baseURL: 'https://test.mnt.funfasy.dev/v2/',
            headers: {
                'Content-Type'     : 'application/json; charset=utf-8',
                'X-Project-Id'     : '<YOUR-FUNFASY-PROJECT-ID>',
                'X-Project-Secret' : '<YOUR-FUNFASY-PROJECT-SECRET>'
            },
          },
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
```

### MinterModule.forRootAsync(options, connection?)

```ts
// app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MinterRpcModule } from '@funfasy/nestjs-minter-rpc';

@Module({
    imports: [
      MinterRpcModule.forRootAsync({
      useFactory: () => ({
        config: {
          baseURL: 'https://test.mnt.funfasy.dev/v2/',
          headers: {
              'Content-Type'     : 'application/json; charset=utf-8',
              'X-Project-Id'     : '<YOUR-FUNFASY-PROJECT-ID>',
              'X-Project-Secret' : '<YOUR-FUNFASY-PROJECT-SECRET>'
          },
        },
      }),
    }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
```

### InjectMinter(connection?)

```ts
// app.service.ts
import { Injectable } from '@nestjs/common';
import { InjectMinterRpc, MinterRpc } from '@funfasy/nestjs-minter-rpc';
import { BlocksResponse } from '@funfasy/minter-sdk-js/lib/providers/internal';

@Injectable()
export class AppService {
  constructor(@InjectMinterRpc() private readonly minterApi: MinterRpc) {}

  async getHello(): Promise<BlocksResponse> {
    try {
      const height = await this.minterApi
        .status()
        .then((res) => Number(res.latest_block_height));

      const batch = await this.minterApi.blocks({
        fromHeight: height - 10,
        toHeight: height,
      });

      return batch;
    } catch (e) {
      console.log(e);
      throw e; 
    }
  }
}
```

# Integration Test
```shell script
yarn test
```


## License

This repository is distributed under the terms of both the MIT license and the Apache License (Version 2.0).
See [LICENSE](LICENSE) and [LICENSE-APACHE](LICENSE-APACHE) for details.

