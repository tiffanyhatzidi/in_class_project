drop database if exists my_first_db;

create database my_first_db;

\c my_first_db

CREATE TABLE "users" (
  "id" serial,
  "name" varchar,
  "email" varchar,
  "password" varchar,
  "salt" varchar,
  PRIMARY KEY ("id")
);

CREATE TABLE "genres" (
  "id" serial ,
  "name" varchar,
  PRIMARY KEY ("id")
);

CREATE TABLE "books" (
  "id" serial,
  "title" varchar,
  "genre_id" Int,
  "publishing_year" Int,
  PRIMARY KEY ("id"),
  CONSTRAINT "FK_books.genre_id"
    FOREIGN KEY ("genre_id")
      REFERENCES "genres"("id")
);

CREATE TABLE "comments" (
  "id" serial,
  "user_id" Int,
  "book_id" Int,
  "comment" varchar,
  "created_at" timestamp,
  PRIMARY KEY ("id"),
  CONSTRAINT "FK_comments.user_id"
    FOREIGN KEY ("user_id")
      REFERENCES "users"("id"),
  CONSTRAINT "FK_comments.book_id"
    FOREIGN KEY ("book_id")
      REFERENCES "books"("id")
);

CREATE TABLE "authors" (
  "id" serial,
  "first_name" varchar,
  "last_name" varchar,
  PRIMARY KEY ("id")
);

CREATE TABLE "authors_books" (
  "id" serial,
  "author_id" Int,
  "book_id" Int,
  PRIMARY KEY ("id"),
  CONSTRAINT "FK_authors_books.book_id"
    FOREIGN KEY ("book_id")
      REFERENCES "books"("id"),
  CONSTRAINT "FK_authors_books.author_id"
    FOREIGN KEY ("author_id")
      REFERENCES "authors"("id")
);

CREATE TABLE "books_users" (
  "id" serial,
  "user_id" Int,
  "book_id" Int,
  "read_status" varchar,
  PRIMARY KEY ("id"),
  CONSTRAINT "FK_books_users.user_id"
    FOREIGN KEY ("user_id")
      REFERENCES "users"("id"),
  CONSTRAINT "FK_books_users.book_id"
    FOREIGN KEY ("book_id")
      REFERENCES "books"("id")
);


