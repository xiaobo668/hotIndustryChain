/**
 * 半导体12大稀缺材料 · 单页海报数据（合规中性表述）
 * 口径：12类关键材料 × 各5家代表企业；剔除688；仅供产业链学习
 */
const SCARCE_MATERIALS_POSTER2026 = {
  title: '半导体12大稀缺材料',
  subtitle: '12类关键材料 · 产业链代表企业产业图谱（学习参考）',
  themeGroups: [
    {
      title: '一、上游关键材料',
      color: '#4338ca',
      segments: [
        {
          name: '磷化铟衬底',
          companies: [
            { name: '云南锗业', highlight: '锗/砷化镓/磷化铟衬底，光通信与毫米波雷达用InP外延片国产主要参与者' },
            { name: '有研新材', highlight: '化合物半导体材料与靶材，磷化铟等高端衬底材料布局' },
            { name: '三安光电', highlight: 'III-V族化合物外延，磷化铟相关光芯片材料能力' },
            { name: '海特高新', highlight: '化合物半导体产线，磷化铟外延片小批量供货（航空+半导体双主业）' },
            { name: '株冶集团', highlight: '锌冶炼副产精铟，为InP产业链提供铟原料' },
          ],
        },
        {
          name: '光刻胶',
          companies: [
            { name: '南大光电', highlight: 'ArF/KrF光刻胶国产化推进，晶圆厂验证与导入加速' },
            { name: '彤程新材', highlight: '参股北京科华，G线/I线及KrF光刻胶树脂与成品布局' },
            { name: '上海新阳', highlight: 'KrF/ArF光刻胶与电镀液，晶圆制造材料平台型公司' },
            { name: '晶瑞电材', highlight: 'i线光刻胶+湿电子化学品，半导体材料双轮' },
            { name: '鼎龙股份', highlight: 'CMP垫+光刻胶树脂/PI浆料，半导体材料国产替代' },
          ],
        },
        {
          name: '碳化硅',
          companies: [
            { name: '三安光电', highlight: '6英寸SiC衬底+外延+器件IDM，800V快充与电驱关键材料' },
            { name: '晶盛机电', highlight: 'SiC长晶炉与衬底设备，碳化硅扩产配套环节' },
            { name: '斯达半导', highlight: 'SiC功率模块主要厂商，衬底供应偏紧下模块环节' },
            { name: '东尼电子', highlight: 'SiC切割线/耗材与器件配套' },
            { name: '露笑科技', highlight: 'SiC衬底产线建设，量产进度以公告为准' },
          ],
        },
        {
          name: 'ABF载板/上游',
          companies: [
            { name: '深南电路', highlight: 'ABF载板国内主要厂商，CPU/GPU封装基板主要供货企业' },
            { name: '兴森科技', highlight: 'IC载板+ABF布局，AI算力封装基板扩产' },
            { name: '鹏鼎控股', highlight: '全球PCB规模靠前厂商，高端HDI/类载板能力向ABF延伸' },
            { name: '生益科技', highlight: '覆铜板/CCL主要厂商，ABF载板上游关键基材' },
            { name: '东材科技', highlight: '高速树脂与膜材料，ABF上游国产替代' },
          ],
        },
      ],
    },
    {
      title: '二、中游关键材料',
      color: '#2563eb',
      segments: [
        {
          name: '钽电容',
          companies: [
            { name: '宏达电子', highlight: '钽电容军工+民用主要厂商，AI服务器高可靠电容供货' },
            { name: '振华科技', highlight: '钽电容与混合集成电路，特种被动元件央企产业平台' },
            { name: '东方钽业', highlight: '钽粉-钽丝-钽电容产业链一体化，上游资源可控' },
            { name: '火炬电子', highlight: '钽电容+陶瓷电容，特种被动元件双主线' },
            { name: '鸿远电子', highlight: '高可靠瓷介/钽相关特种电容' },
          ],
        },
        {
          name: '高端PCB载板',
          companies: [
            { name: '沪电股份', highlight: 'AI服务器/交换机高端PCB主要厂商，算力硬件主要供货企业' },
            { name: '胜宏科技', highlight: 'GPU/AI服务器PCB，高层数HDI与高速板放量' },
            { name: '深南电路', highlight: '高端PCB+IC载板双主线主要厂商，算力与通信双线' },
            { name: '景旺电子', highlight: '汽车+服务器PCB，高端多层板国产替代' },
            { name: '广合科技', highlight: 'AI服务器PCB后起厂商，算力板订单放量' },
          ],
        },
        {
          name: '电子级硫酸',
          companies: [
            { name: '晶瑞电材', highlight: '电子级硫酸/双氧水等湿法清洗液，晶圆厂认证供应商' },
            { name: '江化微', highlight: '湿电子化学品，蚀刻/清洗用电子级酸液' },
            { name: '格林达', highlight: 'TMAH显影液等湿电子化学品' },
            { name: '巨化股份', highlight: '电子级氢氟酸/氟化工' },
            { name: '多氟多', highlight: '电子级氢氟酸与氟化盐，半导体湿法清洗材料配套' },
          ],
        },
        {
          name: 'MLCC电容',
          companies: [
            { name: '风华高科', highlight: '国内MLCC出货规模居前，AI/车规高容MLCC供需偏紧环节' },
            { name: '三环集团', highlight: 'MLCC+粉体垂直一体化，高端被动元件国产替代' },
            { name: '火炬电子', highlight: '特种MLCC+瓷介电容，高可靠场景份额高' },
            { name: '鸿远电子', highlight: '军用高可靠MLCC，宇航级瓷介电容主要厂商' },
            { name: '国瓷材料', highlight: 'MLCC介质陶瓷粉主要厂商，粉体供应环节' },
          ],
        },
      ],
    },
    {
      title: '三、下游关键材料',
      color: '#0369a1',
      segments: [
        {
          name: '铜箔',
          companies: [
            { name: '铜冠铜箔', highlight: '锂电铜箔+电子电路铜箔，AI服务器PCB与电池双需求' },
            { name: '逸豪新材', highlight: '电子电路/锂电铜箔' },
            { name: '德福科技', highlight: '锂电铜箔快速扩产，电子电路铜箔第二曲线' },
            { name: '诺德股份', highlight: '铜箔老牌企业，锂电+电子铜箔双线' },
            { name: '中一科技', highlight: '铜箔后起厂商，高端锂电与标准铜箔同步扩产' },
          ],
        },
        {
          name: '电子布',
          companies: [
            { name: '中国巨石', highlight: '电子纱/电子布主要厂商，高端Low-DK电子布供给偏紧' },
            { name: '宏和科技', highlight: '超薄电子布与特种玻璃纤维布，高端CCL reinforcing材料' },
            { name: '中材科技', highlight: '玻纤+隔膜双主业，电子布/特种纤维材料' },
            { name: '长海股份', highlight: '玻纤制品，电子布与复合材料配套' },
            { name: '山东玻纤', highlight: '玻纤纱线，电子布上游原纱配套环节' },
          ],
        },
        {
          name: '半导体钽靶材',
          companies: [
            { name: '江丰电子', highlight: '高纯溅射靶材主要厂商，钽/钛/铝靶主要供货企业' },
            { name: '阿石创', highlight: 'PVD靶材，钽/铝/铜等薄膜沉积材料' },
            { name: '有研新材', highlight: '稀有金属靶材与半导体材料，钽靶布局' },
            { name: '隆华科技', highlight: '钼/钨/钽等难熔金属靶材与材料' },
            { name: '东方钽业', highlight: '钽粉到靶材一体化，钽靶上游资源+材料' },
          ],
        },
        {
          name: '高纯氦气',
          companies: [
            { name: '凯美特气', highlight: '工业气体+稀有气体，半导体刻蚀/清洗用氦气布局' },
            { name: '杭氧股份', highlight: '空分与特种气体主要厂商，高纯气体供应能力' },
            { name: '和远气体', highlight: '华中气体供应商，电子特气与氦气储运' },
            { name: '雅克科技', highlight: 'LNG/湿法特气与半导体材料' },
            { name: '侨源股份', highlight: '高纯工业气体，半导体厂务气体配套' },
          ],
        },
      ],
    },
  ],
};
