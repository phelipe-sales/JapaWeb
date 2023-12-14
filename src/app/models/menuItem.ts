export interface MenuItemResult {
    id: string;
    name: string;
    description: string;
    ingredientsName: string[];
    isAvailable: boolean;
    imageUrl: string;
    price: number;
    categoryName: string;
    isRodizioItem: boolean;
}

export class CreateMenuItem {
    constructor(
        public name: string,
        public description: string,
        public price: number,
        public ingredientsName: string[],
        public imageUrl: string,
        public categoryName: string,
        public isRodizioItem: boolean,
        public isAvailable: boolean
    ) { }
}