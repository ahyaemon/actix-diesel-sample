use crate::db::models::Book;
use crate::db::schema::books;
use crate::AppData;
use actix_web::{web, Responder};
use diesel::RunQueryDsl;
use serde::{Deserialize, Serialize};
use ulid::Ulid;

#[derive(Deserialize)]
pub struct AddBookRequest {
    title: String,
    author: String,
}

#[derive(Serialize)]
pub struct AddBookResponse {
    id: String,
    title: String,
    author: String,
}

pub async fn add_book(
    request: web::Json<AddBookRequest>,
    data: web::Data<AppData>,
) -> impl Responder {
    let connection = &mut data.get_db_connection();
    let id = Ulid::new().to_string();

    let book = Book {
        id: id.clone(),
        title: request.title.to_string(),
        author: request.author.to_string(),
    };

    diesel::insert_into(books::table)
        .values(&book)
        .execute(connection)
        .expect("Error saving new post");

    let response = AddBookResponse {
        id,
        title: request.title.to_string(),
        author: request.author.to_string(),
    };

    web::Json(response)
}
