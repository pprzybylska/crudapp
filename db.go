package main

import (
    "github.com/jinzhu/gorm"
    _ "github.com/jinzhu/gorm/dialects/sqlite"
)

var db *gorm.DB

func initDB() {
    var err error
    db, err = gorm.Open("sqlite3", "test.db")
    if err != nil {
        panic("Failed to connect to database")
    }
    db.AutoMigrate(&Todo{})
}
