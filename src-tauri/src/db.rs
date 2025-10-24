// src-tauri/src/db.rs
use reqwest::Client;
use serde::Serialize;
use tauri::command;

#[derive(Serialize)]
struct User<'a> {
    name: &'a str,
    email: &'a str,
    password: &'a str,
}

#[command]
pub async fn post_user(name: &str, email: &str, password: &str) -> Result<String, String> {
    let client = Client::new();

    let usuario = User {
        name,
        email,
        password,
    };

    let response = client
        .post("http://localhost:3000/signUp")
        .json(&usuario)
        .send()
        .await
        .map_err(|e| e.to_string())?;

    let body = response.text().await.map_err(|e| e.to_string())?;

    Ok(body)
}
