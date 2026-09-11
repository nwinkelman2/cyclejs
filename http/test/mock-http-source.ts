import 'symbol-observable'; // tslint:disable-line
import * as assert from 'assert';
import xs from 'xstream';
import {
  mockHTTPSource,
  MockResponseStream,
  Response,
} from '../src/index';

function response$(body: any, category?: string): MockResponseStream {
  const stream = xs.of(({body} as any) as Response).remember() as MockResponseStream;
  if (category) {
    stream.request = {url: '/mock', category};
  }
  return stream;
}

describe('mockHTTPSource', function() {
  it('selects the configured response metastream by category', function(done) {
    const source = mockHTTPSource({users: xs.of(response$(['Ada']))});

    source
      .select('users')
      .subscribe({
        next: (stream: MockResponseStream) => {
          stream.addListener({
            next: (response: Response) => {
              assert.deepStrictEqual(response.body, ['Ada']);
              done();
            },
            error: done,
            complete: () => {},
          });
        },
        error: done,
        complete: () => {},
      });
  });

  it('returns an empty metastream for an unknown category', function(done) {
    mockHTTPSource({users: xs.of(response$(['Ada']))})
      .select('missing')
      .subscribe({
        next: () => done(new Error('unexpected response stream')),
        error: done,
        complete: done,
      });
  });

  it('supports request predicates through filter()', function(done) {
    const source = mockHTTPSource({
      users: xs.of(response$(['Ada'], 'users')),
      teams: xs.of(response$(['Core'], 'teams')),
    });

    source
      .filter(request => request.category === 'teams')
      .select()
      .subscribe({
        next: (stream: MockResponseStream) => {
          stream.addListener({
            next: (response: Response) => {
              assert.deepStrictEqual(response.body, ['Core']);
              done();
            },
            error: done,
            complete: () => {},
          });
        },
        error: done,
        complete: () => {},
      });
  });
});
