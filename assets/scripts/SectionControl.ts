/*
 * @Author: WeiShan
 * @Date: 2023-04-07 08:51:35
 * @LastEditors: WeiShan
 * @LastEditTime: 2023-04-11 16:17:12
 * @FilePath: \xls-zhanjiang-map-new\assets\scripts\SectionControl.ts
 * @Description: 
 * 
 * Copyright (c) 2023 by WeiShan/xls, All Rights Reserved. 
 */
import { _decorator, Button, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SectionControl')
export class SectionControl extends Component {

    @property(Node)
    sectionBtn:Node = null;

    @property([Node])
    controlBtn:Node[] = [];

    protected onLoad() {
        this.sectionBtn.on(Button.EventType.CLICK, this._clickBtn, this);
    }

    /**
     * 点击章节按钮
     */
    private _clickBtn():void{
        for(let i = 0;i < this.controlBtn.length;i++){
            this.controlBtn[i].active = !this.controlBtn[i].active;
        }
    }
}


