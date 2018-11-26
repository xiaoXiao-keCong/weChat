//index.js
//获取应用实例
const app = getApp();
Page({
    data: {
        motto: 'Hello World',
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        tabbar: {},
        options:{
            isShowAddress: true,
            isShowEditor: true,
            isShowScanCode: true,
            isShowSendCardBtn: true,

        }
    },
    /**
     * 跳转 创建名片页面
     */
    toCreatPage() {
        wx.navigateTo({
            url: '../creat-card/creat-card'
        });
        // wx.switchTab
    },
    onLoad: function() {
        
        app.ProxyRequest('',{}).then(res=>{
            console.log(res)
        },err=>{
            console.log(err,22)
        })
        
        app.editTabbar();//添加 自定义 tabBar
        
        if (app.globalData.userInfo) {
            return 
        } else if (this.data.canIUse) {
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                app.globalData.userInfo = res.userInfo;
            }
        } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
                success: res => {
                    app.globalData.userInfo = res.userInfo;
                }
            })
        };

        
    },
    onShow:function(){
        const userCardInfo = wx.getStorageSync('userCardInfo') || {};
        if (Object.keys(userCardInfo).length != 0) {
            this.setData({
                userCardInfo: userCardInfo,
                hasUserCard: true,
            })
        }
        // wx.showModal({
        //     title: '弹窗标题',
        //     content: '弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内',
        //     confirmText: "主操作",
        //     cancelText: "辅助操作",
        //     success: function (res) {
        //         console.log(res);
        //         if (res.confirm) {
        //             console.log('用户点击主操作')
        //         } else {
        //             console.log('用户点击辅助操作')
        //         }
        //     }
        // });
    },

})