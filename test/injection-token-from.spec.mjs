// @ts-check

import { equal } from 'node:assert/strict'
import { Inject } from '@nestjs/common';
import { InjectQueue, getQueueToken } from '@nestjs/bull'
import { InjectRepository, InjectDataSource, getRepositoryToken, getDataSourceToken } from '@nestjs/typeorm'
import { InjectionTokenFor } from '../dist/injection-token-from.js'

class User { }

equal(
  InjectionTokenFor(Inject('bar')),
  'bar'
)

equal(
  InjectionTokenFor(InjectQueue()),
  getQueueToken() // 'BullQueue_default'
)

equal(
  InjectionTokenFor(InjectQueue('foo')),
  getQueueToken('foo') // 'BullQueue_foo'
)

equal(
  InjectionTokenFor(InjectRepository(User)),
  getRepositoryToken(User) // 'UserRepository'
)

equal(
  InjectionTokenFor(InjectRepository(User, 'another')),
  getRepositoryToken(User, 'another') // 'another_UserRepository'
)

equal(
  InjectionTokenFor(InjectDataSource()),
  getDataSourceToken() // DataSource
)

equal(
  InjectionTokenFor(InjectDataSource('albumsConnection')),
  getDataSourceToken('albumsConnection') //'albumsConnectionDataSource'
)
