import { Menu } from './menu.model';

export interface Hotel {
    id: string,
    name: string,
    address: string,
    cuisines: string,
    rating: string,
    reviews: string,
    feature_image: string,
    thumbnail_image: string,
    menu: Menu[]
}
