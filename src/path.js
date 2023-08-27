import { fileURLToPath } from "url"; //Viene de NODEJS
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);

export const __dirname = dirname(__filename);
