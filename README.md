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
yarn add  @funfasy/minter-sdk-js @funfasy/nestjs-minter-rpc
## OR
npm install @funfasy/minter-sdk-js @funfasy/nestjs-minter-rpc
```


### MinterModule.forRoot(options, connection?)

```ts
import { Module } from '@nestjs/common';
import { MinterRpcModule } from '@funfasy/nestjs-minter-rpc';
import { AppController } from './app.controller';

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
})
export class AppModule {}
```

### MinterModule.forRootAsync(options, connection?)

```ts
import { Module } from '@nestjs/common';
import { MinterRpcModule } from '@funfasy/nestjs-minter-rpc';
import { AppController } from './app.controller';

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
})
export class AppModule {}
```

### InjectMinter(connection?)

```ts
import { Controller, Get, } from '@nestjs/common';
import { InjectMinterRpc, MinterRpc } from '@funfasy/nestjs-minter-rpc';

@Controller()
export class AppController {
  constructor(
    @InjectMinterRpc() private readonly minterApi: MinterRpc,
  ) {}

  @Get()
  async getBlocks() {
    try {
        const height = await this.minterApi.status().then(res=>Number(res.latest_block_height));
        const batch = await this.minterApi.blocks({fromHeight: height - 10, toHeight: height })
     
        return batch;
    } catch (e) {
      console.log(e);
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

