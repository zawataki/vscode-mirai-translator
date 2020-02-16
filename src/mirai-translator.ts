import * as request from 'request-promise';
import { workspace, window, ProgressLocation } from 'vscode';
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
    const config = workspace.getConfiguration('miraiTranslator.proxy');

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
        window.showWarningMessage("Please select text that you want to translate");
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

    window.withProgress({
        location: ProgressLocation.Notification,
        title: "Translating...",
        cancellable: true
    }, (progress, token) => {
        token.onCancellationRequested(() => {
            console.log("The translation was cancelled");
        });

        progress.report({
            increment: 0,
            message: "Connecting to translation service..."
        });

        return new Promise<string>((resolve, reject) => {
            req(requestOptionsToGetCookie)
                .then((body: any) => {
                    const $ = cheerio.load(body);
                    const tranValue = $('input#tranInput').val();

                    progress.report({
                        increment: 30,
                        message: "Start translation"
                    });

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
                        .then((body: any) => {
                            console.log("Received body: ", body);
                            const jsonBody = JSON.parse(body);
                            if (jsonBody.status !== 'success') {
                                throw new Error("Received error from Mirai Translator");
                            }

                            resolve(jsonBody.outputs[0].output);
                        })
                        .catch((err: any) => {
                            console.error("Failed to translate.", err);
                            reject(err);
                        });
                })
                .catch((err: any) => {
                    console.error("Failed to connect.", err);
                    reject(err);
                });
        });
    }).then((translatedText) => {
        window.showInformationMessage(translatedText);
    }, (reason) => {
        window.showErrorMessage(`Failed to translate. ${reason}`);
    });
}
