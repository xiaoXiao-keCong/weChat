// components/count-down/count-down.js
const { formatNumber} = require('../../utils/util.js');
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        disabled: Boolean,
        timeCount:Number
    },
    externalClasses: ['count-down',"button"],
    /**
     * 组件的初始数据
     */
    data: {
        content:'获取验证码',
        timeCount:60,
        timer:null,
        resetData:{},

    },

    /**
     * 组件的方法列表
     */
    methods: {

        bindTap:function(e){
            this.eventEmit(e);
            if (this.data.timer) return;
            this.showCountDown(e);
        },
        showCountDown:function(e){
            this.data.timer = setTimeout(()=>{
                if (this.data.timeCount <= 0) {
                    clearTimeout(this.data.timer);
                    this.resetData()
                    return
                }else{
                    let timeCount = this.data.timeCount;
                    timeCount -= 1;
                    this.setData({
                        ...this.data,
                        content: formatNumber(timeCount),
                        timeCount: formatNumber(timeCount),
                        disabled: true,
                    })
                    this.showCountDown();
                }
            },1000)
        },
        resetData:function(){
            this.setData({
                ...this.data.resetData,
                resetData:{...this.data.resetData}
            })
        },
        eventEmit:function(e){
           
            this.triggerEvent('customevent', e)
        }
    },
    lifetimes: {
        attached: function () {
            // 在组件实例进入页面节点树时执行  给一个变量 保存初始值
            this.setData({
                resetData: {...this.data}
            })
        },
        detached: function () {
            // 在组件实例被从页面节点树移除时执行
        },
    },
})
