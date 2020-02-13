import * as request from 'request-promise';
import * as vscode from 'vscode';
const cheerio = require('cheerio');

let proxyIsEnable: boolean = true;

export function enableProxy() {
    proxyIsEnable = true;
}

export function disableProxy() {
    proxyIsEnable = false;
}

export enum LanguageEnum {
    JAPANESE = 'ja',
    ENGLISH = 'en',
}

/**
 * Returns proxy setting that a user configured
 *
 * @returns null if proxy is not configured
 */
function getProxy(): string | null {
    const config = vscode.workspace.getConfiguration('miraiTranslator.proxy');

    if (!config.get("host") || !proxyIsEnable) {
        return null;
    }

    return `http://${config.get("username")}:${config.get("password")}@${config.get("host")}:${config.get("port")}`;
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

    const req = request.defaults({
        jar: true,
        proxy: getProxy(),
    });

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
