// Для работы со SWAPI
import { createFetch } from '../utils/fetchUtils.js'
import {PEOPLE_URL} from "../constants/swapi.js";

export const swapi = {
    getPeople: createFetch(PEOPLE_URL)
}