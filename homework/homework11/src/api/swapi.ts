// Для работы со SWAPI
import { createFetch } from '../utils/fetchUtils'
import {PEOPLE_URL} from "../constants/swapi";

interface Swapi {
    getPeople: any;
}

export const swapi: Swapi = {
    getPeople: createFetch(PEOPLE_URL)
}