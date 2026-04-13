import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/svelte';
import DailyReading from '$lib/components/DailyReading.svelte';

const mockReading = {
	date: 'April 13',
	title: 'Test Reading',
	page: 'Page 104',
	source: 'Test Source',
	quote: 'This is a test quote.',
	content: ['First paragraph.', 'Second paragraph.'],
	thought: 'Test thought for the day.',
	copyright: '(c) Test Copyright'
};

beforeEach(() => {
	vi.restoreAllMocks();
});

describe('DailyReading', () => {
	test('shows loading state initially', () => {
		vi.spyOn(globalThis, 'fetch').mockImplementation(
			() => new Promise(() => {}) // never resolves
		);

		render(DailyReading, {
			props: {
				url: 'https://example.com/reading',
				accentColor: 'text-purple-600',
				accentBg: 'bg-purple-50',
				accentBgDark: 'dark:bg-purple-900/50'
			}
		});

		expect(screen.getByText('Loading...')).toBeInTheDocument();
	});

	test('renders reading content after fetch', async () => {
		vi.spyOn(globalThis, 'fetch').mockResolvedValue(
			new Response(JSON.stringify(mockReading), {
				status: 200,
				headers: { 'Content-Type': 'application/json' }
			})
		);

		render(DailyReading, {
			props: {
				url: 'https://example.com/reading',
				accentColor: 'text-purple-600',
				accentBg: 'bg-purple-50',
				accentBgDark: 'dark:bg-purple-900/50'
			}
		});

		await waitFor(() => {
			expect(screen.getByText('Test Reading')).toBeInTheDocument();
		});

		expect(screen.getByText('This is a test quote.')).toBeInTheDocument();
		expect(screen.getByText('First paragraph.')).toBeInTheDocument();
		expect(screen.getByText('Second paragraph.')).toBeInTheDocument();
		expect(screen.getByText('Test thought for the day.')).toBeInTheDocument();
		expect(screen.getByText('(c) Test Copyright')).toBeInTheDocument();
	});

	test('shows error state on fetch failure', async () => {
		vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('Network error'));

		render(DailyReading, {
			props: {
				url: 'https://example.com/reading',
				accentColor: 'text-purple-600',
				accentBg: 'bg-purple-50',
				accentBgDark: 'dark:bg-purple-900/50'
			}
		});

		await waitFor(() => {
			expect(screen.getByText('Network error')).toBeInTheDocument();
		});

		expect(screen.getByText('Retry')).toBeInTheDocument();
	});

	test('shows error on non-ok response', async () => {
		vi.spyOn(globalThis, 'fetch').mockResolvedValue(
			new Response('', { status: 500 })
		);

		render(DailyReading, {
			props: {
				url: 'https://example.com/reading',
				accentColor: 'text-purple-600',
				accentBg: 'bg-purple-50',
				accentBgDark: 'dark:bg-purple-900/50'
			}
		});

		await waitFor(() => {
			expect(screen.getByText('Failed to load (500)')).toBeInTheDocument();
		});
	});
});
