GraphQL Plugin

Usage:-

In side your component write like below


import {useDynamicGraphQL} from 'crud-graphql-plugin';

const {
    loading,
    error,
    data,
    createItem,
    updateItem,
    deleteItem,
    deleteAllItems,
    queryAllItems,
    filterItems,
  } = useDynamicGraphQL(
      // pass your GraphQL queries and mutations here
  );

