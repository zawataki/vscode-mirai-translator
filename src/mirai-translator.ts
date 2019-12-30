import * as request from 'request-promise';
import * as vscode from 'vscode';
const cheerio = require('cheerio');

export enum LanguageEnum {
    JAPANESE = 'ja',
    ENGLISH = 'en',
}

export function translate(textToBeTranslated: string | undefined, source: LanguageEnum,
    target: LanguageEnum) {

    if (textToBeTranslated === null
        || textToBeTranslated === undefined
        || textToBeTranslated === "") {
        vscode.window.showWarningMessage("Please select text that you want to translate");
        return;
    }

    console.debug(`Translate text: "${textToBeTranslated}"`);

    const requestOptionsToGetCookie = {
        url: 'https://miraitranslate.com/trial/',
        method: 'GET'
    };

    const req = request.defaults({ jar: true });

    req(requestOptionsToGetCookie)
        .then(function (body: any) {
            const $ = cheerio.load(body);
            const tranValue = $('input#tranInput').val();

            const requestOptionsToTranslate = {
                url: 'https://miraitranslate.com/trial/translate.php',
                method: 'POST',
                form: {
                    input: textToBeTranslated,
                    source: source,
                    target: target,
                    tran: tranValue,
                },
            };
            req(requestOptionsToTranslate)
                .then(function (body: any) {
                    console.log("Received body: ", body);
                    const jsonBody = JSON.parse(body);
                    if (jsonBody.status !== 'success') {
                        throw new Error("Received error status from Mirai Translator");
                    }

                    vscode.window.showInformationMessage(jsonBody.outputs[0].output);
                })
                .catch(function (err: any) {
                    console.error("Failed to post", err);
                    vscode.window.showErrorMessage(`Failed to translate. ${err}`);
                });
        })
        .catch(function (err: any) {
            console.error("Failed to get", err);
            vscode.window.showErrorMessage(`Failed to translate. ${err}`);
        });
}
