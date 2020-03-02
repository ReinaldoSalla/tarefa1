import express, {
    Application,
    Request,
    Response,
    NextFunction
} from "express";
import path from "path";
import bodyParser from "body-parser";
import cors from "cors";
import { Controller } from "./controller";
import { configureConnection } from "./infra/connection";

export default class App {
    public app: Application;
    public controller: Controller;

    constructor() {
        configureConnection()
        this.app = express();
        this.configureClientPath();
        this.configureMiddlewares();
        this.controller = new Controller(this.app)
    }

    private configureClientPath(): void {
        this.app.set("clientDir", path.join(__dirname, "../..", "client"));
        console.log(`Client directory: ${this.app.get("clientDir")}`);
        this.app.use(express.static(this.app.get("clientDir")));
    }

    private configureMiddlewares(): void {
        this.app.use(bodyParser.json());
        this.app.use(cors());
        this.app.use((req: Request, res: Response, next: NextFunction) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        })
    }
}