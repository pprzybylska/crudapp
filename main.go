package main

import (
	"net/http"

	"github.com/gorilla/mux"
)

func main() {
	initDB()
	defer db.Close()
	router := mux.NewRouter()
	router.PathPrefix("/static/").Handler(http.StripPrefix("/static/", http.FileServer(http.Dir("./static/"))))

	router.HandleFunc("/todos", getTodos).Methods("GET")
	router.HandleFunc("/todos/{id}", getTodo).Methods("GET")
	router.HandleFunc("/createTodo", createTodo).Methods("POST")
	router.HandleFunc("/updateTodo/{id}", updateTodo).Methods("POST")
	router.HandleFunc("/deleteTodo/{id}", deleteTodo).Methods("DELETE")

	router.PathPrefix("/").Handler(http.FileServer(http.Dir("./static/")))

	http.ListenAndServe(":8085", router)
}
