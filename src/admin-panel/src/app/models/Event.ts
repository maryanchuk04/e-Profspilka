import { Status } from './Status';

export interface Event {
	id: string;
	title: string;
	description: string;
	date: string;
	images: string[];
	isPassed: boolean;
	status: Status;
	shortDescription: string;
}
