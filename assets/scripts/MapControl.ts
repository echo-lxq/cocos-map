/*
 * @Author: WeiShan
 * @Date: 2023-03-15 09:39:52
 * @LastEditors: WeiShan
 * @LastEditTime: 2023-03-17 13:42:10
 * @FilePath: \xls-zhanjiang-map\assets\scripts\MapControl.ts
 * @Description: 
 * 
 * Copyright (c) 2023 by WeiShan/xls, All Rights Reserved. 
 */
import { _decorator, Component, Node, Label, Vec2, Rect, rect, v2, misc, isValid, Vec3, UITransform,Sprite,view, v3, log, director} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MapControl')
export class MapControl extends Component {

    @property({ type: Node })
    private map:Node = null;

    @property({
        tooltip: '图片初始缩放'
    })
    public defaultScaling: number = 2;

    @property({
        tooltip: '图片缩放最小scale'
    })
    public minScale: number = 0.6;

    @property({
        tooltip: '图片缩放最大scale'
    })
    public maxScale: number = 6;

    @property({
        displayName: '双指缩放速率',
        max: 10,
        min: 0.001,
    })
    public fingerIncreaseRate: number = 0.2;

    //移动部分
    touchStartP:Vec2;
    oincamera:Vec3;

    //锁定移动
    lockMapMove:boolean = true

    protected onLoad():void{        

        this.map.on(Node.EventType.TOUCH_MOVE, this._onTouchMoveCallback, this);
        this.map.on(Node.EventType.TOUCH_START, this.onTouchStartCallback, this);

    }

    start():void{
        this._smoothOperate(v3(this.defaultScaling,this.defaultScaling,this.defaultScaling),v2(0,0));
    }

    onTouchStartCallback (event) {
        let touches = event.getTouches();
        if(touches.length>=2){
            this.lockMapMove = true;
        }else{
            this.lockMapMove = false;
        }
        this.touchStartP=event.getLocation();
        this.oincamera= this.map.getPosition();
    }

    /**
     * 移动回调
     */
    private _onTouchMoveCallback(event){

        let touches = event.getTouches();

        if(touches.length >= 2){
            this.lockMapMove = true;
            let touch1: any = touches[0];
                let touch2: any = touches[1];
                let delta1: Vec2 = v2(touch1.getDelta());
                let delta2: Vec2 = v2(touch2.getDelta());
                let touchPoint1: Vec2 = v2(this.map.getComponent(UITransform).convertToNodeSpaceAR(v3(touch1.getLocation().x,touch1.getLocation().y,1)).x,this.map.getComponent(UITransform).convertToNodeSpaceAR(v3(touch1.getLocation().x,touch1.getLocation().y,1)).y);
                let touchPoint2: Vec2 = v2(this.map.getComponent(UITransform).convertToNodeSpaceAR(v3(touch2.getLocation().x,touch2.getLocation().y,1)).x,this.map.getComponent(UITransform).convertToNodeSpaceAR(v3(touch2.getLocation().x,touch2.getLocation().y,1)).y);
                let distance: Vec2 = touchPoint1.subtract(touchPoint2);
                const rateV2: Vec2 = v2(this.fingerIncreaseRate,this.fingerIncreaseRate);
                let delta: Vec2 = delta1.subtract(delta2).multiply(rateV2);
                let scale: number = 1;
                if (Math.abs(distance.x) > Math.abs(distance.y)) {
                    scale = (distance.x + delta.x) / distance.x * this.map.scale.x;
                }
                else {
                    scale = (distance.y + delta.y) / distance.y * this.map.scale.y;
                }
                let pos: Vec2 = touchPoint2.add(v2(distance.x / 2, distance.y / 2));
                
                //新的处理放缩点
                this._smoothOperate(v3(scale,scale,scale),pos);


        }else{
            if(!this.lockMapMove){
                let cur=event.getLocation()
                let newPosition = new Vec3(cur.x-this.touchStartP.x+this.oincamera.x,cur.y-this.touchStartP.y+this.oincamera.y,0);
                this._mapMove(newPosition,cur);
            }

        }

    }

    /**
     * 移动地图
     */
    private _mapMove(pos:Vec3,cur:Vec3){
        
        let edge: any = this._calculateEdge(pos);

        if (edge.left <= 0 && edge.right <= 0) {
            this.map.setPosition(v3(cur.x-this.touchStartP.x+this.oincamera.x,this.map.position.y,0));
        }
        if (edge.top <= 0 && edge.bottom <= 0) {
            this.map.setPosition(v3(this.map.position.x,cur.y-this.touchStartP.y+this.oincamera.y,0));
        }
    
    }

    // 计算map的四条边距离容器的距离，为负代表超出去
    private _calculateEdge(nodePos: Vec3): any {
        // distance to the edge when anchor is (0.5, 0.5)
        let horizontalDistance: number = (this.map.parent.getComponent(UITransform).width - this.map.getComponent(UITransform).width * this.map.scale.x) / 2;
        let verticalDistance: number = (this.map.parent.getComponent(UITransform).height - this.map.getComponent(UITransform).height * this.map.scale.y) / 2;

        let left: number = horizontalDistance + nodePos.x;
        let right: number = horizontalDistance - nodePos.x;
        let top: number = verticalDistance - nodePos.y;
        let bottom: number = verticalDistance + nodePos.y;

        return { left, right, top, bottom };
    }

    /**
     * 执行地图放缩
     */
    private _smoothOperate(scale:Vec3,pos:Vec2):void{
        if(scale.x <= this.maxScale&&scale.x >= this.minScale){

            // 当前缩放值与原来缩放值之差
            let deltaScale: number = scale.x - this.map.scale.x;


            // 当前点击的坐标与缩放值差像乘
            // let gapPos: Vec2 = pos.multiply(v2(deltaScale, deltaScale));
            let gapPos :Vec2 =pos.multiply(v2(deltaScale, deltaScale));

            // 当前node坐标位置减去点击 点击坐标和缩放值的值
            let mapPos: Vec2 = v2(this.map.position.x,this.map.position.y).subtract(gapPos);

            // 获取速率的小数后几位，防止速率过小时取整直接舍弃掉了变化
            const rateStr: string = this.fingerIncreaseRate.toString();
            const digit: number = rateStr.split('.')[1] ? rateStr.split('.')[1].length : 0;
            const rate: number = Math.pow(10, 2 + digit);
            let newScale = Math.floor(scale.x * rate) / rate;

            this._dealScalePos(mapPos);
            
            this.map.setScale(v3(newScale,newScale,newScale));
        
        }
    }

    /**
     * 
     * 缩放坐标矫正
     * @param pos 缩放坐标
     */
    private _dealScalePos(pos:Vec2){
        let worldPos: Vec3 = this.node.getComponent(UITransform).convertToWorldSpaceAR(v3(pos.x,pos.y,1));
        let nodePos: Vec3 = this.node.getComponent(UITransform).convertToNodeSpaceAR(worldPos);
        let edge: any = this._calculateEdge(v3(nodePos.x,nodePos.y,1));
        if (edge.left > 0) {
            pos.x -= edge.left;
        }
        if (edge.right > 0) {
            pos.x += edge.right;
        }
        if (edge.top > 0) {
            pos.y += edge.top;
        }
        if (edge.bottom > 0) {
            pos.y -= edge.bottom;
        }
        this.map.setPosition(v3(pos.x,pos.y,1));
    }

    

    
}


