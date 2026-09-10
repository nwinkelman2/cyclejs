import * as assert from 'assert';
import {createTagFunction, slot} from '../../src/index';

describe('custom-element hyperscript helpers', function() {
  it('exports a slot helper', function() {
    const vnode = slot({attrs: {name: 'actions'}});

    assert.strictEqual(vnode.sel, 'slot');
    assert.deepStrictEqual(vnode.data!.attrs, {name: 'actions'});
  });

  it('creates helpers for custom element tag names', function() {
    const fancyButton = createTagFunction('fancy-button');
    const vnode = fancyButton('.primary', 'Save');

    assert.strictEqual(vnode.sel, 'fancy-button.primary');
    assert.strictEqual(vnode.text, 'Save');
  });
});
