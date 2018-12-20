// components/tab-bar/tab-bar.js
const app = getApp();
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        tabbar: {
            type: Object,
            value: {
                "backgroundColor": "#ffffff",
                "color": "#979795",
                "selectedColor": "#1c1c1b",
                "list": [{
                    "pagePath": "/pages/index/index",
                    "iconPath": "/imgs/bland.png",
                    "selectedIconPath": "/imgs/bland.png",
                    "text": "我的名片"
                },
                {
                    "pagePath": "/pages/card-clip/card-clip",
                    "iconPath": "/imgs/bland.png",
                    "selectedIconPath": "/imgs/bland.png",
                    "text": "名片夹"
                }
                ]
            }
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        // isIphoneX: app.globalData.systemInfo.model == "iPhone X" ? true : false,
    },

    /**
     * 组件的方法列表
     */
    methods: {
        getUserInfo: function (e) {
            
            wx.switchTab({
                url: e.currentTarget.dataset.url,
            })
            // console.log(app.globalData)
            // app.globalData.userInfo = e.detail.userInfo;
            // console.log(app.globalData)
            // this.setData({
            //     userInfo: e.detail.userInfo,
            //     hasUserInfo: true
            // })
        }
    }
})