import setters from './setters';
import * as getters from './getters';

class Store {
  constructor(options) {
    const self = this;
    this.debug = options.debug || false;
    this.state = options.state;
    this.setters = options.setters;
    Store.getters = options.getters;
    this.getters = new Proxy(Store.getters, {
      get(target, key, receiver) {
        if (typeof target[key] === 'function') {
          return () => target[key](self.state);
        } else {
          throw new Error(`getters.${key} no found`);
        }
      },
    });
  }
}

const state = {
  proxy: 'proxy test data'
};
export default new Store({
  debug: false,
  state,
  setters,
  getters,
})