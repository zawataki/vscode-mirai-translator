# みらい翻訳 for VS Code

[![Published version](https://vsmarketplacebadge.apphb.com/version/zawa.mirai-translator.svg)](https://marketplace.visualstudio.com/items?itemName=zawa.mirai-translator)
[![Number of installs](https://vsmarketplacebadge.apphb.com/installs-short/zawa.mirai-translator.svg)](https://marketplace.visualstudio.com/items?itemName=zawa.mirai-translator)
[![CI status on GitHub Actions](https://github.com/zawataki/vscode-mirai-translator/workflows/Build%20and%20Test/badge.svg)](https://github.com/zawataki/vscode-mirai-translator/actions?query=workflow%3A%22Build+and+Test%22+branch%3Amaster)
[![CI status on Azure Pipelines](https://dev.azure.com/zawa640567/VS%20Code/_apis/build/status/zawataki.vscode-mirai-translator?branchName=master)](https://dev.azure.com/zawa640567/VS%20Code/_build/latest?definitionId=1&branchName=master)

Translate English text to Japanese using [みらい翻訳] (Mirai Translator) from VS Code.

> [みらい翻訳] （高精度な機械翻訳サービス）を使って英語のテキストを日本語に翻訳するための Visual Studio Code拡張機能です。

![demo](images/demo.gif)

The [icon](images/icon.png) made by [Freepik](https://www.flaticon.com/authors/freepik) from www.flaticon.com.

[みらい翻訳]: https://miraitranslate.com/trial/

## Features (機能)

- Translation English text you selected to Japanese using [みらい翻訳] by the command `Translate English to Japanese using Mirai Translator` on Command Palette.
- Translation Japanese text you selected to English using [みらい翻訳] by the command `Translate Japanese to English using Mirai Translator` on Command Palette.
- Proxy support
  - You can use a proxy to translate text with the following settings:
    ```js
    "miraiTranslator.proxy.host": "192.168.0.5" // Proxy disabled if empty
    "miraiTranslator.proxy.port": "8080"
    "miraiTranslator.proxy.username": "user1"   // Proxy auth disabled if empty
    "miraiTranslator.proxy.password": "password"
    ```
  - Enable proxy by the command `Enable proxy for Mirai Translator` on Command Palette. By default, the proxy is enable if the proxy setting is not empty.
  - Disable proxy by the command `Disable proxy for Mirai Translator` on Command Palette.

> - 選択した範囲の英語を日本語に翻訳（選択した状態でコマンドパレットの`Translate English to Japanese using Mirai Translator`を実行）
> - 選択した範囲の日本語を英語に翻訳（選択した状態でコマンドパレットの`Translate Japanese to English using Mirai Translator`を実行）
> - プロキシのサポート
>   - 以下の設定でプロキシを使用可能:
>     ```js
>     "miraiTranslator.proxy.host": "192.168.0.5" // 設定が空ならプロキシは無効
>     "miraiTranslator.proxy.port": "8080"
>     "miraiTranslator.proxy.username": "user1"   // 設定が空ならプロキシの認証は無効
>     "miraiTranslator.proxy.password": "password"
>     ```
>   - プロキシを有効にする（コマンドパレットの`Enable proxy for Mirai Translator`を実行）（デフォルトではプロキシ設定が空でなければ有効になる）
>   - プロキシを無効にする（コマンドパレットの`Disable proxy for Mirai Translator`を実行）

## Requirements (必要な環境)

Internet connection to [みらい翻訳].

> [みらい翻訳] のWebページに繋がるインターネット環境。

## Extension Settings (拡張機能の設定)

Nothing.

> なし。

## Known Issues (既知の問題)

See [issues].

> [issues] をご覧ください。

[issues]: https://github.com/zawataki/vscode-mirai-translator/issues?q=is%3Aissue+is%3Aopen+label%3Abug+-label%3A%22no+user+impact%22

## Release Notes

See [CHANGELOG.md](CHANGELOG.md).

> [CHANGELOG.md](CHANGELOG.md) をご覧ください。
