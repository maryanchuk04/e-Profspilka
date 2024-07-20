import { ImportType, } from './ImportType';

export interface ImportResult {
	newUsers: number;
	lastImportDate: string;
	replacedUsers: number;
	lastImportType: ImportType;
	lastImportFileName: string;
	totalItems: number;
}
