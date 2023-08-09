import { _decorator, Component, Node,Animation } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MenuAnimation')

export class MenuAnimation extends Component {

    public  menuSelect():void {

        this.node.getComponent(Animation).play("Clickmenu");

    }

    public menuNoSelect():void {

        this.node.getComponent(Animation).play("ClickOthermenu");
    
    }

}