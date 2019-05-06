const graphql = require('graphql');

let books = [{
        name: "Name of the wind",
        genre: "Fantasy",
        id: '1',
        authorsId: '1'
    },
    {
        name: "The Final book",
        genre: "Action",
        id: '2',
        authorsId: '2'
    },
    {
        name: "Name of the love",
        genre: "Romantic",
        id: '3',
        authorsId: '3'
    },
    {
        name: "Test of the love",
        genre: "Romantic",
        id: '4',
        authorsId: '2'
    },
    {
        name: "See of the wind",
        genre: "Action",
        id: '5',
        authorsId: '1'
    },
]

let authors = [{
        name: 'John Mann',
        id: '1',
        age: 70
    },
    {
        name: 'Patrick Kammermann',
        id: '2',
        age: 20
    },
    {
        name: 'Dani Heiss',
        id: '3',
        age: 25
    }
]

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLList,
    GraphQLSchema
} = graphql

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        genre: {
            type: GraphQLString
        },
        authors: {
            type: authorsType,
            resolve(parent, args) {
                return authors.find(el => el.id == parent.authorsId ? el : null)
            }
        }
    })
});

const authorsType = new GraphQLObjectType({
    name: 'authors',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        age: {
            type: GraphQLString
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return books.filter(el => el.authorsId == parent.id)
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                // Code comes from db or another resource
                return books.find(el => el.id == args.id ? el : null)
            }
        },
        authors: {
            type: authorsType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                // Code comes from db or another resource
                return authors.find(el => el.id == args.id ? el : null)
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return books
            }
        },
        authors: {
            type: new GraphQLList(authorsType),
            resolve(parent, args) {
                return authors
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
});