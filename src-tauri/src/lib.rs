// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
mod db; // importar o ngc aqui
use db::post_user; // importar as crates

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![post_user]) // miguel lembrar de colocar as fn aqui
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
