import xs, {Stream, MemoryStream} from 'xstream';
import {adapt} from '@cycle/run/lib/adapt';
import {DevToolEnabledSource} from '@cycle/run';
import {
  HTTPSource,
  RequestOptions,
  Response,
  ResponseStream,
} from './interfaces';
import {isolateSource, isolateSink} from './isolate';

export type MockResponseStream = MemoryStream<Response> & ResponseStream;

export interface MockHTTPConfig {
  [category: string]: Stream<MockResponseStream>;
}

/** Create an HTTP source backed entirely by response streams supplied by tests. */
export function mockHTTPSource(mockConfig: MockHTTPConfig): HTTPSource {
  return new MockedHTTPSource(mockConfig);
}

export class MockedHTTPSource implements HTTPSource {
  constructor(private _config: MockHTTPConfig) {}

  public filter(
    predicate: (request: RequestOptions) => boolean,
    scope?: string
  ): HTTPSource {
    const config: MockHTTPConfig = {};
    Object.keys(this._config).forEach(category => {
      config[category] = this._config[category].filter(response$ =>
        predicate(response$.request || {url: '', category})
      );
    });
    return new MockedHTTPSource(config);
  }

  public select(category?: string): any {
    let response$$: Stream<MockResponseStream>;
    if (category) {
      response$$ = this._config[category] || xs.empty<MockResponseStream>();
    } else {
      const streams = Object.keys(this._config).map(key => this._config[key]);
      response$$ = streams.length
        ? xs.merge<MockResponseStream>(...streams)
        : xs.empty<MockResponseStream>();
    }

    const tagged$$ = response$$.map(response$ => {
      if (!response$.request) {
        response$.request = {url: '', category: category || ''};
      }
      return response$;
    });
    const out: DevToolEnabledSource = adapt(tagged$$);
    out._isCycleSource = 'HTTP';
    return out;
  }

  public isolateSource = isolateSource;
  public isolateSink = isolateSink;
}
