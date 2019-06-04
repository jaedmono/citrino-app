import {Injectable} from '@angular/core';

@Injectable()
export class FileUtilService {

    constructor() {}

    isCSVFile(file) {
        return file.name.endsWith('.csv');
    }

    getHeaderArray(csvRecordsArr, tokenDelimeter) {
        const headers = csvRecordsArr[0].split(tokenDelimeter);
        const headerArray = [];
        for (let j = 0; j < headers.length; j++) {
            headerArray.push(headers[j]);
        }
        return headerArray;
    }

    validateHeaders(origHeaders, fileHeaaders) {
        if (origHeaders.length !== fileHeaaders.length) {
            return false;
        }

        let fileHeaderMatchFlag = true;
        for (let j = 0; j < origHeaders.length; j++) {
            if (origHeaders[j] !== fileHeaaders[j]) {
                fileHeaderMatchFlag = false;
                break;
            }
        }
        return fileHeaderMatchFlag;
    }

    getDataRecordsArrayFromCSVFile(csvRecordsArray, headerLength,
                                   validateHeaderAndRecordLengthFlag, tokenDelimeter) {
        const dataArr = [];

        for (let i = 0; i < csvRecordsArray.length; i++) {
            const data = csvRecordsArray[i].split(tokenDelimeter);

            if (validateHeaderAndRecordLengthFlag && data.length !== headerLength) {
                if (data === '') {
                    alert('Una linea en blanco adicional en la fila ' + i + ', porfavor remuevala.');
                    return null;
                } else {
                    alert('Registro en la linea ' + i
                            + ' contiene: ' + data.length + ' tokens, y no es compatible con el tamaño de :' + headerLength );
                    return null;
                }
            }

            const col = [];
            for (let j = 0; j < data.length; j++) {
                col.push(data[j]);
            }
            dataArr.push(col);
        }
        return dataArr;
    }

}
