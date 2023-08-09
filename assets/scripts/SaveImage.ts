/*
 * @Author: WeiShan
 * @Date: 2023-03-14 16:18:46
 * @LastEditors: WeiShan
 * @LastEditTime: 2023-03-17 14:19:25
 * @FilePath: \xls-zhanjiang-map\assets\scripts\SaveImage.ts
 * @Description: 
 * 
 * Copyright (c) 2023 by WeiShan/xls, All Rights Reserved. 
 */
import { _decorator, Component, Node ,native, sys, director, Camera, v2, RenderTexture, Sprite, game, Canvas, find, UITransform} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SaveImages')
export class SaveImage extends Component {

    @property({ type: Node })
    private canvas:Node = null;

    public clickSave():void{
        this._saveImgMethod();
        // const link = document.createElement('a');
        // link.download = 'screenshot.png';
        // link.href = dataUrl;
        // link.click();
        
    }

    /**
     * 点击按钮将图片保存到本地
     * 
     * 1.将canvas的图片渲染成图片显示在界面上
     * 2.加上遮罩显示长按保存
     * 3.
     */
    private _saveImgMethod():void{
        // 获取cocos节点
        // let node = find('Canvas');

        // 获取画布
        // let canvas = game.canvas;

        // console.log(canvas.width);

        // 获取画布宽度和高度
        let width = this.canvas.getComponent(UITransform).width;
        let height = this.canvas.getComponent(UITransform).height;

        console.log(width,height)

        var dataURL = this.canvas.getComponent(UITransform).toDataURL("image/png");
            var img = document.createElement("img");
            img.src = dataURL;
            console.log(dataURL)

        // // 创建一个新的Canvas对象
        // let screenshotCanvas = document.createElement('canvas');
        // screenshotCanvas.width = width;
        // screenshotCanvas.height = height;

        // // // 将画布内容绘制到新的Canvas上
        // let ctx = screenshotCanvas.getContext('2d');
        // ctx.drawImage(this.canvas, 0, 0, width, height);

        // // 将Canvas转换为Blob对象
        // screenshotCanvas.toBlob((blob) => {
        // // 创建一个a标签，并设置download和href属性
        // let a = document.createElement('a');
        // a.download = 'myScreenshot.png';
        // a.href = URL.createObjectURL(blob);

        // // 将a标签添加到body上
        // document.body.appendChild(a);

        // // 模拟用户点击a标签
        // a.click();

        // // 从DOM中移除a标签
        // document.body.removeChild(a);

        // // // 保存图片到相册
        // // if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // //     navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        // //     let video = document.createElement('video');
        // //     video.srcObject = stream;
        // //     video.onloadedmetadata = () => {
        // //         let track = stream.getTracks()[0];
        // //         let imageCapture = new ImageCapture(track);
        // //         imageCapture.takePhoto().then((blob) => {
        // //         navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        // //             let recorder = new MediaRecorder(stream, { mimeType: 'video/webm; codecs=vp9' });
        // //             recorder.start();
        // //             recorder.stop();
        // //             let reader = new FileReader();
        // //             reader.readAsDataURL(blob);
        // //             reader.onloadend = () => {
        // //             let base64data = reader.result;
        // //             let link = document.createElement('a');
        // //             link.href = base64data;
        // //             link.download = 'myScreenshot.webm';
        // //             link.click();
        // //             }
        // //         });
        // //         });
        // //     };
        // //     });
        // // }
        // });
    }









}