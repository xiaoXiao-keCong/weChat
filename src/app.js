//app.js
App({
    onLaunch: function() {
        //隐藏系统tabbar
        
            wx.hideTabBar();
        // this.getSystemInfo();
        // 展示本地存储能力
        // var logs = wx.getStorageSync('logs') || []
        // logs.unshift(Date.now())
        // wx.setStorageSync('logs', logs)

        // 登录
        wx.login({
            success: res => {
               
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
            }
        })
        // 获取用户信息
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: res => {
                            // 可以将 res 发送给后台解码出 unionId
                            this.globalData.userInfo = res.userInfo

                            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                            // 所以此处加入 callback 以防止这种情况
                            if (this.userInfoReadyCallback) {
                                this.userInfoReadyCallback(res)
                            }
                        }
                    })
                }
            },error: err=>{
                console.log(err)
                this.globalData.userInfo = null;
            }
        })
    },
    getSystemInfo: function() {
        let t = this;
        wx.getSystemInfo({
            success: function(res) {
                t.globalData.systemInfo = res;
            }
        });
    },
    /**
     * 添加 自定义 tabBar 
     */
    editTabbar: function() {
        let tabbar = this.globalData.tabBar;
        let currentPages = getCurrentPages();
        let _this = currentPages[currentPages.length - 1];
        let pagePath = _this.route;
        (pagePath.indexOf('/') != 0) && (pagePath = '/' + pagePath);
        for (let i in tabbar.list) {
            tabbar.list[i].selected = false;
            (tabbar.list[i].pagePath == pagePath) && (tabbar.list[i].selected = true);
        }
        _this.setData({
            tabbar: tabbar
        });
    },
    /**
     *  获取 当前路由信息 
     */
    getCurrentPageRoute: function() {
        let currentPages = getCurrentPages();
        let _this = currentPages[currentPages.length - 1];
        let pagePath = _this.route;
        (pagePath.indexOf('/') != 0) && (pagePath = '/' + pagePath);
        return {
            pagePath: pagePath,
            currentPage: _this
        }

    },
    onShow:function(){
        // wx.hideTabBar();
      
        
    },
    globalData: {
        userInfo: null,
        systemInfo: null, //客户端设备信息
        tabBar: {
            "backgroundColor": "#ffffff",
            "color": "#838383;",
            "selectedColor": "#5ABEC8",
            "list": [{
                    "pagePath": "/pages/index/index",
                "iconPath": "/imgs/btn_mingpianweidianji@2x.png",
                "selectedIconPath": "/imgs/btn_mingpiandianji@2x.png",
                    "text": "我的名片"
                },
                {
                    "pagePath": "/pages/card-clip/card-clip",
                    "iconPath": "/imgs/btn_tongxunluweidianji@2x.png",
                    "selectedIconPath": "/imgs/btn_tongxunludianji@2x.png",
                    "text": "名片夹"
                }
            ]
        }
    },

    apiHost:'https://tcb-api.tencentcloudapi.com',
    /**
   * 接口公共访问方法
   * @param {Object} urlPath 访问路径
   * @param {Object} params 访问参数（json格式）
   * @param {Object} reuqestType  请求方式 默认POST
   * http://11.177.15.254/operation-data/function/selectUserPvAndUvList
   */
    ProxyRequest: function (urlPath, params ={},reuqestType="POST") {
        var that = this;
        console.log("发起网络请求, 路径:" + (that.apiHost + urlPath) + ", 参数:" + JSON.stringify(params));
        return new Promise((reslove,reject)=>{
            wx.request({
                url: that.apiHost + urlPath,
                data: params, //  微信会自动 转换为 string
                method: reuqestType, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                header: {
                    lid: "32bf95ca-7568-477a-8715-af64c3bb42ff"
                }, // 设置请求的 header
                success: function (res) {
                    // let data = res.JSON();
                    if (res.data) {
                        if (res.data.statusCode == 200) { //访问成功
                            resolve(res.data)
                        } else {
                            reject(res)
                        }
                    } else {
                        reject(res)
                    }
                },
                fail: err =>  reject(err) ,
                
            })
        })
    }

})