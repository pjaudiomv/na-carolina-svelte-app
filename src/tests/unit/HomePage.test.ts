import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import HomePage from '../../routes/+page.svelte';

describe('HomePage', () => {
  test('renders all feature cards', () => {
    render(HomePage);

    expect(screen.getByText('Find Meetings')).toBeInTheDocument();
    expect(screen.getByText('Clean Time')).toBeInTheDocument();
    expect(screen.getByText('Just For Today')).toBeInTheDocument();
    expect(screen.getByText('Spiritual Principle')).toBeInTheDocument();
    expect(screen.getByText('Events')).toBeInTheDocument();
    expect(screen.getByText('Service & Contact')).toBeInTheDocument();
  });

  test('cards link to correct pages', () => {
    render(HomePage);

    const links = screen.getAllByRole('link');
    const hrefs = links.map((l) => l.getAttribute('href'));

    expect(hrefs).toContain('/meetings');
    expect(hrefs).toContain('/calculator');
    expect(hrefs).toContain('/jft');
    expect(hrefs).toContain('/spad');
    expect(hrefs).toContain('/events');
    expect(hrefs).toContain('/contact');
  });
});
