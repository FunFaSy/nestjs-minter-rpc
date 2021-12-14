# NestJS Minter
<a href="https://www.npmjs.com/package/nestjs-minter"><img src="https://img.shields.io/npm/v/nestjs-minter.svg" alt="NPM
 Version" /></a>
<a href="https://www.npmjs.com/package/nestjs-minter"><img src="https://img.shields.io/npm/l/nestjs-minter.svg" alt="Package License" /></a>

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Examples](#examples)
- [License](#license)

## Description
Integrates Minter with Nest

## Installation

```shell script
yarn add @funfasy/nestjs-minter @funfasy/minter-sdk-js
## OR
npm install @funfasy/nestjs-minter @funfasy/minter-sdk-js
```

### MinterModule.forRoot(options, connection?)

```ts
import { Module } from '@nestjs/common';
import { MinterModule } from '@funfasy/nestjs-minter';
import { AppController } from './app.controller';

@Module({
  imports: [
    MinterModule.forRoot({
      config: {
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
import { MinterModule } from '@funfasy/nestjs-minter';
import { AppController } from './app.controller';

@Module({
  imports: [
    MinterModule.forRootAsync({
      useFactory: () => ({
        config: {
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
import { InjectMinter, Minter } from '@funfasy/nestjs-minter';

@Controller()
export class AppController {
  constructor(
    @InjectMinter() private readonly minter: Minter,
  ) {}

  @Get()
  async getBlocks() {
    try {
        const chain = new this.minter.Chain(minterSdk.ChainId.TESTNET);
        
        const config = {
            baseURL: chain.urls?.api?.node?.http[0],
            headers: {
                'Content-Type'     : 'application/json; charset=utf-8',
                'X-Project-Id'     : '<YOUR-FUNFASY-PROJECT-ID>',
                'X-Project-Secret' : '<YOUR-FUNFASY-PROJECT-SECRET>'
            },
        };

        const provider = new minterSdk.JsonRpcProvider(config);
        
        const height = await this.minter.provider.status().then(res=>Number(res.latest_block_height));
        const batch = await this.minter.provider.blocks({fromHeight: height - 10, toHeight: height })
     
        return batch;
    } catch (e) {
      console.log(e);
    }
  }
}
```

## License

MIT
