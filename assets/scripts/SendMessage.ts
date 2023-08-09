/*
 * @Author: WeiShan
 * @Date: 2023-03-14 10:03:54
 * @LastEditors: WeiShan
 * @LastEditTime: 2023-04-21 08:43:00
 * @FilePath: \xls-zhanjiang-map-new\assets\scripts\SendMessage.ts
 * @Description: 
 * 
 * Copyright (c) 2023 by WeiShan/xls, All Rights Reserved. 
 */
import { _decorator, Component, Node, color } from 'cc';
import gameData from './GameData';
const { ccclass, property } = _decorator;

@ccclass('SendMessage')
export class SendMessage extends Component {

    @property(Node)
    alertScript:Node = null;

    @property(Node)
    areaScript:Node = null;

    unitySocket = null;
    lockReconnect:boolean = false;


    onLoad(){
        let _this = this;
        
        //链接websocket
        _this.unitySocket = new WebSocket(gameData.base.websocketUrl);

        _this.unitySocket.onmessage = function (e) {
            let message = eval("("+e.data+")");
            switch (message.type) {
                //初始化
                case "init":

                    let sendMessage = '{"type":"joinGroup","group":"'+ gameData.base.gameName +'"}';
                    // console.log(sendMessage)
                    _this.unitySocket.send(sendMessage);

                    break;

                case "clickArea":
                    let state = message.source;
                    switch(state){
                        case "unity":
                            // console.log(message.area)
                            _this.alertScript.getComponent("AlertManage").showAlert();
                            _this.areaScript.getComponent("ClickArea").setAreaEffect(message.area);
                            break;
                        case "show":
                            // 起遮罩
                            _this.alertScript.getComponent("AlertManage").showAlert();
                            break;
                        case "hide":
                            _this.alertScript.getComponent("AlertManage").hideAlert();
                            break;
                        // case "phone":
                        //     _this.areaScript.getComponent("ClickArea").setAreaEffect(message.area);
                        //     _this.alertScript.getComponent("AlertManage").showAlert();
                        //     break;
                    }
            }
            console.log(message)
        }

        // 连接关闭后响应
        _this.unitySocket.onclose = function() {
            _this._reconnect();
        }
        _this.unitySocket.onerror = function () {
            _this._reconnect();
        };

    }

    public sendUnity(area:string):void{

        // TODO 只打印未发送

        var sendMessage = '{"type":"clickArea","area":"'+ area +'","areaType":"'+gameData._getGroupByArea(area)+'","source":"phone","other":"other","group":"'+ gameData.base.gameName +'"}';
        
        this.unitySocket.send(sendMessage);

        // console.log(sendMessage)

    }

    /**
     * 断线重连
     */
    private _reconnect():void{
        if(this.lockReconnect) return;
        let _this = this;
        _this.lockReconnect = true;
        //没连接上会一直重连，设置延迟避免请求过多
        setTimeout(function () {
            try {
                _this.unitySocket = new WebSocket(gameData.base.websocketUrl);
            }catch (e) {
                _this._reconnect();
            }
            _this.unitySocket.onclose = function() {
                _this._reconnect();
            }
            _this.unitySocket.onerror = function () {
                _this._reconnect();
            };
            _this.lockReconnect = false;
        }, 5000);
    }
}