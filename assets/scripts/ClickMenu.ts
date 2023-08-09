/*
 * @Author: WeiShan
 * @Date: 2023-04-12 15:04:53
 * @LastEditors: WeiShan
 * @LastEditTime: 2023-04-21 11:09:44
 * @FilePath: \map-personal\assets\scripts\ClickMenu.ts
 * @Description: 
 * 
 * Copyright (c) 2023 by WeiShan/xls, All Rights Reserved. 
 */
import { _decorator, Button, Color, Component, Node, Sprite, v4 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ClickMenu')
export class ClickMenu extends Component {

    @property([Node])
    menuBtn:Node[] = []

    @property(Node)
    clickAreaScript:Node = null;

    protected onLoad(): void {
        for(let i=0;i<this.menuBtn.length;i++){
            this.menuBtn[i].on(Button.EventType.CLICK, this._clickMenuBtn, this);
        }
    }

    /**
     * 点击菜单按钮
     */
    private _clickMenuBtn(event):void{

        //TODO测试 断网测试 之后恢复

        // let sendMessage = this.sendMessageScript.getComponent("SendMessage");
        
        // sendMessage.sendUnity(event.target.name);

        this.clickAreaScript.getComponent("ClickArea").setAreaEffect(event.target.name);

    
    }

}


