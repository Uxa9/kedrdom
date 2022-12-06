import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module";
import * as bodyParser from 'body-parser';

const start = async () => {
    try {
        const PORT = process.env.PORT || 5000;
        const app = await NestFactory.create(AppModule);

        app.enableCors();
        app.use(bodyParser.json({ limit: '50mb' }));
        app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

        await app.listen(PORT, () => console.log(`server started on ${PORT} port`));
    } catch (error) {
        console.log(error);
        
    }
}

start();