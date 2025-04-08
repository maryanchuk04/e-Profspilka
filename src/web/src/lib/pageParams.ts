export type ParamsType = Promise<{ id: string }>;

export type SearchParamsProps = {
    searchParams: Promise<{ [key: string]: string | undefined }>;
};