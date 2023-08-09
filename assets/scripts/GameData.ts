/*
 * @Author: WeiShan
 * @Date: 2023-04-06 09:03:56
 * @LastEditors: WeiShan
 * @LastEditTime: 2023-04-21 11:07:14
 * @FilePath: \map-personal\assets\scripts\GameData.ts
 * @Description: 
 * 
 * Copyright (c) 2023 by WeiShan/xls, All Rights Reserved. 
 */
/*
 * @Author: WeiShan
 * @Date: 2023-03-14 08:54:17
 * @LastEditors: WeiShan
 * @LastEditTime: 2023-04-17 15:24:55
 * @FilePath: \xls-zhanjiang-map-new\assets\scripts\GameData.ts
 * @Description: 
 * 
 * Copyright (c) 2023 by WeiShan/xls, All Rights Reserved. 
 */

const GameData = {

    base:{

        gameName:"xls_zhanjiang_map",

        gameVersion:"V1.0.0",

        userId:"GYZT-A-019-360",
        
        websocketUrl:"ws://weconnect.iseemax.cn:8686",

        url:{
            gameInit:"http://weconnect.iseemax.cn/xls_prk/index.php?m=User&c=Unity&a=getZhanJiangState"
        }
    
    },
    
    game:{

        penColor:"",

        mapGroup:{
            
            areaGroup:["乡村振兴示范区","产城融合服务片区","农业公园","农海产品加工产业园","太和工业园转型示范区","智慧产业园区",
                       "站前商贸会展片区","综合产业配套园区","远期产业发展预留区","铁路物流港","麻章扩容提质园区"],
            
            routeGroup:["东海岛铁路","合湛高铁","张海高铁","江湛铁路","湛海高铁","粤海铁路","黎湛铁路"],

            roadGroup:["内部道路","玉湛高速","西城快线","湛江大道","湖光快线","麻南路","高速联络线","金康路","金园路","西城中路",
                       "站东路","疏港大道","源珠路","朝南路","向阳路","南通路","华兴路","产业园西路","产业园南路","产业园中路","产业园东路","X668"],
            
            smallArea:["商贸物流园","城市配送物流园","多式联运物流港","大宗商品物流园","新型材料研发产业园","智慧产业平台",
                       "物流服务配套园","电商展贸物流园","远期预留产业园区","铁路站场"],

            menuGroup:["战略意义","产业体系","产业空间布局","交通体系","规划策略","精细化城市设计区域","城市设计空间结构","用地布局方案","导入产业"]
        
        },

        smallUnder:["铁路物流港","远期产业发展预留区","智慧产业园区"]
    
    },

    /**
     * 根据区域名获取分组名
     * @param areName 区域名
     * @returns 分组名
     */
    _getGroupByArea(areName:string = null):string{
        let group = Object.keys(this.game.mapGroup).find(key=>this.game.mapGroup[key].includes(areName))
        return group?group:'';
    }

};

export default GameData;


