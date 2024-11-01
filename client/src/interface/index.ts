export interface Response<T> {
    code: number;
    message: string;
    data: T
}

export type CategoryItem = {
    _id: string;
    name: string;
    alias: string;
    order: number;
}

export type PostItem = {
    _id: string;
    title: string;
    content: string;
    categoryId: string;
    published: number;
}