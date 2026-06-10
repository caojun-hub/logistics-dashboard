'use client';

import { useState } from 'react';
import type { DashboardData } from '@/lib/data';
import { ZONE_DISTRICTS, DISTRICTS_21, MONTHS } from '@/lib/config';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { NavTabs } from '@/components/NavTabs';

function formatMonth(m: string) {
  return `${m.slice(0, 4)}年${m.slice(4)}月`;
}

interface Props {
  data: DashboardData;
  children: (district: string, month: string) => React.ReactNode;
}

export function SubPageLayout({ data, children }: Props) {
  const [district, setDistrict] = useState(DISTRICTS_21[0]);
  const [month, setMonth] = useState(MONTHS[MONTHS.length - 1]);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-14 max-w-7xl items-center gap-4 px-4">
          <h1 className="text-lg font-semibold">物流配送运营看板</h1>
          <NavTabs />
          <div className="flex items-center gap-2 ml-auto">
            <Select value={district} onValueChange={v => v && setDistrict(v)}>
              <SelectTrigger size="sm" className="w-36">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(ZONE_DISTRICTS).map(([zone, dists]) => (
                  <SelectGroup key={zone}>
                    <SelectLabel>{zone}</SelectLabel>
                    {dists.map(d => (
                      <SelectItem key={d} value={d}>{d}</SelectItem>
                    ))}
                  </SelectGroup>
                ))}
              </SelectContent>
            </Select>
            <Select value={month} onValueChange={v => v && setMonth(v)}>
              <SelectTrigger size="sm" className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {MONTHS.map(m => (
                  <SelectItem key={m} value={m}>{formatMonth(m)}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-6 space-y-6">
        {children(district, month)}
      </main>
    </div>
  );
}
