import { _decorator, Component ,Animation} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('AlertManage')
export class AlertManage extends Component {

    isMaskShow = false;

    /**
     * 显示弹窗(动画)
     */
    public showAlert():void{
    
        if(!this.isMaskShow){
            this.node.getComponent(Animation).play("showAlert");
            this.isMaskShow = true;
        }
        // this.animation.play("showAlert")
        this.scheduleOnce(function() {
            this.hideAlert();
        }, 2);
    
    }

    /**
     * 隐藏弹窗(动画)
     */
    public hideAlert():void{

        if(this.isMaskShow){
            this.node.getComponent(Animation).play("hideAlert");
            this.isMaskShow = false;
        }
        // this.animation.play("hideAlert")
    
    }

}


