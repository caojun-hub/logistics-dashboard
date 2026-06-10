import { DISTRICTS_21, MONTHS } from './config';

export interface CumJbp {
  cum: Record<string, Record<string, [number, number, number]>>;
  month_end: Record<string, Record<string, Record<string, [number, number, number]>>>;
  available_months: string[];
  data_start: number;
  data_end: number;
}

type NonJbpMonthData = Record<string, [number, number, number, number, number]>;

export interface NonJbpCum {
  month_end: Record<string, Record<string, Record<string, [number, number, number, number, number]>>>;
  available_months: string[];
  [month: string]: Record<string, NonJbpMonthData> | string[] | Record<string, Record<string, NonJbpMonthData>> | undefined;
}

export interface LineTotalMap {
  _total: number;
  [key: string]: number;
}

export interface ChengtuoRatio {
  district_cum: Record<string, LineTotalMap>;
  district_daily: Record<string, Record<string, LineTotalMap>>;
  district_month_end: Record<string, Record<string, Record<string, LineTotalMap>>>;
  biz_cum: Record<string, Record<string, Record<string, LineTotalMap>>>;
  biz_daily: Record<string, Record<string, Record<string, Record<string, LineTotalMap>>>>;
  biz_month_end: Record<string, Record<string, Record<string, Record<string, LineTotalMap>>>>;
}

interface PtEntry {
  pt: number;
  total: number;
}

export interface PingtanRatio {
  district_cum: Record<string, PtEntry>;
  district_daily: Record<string, Record<string, PtEntry>>;
  district_month_end: Record<string, Record<string, PtEntry>>;
  biz_cum: Record<string, Record<string, PtEntry>>;
  biz_daily: Record<string, Record<string, Record<string, PtEntry>>>;
  biz_month_end: Record<string, Record<string, Record<string, PtEntry>>>;
}

export interface RiderAttendance {
  daily: Record<string, Record<string, LineTotalMap>>;
}

export interface RiderAttendanceMonthly extends Record<string, Record<string, LineTotalMap>> {}

interface RiderDayEntry {
  riders: number;
  active: number;
  orders: number;
  online_h: number;
  orders_per_active: number;
  orders_per_hour: number;
}

export interface RiderEfficiency extends Record<string, Record<string, Record<string, RiderDayEntry>>> {}

export interface TimeDist extends Record<string, Record<string, Record<string, Record<string, number>>>> {}

export interface DistanceDist extends Record<string, Record<string, Record<string, Record<string, number>>>> {}

// Drill-down data types
export interface DrillData extends Record<string, Record<string, Record<string, Record<string, Record<string, number[]>>>>> {}

export interface NonDrillData extends Record<string, Record<string, Record<string, Record<string, Record<string, number[]>>>>> {}

export interface WeekDrillData extends Record<string, Record<string, Record<string, Record<string, Record<string, number[]>>>>> {}

// Imperfection types
export interface ImperfDayEntry {
  imperf_w: number;
  imperf_t: number;
  imperf_rate: number;
  logistics_pct: number;
  merchant_pct: number;
  user_pct: number;
  overtime_w: number;
  overtime_pre: number;
  overtime_instant: number;
  overtime_logistics_w: number;
  overtime_logistics_impact: number;
}

export interface ImperfBizDetail {
  w: number;
  t: number;
  r: number;
}

export interface ImperfAttr {
  [month: string]: Record<string, Record<string, ImperfDayEntry>> | Record<string, Record<string, Record<string, ImperfBizDetail>>> | Record<string, Record<string, ImperfBizDetail>> | Record<string, Record<string, Record<string, ImperfDayEntry>>> | string[] | undefined;
  biz_detail: Record<string, Record<string, ImperfBizDetail>>;
  month_end: Record<string, Record<string, Record<string, ImperfDayEntry>>>;
}

