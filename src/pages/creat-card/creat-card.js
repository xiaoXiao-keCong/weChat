// pages/creat-card/creat-card.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        disabled:true,
        isShowCode:false,
        cardInfoOptions: { 
           isImgEditor:true,
        },
        userCardInfo:{}

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.hideTabBar();
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        wx.hideTabBar();
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        wx.hideTabBar();
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 
     */
    tapBtn:function(e){
        if(!this.data.isShowCode){
            this.setData({
                isShowCode: true,

            })
        }
        
    },
    /**
     * 创建名片 
     *  
     */
    formSubmit(e){
        console.log(e);
        wx.setStorageSync('userCardInfo', e.detail.value);
        wx.navigateTo({
            url: '/pages/index/index',
        })
    },
    phoneNumberInput(e){
        if(e.detail.value.length == 11){
            this.setData({
                disabled: false
            })
        }else{
            this.setData({
                disabled: true
            })
        }
       
        console.log(e)
    },
    showCamera(){
        this.camera = wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['camera'],
            success(res) {
                // tempFilePath可以作为img标签的src属性显示图片
                const tempFilePaths = res.tempFilePaths
            }
        })
    },
   
   
})