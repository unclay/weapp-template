export default {
  request(options) {
    return new Promise((resolve, reject) => {
      const opts = Object.assign({
        success: resolve,
        fail: reject,
      }, options);
      wx.request(opts);
    })
  }
}