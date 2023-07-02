import { ImportType } from './ImportType';

export interface ImportResult {
	newUsers: number;
	lastImportDate: string;
	replacedUsers: number;
	lastImportType: ImportType;
	lastImportIsChangeCourseSelected: boolean;
	lastImportFileName: string;
	totalItems: number;
}
