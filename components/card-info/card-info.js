// components/card-info/card-info.js
const app = getApp();
// import { CardInfo , Options } from '../class/common-class';
// console.log( new CardInfo ())
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        // myProperty: { // 属性名
        //     type: String, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
        //     value: '', // 属性初始值（可选），如果未指定则会根据类型选择一个
        //     observer: function (newVal, oldVal, changedPath) {
        //         // 属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串, 如：'_propertyChange'
        //         // 通常 newVal 就是新设置的数据， oldVal 是旧数据
        //     }
        // },
        /**
         * 名片的 用户详细信息
         * @example
         * {
         *  userNm : String , 用户名
         *  phoneNumber : number , 手机号
         * 
         * }
         */
        cardInfo: Object,
        /**
         * @example
         * {
         *  isImgEditor: Boolean   // 默认 false 名片 是否可上传
         *  imgSRC: String          // 默认图片 或者 调取用户信息  用户头像  头像 URL
         *  isShowAddress: Boolean   // 默认 false  是否显示 工作地址
         *  isShowEditor: Boolean   // 默认 false  是否显示 编辑按钮
         *  isShowScanCode: Boolean   // 默认 false 是否显示 二维码
         *  isShowSendCardBtn: Boolean   // 默认 false  是否显示 发送名片按钮
         * 
         * }
         * 
         */
        options:Object,

    },

    /**
     * 组件的初始数据
     */
    data: {
       
    },

    /**
     * 组件的方法列表
     */
    methods: {
        /**
         *  跳转详情页
         */
        toCardDetail:function(e){
            let router = app.getCurrentPageRoute();
            if (router['pagePath'] == '/pages/card-detail/card-detail'){
                return
            }
            wx.navigateTo({
                url: '../../pages/card-detail/card-detail',
            })
        },
        toChangeCardPage(){
            wx.navigateTo({
                url: '../../pages/change-card/change-card',
            })
        },
        /**
         * 拍照
         */
        chooseImg(e){
            
            wx.chooseImage({
                count:1,
                sourceType: ['camera'],
                success:res=>{
                    console.log(res);
                    const tempPaths = res.tempFilePaths;
                    this.setData({
                        options:{
                            imgSrc:tempPaths[0],
                        }
                    })
                },
                fail:err=>{
                    console.log(err)
                }
            })
        },

        uploadimg: function () {//这里触发图片上传的方法
            var pics = this.data.pics;
            app.uploadimg({
                // url: 'https://........',//这里是你图片上传的接口
                // path: pics//这里是选取的图片的地址数组
            });
        },
       
    },
    lifetimes: {
        attached: function () {
            // 在组件实例进入页面节点树时执行  给一个变量 保存初始值
            console.log(this.data)
            
        },
        detached: function () {
            // 在组件实例被从页面节点树移除时执行
        },
    },

})
