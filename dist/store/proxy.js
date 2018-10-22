/**
 * 基于 store 对 runtime/proxy.js 进行扩展
 * */
import store from './index';
const nativePage = Page
const nativeComponent = Component
Page = (options, type = 'onLoad') => {
  // 从store读取数据
  const getters = (scope) => {
    if (options.getters) {
      for (const gkey of options.getters) {
        if (gkey in store.getters) {
          const value = store.getters[gkey]();
          if (store.getters !== value) {
            scope[gkey] = store.getters[gkey]();
          }
        } else {
          console.error(`getters ${gkey} not found`);
        }
      }
    }
  }
  
  const native = options.onShow;
  options.onShow = function () {
    // 每次进入页面都读取最新的store数据
    getters(this.ctx);
    return native && native.call(this)
  }

  // proxy 代理的数据,顺便写入 store.state
  options.setters = function (skey, value) {
    if (skey in store.state) {
      store.setters.call(this, store, skey, value);
    }
  }
  type === 'onLoad' ? nativePage(options) : nativeComponent(options)
}
Component = options => Page(options, 'created')