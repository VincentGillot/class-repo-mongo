# class-repo-mongo

Reusable repository of basic classes and logic for mongo databases.

This repository is intended to be used in 3 layer APIs:

- Presentation
- Business Logic
- Data Access

## Presentation

This repository does not provide the presentation layer. That is up to the user to implement. You can use anything to access the BLL.

## Business Logic Layer (BLL)

The main BLL class is used to instance documents and use static functions. It can be found in the `/src/bll` folder.
This is the class meant to be used in the presentation layer, along with the instantiable document class found in each collection folder.

## Data Access Layer (DAL)

All files related to the database access (in this case mongodb) are found in the `/src/repository` folder.
Here you can find the main MongoDB class to start the connection, the generic types, main extensible classes for mongoose and the folders for each collection containing the required files and data like types, schema, model, etc.
