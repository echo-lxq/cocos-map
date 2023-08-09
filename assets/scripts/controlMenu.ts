/*
 * @Author: WeiShan
 * @Date: 2023-03-22 08:50:56
 * @LastEditors: WeiShan
 * @LastEditTime: 2023-04-11 16:11:12
 * @FilePath: \xls-zhanjiang-map-new\assets\scripts\controlMenu.ts
 * @Description: 
 * 
 * Copyright (c) 2023 by WeiShan/xls, All Rights Reserved. 
 */
import { _decorator, Component, Node, Button ,Animation, CCString} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('controlMenu')
export class controlMenu extends Component {

    @property(Node)
    showButton:Node = null

    @property(Node)
    hideButton:Node = null

    @property(CCString)
    showAnimation:string = ""

    @property(CCString)
    hideAnimation:string = ""

    protected onLoad():void{
        this.showButton.on(Button.EventType.CLICK, this._showMenu, this);
        this.hideButton.on(Button.EventType.CLICK, this._hideMenu, this);
        this._controlButton()
    }
    
    /**
     * 显示菜单
     */
    private _showMenu():void{
        this._controlButton()
        // "showMenu"
        this.node.getComponent(Animation).play(this.showAnimation);
    }

    /**
     * 隐藏菜单
     */
    private _hideMenu():void{
        this._controlButton(false)
        // "hideMenu"
        this.node.getComponent(Animation).play(this.hideAnimation);
    }

    /**
     * 控制按钮显示与隐藏
     */
    private _controlButton(isshow:boolean = true):void{
        if(isshow){
            this.showButton.active = false;
            this.hideButton.active = true;
        }else{
            this.showButton.active = true;
            this.hideButton.active = false;
        }
    }


}