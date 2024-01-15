export interface Dish {
    id: number;
    restaurantId: number;
    name: string;
    description: string;
    price: number;
    image: JSON;
    ingredients: string[];
}