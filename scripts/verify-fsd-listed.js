/**
 * 特斯拉FSD入华：A股在上市 + 简称校验 + 强相关
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.join(__dirname, '..');
const code = fs.readFileSync(path.join(root, 'data.js'), 'utf8')
  .replace(/\bconst INDUSTRY_DATA\b/, 'var INDUSTRY_DATA')
  + fs.readFileSync(path.join(root, 'sector-data.js'), 'utf8')
    .replace(/\bconst SECTOR_DATA\b/, 'var SECTOR_DATA');
const sandbox = { exports: {} };
vm.runInNewContext(code + '\nexports={INDUSTRY_DATA,SECTOR_DATA};', sandbox);

const KEY = '特斯拉FSD入华';
const ind = sandbox.exports.INDUSTRY_DATA[KEY];
const sec = sandbox.exports.SECTOR_DATA[KEY];

/** 交易所现行简称 + 代码 + 板块（人工核对 2025-05） */
const LISTED = {
  韦尔股份: { code: '603501', market: '沪市主板', official: '韦尔股份', fsd: '车载CIS/视觉感知' },
  联创电子: { code: '002036', market: '深市主板', official: '联创电子', fsd: '车载光学镜头/ADAS' },
  豪恩汽电: { code: '301488', market: '创业板', official: '豪恩汽电', fsd: '车载摄像头/APA感知' },
  永新光学: { code: '603297', market: '沪市主板', official: '永新光学', fsd: '激光雷达光学' },
  万集科技: { code: '300552', market: '创业板', official: '万集科技', fsd: '车载激光雷达/V2X' },
  华测导航: { code: '300627', market: '创业板', official: '华测导航', fsd: '高精定位/组合导航' },
  德赛西威: { code: '002920', market: '深市主板', official: '德赛西威', fsd: '智驾域控' },
  伯特利: { code: '603596', market: '沪市主板', official: '伯特利', fsd: '线控制动/执行层' },
  科博达: { code: '603786', market: '沪市主板', official: '科博达', fsd: '域控制器' },
  四维图新: { code: '002405', market: '深市主板', official: '四维图新', fsd: '高精地图/合规' },
  中科创达: { code: '300496', market: '创业板', official: '中科创达', fsd: '智驾软件/OS' },
  光庭信息: { code: '301221', market: '创业板', official: '光庭信息', fsd: 'ADAS软件集成' },
  千方科技: { code: '002373', market: '深市主板', official: '千方科技', fsd: '车路协同' },
  金溢科技: { code: '002869', market: '深市主板', official: '金溢科技', fsd: 'V2X' },
  拓普集团: { code: '601689', market: '沪市主板', official: '拓普集团', fsd: '特斯拉Tier1' },
  旭升集团: { code: '603305', market: '沪市主板', official: '旭升集团', fsd: '特斯拉压铸件' },
  银轮股份: { code: '002126', market: '深市主板', official: '银轮股份', fsd: '特斯拉热管理' },
};

const STRONG = /FSD|特斯拉|智驾|域控|地图|感知|激光雷达|摄像头|视觉|V2X|NOA|线控|审图|Orin|Tier1|ADAS|APA|定位|合规|OBU|RSU|CIS|GNSS/;
const INDIRECT = {
  千方科技: 'V2X偏路侧基建，与特斯拉FSD无直接供货，属在华高阶智驾法规间接受益',
  金溢科技: '同上，V2X间接',
  永新光学: '激光雷达光学，特斯拉纯视觉路线不标配激光雷达，属国内NOA生态共振',
  科博达: '主要配套比亚迪/理想等，非特斯拉直供，属行业对标FSD架构',
  伯特利: '线控执行层，主机厂对标订单，非特斯拉直供',
  银轮股份: '热管理随特斯拉产销受益，非FSD感知/域控直供',
  德赛西威: '智驾域控龙头，行业催化非特斯拉直供',
  中科创达: '智驾软件，主机厂对标开发',
  光庭信息: '工程服务，主机厂追赶FSD',
};

const names = new Set();
['upstream', 'midstream', 'downstream'].forEach((t) => {
  (ind[t] || []).forEach((seg) => {
    (seg.companies || []).forEach((co) => names.add(co.name));
  });
});
[...sec.vanguard.companies, ...sec.center.companies].forEach((co) => names.add(co.name));

const errors = [];
const warns = [];

names.forEach((name) => {
  const ref = LISTED[name];
  if (!ref) {
    errors.push(`未收录/名称可能有误: ${name}`);
    return;
  }
  if (name !== ref.official) {
    errors.push(`简称不一致: 数据「${name}」↔ 标准「${ref.official}」`);
  }
  if (/^688|^689/.test(ref.code)) {
    errors.push(`科创板: ${name} ${ref.code}`);
  }
});

['upstream', 'midstream', 'downstream'].forEach((t) => {
  (ind[t] || []).forEach((seg) => {
    (seg.companies || []).forEach((co) => {
      if (!STRONG.test(co.highlight || '')) errors.push(`highlight缺强相关词: ${co.name}`);
      if (INDIRECT[co.name] && !/间接|对标|共振|法规|主机厂/.test(co.highlight)) {
        warns.push(`${co.name}: ${INDIRECT[co.name]}`);
      }
    });
  });
});

[...sec.vanguard.companies, ...sec.center.companies].forEach((co) => {
  if (!names.has(co.name)) errors.push(`龙头不在产业链: ${co.name}`);
});

// 禁止虚假特斯拉直供表述
['upstream', 'midstream', 'downstream'].forEach((t) => {
  (ind[t] || []).forEach((seg) => {
    (seg.companies || []).forEach((co) => {
      const hl = co.highlight || '';
      const claimsTeslaSupply = /特斯拉.*(供应链|产业链|一级|核心|直供|供应商)/.test(hl);
      const deniesTesla = /非特斯拉|未披露.*特斯拉/.test(hl);
      if (claimsTeslaSupply && !deniesTesla && !['拓普集团', '旭升集团', '银轮股份'].includes(co.name)) {
        errors.push(`${co.name} highlight 含未核实的特斯拉供货表述`);
      }
    });
  });
});

console.log('=== 特斯拉FSD入华 上市+名称+强相关校验 ===\n');
console.log('| 简称 | 代码 | 板块 | 环节绑定 | 强相关 |');
console.log('|------|------|------|----------|--------|');
[...names].sort().forEach((name) => {
  const r = LISTED[name];
  if (!r) return;
  const rel = INDIRECT[name] ? '间接⚠' : '直接✓';
  console.log(`| ${r.official} | ${r.code} | ${r.market} | ${r.fsd} | ${rel} |`);
});

if (warns.length) {
  console.log('\n⚠️ 关联度说明（已写入逻辑，非蹭概念）:');
  warns.forEach((w) => console.log(' -', w));
}

if (errors.length) {
  console.log('\n❌ FAIL:');
  errors.forEach((e) => console.log(' -', e));
  process.exit(1);
}
console.log('\n✅ PASS: 共', names.size, '家均为沪深/创业板在上市A股，简称正确，highlight含FSD/智驾强相关表述');
