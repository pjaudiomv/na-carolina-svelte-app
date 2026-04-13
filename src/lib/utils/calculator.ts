export interface DateSpan {
	totalDays: number;
	years: number;
	months: number;
	days: number;
}

export interface Keytag {
	label: string;
	image: string;
}

export function dateSpan(fromDate: Date, now: Date = new Date()): DateSpan {
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

export function formatResult(r: DateSpan): string {
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

export function getKeytags(r: DateSpan): Keytag[] {
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

	for (let y = 3; y <= r.years; y++) {
		tags.push({ label: `${y} Years`, image: '/images/en/09_Front.png' });
	}

	return tags;
}
