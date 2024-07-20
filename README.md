# actix-diesel-sample

TODO Docker 化

HTTP サーバーに Actix-web, ORM に Diesel を使用した最小限のアプリケーション。

動作確認用にフロントも用意。

## DB migration

DB migration には Diesel cli を利用する。

### 初期開発時

Install Diesel cli

```shell
cargo install diesel_cli
```

Setup
```shell
diesel setup
```

Create migration file
```shell
diesel migration generate create_books
```

### 通常開発時

Run migration
```shell
diesel migration run
```

Redo migration
```shell
diesel migration redo
```

## REST?

厳密な REST ではない。

全ての URL を一意にしたいため、`/books` に対して GET/POST/DELETE するのではなく、
- GET `/books/list`
- POST `/books/add_book`
- DELETE `/books/delete`
などとする。

一意にしておくとソースコードやログを grep するのが楽だからそうする。
