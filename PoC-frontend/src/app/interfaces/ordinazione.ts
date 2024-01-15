import { Dish } from "./dish"

export interface Ordinazione {
  username: string,
  reservation: number,
  dishes: PiattoOrdinato[],
}

export interface PiattoOrdinato {
  dish: Dish,
  quantity: number
}
