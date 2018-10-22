//logs.js
const app = getApp()
const util = require('../../utils/util.js')

Page({
  getters: ['proxy'],
  data: {
    logs: []
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      }),
    })
  }
})
