// Step 2: 
// use bookstore 
db = db.getSiblingDB("bookstore")

// Step 3: load authors.json
db.authors.drop()
doc = JSON.parse(fs.readFileSync("authors.json", "utf8"))
db.authors.insertMany(doc)

// Step 4: load books.json
// paste your drop and insertMany commands here
db.books.drop()
doc = JSON.parse(fs.readFileSync("books.json", "utf8"))
db.books.insertMany(doc)
// Step 5: list authors and books
// paste your find commands here
db.authors.find()
db.books.find()
// Step 6: insert two new books
// paste your insert commands here
db.books.insertOne({title: 'Harry Potter and the Chamber of Secrets', published_year: 1998, author_ids: [ 'author_004' ]})
db.books.insertOne({title: 'Miles Morales, Spider-Man', published_year: 2017, author_ids: [ 'author_005' ]})
// Step 7: add missing authors
// paste your insert commands here
db.authors.insertOne({_id: 'author_004', name: 'J.K. Rowling', nationality: 'British', bio: {short: 'British author best known for the Harry Potter fantasy series.', long: 'J.K. Rowling is a British author who wrote the Harry Potter series, which follows a young wizard at Hogwarts School of Witchcraft and Wizardry. Harry Potter and the Chamber of Secrets, the second book, came out in 1998.'}})
db.authors.insertOne({_id: 'author_005', name: 'Jason Reynolds', nationality: 'American', bio: {short: 'American author of young adult and middle-grade fiction', long: 'Jason Reynolds is an American author known for writing about young people. His books include Long Way Down and the Track series, and he wrote the 2017 novel Miles Morales: Spider-Man.'}})

// Step 8: filter books by a list of authors
// paste your find command here
db.books.find({ author_ids: { $in: ["author_001", "author_004"] } })