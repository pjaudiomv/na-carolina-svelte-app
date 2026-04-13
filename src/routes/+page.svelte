<script lang="ts">
  import { MapPin, Timer, BookOpen, Star, Calendar, Users, ChevronRight } from '@lucide/svelte';
  import type { LucideIcon } from '@lucide/svelte';

  interface FeatureCard {
    href: string;
    icon: LucideIcon;
    iconBg: string;
    iconColor: string;
    title: string;
    description: string;
  }

  const cards: FeatureCard[] = [
    {
      href: '/meetings',
      icon: MapPin,
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      title: 'Find Meetings',
      description: 'Search by location or browse all CRNA meetings'
    },
    {
      href: '/calculator',
      icon: Timer,
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
      title: 'Clean Time',
      description: 'Calculate your milestones and keytags'
    },
    {
      href: '/jft',
      icon: BookOpen,
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
      title: 'Just For Today',
      description: "Today's daily meditation"
    },
    {
      href: '/spad',
      icon: Star,
      iconBg: 'bg-amber-100',
      iconColor: 'text-amber-600',
      title: 'Spiritual Principle',
      description: "Today's spiritual principle a day"
    }
  ];
</script>

<svelte:head>
  <title>Home — CRNA</title>
</svelte:head>

<!-- Hero -->
<div class="from-brand-dark via-brand to-brand-light bg-gradient-to-br px-6 pt-12 pb-10 text-white">
  <div class="flex flex-col items-center text-center">
    <img src="/icon-512x512.png" alt="Carolina Region NA" class="mb-4 h-24 w-24 rounded-2xl" />
  </div>
</div>

<!-- Cards -->
<div class="px-4 py-5">
  <div class="grid grid-cols-2 gap-3">
    {#each cards as card (card.href)}
      {@const Icon = card.icon}
      <a href={card.href} class="flex flex-col rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100 transition-transform active:scale-95">
        <div class={['mb-3 flex h-10 w-10 items-center justify-center rounded-xl', card.iconBg]}>
          <Icon size={20} class={card.iconColor} strokeWidth={2} />
        </div>
        <span class="text-sm font-semibold text-slate-900">{card.title}</span>
        <span class="mt-0.5 text-xs leading-snug text-slate-500">{card.description}</span>
      </a>
    {/each}
  </div>

  <!-- Events — full width -->
  <a href="/events" class="mt-3 flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100 transition-transform active:scale-95">
    <div class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-rose-100">
      <Calendar size={20} class="text-rose-600" strokeWidth={2} />
    </div>
    <div class="min-w-0 flex-1">
      <span class="text-sm font-semibold text-slate-900">Events</span>
      <p class="text-xs text-slate-500">CRNA events and announcements</p>
    </div>
    <ChevronRight size={16} class="flex-shrink-0 text-slate-300" />
  </a>

  <!-- Contact — full width -->
  <a href="/contact" class="mt-3 flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100 transition-transform active:scale-95">
    <div class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-teal-100">
      <Users size={20} class="text-teal-600" strokeWidth={2} />
    </div>
    <div class="min-w-0 flex-1">
      <span class="text-sm font-semibold text-slate-900">Service &amp; Contact</span>
      <p class="text-xs text-slate-500">Service bodies and helpful links</p>
    </div>
    <ChevronRight size={16} class="flex-shrink-0 text-slate-300" />
  </a>
</div>
