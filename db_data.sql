insert into authors (first_name, last_name) values ('William', 'Shakespeare');
insert into authors (first_name, last_name) values ('Charlotte', 'Bronte');
insert into authors (first_name, last_name) values ('Harper', 'Lee');
insert into authors (first_name, last_name) values ('Jane', 'Austen');
insert into authors (first_name, last_name) values ('Walter', 'Isaacson');
insert into authors (first_name, last_name) values ('Frank', 'Herbert');

insert into genres values (default, 'Fantasy');
insert into genres values (default, 'Biograph');
insert into genres values (default, 'Science Fiction');
insert into genres values (default, 'Fiction');
insert into genres values (default, 'Thriller');

insert into books values (default, 'Dune', (SELECT id FROM genres WHERE name = 'Fantasy'), 1965);
insert into books values (default, 'Steve Jobs', (SELECT id FROM genres WHERE name = 'Science Fiction'), 2011);
insert into books values (default, 'Pride and Prejusice', (SELECT id FROM genres WHERE name = 'Fiction'), 1813);
insert into books values (default, 'To Kill a Mockingbird', (SELECT id FROM genres WHERE name = 'Fiction'), 1965);

insert into authors_books values(default, (SELECT id FROM authors WHERE first_name = 'Walter'), (SELECT id FROM books WHERE title = 'Steve Jobs'));
insert into authors_books values(default, (SELECT id FROM authors WHERE first_name = 'Charlotte'), (SELECT id FROM books WHERE title = 'Pride and Prejusice'));
insert into authors_books values(default, (SELECT id FROM authors WHERE first_name = 'Harper'), (SELECT id FROM books WHERE title = 'To Kill a Mockinbird'));