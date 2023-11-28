export interface MenuItem {
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