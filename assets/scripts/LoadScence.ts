/*
 * @Author: WeiShan
 * @Date: 2023-04-21 14:00:22
 * @LastEditors: WeiShan
 * @LastEditTime: 2023-04-26 09:47:17
 * @FilePath: \map-personal\assets\scripts\LoadScence.ts
 * @Description: 
 * 
 * Copyright (c) 2023 by WeiShan/xls, All Rights Reserved. 
 */
import { _decorator, Component, Director, director, Label, Node, ProgressBar } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('LoadScence')
export class LoadScence extends Component {

    protected onLoad():void {

        director.preloadScene("scene-map",function(completedCount,totalCount){
            
            let percent =  completedCount/totalCount;

            console.log(percent)
        
        },function(){
            
            director.loadScene("scene-map")

        })

    }
    

}


