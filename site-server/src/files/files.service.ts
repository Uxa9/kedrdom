import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';
import * as sharp from 'sharp';

export enum FileType {
    IMAGE = 'image',
    PRODUCT = 'product',
    PRESENT = 'present'
}

@Injectable()
export class FilesService {

    createFiles(type: FileType, files): string[] {
        try {
            const names = files.map(file => {
                // const fileExtension = file.originalname.split('.').pop();
                const fileName = uuid.v4() + '.' + 'png';
                const filePath = path.resolve(__dirname, '..', 'static/files', type)

                if (!fs.existsSync(filePath)) {
                    fs.mkdirSync(filePath, { recursive: true });
                }

                sharp(file.buffer)
                    .resize(1028, 1028, {
                        fit: 'cover',
                    })
                    .png()
                    .toBuffer()
                    .then(buffer => {
                        fs.writeFileSync(path.resolve(filePath, fileName), buffer);
                    });

                return 'files/' + type + '/' + fileName;
            });

            return names;

        } catch (error) {
            throw new HttpException(error.message,
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    removeFile(fileName: string) {

    }

}
