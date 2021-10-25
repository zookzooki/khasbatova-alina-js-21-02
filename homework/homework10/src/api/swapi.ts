// Для работы со SWAPI
import { createFetch } from '../utils/fetchUtils'
import {PEOPLE_URL} from "../constants/swapi";

export const swapi = {
    getPeople: createFetch(PEOPLE_URL)
}