export interface ImperfBiz {
  [month: string]: Record<string, Record<string, number[]>> | Record<string, Record<string, Record<string, ImperfBizDetail>>> | Record<string, Record<string, ImperfBizDetail>> | Record<string, Record<string, Record<string, number[]>>> | string[] | undefined;
  biz_detail: Record<string, Record<string, ImperfBizDetail>>;
  month_end: Record<string, Record<string, Record<string, number[]>>>;
}

// Night snack types
export interface NightSnackCum {
  [month: string]: Record<string, Record<string, number>> | Record<string, Record<string, Record<string, number>>> | undefined;
  month_end: Record<string, Record<string, Record<string, number>>>;
}

export interface NightSnackDrill extends Record<string, Record<string, Record<string, Record<string, [number, number]>>>> {}

export interface NightSnackDrillPush extends Record<string, Record<string, Record<string, number>>> {}

// Rider quality types
export interface RiderQualityCum {
  [month: string]: Record<string, Record<string, number[]>> | Record<string, Record<string, Record<string, number[]>>> | undefined;
  month_end: Record<string, Record<string, Record<string, number[]>>>;
}

export interface RiderQualityDrill extends Record<string, Record<string, Record<string, number[]>>> {}

export interface RiderMonthDrill extends Record<string, Record<string, Record<string, Record<string, Record<string, number>>>>> {}

export interface RiderWeekData extends Record<string, Record<string, number[]>> {}

export interface RiderWeekDrill extends Record<string, Record<string, Record<string, Record<string, number[]>>>> {}

export interface DashboardData {
  cumJbp: CumJbp;
  nonJbpCum: NonJbpCum;
  chengtuoRatio: ChengtuoRatio;
  pingtanRatio: PingtanRatio;
  riderAttendance: RiderAttendance;
  riderAttendanceMonthly: RiderAttendanceMonthly;
  riderEfficiency: RiderEfficiency;
  timeDist: TimeDist;
  distanceDist: DistanceDist;
  drillData: DrillData;
  nonDrillData: NonDrillData;
  weekDrillData: WeekDrillData;
  imperfAttr: ImperfAttr;
  imperfBiz: ImperfBiz;
  nightSnackCum: NightSnackCum;
  nightSnackDrill: NightSnackDrill;
  nightSnackDrillPush: NightSnackDrillPush;
  riderMonthDrill: RiderMonthDrill;
  riderQualityCum: RiderQualityCum;
  riderQualityDrill: RiderQualityDrill;
  riderWeekData: RiderWeekData;
  riderWeekDrill: RiderWeekDrill;
}

let cachedData: DashboardData | null = null;

