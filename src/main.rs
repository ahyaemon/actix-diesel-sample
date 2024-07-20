mod db;
mod routes;

use crate::db::get_connection_pool;
use crate::routes::add_book::add_book;
use crate::routes::delete_book::delete_book;
use crate::routes::list_books::list_books;
use actix_cors::Cors;
use actix_web::http::header;
use actix_web::{web, App, HttpServer};
use diesel::r2d2::{ConnectionManager, Pool, PooledConnection};
use diesel::PgConnection;

#[derive(Clone)]
pub struct AppData {
    connection_pool: Pool<ConnectionManager<PgConnection>>,
}

impl AppData {
    pub fn get_db_connection(&self) -> PooledConnection<ConnectionManager<PgConnection>> {
        let pool = self.connection_pool.clone();
        pool.get()
            .expect("Failed to get connection pool from AppData")
    }
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let connection_pool = get_connection_pool();
    let app_data = AppData { connection_pool };

    HttpServer::new(move || {
        let cors = Cors::default()
            .allowed_origin("http://localhost:3000")
            .allowed_methods(vec!["GET", "POST", "PUT", "DELETE"])
            .allowed_headers(vec![header::AUTHORIZATION, header::ACCEPT])
            .allowed_header(header::CONTENT_TYPE)
            .supports_credentials()
            .max_age(3600);

        App::new()
            .wrap(cors)
            .app_data(web::Data::new(app_data.clone()))
            .route("/books/list", web::get().to(list_books))
            .route("/books/add_book", web::post().to(add_book))
            .route("/books/delete_book", web::delete().to(delete_book))
    })
    .bind(("127.0.0.1", 18081))?
    .run()
    .await
}
