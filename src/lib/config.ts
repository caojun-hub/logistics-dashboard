export const ZONE_DISTRICTS: Record<string, string[]> = {
  '芜湖战区': ['镜湖区', '鸠江区', '弋江区'],
  '大同战区': ['大同合并经营'],
  '苏皖南战区': ['定远', '来安', '明光', '长丰'],
  '苏皖北战区': ['凤阳', '洪泽', '天长', '盱眙'],
  '川渝藏战区': ['铜梁区', '卡若区'],
  '湖北分区': ['嘉鱼', '通山', '通城', '咸安区'],
  '陕西分区': ['杨陵区', '兴平', '周至'],
};

export const DISTRICTS_21 = Object.values(ZONE_DISTRICTS).flat();

export const ZONES = Object.keys(ZONE_DISTRICTS);

export const MONTHS = ['202604', '202605', '202606'];

export const MONTHLY_TARGETS: Record<string, Record<string, { tt: number; zs: number }>> = {
  '202604': { default: { tt: 98.3, zs: 88 } },
  '202605': { default: { tt: 98.3, zs: 88 } },
  '202606': { default: { tt: 98.5, zs: 90 } },
};

export function getTarget(month: string, district: string) {
  const m = MONTHLY_TARGETS[month];
  if (!m) return MONTHLY_TARGETS['202606'].default;
  return m[district] || m.default;
}

export const RIDER_LINES = ['专送', '普通众包', '蜂跑', '联盟', '未知', '优远', '优选', '高德', '其他', '大众包'];

export const TIME_SLOT_ORDER = [
  '夜宵5', '夜宵4', '夜宵3', '夜宵2', '夜宵1',
  '早餐2', '早餐1',
  '上午',
  '午高峰',
  '下午茶2', '下午茶1',
  '晚高峰',
  '凌晨3', '凌晨2', '凌晨1',
];

export const DISTANCE_ORDER = [
  '[0.0-1.0)km', '[1.0-2.0)km', '[2.0-3.0)km', '[3.0-4.0)km',
  '[4.0-5.0)km', '[5.0-6.0)km', '[6.0-7.0)km', '[7.0-8.0)km',
  '[8.0-9.0)km', '[9.0-10.0)km', '[10.0+)km',
];

export const ECHART_COLORS = ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc', '#5b8ff9'];