export async function loadDashboardData(): Promise<DashboardData> {
  if (cachedData) return cachedData;

  const [
    cumJbp,
    nonJbpCum,
    chengtuoRatio,
    pingtanRatio,
    riderAttendance,
    riderAttendanceMonthly,
    riderEfficiency,
    timeDist,
    distanceDist,
    drillData,
    nonDrillData,
    weekDrillData,
    imperfAttr,
    imperfBiz,
    nightSnackCum,
    nightSnackDrill,
    nightSnackDrillPush,
    riderMonthDrill,
    riderQualityCum,
    riderQualityDrill,
    riderWeekData,
    riderWeekDrill,
  ] = await Promise.all([
    import('@/../public/data/cum_jbp.json'),
    import('@/../public/data/non_jbp_cum.json'),
    import('@/../public/data/chengtuo_ratio.json'),
    import('@/../public/data/pingtan_ratio.json'),
    import('@/../public/data/rider_attendance.json'),
    import('@/../public/data/rider_attendance_monthly.json'),
    import('@/../public/data/rider_efficiency.json'),
    import('@/../public/data/time_dist.json'),
    import('@/../public/data/distance_dist.json'),
    import('@/../public/data/drill_data.json'),
    import('@/../public/data/non_drill_data.json'),
    import('@/../public/data/week_drill_data.json'),
    import('@/../public/data/imperf_attr.json'),
    import('@/../public/data/imperf_biz.json'),
    import('@/../public/data/night_snack_cum.json'),
    import('@/../public/data/night_snack_drill.json'),
    import('@/../public/data/night_snack_drill_push.json'),
    import('@/../public/data/rider_month_drill.json'),
    import('@/../public/data/rider_quality_cum.json'),
    import('@/../public/data/rider_quality_drill.json'),
    import('@/../public/data/rider_week_data.json'),
    import('@/../public/data/rider_week_drill.json'),
  ]);

  const data: DashboardData = {
    cumJbp: cumJbp.default as unknown as CumJbp,
    nonJbpCum: nonJbpCum.default as unknown as NonJbpCum,
    chengtuoRatio: chengtuoRatio.default as unknown as ChengtuoRatio,
    pingtanRatio: pingtanRatio.default as unknown as PingtanRatio,
    riderAttendance: riderAttendance.default as unknown as RiderAttendance,
    riderAttendanceMonthly: riderAttendanceMonthly.default as unknown as RiderAttendanceMonthly,
    riderEfficiency: riderEfficiency.default as unknown as RiderEfficiency,
    timeDist: timeDist.default as unknown as TimeDist,
    distanceDist: distanceDist.default as unknown as DistanceDist,
    drillData: drillData.default as unknown as DrillData,
    nonDrillData: nonDrillData.default as unknown as NonDrillData,
    weekDrillData: weekDrillData.default as unknown as WeekDrillData,
    imperfAttr: imperfAttr.default as unknown as ImperfAttr,
    imperfBiz: imperfBiz.default as unknown as ImperfBiz,
    nightSnackCum: nightSnackCum.default as unknown as NightSnackCum,
    nightSnackDrill: nightSnackDrill.default as unknown as NightSnackDrill,
    nightSnackDrillPush: nightSnackDrillPush.default as unknown as NightSnackDrillPush,
    riderMonthDrill: riderMonthDrill.default as unknown as RiderMonthDrill,
    riderQualityCum: riderQualityCum.default as unknown as RiderQualityCum,
    riderQualityDrill: riderQualityDrill.default as unknown as RiderQualityDrill,
    riderWeekData: riderWeekData.default as unknown as RiderWeekData,
    riderWeekDrill: riderWeekDrill.default as unknown as RiderWeekDrill,
  };

  cachedData = data;
  return data;
}

export function getDailyPush(data: CumJbp, district: string, month: string) {
  const monthData = data.cum[district];
  if (!monthData) return [];

  const dates = Object.keys(monthData)
    .filter(d => d.startsWith(month))
    .sort();

  if (dates.length === 0) return [];

  const result: { date: string; push: number }[] = [];
  for (let i = 0; i < dates.length; i++) {
    const todayCum = monthData[dates[i]][0];
    const yesterdayCum = i === 0 ? 0 : monthData[dates[i - 1]][0];
    result.push({ date: dates[i], push: todayCum - yesterdayCum });
  }
  return result;
}

export function getCumNonJbpRates(data: NonJbpCum, district: string, month: string) {
  const monthData = (data as Record<string, Record<string, NonJbpMonthData>>)[month]?.[district];
  if (!monthData) return [];

  const dates = Object.keys(monthData).sort();

  if (dates.length === 0) return [];

  const result: { date: string; ttRate: number; zsRate: number; avgT: number }[] = [];

  for (const dt of dates) {
    const cur = monthData[dt];
    const ttRate = cur[0] > 0 ? Math.round(cur[1] / cur[0] * 10000) / 100 : 0;
    const zsRate = cur[0] > 0 ? Math.round(cur[2] / cur[0] * 10000) / 100 : 0;
    const avgT = cur[1] > 0 ? Math.round(cur[3] / cur[1] / 60 * 10) / 10 : 0;
    result.push({ date: dt, ttRate, zsRate, avgT });
  }
  return result;
}

