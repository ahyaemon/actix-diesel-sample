use crate::db::models::Book;
use crate::db::schema::books::dsl::books;
use crate::AppData;
use actix_web::{web, Responder};
use diesel::{QueryDsl, RunQueryDsl, SelectableHelper, TextExpressionMethods};
use serde::{Deserialize, Serialize};
use crate::db::schema::books::title;

#[derive(Deserialize)]
pub struct ListBookRequest {
    title_filter: Option<String>,
}

#[derive(Serialize)]
pub struct BookResponse {
    id: String,
    title: String,
    author: String,
}

impl From<&Book> for BookResponse {
    fn from(value: &Book) -> Self {
        BookResponse {
            id: value.id.clone(),
            title: value.title.clone(),
            author: value.author.clone(),
        }
    }
}

#[derive(Serialize)]
pub struct ListBooksResponse {
    books: Vec<BookResponse>,
}

pub async fn list_books(request: web::Query<ListBookRequest>, data: web::Data<AppData>) -> impl Responder {
    let f = match &request.title_filter {
        Some(a) => a,
        None => "",
    };
    let connection = &mut data.get_db_connection();
    // TODO filter がある時だけくっつける
    let stmt = books
        .select(Book::as_select());

    if let Some(a) = &request.title_filter {
        if !a.is_empty() {
            let like = format!("%{a}%");
            let stmt = stmt.filter(title.like(like));
        }
    }

    let results = books
        .select(Book::as_select())
        .filter(title.like(&format!("%{f}%")))
        .load(connection)
        .expect("Error loading posts");

    let response = ListBooksResponse {
        books: results.iter().map(BookResponse::from).collect(),
    };
    web::Json(response)
}
