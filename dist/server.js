import "reflect-metadata";
import app from "./app.js";
import { AppDataSource } from "./config/data-source.js";
const PORT = process.env.PORT;
AppDataSource.initialize()
    .then(() => {
    console.log("Database connected");
    app.listen(3000, () => {
        console.log(`http://localhost:${PORT}`);
    });
})
    .catch((error) => {
    console.log(error);
});
