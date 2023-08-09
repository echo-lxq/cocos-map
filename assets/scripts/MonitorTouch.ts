/*
 * @Author: WeiShan
 * @Date: 2023-03-10 13:45:03
 * @LastEditors: WeiShan
 * @LastEditTime: 2023-03-16 10:17:31
 * @FilePath: \xls-zhanjiang-map\assets\scripts\MonitorTouch.ts
 * @Description: 
 * 
 * Copyright (c) 2023 by WeiShan/xls, All Rights Reserved. 
 */
import { _decorator, Component, Node, Vec2, Vec3, v2, v3, clamp } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MonitorTouch')
export class MonitorTouch extends Component {

    @property({ type: Node })
    private map = null;

    //缩放部分
    originalTouchDistance:number = -1;
    originalNodeScale
    minScale:number=0;
    maxScale:number=10000;
    scale;

    //移动部分
    touchStartP:Vec2;
    oincamera:Vec3;

    onLoad(){
        //监听手势移动
        this.node.on(Node.EventType.TOUCH_START, this.onTouchStartCallback, this);
        this.node.on(Node.EventType.TOUCH_MOVE, this.onTouchMoveCallback, this);
    }

    onTouchStartCallback (event) {
        this.touchStartP=event.getLocation();
        this.oincamera= this.map.getPosition()
     }
    
     /**
     * 
     * @param event 触摸事件回调携带的参数
     * @param event.getDeltaX() 0改变方向,1右滑,-1左滑
     */
    onTouchMoveCallback(event):void{
    
        //图片缩放部分
        let touches = event.getTouches();
        if(touches.length==2){
            // console.log("测试缩放部分",event.getTouches())
            let temp = v2();
            Vec2.subtract(temp, touches[0].getLocation(), touches[1].getLocation());
            let distance = temp.length();
            if (this.originalTouchDistance == -1) {
                // 双指初始间距
                this.originalTouchDistance = distance;
                // 节点初始缩放
                this.originalNodeScale = this.map.scale.clone();
            }
            let targetScale = v3();
            // 双指当前间距 / 双指初始间距
            this.scale = distance / this.originalTouchDistance;
            // 节点初始缩放 * (双指当前间距 / 双指初始间距)
            Vec3.multiplyScalar(targetScale, this.originalNodeScale, this.scale);
            this.scale = targetScale.x;
            // 属于节点缩放比
            this.scale = clamp(this.scale, this.minScale, this.maxScale);
            this.map.setScale(this.scale, this.scale, this.scale);

            // if(touches.length >= 2){
            //     let touch1 = touches[0];
            //     let touch2 = touches[1];
            //     let delta1 = touch1.getDelta();
            //     let delta2 = touch2.getDelta();
                
            //     let touchPoint1 = touches[0].getUILocation();
            //     let touchPoint2 = touches[1].getUILocation();
    
            //     //缩放
    
            //     var distance = touchPoint1.subtract(touchPoint2);
            //     var delta = delta1.subtract(delta2);
    
            //     var scaleNum = 1;
    
            //     var nodeScale = this.node.scale.clone();
    
            //     if(Math.abs(distance.x) > Math.abs(distance.y)){
            //         scaleNum = (distance.x+delta.x)/distance.x
            //     }else{
            //         scaleNum = (distance.y+delta.y)/distance.y
            //     }
            //     this.node.setScale(v3(nodeScale.x*scaleNum,nodeScale.y*scaleNum));
            // }

        }
        // console.log(event.getTouches())
        else{
            var cur=event.getLocation()
            let newPosition = new Vec3(cur.x-this.touchStartP.x+this.oincamera.x,cur.y-this.touchStartP.y+this.oincamera.y,0);

            this.map.setPosition(newPosition);
        }

        
    }
}