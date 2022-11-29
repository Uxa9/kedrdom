import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FilesService } from '../files/files.service';
import { PresentController } from './present.controller';
import { PresentService } from './present.service';
import { Present, PresentSchema } from './schemas/present.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Present.name, schema: PresentSchema }])
    ],
    controllers: [PresentController],
    providers: [PresentService, FilesService]
})
export class PresentModule { }
