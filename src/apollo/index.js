import {
    ApolloClient,
    InMemoryCache,
    gql
} from "@apollo/client";


export const client = new ApolloClient({
    uri: 'https://clear-chamois-13.hasura.app/v1/graphql',
    cache: new InMemoryCache(),
    defaultOptions: {
        fetchPolicy: "network-only"
    },
    headers: {
        "x-hasura-admin-secret": "bBueVQ6DiCDrHwWuy6WjMiilaMNjJ5UfaNqpJjHrtyj8yExV9b8R5motxNVqRnGU",
        "content-type": "application/json"
    }
});

export const GET_MEDICINE_STATUSES = gql`
    query GetMedicineStatuses {
        Default_Medicine {
            id
            medicineName
            pillNumber
            timeOfDay
            takenStatus
        }
    }
`;

export const INSERT_MEDICINE_STATUS = gql`
mutation InsertMedicineStatus($timeOfDay: String, $timeStatusRegistered: timetz, $takenStatus: String,
    $medicineName: String, $pillNumber: Int
    ) {
    insert_Default_Medicine_one(object: {
      timeOfDay: $timeOfDay
      timeStatusRegistered: $timeStatusRegistered,
      takenStatus: $takenStatus,
      medicineName: $medicineName,
      pillNumber: $pillNumber
    }) {
      id
      timeOfDay
      timeStatusRegistered
      takenStatus
      medicineName
      pillNumber
    }
  }
`

export const UPDATE_MEDICINE_STATUS = gql`
mutation UpdateMedicineStatus($id: Int!, $takenStatus: String!) {
    update_Default_Medicine_by_pk (
        pk_columns: {id: $id}
        _set: { takenStatus: $takenStatus }
        ) {
        id
        takenStatus
        }
  }
`