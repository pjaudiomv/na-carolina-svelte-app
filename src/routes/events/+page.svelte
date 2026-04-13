<script lang="ts">
	import { Calendar } from '@lucide/svelte';
</script>

<svelte:head>
	<title>Events — CRNA</title>
</svelte:head>

<div class="flex flex-col items-center justify-center px-6 py-20 text-center">
	<div class="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-100">
		<Calendar size={28} class="text-rose-600" strokeWidth={1.8} />
	</div>
	<h1 class="text-xl font-bold text-slate-900">Events</h1>
	<p class="mt-2 text-sm text-slate-500">CRNA events coming in Phase 3</p>
</div>
