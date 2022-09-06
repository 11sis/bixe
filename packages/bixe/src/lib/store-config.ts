import { BixeBusCollection } from './bixe-bus-collection';
import { BixeLogger } from './bixe-logger';
import { ActionHandlersMap } from './types';
import { Selectors } from './types/selectors';

export interface iStoreConfig<T> {
  get name(): string;
  get initialState(): T;
  handlers?: ActionHandlersMap<T>;
  reducers?: ActionHandlersMap<T>;
  selectors?: Selectors<T>;
  logger?: BixeLogger;
  scope?: string;
}

export class StoreConfig<T> implements iStoreConfig<T> {
  private _name: string;
  private _initialState: T;
  private _handlers: ActionHandlersMap<T>;
  private _selectors: Selectors<T>;
  private _logger: BixeLogger;
  private _scope: string;

  get name(): string {
    return this._name;
  }

  get initialState(): T {
    return this._initialState;
  }

  get handlers(): ActionHandlersMap<T> {
    return this._handlers;
  }

  get scope(): string {
    return this._scope;
  }

  get selectors(): Selectors<T> {
    return this._selectors;
  }

  get logger(): BixeLogger {
    return this._logger;
  }

  constructor(
    definition: iStoreConfig<T> | any
  ) {
    this._name = definition.name || new Date().getTime().toString();
    this._initialState = definition.initialState || {} as any;
    this._handlers = { ...(definition.handlers || {}), ...(definition.reducers || {}) } as any;
    this._scope = definition.scope || 'root';
    this._selectors = definition.selectors || {};
    this._logger = definition.logger || BixeBusCollection.GetLogger();
  }
}
