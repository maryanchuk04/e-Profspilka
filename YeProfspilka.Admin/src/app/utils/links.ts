export interface Link {
	name: string;
	link: string;
}

export const moderationsLinks: Link[] = [
	{
		name: 'Події',
		link: 'events',
	},
	{
		name: 'Переваги',
		link: 'advantages',
	},
	{
		name: 'Питання',
		link: 'questions',
	},
	{
		name: 'Партнери',
		link: 'partners',
	},
]

export const administratorLinks: Link[] = [
	{
		name: "Панель адміністратора",
		link: 'dashboard'
	},
	{
		name: 'Знижки',
		link: 'discounts'
	},
	{
		name: 'Користувачі',
		link: 'users'
	},
	{
		name: 'Налаштування',
		link: 'settings'
	},
]