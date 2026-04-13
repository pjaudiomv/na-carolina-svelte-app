<script lang="ts">
	import { Timer } from '@lucide/svelte';
</script>

<svelte:head>
	<title>Clean Time — CRNA</title>
</svelte:head>

<div class="flex flex-col items-center justify-center px-6 py-20 text-center">
	<div class="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100">
		<Timer size={28} class="text-green-600" strokeWidth={1.8} />
	</div>
	<h1 class="text-xl font-bold text-slate-900">Clean Time Calculator</h1>
	<p class="mt-2 text-sm text-slate-500">Clean time calculator coming in Phase 2</p>
</div>
