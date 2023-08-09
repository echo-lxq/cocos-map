/*
 * @Author: WeiShan
 * @Date: 2023-04-06 09:03:56
 * @LastEditors: WeiShan
 * @LastEditTime: 2023-04-24 14:20:46
 * @FilePath: \map-personal\assets\scripts\ClickArea.ts
 * @Description: 
 * 
 * Copyright (c) 2023 by WeiShan/xls, All Rights Reserved. 
 */
/*
 * @Author: WeiShan
 * @Date: 2023-04-06 09:03:56
 * @LastEditors: WeiShan
 * @LastEditTime: 2023-04-20 10:43:20
 * @FilePath: \xls-zhanjiang-map-new\assets\scripts\ClickArea.ts
 * @Description: 
 * 
 * Copyright (c) 2023 by WeiShan/xls, All Rights Reserved. 
 */
/*
 * @Author: WeiShan
 * @Date: 2023-03-13 15:43:49
 * @LastEditors: WeiShan
 * @LastEditTime: 2023-04-19 09:30:49
 * @FilePath: \xls-zhanjiang-map-new\assets\scripts\ClickArea.ts
 * @Description: 
 * 
 * Copyright (c) 2023 by WeiShan/xls, All Rights Reserved. 
 */
import { _decorator, Component, Node , PhysicsSystem2D,Sprite,color, Script, UIRenderer, Material, v4, Vec4, Color} from 'cc';
const { ccclass, property } = _decorator;
import gameData from './GameData';

@ccclass('ClickArea')
export class ClickArea extends Component {


    @property(Node)
    menuParent:Node = null;

    @property(Node)
    areaGroup:Node = null;

    @property(Node)
    routeGroup:Node = null;

    @property(Node)
    roadGroup:Node = null;

    @property(Node)
    smallArea:Node = null;

    @property(Node)
    btomIntro:Node = null;

    selectedArea:string = null;

    selectedMenu:string = null;

    onLoad(){
        this.node.on(Node.EventType.TOUCH_END, this.onTouchEndCallback, this);

        // 网络请求

        // let _this = this;
        // let fromData = new FormData();
        // fromData.append("fromId",gameData.base.userId);
        
        // fetch(gameData.base.url.gameInit,{
        //     method:'post',
        //     body:fromData
        // }).then(response=>{
        //     let result = response.json()
        //     result.then(res=>{
        //         // console.log(res.program_name)
        //         if(res.program_name){
        //             _this.setAreaEffect(res.program_name)
        //             _this.setAreaEffect(res.program_type)
        //         }
        //     })
        // })

    }

    onTouchEndCallback(event){
        //处理误触
        if(event.getStartLocation().x === event.getLocationX()&&
        event.getStartLocation().y === event.getLocationY()){

            PhysicsSystem2D.instance.enable = true;
            
            const collider = PhysicsSystem2D.instance.testPoint(event.getUILocation());

            if(collider.length){

                let areaName = collider[0].node.name;

                if(this.selectedArea!==areaName){

                    //TODO 临时测试使用

                    // let sendMessage = this.sendMessageScript.getComponent("SendMessage");
                    
                    // sendMessage.sendUnity(areaName);

                    this.setAreaEffect(areaName);

                }

            }
        }
    }

    /**
     * 设置区域点击效果
     */
    public setAreaEffect(areaName:string):void{

        //获取到点击的孩子结点

        if(areaName !== "-1"){
            
            let groupName = gameData._getGroupByArea(areaName);

            switch(groupName){

                case "":

                    console.log("error area ",areaName);

                    break;

                case "menuGroup":

                    for(let i = 0;i < this.menuParent.children.length;i++){

                        this.menuParent.children[i].getChildByName("section-click").active = false;
                
                    }

                    this.menuParent.getChildByName(areaName).getChildByName("section-click").active = true;
                    this.menuParent.getChildByName(areaName).getChildByName("section-click").getComponent("MenuAnimation").menuSelect();

                    // if(this.selectedMenu){
                            
                    //     this.menuParent.getChildByName(this.selectedMenu).getChildByName("section-click").getComponent("MenuAnimation").menuNoSelect();
                        
                    // }

                    this.selectedMenu = areaName;
                    
                    if(areaName === "用地布局方案"){

                        this._menuChange(true);
                        
                    }else{

                        this._menuChange(false);
                    
                    } 

                    break;
                case "areaGroup":
                case "smallArea":
                    // 显示底部遮罩
                    
                    for(let i = 0 ; i < this.btomIntro.getChildByName("introduction-text").children.length;i++){
                        this.btomIntro.getChildByName("introduction-text").children[i].active = false;
                    }

                    this.btomIntro.getChildByName("introduction-text").getChildByName(areaName).active = true;

                    this.btomIntro.active = true;

                    this._resetArea(false,false);
        
                    let clickANode:Node = this.node.getChildByName(gameData._getGroupByArea(areaName)).getChildByName(areaName).children[0];
        
                    clickANode.active = true;
        
                    this.selectedArea = areaName;
                    break;
                default:
                    //隐藏底部遮罩

                    this.btomIntro.active = false;

                    this._resetArea(false,false);
        
                    let clickNode:Node = this.node.getChildByName(gameData._getGroupByArea(areaName)).getChildByName(areaName).children[0];
        
                    clickNode.active = true;
        
                    this.selectedArea = areaName;
            }

        }
        
        // console.log(areaName);

        //点击高亮shader

        // clickNode.getComponent(Sprite).color = color(colorValue[penColor].value);

        // let material: Material = clickNode.getComponent(UIRenderer)!.getMaterial(0)!;
        
        // material.setProperty("glowColor",colorValue[penColor].shader);

        // clickNode.getComponent(UIRenderer)!.setMaterial(material, 0);

        // if (clickNode.getComponent(UIRenderer) instanceof Sprite){

        //     // console.log(material);

        // }

    }

    /**
     * 将区域熄灭
     */
    private _resetArea(bigArea:boolean,smallArea:boolean):void{

        for(let i = 0; i < this.smallArea.children.length;i++){
            
            this.smallArea.children[i].children[0].active = smallArea;
        
        }

        for(let i = 0; i < this.areaGroup.children.length;i++){
            
            this.areaGroup.children[i].children[0].active = bigArea;
        
        }
            
        for(let i = 0; i < this.routeGroup.children.length;i++){
                
            this.routeGroup.children[i].children[0].active = bigArea;
            
        }
    
        for(let i = 0; i < this.roadGroup.children.length;i++){
                
            this.roadGroup.children[i].children[0].active = bigArea;
            
        }
    }


    /**
     * 章节切换效果
     */
    private _menuChange(isSmall:boolean):void{
        
        this.smallArea.active = isSmall;

        this._resetArea(!isSmall,isSmall);        

        for(let i = 0;i < gameData.game.smallUnder.length; i++){
            
           this.areaGroup.getChildByName(gameData.game.smallUnder[i]).active = !isSmall

        }
    
    }

}