export function getChengtuoDaily(data: ChengtuoRatio, district: string, month: string) {
  const dailyData = data.district_daily[district];
  if (!dailyData) return { dates: [] as string[], lines: [] as string[], result: [] as { date: string; lineData: Record<string, number>; total: number }[] };

  const dates = Object.keys(dailyData)
    .filter(d => d.startsWith(month))
    .sort();

  const riderLines = new Set<string>();
  for (const dt of dates) {
    const dayData = dailyData[dt];
    Object.keys(dayData).forEach(k => { if (k !== '_total') riderLines.add(k); });
  }

  const lines = Array.from(riderLines).sort();

  const result: { date: string; lineData: Record<string, number>; total: number }[] = [];

  for (let i = 0; i < dates.length; i++) {
    const cur = dailyData[dates[i]];
    const prev = i === 0 ? null : dailyData[dates[i - 1]];

    const lineData: Record<string, number> = {};
    let dailyTotal = 0;

    for (const line of lines) {
      const curVal = cur[line] || 0;
      const prevVal = prev ? (prev[line] || 0) : 0;
      const daily = curVal - prevVal;
      lineData[line] = daily;
      dailyTotal += daily;
    }

    result.push({ date: dates[i], lineData, total: dailyTotal });
  }

  return { dates: dates.map(d => d.slice(-2)), lines, result };
}

export function getTimeDistMonthly(data: TimeDist, district: string, month: string) {
  const distData = data[district];
  if (!distData) return {};

  const dates = Object.keys(distData).filter(d => d.startsWith(month));

  const slotTotals: Record<string, number> = {};
  for (const dt of dates) {
    const daySlots = distData[dt];
    for (const slot of Object.keys(daySlots)) {
      const lineTotal = Object.values(daySlots[slot]).reduce((a, b) => a + b, 0);
      slotTotals[slot] = (slotTotals[slot] || 0) + lineTotal;
    }
  }

  return slotTotals;
}

export function getDistanceDistMonthly(data: DistanceDist, district: string, month: string) {
  const distData = data[district];
  if (!distData) return {};

  const dates = Object.keys(distData).filter(d => d.startsWith(month));

  const segTotals: Record<string, number> = {};
  for (const dt of dates) {
    const daySegs = distData[dt];
    for (const seg of Object.keys(daySegs)) {
      const lineTotal = Object.values(daySegs[seg]).reduce((a, b) => a + b, 0);
      segTotals[seg] = (segTotals[seg] || 0) + lineTotal;
    }
  }

  return segTotals;
}

export function getRiderEfficiencyMonthly(data: RiderEfficiency, district: string, month: string) {
  const distData = data[district];
  if (!distData) return { summary: [], trend: [] };

  const dates = Object.keys(distData).filter(d => d.startsWith(month)).sort();

  const lines = new Set<string>();
  for (const dt of dates) {
    Object.keys(distData[dt]).forEach(l => lines.add(l));
  }

  const summary: { line: string; avgActive: number; avgOrdersPerActive: number; avgOrdersPerHour: number }[] = [];
  for (const line of Array.from(lines).sort()) {
    let totalActive = 0, totalOPA = 0, totalOPH = 0, cnt = 0;
    for (const dt of dates) {
      const ld = distData[dt]?.[line];
      if (ld) {
        totalActive += ld.active;
        totalOPA += ld.orders_per_active;
        totalOPH += ld.orders_per_hour;
        cnt++;
      }
    }
    summary.push({
      line,
      avgActive: cnt > 0 ? Math.round(totalActive / cnt) : 0,
      avgOrdersPerActive: cnt > 0 ? Math.round(totalOPA / cnt * 10) / 10 : 0,
      avgOrdersPerHour: cnt > 0 ? Math.round(totalOPH / cnt * 100) / 100 : 0,
    });
  }

  const trend: { date: string; data: Record<string, { active: number; ordersPerActive: number }> }[] = [];
  for (const dt of dates) {
    const dayData: Record<string, { active: number; ordersPerActive: number }> = {};
    for (const line of Array.from(lines).sort()) {
      const ld = distData[dt]?.[line];
      if (ld) {
        dayData[line] = { active: ld.active, ordersPerActive: ld.orders_per_active };
      }
    }
    trend.push({ date: dt, data: dayData });
  }

  return { summary, trend };
}

