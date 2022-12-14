import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module";
import * as bodyParser from 'body-parser';
import * as fs from 'fs';
import * as path from "path";

// const httpsOptions = {
//     key: fs.readFileSync(path.dirname("/root/ssl/certificate.key")),
//     cert: fs.readFileSync(path.dirname("/root/ssl/certificate.crt")),
//     ca: [
//         fs.readFileSync(path.dirname('/root/ssl/certificate_ca_root.crt')),
//         fs.readFileSync(path.dirname('/root/ssl/certificate_ca_bundle.crt'))
//     ]
// };

const httpsOptions = {
    key: fs.readFileSync(`${path.parse(process.cwd()).root}root/ssl/certificate.key`),
    cert: fs.readFileSync(`${path.parse(process.cwd()).root}root/ssl/certificate.crt`),
    ca: [
        fs.readFileSync(`${path.parse(process.cwd()).root}root/ssl/certificate_ca_root.crt`),
        fs.readFileSync(`${path.parse(process.cwd()).root}root/ssl/certificate_ca_bundle.crt`)
    ]
};

const start = async () => {
    try {
        const PORT = process.env.PORT || 5000;
        const app = await NestFactory.create(AppModule, {
            httpsOptions
        });

        app.enableCors();
        app.use(bodyParser.json({ limit: '50mb' }));
        app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

        await app.listen(PORT, () => console.log(`server started on ${PORT} port`));
    } catch (error) {
        console.log(error);
        
    }
}

start();