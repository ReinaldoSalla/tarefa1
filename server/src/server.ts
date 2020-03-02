import App from "./app";
import { hostname, port } from "./properties";

const app = new App().app;

app.listen(port, () =>
    console.log(`Server running. URL: http://${hostname}:${port}`)
);