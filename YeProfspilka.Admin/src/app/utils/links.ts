import { IconMenuItem, MenuItem } from '../models/ui-models/MenuItem';

export interface Link {
	name: string;
	link: string;
}

export const moderationsLinks: IconMenuItem[] = [
	{
		title: 'Події',
		url: 'events',
		icon: 'fas fa-calendar-plus',
	},
	{
		title: 'Переваги',
		url: 'advantages',
		icon: 'fa-solid fa-plus',
	},
	{
		title: 'Питання',
		url: 'questions',
		icon: 'fas fa-question',
	},
	{
		title: 'Партнери',
		url: 'partners',
		icon: 'fa-solid fa-handshake',
	},
];

export const administratorLinks: IconMenuItem[] = [
	{
		title: 'Панель адміністратора',
		url: 'dashboard',
		icon: 'fas fa-tachometer-alt',
	},
	{
		title: 'Знижки',
		url: 'discounts',
		icon: 'fas fa-percent',
	},
	{
		title: 'Користувачі',
		url: 'users',
		icon: 'fas fa-users',
	},
	{
		title: 'Налаштування',
		url: 'settings',
		icon: 'fas fa-cog',
	},
];
