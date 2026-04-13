<script lang="ts">
  import { Timer } from '@lucide/svelte';
  import { browser } from '$app/environment';

  interface DateSpan {
    totalDays: number;
    years: number;
    months: number;
    days: number;
  }

  interface Keytag {
    label: string;
    image: string;
  }

  const STORAGE_KEY = 'nacc_clean_date';

  let selectedYear = $state(new Date().getFullYear());
  let selectedMonth = $state(1);
  let selectedDay = $state(1);
  let result = $state<DateSpan | null>(null);

  // Load saved clean date on mount
  if (browser) {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const { year, month, day } = JSON.parse(saved);
        selectedYear = year;
        selectedMonth = month;
        selectedDay = day;
        result = dateSpan(new Date(year, month - 1, day));
      }
    } catch {
      // ignore
    }
  }

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1952 }, (_, i) => currentYear - i);
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  let daysInMonth = $derived(new Date(selectedYear, selectedMonth, 0).getDate());

  $effect(() => {
    if (selectedDay > daysInMonth) {
      selectedDay = daysInMonth;
    }
  });

  function dateSpan(fromDate: Date): DateSpan {
    const now = new Date();
    const diff: DateSpan = { totalDays: 0, years: 0, months: 0, days: 0 };

    if (now <= fromDate) return diff;

    diff.totalDays = Math.floor((now.getTime() - fromDate.getTime()) / 86400000);

    diff.years = now.getFullYear() - fromDate.getFullYear();
    diff.months = now.getMonth() - fromDate.getMonth();
    diff.days = now.getDate() - fromDate.getDate();

    if (diff.days < 0) {
      const numDays = new Date(fromDate.getFullYear(), fromDate.getMonth() + 1, 0).getDate();
      diff.months -= 1;
      diff.days += numDays;
    }

    if (diff.months < 0) {
      diff.months += 12;
      diff.years -= 1;
    }

    return diff;
  }

  function calculate() {
    const cleanDate = new Date(selectedYear, selectedMonth - 1, selectedDay);
    if (cleanDate > new Date()) {
      result = null;
      return;
    }
    result = dateSpan(cleanDate);
    if (browser) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ year: selectedYear, month: selectedMonth, day: selectedDay }));
    }
  }

  function formatResult(r: DateSpan): string {
    if (r.totalDays === 0) return 'Today is your first day!';
    if (r.totalDays === 1) return 'You have been clean for 1 day!';

    const daysLine = `You have been clean for ${r.totalDays.toLocaleString()} days!`;
    if (r.totalDays <= 90) return daysLine;

    const parts: string[] = [];
    if (r.years > 0) parts.push(`${r.years} ${r.years === 1 ? 'year' : 'years'}`);
    if (r.months > 0) parts.push(`${r.months} ${r.months === 1 ? 'month' : 'months'}`);
    if (r.days > 0) parts.push(`${r.days} ${r.days === 1 ? 'day' : 'days'}`);

    let detail: string;
    if (parts.length === 1) detail = `This is ${parts[0]}.`;
    else if (parts.length === 2) detail = `This is ${parts[0]} and ${parts[1]}.`;
    else detail = `This is ${parts[0]}, ${parts[1]} and ${parts[2]}.`;

    return `${daysLine}\n${detail}`;
  }

  function getKeytags(r: DateSpan): Keytag[] {
    const tags: Keytag[] = [];
    const totalMonths = r.years * 12 + r.months;

    if (r.totalDays >= 1) tags.push({ label: 'Welcome', image: '/images/en/01_Front.png' });
    if (r.totalDays >= 30) tags.push({ label: '30 Days', image: '/images/en/02_Front.png' });
    if (r.totalDays >= 60) tags.push({ label: '60 Days', image: '/images/en/03_Front.png' });
    if (r.totalDays >= 90) tags.push({ label: '90 Days', image: '/images/en/04_Front.png' });
    if (totalMonths >= 6) tags.push({ label: '6 Months', image: '/images/en/05_Front.png' });
    if (totalMonths >= 9) tags.push({ label: '9 Months', image: '/images/en/06_Front.png' });
    if (totalMonths >= 12) tags.push({ label: '1 Year', image: '/images/en/07_Front.png' });
    if (totalMonths >= 18) tags.push({ label: '18 Months', image: '/images/en/08_Front.png' });
    if (totalMonths >= 24) tags.push({ label: 'Multiple Years', image: '/images/en/09_Front.png' });

    // Additional black keytags for each year after 2
    for (let y = 3; y <= r.years; y++) {
      tags.push({ label: `${y} Years`, image: '/images/en/09_Front.png' });
    }

    return tags;
  }