export function getPingtanMonthly(data: PingtanRatio, district: string, month: string) {
  const monthEnd = data.district_month_end[district]?.[month];
  if (!monthEnd) return null;

  const pt = monthEnd.pt;
  const total = monthEnd.total;
  const nonPt = total - pt;
  const ratio = total > 0 ? Math.round(pt / total * 10000) / 100 : 0;

  return { pt, nonPt, ratio };
}

export function getLineOrderDist(data: ChengtuoRatio, district: string, _month: string) {
  const cum = data.district_cum[district];
  if (!cum) return [];

  const total = cum._total || 0;
  if (total === 0) return [];

  const lines = Object.keys(cum).filter(k => k !== '_total').sort();

  return lines.map(line => {
    const orders = cum[line] || 0;
    const pct = Math.round(orders / total * 10000) / 100;
    return { line, orders, pct };
  }).sort((a, b) => b.orders - a.orders);
}

export function getLineAttendanceSummary(data: RiderAttendanceMonthly, district: string, month: string) {
  const monthData = data[month]?.[district];
  if (!monthData) return [];

  const lines = Object.keys(monthData).filter(k => k !== '_total').sort();

  return lines.map(line => ({
    line,
    count: monthData[line] || 0,
  })).sort((a, b) => b.count - a.count);
}

export function getAttendanceDaily(data: RiderAttendance, district: string, month: string) {
  const dailyData = data.daily[district];
  if (!dailyData) return { dates: [], lines: [], result: [] };

  const dates = Object.keys(dailyData)
    .filter(d => d.startsWith(month))
    .sort();

  if (dates.length === 0) return { dates: [], lines: [], result: [] };

  const lines = new Set<string>();
  for (const dt of dates) {
    Object.keys(dailyData[dt]).forEach(k => { if (k !== '_total') lines.add(k); });
  }

  const sortedLines = Array.from(lines).sort();
  const result = dates.map(dt => {
    const dayData = dailyData[dt];
    const lineData: Record<string, number> = {};
    for (const line of sortedLines) {
      lineData[line] = dayData[line] || 0;
    }
    return { date: dt, lineData, total: dayData._total || 0 };
  });

  return { dates: dates.map(d => d.slice(-2)), lines: sortedLines, result };
}

// Drill-down transformation functions
export function getDrillBizSummary(data: DrillData, district: string, weekDate?: string) {
  const dates = Object.keys(data).sort();
  if (dates.length === 0) return [];

  const targetDates = weekDate ? dates.filter(d => d === weekDate) : dates;

  const result: { biz: string; bizareas: { name: string; total: number; slots: Record<string, number> }[] }[] = [];

  for (const dt of targetDates) {
    const distData = data[dt]?.[district];
    if (!distData) continue;

    for (const [biz, areas] of Object.entries(distData)) {
      const bizareas = Object.entries(areas).map(([areaName, slots]) => {
        const slotData: Record<string, number> = {};
        let total = 0;
        for (const [slot, vals] of Object.entries(slots)) {
          const val = Array.isArray(vals) ? vals[0] : vals;
          slotData[slot] = val;
          total += val;
        }
        return { name: areaName, total, slots: slotData };
      }).sort((a, b) => b.total - a.total);

      result.push({ biz, bizareas });
    }
  }

  return result;
}

export function getImperfAttrDaily(data: ImperfAttr, district: string, month: string) {
  const monthData = (data as Record<string, Record<string, Record<string, ImperfDayEntry>>>)[month]?.[district];
  if (!monthData) return [];

  const dates = Object.keys(monthData).sort();

  return dates.map(dt => {
    const d = monthData[dt];
    return {
      date: dt,
      imperfW: d.imperf_w,
      imperfT: d.imperf_t,
      imperfRate: d.imperf_rate,
      logisticsPct: d.logistics_pct,
      merchantPct: d.merchant_pct,
      userPct: d.user_pct,
      overtimeW: d.overtime_w,
      overtimeInstant: d.overtime_instant,
    };
  });
}

