export const citySchema = {
    title: 'city schema',
    description: 'Blablablablablabla',
    version: 0,
    type: 'object',
    properties: {
        "cityName" : {
            type: "string"
        },
        "isPublic" : {
            type: "boolean"
        }
    }
}

export const treeSchema = {
    title: 'tree schema',
    description: 'Tree blablablablabla',
    version: 0,
    type: 'object',
    properties: {
        "description":{
            type: "string"
        }
    }
}