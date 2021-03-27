// 左侧组件的配置文件
/*
type:类型  String   
        input:单行文本框
        textarea:多行文本框
        radio：单选框组
        checkbox：多选框组
        select:下拉选择框
        time：时间选择器
        date：日期选器
icon:图标  String
options:具体的配置项  Object
        width:宽度  String 百分比
        defaultValue:默认值  String
        dataType:值的类型  String
        placeholder:无值的时候展示的文字  String
        disabled:是否可以操作  Boolean
        step:每次改变时的最小单元改变数  Number
        options：radio、checkbox、select这些组件的选项的配置  Array
            value：值  String
            label：展示的文字  String
        remote:是否可以进行远程搜索  Boolean
        remoteFunc:远程搜索的方法名  String
        clearable：是否可以清空  Boolean
        arrowControl：是否使用箭头进行时间选择  Boolean
        format：时间格式  String
*/

export const  basicComponents=[
    {
        type: 'input',
        stype:'userName',
        icon: 'icon-zhengce',
        colspan:24,
        label:'姓名',
        valueId:'userName',
        width: '100%',
        defaultValue: '',
        dataType: 'string',
        placeholder: '请输入',
        disabled: false,
        isRule:false
    },{
        type:'input',
        stype:'email',
        icon:'icon-xingmingzhengjian',
        colspan:24,
        label:'邮箱',
        valueId:'',
        width:'100%',
        defaultValue:'',
        placeholder:'请输入',
        dataType:'string',
        disabled:false,
        isRule:false
    }
    //,{
    //     type:'rate',
    //     stype:'',
    //     icon:'icon-xiaolian',
    //     colspan:24,
    //     label:'打分',
    //     valueId:'',
    //     width:'100%',
    //     texts:['极差','差','中等','好','极好'],
    //     disabled:false
    // }
]

export const commonComponents=[
    {
        type: 'input',
        stype:'',
        icon: 'icon-shurukuang',
        colspan:24,
        label:'单行文本',
        valueId:'',
        width: '100%',
        defaultValue: '',
        dataType: 'string',
        placeholder: '请输入',
        disabled: false,
        isRule:false
    },{
        type:'textarea',
        stype:'',
        icon:'icon-duohangwenben',
        colspan:24,
        label:'多行文本',
        valueId:"",
        width:'100%',
        defaultValue:'',
        placeholder:'请输入',
        rows:'2',
        dataType:'string',
        disabled:false,
        isRule:false
    },{
        type:'radio',
        stype:'',
        icon:'icon-danxuan',
        colspan:24,
        label:'单选框组',
        valueId:'',
        width:'100%',
        defaultValue:'',
        options: [
            {
                value: '0',
                label: '选项一'
            },{
                value: '1',
                label: '选项二'
            }
        ],
        interfaceFunc:'接口名',//这是定死的接口名
        remote:false,
        remoteFunc:'',
        disabled:false,
        isRule:false
    },{
        type:'select',
        stype:'',
        icon:'icon-duoxuan',
        colspan:24,
        label:"下拉选择",
        valueId:'',
        width:'100%',
        defaultValue:'',
        placeholder:'请选择',
        options:[
            {
                value:'1',
                label:'选项一'
            },{
                value:'2',
                label:'选项二'
            },{
                value:'3',
                label:'选项三'
            }
        ],
        interfaceFunc:'接口名',//这是定死的接口名
        remote:false,
        remoteFunc:'',
        disabled:false,
        isRule:false
    },{
        type:'checkbox',
        stype:'',
        icon:'icon-duoxuan',
        colspan:24,
        label:'多选框组',
        valueId:'',
        width:'100%',
        defaultValue:[],
        options:[
            {
                value:'1',
                label:'选项一'
            },{
                value:'2',
                label:'选项二'
            },{
                value:'3',
                label:'选项三'
            }
        ],
        interfaceFunc:'接口名',//这是定死的接口名
        remote:false,
        remoteFunc:'',
        disabled:false,
        isRule:false
    }
    ,{
        type:'upload',
        stype:'',
        icon:'icon-button-upload',
        colspan:24,
        label:'图片上传',
        defaultValue:'',
        action:'',
        disabled:false,
        autoUpload:false,
        listType:'picture',
        isRule:false
    },{
        type:'time',
        stype:'',
        icon:'icon-shijianbianjiwodeqianfenleishouye',
        colspan:24,
        label:"时间",
        valueId:'',
        width:'100%',
        defaultValue:'',
        placeholder:'请选择',
        format:'yyyy-MM-dd HH:mm:ss',
        disabled:false,
        isRule:false
    },{
        type:'date',
        stype:'',
        icon:'icon-riqi',
        colspan:24,
        label:'日期',
        valueId:'',
        width:'100%',
        defaultValue:'',
        placeholder:'请选择',
        format:'yyyy-MM-dd',
        disabled:false,
        isRule:false
    }
]