export function getImperfBizDaily(data: ImperfBiz, district: string, month: string) {
  const monthData = (data as Record<string, Record<string, Record<string, number[]>>>)[month]?.[district];
  if (!monthData) return [];

  const dates = Object.keys(monthData).sort();

  return dates.map(dt => {
    const d = monthData[dt];
    return {
      date: dt,
      total: d[0],
      imperf: d[1],
      rate: d[2],
    };
  });
}

export function getImperfBizDetail(data: ImperfBiz, district: string) {
  return data.biz_detail?.[district] || {};
}

export function getNightSnackTrend(data: NightSnackCum, district: string, month: string) {
  const monthData = (data as Record<string, Record<string, Record<string, number>>>)[month];
  if (!monthData) return [];

  const dates = Object.keys(monthData).sort();
  const result: { date: string; value: number }[] = [];

  for (const dt of dates) {
    const val = monthData[dt]?.[district];
    if (val !== undefined) {
      result.push({ date: dt, value: val });
    }
  }

  return result;
}

export function getNightSnackDrillSummary(data: NightSnackDrill, district: string, weekDate?: string) {
  const dates = Object.keys(data).sort();
  const targetDates = weekDate ? dates.filter(d => d === weekDate) : dates;

  const result: { bizarea: string; slots: { name: string; rate: number; orders: number }[] }[] = [];

  for (const dt of targetDates) {
    const distData = data[dt]?.[district];
    if (!distData) continue;

    for (const [area, slots] of Object.entries(distData)) {
      const slotData = Object.entries(slots).map(([slotName, val]) => ({
        name: slotName,
        rate: val[0],
        orders: val[1],
      })).sort((a, b) => b.orders - a.orders);

      result.push({ bizarea: area, slots: slotData });
    }
  }

  return result;
}

export function getNightSnackDrillPushSummary(data: NightSnackDrillPush, district: string, weekDate?: string) {
  const dates = Object.keys(data).sort();
  const targetDates = weekDate ? dates.filter(d => d === weekDate) : dates;

  const result: { date: string; slots: Record<string, number> }[] = [];

  for (const dt of targetDates) {
    const distData = data[dt]?.[district];
    if (!distData) continue;
    result.push({ date: dt, slots: distData });
  }

  return result;
}

export function getRiderQualityTrend(data: RiderQualityCum, district: string, month: string) {
  const monthData = (data as Record<string, Record<string, Record<string, number[]>>>)[month]?.[district];
  if (!monthData) return [];

  const dates = Object.keys(monthData).sort();

  return dates.map(dt => {
    const d = monthData[dt];
    return { date: dt, values: d };
  });
}

export function getRiderMonthDrillSummary(data: RiderMonthDrill, district: string, month: string) {
  const monthData = data[month]?.[district];
  if (!monthData) return [];

  const result: { bizarea: string; lines: { name: string; metrics: number[] }[] }[] = [];

  for (const [area, lines] of Object.entries(monthData)) {
    const lineData = Object.entries(lines).map(([lineName, metrics]) => ({
      name: lineName,
      metrics: Object.values(metrics) as number[],
    }));

    result.push({ bizarea: area, lines: lineData });
  }

  return result;
}

export function getRiderWeekSummary(data: RiderWeekData, district: string) {
  const dates = Object.keys(data).sort();

  return dates.map(dt => {
    const d = data[dt]?.[district];
    return { date: dt, values: d || [] };
  });
}

export function getRiderWeekDrillSummary(data: RiderWeekDrill, district: string) {
  const dates = Object.keys(data).sort();

  const result: { date: string; bizareas: { name: string; lines: { name: string; values: number[] }[] }[] }[] = [];

  for (const dt of dates) {
    const distData = data[dt]?.[district];
    if (!distData) continue;

    const bizareas = Object.entries(distData).map(([areaName, lines]) => ({
      name: areaName,
      lines: Object.entries(lines).map(([lineName, vals]) => ({
        name: lineName,
        values: vals,
      })),
    }));

    result.push({ date: dt, bizareas });
  }

  return result;
}
