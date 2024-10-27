import 'reflect-metadata';
/**
 * Usage examples:
 * ```js
 * getRepositoryToken(User) === InjectionToken.from( InjectRepository(User) );
 * getQueueToken('queueName') === InjectionToken.from( InjectQueue('queueName') );
 * ```
 * @param injectDecoratorFactoryCall The call to the `Inject*` decorator factory function but without the `@` symbol.
 * @throws {Error} If the given `injectDecoratorFactoryCall` call does not have a corresponding injection token.
 */
export declare function InjectionTokenFor<T extends string | Function>(injectDecoratorFactoryCall: any): T;