</script>

<svelte:head>
  <title>Clean Time — CRNA</title>
</svelte:head>

<!-- Header -->
<div class="from-brand-dark via-brand to-brand-light bg-gradient-to-br px-6 pt-8 pb-6 text-white">
  <div class="flex items-center gap-3">
    <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
      <Timer size={22} strokeWidth={2} />
    </div>
    <div>
      <h1 class="text-lg font-bold">Clean Time Calculator</h1>
      <p class="text-xs text-blue-200">Calculate your NA milestones</p>
    </div>
  </div>
</div>

<div class="px-5 pt-6 pb-10">
  <!-- Date picker -->
  <div class="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100 dark:bg-slate-800 dark:ring-slate-700">
    <p class="mb-4 text-sm font-medium text-slate-700 dark:text-slate-300">Enter your clean date</p>

    <div class="grid grid-cols-3 gap-3">
      <div>
        <label for="month" class="mb-1 block text-xs text-slate-500 dark:text-slate-400">Month</label>
        <select
          id="month"
          bind:value={selectedMonth}
          class="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100"
        >
          {#each months as m, i (i)}
            <option value={i + 1}>{m}</option>
          {/each}
        </select>
      </div>

      <div>
        <label for="day" class="mb-1 block text-xs text-slate-500 dark:text-slate-400">Day</label>
        <select
          id="day"
          bind:value={selectedDay}
          class="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100"
        >
          {#each Array.from({ length: daysInMonth }, (_, i) => i + 1) as d (d)}
            <option value={d}>{d}</option>
          {/each}
        </select>
      </div>

      <div>
        <label for="year" class="mb-1 block text-xs text-slate-500 dark:text-slate-400">Year</label>
        <select
          id="year"
          bind:value={selectedYear}
          class="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100"
        >
          {#each years as y (y)}
            <option value={y}>{y}</option>
          {/each}
        </select>
      </div>
    </div>

    <button onclick={calculate} class="bg-brand hover:bg-brand-dark mt-4 w-full rounded-xl py-3 text-sm font-semibold text-white transition-colors"> Calculate </button>
  </div>

  <!-- Results -->
  {#if result}
    <div class="mt-5 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100 dark:bg-slate-800 dark:ring-slate-700">
      {#each formatResult(result).split('\n') as line, i (i)}
        {#if i === 0}
          <p class="text-center text-lg font-bold text-slate-900 dark:text-slate-100">{line}</p>
        {:else}
          <p class="mt-1 text-center text-sm text-slate-600 dark:text-slate-400">{line}</p>
        {/if}
      {/each}
    </div>

    <!-- Keytags -->
    {@const tags = getKeytags(result)}
    {#if tags.length > 0}
      <div class="mt-5">
        <h2 class="mb-3 text-sm font-semibold text-slate-700 dark:text-slate-300">Your Keytags</h2>
        <div class="flex flex-wrap justify-center gap-2">
          {#each tags as tag, i (i)}
            <div class="flex flex-col items-center gap-1">
              <img src={tag.image} alt={tag.label} class="h-20 w-auto" />
              <span class="text-[10px] font-medium text-slate-500 dark:text-slate-400">{tag.label}</span>
            </div>
          {/each}
        </div>
      </div>
    {/if}
  {/if}
</div>
