import gql from 'graphql-tag';

export const ConfigsQuery = gql`
    query configsQuery(
        $id: String,
        $name: String,
        $module: String
    ) {
        sections(
            id: $id,
            name: $name,
            module: $module
        ) {
            id,
            createdBy,
            createdDate,
            updatedBy,
            updatedDate,
            name,
            module,
            value
        }
    }
`;