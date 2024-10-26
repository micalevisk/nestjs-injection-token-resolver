# `nestjs-injection-token-resolver`

[![npm version](https://img.shields.io/npm/v/nestjs-injection-token-resolver.svg)](https://www.npmjs.com/package/nestjs-injection-token-resolver)
[![npm downloads](https://img.shields.io/npm/dt/nestjs-injection-token-resolver.svg)](https://www.npmjs.com/package/nestjs-injection-token-resolver)

A tiny utility to standardize the injection token recovery among NestJS libraries.

#### Usage

```bash
npm install nestjs-injection-token-resolver
```

When you have a injection using some 3rd-party decorator instead of the `@Inject()` from `@nestjs/core`, that 3rd-party component (usually a NestJS library) will share with you a another function to resolve the provider's token so that you can use it in a non-class-based approach like the followin snippets:

<details>
<summary>Examples using a <code>@Inject*()</code> 3rd-party decorator</summary>

```ts
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  // ...
}
```

```ts
@Injectable()
export class AlbumsService {
  constructor(
    @InjectDataSource('albumsConnection')
    private dataSource: DataSource,

    @InjectEntityManager('albumsConnection')
    private entityManager: EntityManager,
  ) {}
  // ...
}
```

</details>

<details open>
<summary>Examples to resolve the provider' tokens but using a 3rd-party helper function</summary>

```ts
@Module({
  providers: [
    {
      provide: AlbumsService,
      inject: [getDataSourceToken('albumsConnection')],
      useFactory: (albumsConnection: DataSource) => {
        return new AlbumsService(albumsConnection);
      },
    },
  ],
})
export class AlbumsModule {}
```

```ts
@Module({
  providers: [
    UsersService,
    {
      provide: getRepositoryToken(User),
      useValue: mockRepository,
    },
  ],
})
export class UsersModule {}
```

</details>

Thus, you will need to know about `getDataSourceToken` and `getRepositoryToken` instead of just knowing about the `@Inject*()` decorator.  
And this is for every NestJS lib out there that has some sort of `@Inject*()` decorator.

With `nestjs-injection-token-resolver` you can forget about those helper functions!  
Instead, just do:  

```ts
@Module({
  providers: [
    {
      provide: AlbumsService,
      inject: [ InjectionTokenFor( InjectDataSource('albumsConnection') ) ],
      useFactory: (albumsConnection: DataSource) => {
        return new AlbumsService(albumsConnection);
      },
    },
  ],
})
export class AlbumsModule {}
```

```ts
@Module({
  providers: [
    UsersService,
    {
      provide: InjectionTokenFor( InjectRepository(User) ),
      useValue: mockRepository,
    },
  ],
})
export class UsersModule {}
```