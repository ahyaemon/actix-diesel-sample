use crate::db::schema::books;
use crate::AppData;
use actix_web::{web, Responder};
use diesel::RunQueryDsl;
use serde::{Deserialize};
use diesel::ExpressionMethods;

#[derive(Deserialize)]
pub struct DeleteBookRequest {
    book_id: String,
}

pub async fn delete_book(
    request: web::Json<DeleteBookRequest>,
    data: web::Data<AppData>,
) -> impl Responder {
    let book_id = &request.book_id;
    let connection = &mut data.get_db_connection();
    diesel::delete(books::table)
        .filter(books::id.eq(book_id))
        .execute(connection)
        .expect(&format!("Error deleting book {book_id}."));
    "Ok"
}
