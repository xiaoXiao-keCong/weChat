// components/my-card/my-card.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {
        options: {
            isShowAddress: true,
            isShowEditor: true,
            isShowScanCode: true,
            isShowSendCardBtn: true,

        }
    },

    /**
     * 组件的方法列表
     */
    methods: {
        /**
         * 跳转 创建名片页面
         */
        toCreatPage() {
            wx.navigateTo({
                url: '../creat-card/creat-card'
            });
            // wx.switchTab
        },
    },
    lifetimes: {
        attached: function() {
            const userCardInfo = wx.getStorageSync('userCardInfo') || {};
            if (Object.keys(userCardInfo).length != 0) {
                this.setData({
                    userCardInfo: userCardInfo,
                    hasUserCard: true,
                })
            }
        },
        detached: function() {

        }
    }

})