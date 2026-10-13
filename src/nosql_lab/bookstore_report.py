#!/usr/bin/env python3
import os
import logging
import pymongo

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

MONGO_URL = os.environ['MONGODB_ATLAS_URL']
MONGO_USER = os.environ['MONGODB_ATLAS_USER']
MONGO_PWD = os.environ['MONGODB_ATLAS_PWD']

def main():
	"""It will read the bookstore database and returns a report"""
	try:
		# reads the URL, USER, and PWD
		client = pymongo.MongoClient(MONGO_URL , username=MONGO_USER, password=MONGO_PWD)
		client.admin.command('ping')
		logger.info("Connected to MongoDB Atlas")
		
		#getting bookstore and its collection
		db = client['bookstore']		
		authors = db['authors']
		books = db['books']
		
		# num of authors
		author_ids = ["author_003", "author_004"]
		count = authors.count_documents({ "_id": { "$in": author_ids } })
		print(f"Authors: {count}")	
		
		# returns author name through search method
		for author in authors.find({ "_id": { "$in": author_ids } }):
			print(author['name'])
			
			#finds title and publication year for each book
			for book in books.find({ "author_ids": author["_id"] }):
				print(f" {book['title']} ({book['published_year']})")
			print()
		
		client.close()

	except pymongo.errors.PyMongoError as er:
        	logger.error(f"Database error: {er}")

if __name__ == "__main__":
	main()
