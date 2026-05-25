

import express, {type Express } from "express";
import { type Response, type Request } from "express";


const app: Express = express();

app.use(express.json());

app.get("/api", (req: Request, res: Response) => {
    res.json({message: "Hello, world..."});
})

export default app;