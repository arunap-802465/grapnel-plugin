//  The below code appears to be a custom hook called useDynamicGraphQL that abstracts the
//  logic for handling GraphQL queries and mutations using the Apollo Client library
//  in a React Native environment.

//useQuery and useMutation are hooks provided by Apollo Client for handling GraphQL queries and mutations.

import {useQuery, useMutation} from '@apollo/client';

//This function is the main custom hook that abstracts the logic for handling GraphQL queries and mutations.
// It takes various GraphQL queries and mutations as parameters.
export const useDynamicGraphQL = (
  getItemsQuery,
  createItemMutation,
  updateItemMutation,
  deleteItemMutation,
  deleteAllItemsMutation,
  queryAllItemsQuery,
  filterItemsQuery,
) => {
  //useQuery is used to execute the getItemsQuery and retrieve loading, error, data, and refetch function.
  //useMutation is used for create, update, delete, and delete all mutations.

  const {loading, error, data, refetch} = useQuery(getItemsQuery);
  const [createItem] = useMutation(createItemMutation);
  const [updateItem] = useMutation(updateItemMutation);
  const [deleteItem] = useMutation(deleteItemMutation);
  const [deleteAllItems] = useMutation(deleteAllItemsMutation);

  // These function  use the mutation hooks to handle creating
  const handleToCreate = async variables => {
    try {
      const {
        data: {createItem: newItem},
      } = await createItem({
        variables,
      });

      refetch();
      return newItem;
    } catch (error) {
      console.error('Error creating item:', error.message);
      throw error;
    }
  };
  // These function  use the mutation hooks to handle updating
  const handleToUpdate = async variables => {
    try {
      const {
        data: {updateItem: updatedItem},
      } = await updateItem({
        variables,
      });
setTimeout(()=>{
  refetch();
},200)
    
      return updatedItem;
    } catch (error) {
      console.error('Error updating item:', error.message);
      throw error;
    }
  };

  // These function  use the mutation hooks to handle delete
  const handleToDelete = async variables => {
    try {
      await deleteItem({
        variables,
      });

      // Update the local state or refetch the data
      refetch();
    } catch (error) {
      console.error('Error deleting note:', error.message);
    }
  };

  // These function  use the mutation hooks to handle deleteAll items
  const handleDeleteAllItems = async () => {
    try {
      await deleteAllItems();

      refetch();
    } catch (error) {
      console.error('Error deleting all items:', error.message);
      throw error;
    }
  };

  //These function retrieves and processes the data from the GraphQL query for all items
  const handleQueryAllItems = () => {
    const allNote = data?.notes || [];
    console.log('@@-----', allNote);

    try {
      if (data) {
        console.log('Data:', data);
        if (data?.notes) {
          console.log('All Notes:', data?.notes);
          return data?.notes;
        } else {
          console.log('No notes found in queryAllItemsData.');
          return [];
        }
      } else {
        console.log('queryAllItemsData is undefined.');
        return [];
      }
    } catch (error) {
      console.error('Error handling all notes:', error.message);
      throw error;
    }
  };
  //These function filters items based on the searched text
  const handleFilterItems = searchedText => {
    console.log('Searched Text:', searchedText);

    try {
      const filterNotes = data?.notes || [];
      console.log('Filter Notes:', filterNotes);

      // Filter the notes based on the searched text
      const filteredNotes = filterNotes.filter(
        note =>
          note.title.toLowerCase().includes(searchedText.toLowerCase()) ||
          note.content.toLowerCase().includes(searchedText.toLowerCase()),
      );

      console.log('Filtered Notes:', filteredNotes);
      return filteredNotes;
    } catch (error) {
      console.error('Error filtering notes:', error.message);
      throw error;
    }
  };

  //The function returns an object containing properties such as loading, error, data, as well as functions for creating, updating, deleting, and querying items.

  return {
    loading,
    error,
    data,
    createItem: handleToCreate,
    updateItem: handleToUpdate,
    deleteItem: handleToDelete,
    deleteAllItems: handleDeleteAllItems,
    queryAllItems: handleQueryAllItems,
    filterItems: handleFilterItems,
  };
};
