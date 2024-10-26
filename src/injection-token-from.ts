import 'reflect-metadata';

/**
 * The metadata key used to store NestJS's DI metadata.
 * As per https://github.com/nestjs/nest/blob/master/packages/common/decorators/core/inject.decorator.ts
 */
const PROPERTY_DEPS_METADATA = 'self:properties_metadata';

/**
 * Usage examples:
 * ```js
 * getRepositoryToken(User) === InjectionToken.from( InjectRepository(User) );
 * getQueueToken('queueName') === InjectionToken.from( InjectQueue('queueName') );
 * ```
 * @param injectDecoratorFactoryCall The call to the `Inject*` decorator factory function but without the `@` symbol.
 * @throws {Error} If the given `injectDecoratorFactoryCall` call does not have a corresponding injection token.
 */
export function InjectionTokenFor<T extends string | Function>(injectDecoratorFactoryCall: any): T {
  class NoopInjectionTokenFrom { }
  const target = new NoopInjectionTokenFrom();
  const key = '';
  const index: number | undefined = undefined;
  injectDecoratorFactoryCall(target, key, index) // to emit the metadata
  const injectionToken = Reflect.getMetadata(PROPERTY_DEPS_METADATA, target.constructor)?.[0]?.type;
  if (!injectionToken) {
    throw new Error('Could not extract injection token for the given `Inject` call');
  }
  return injectionToken;
}