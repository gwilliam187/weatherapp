export const citySchema = {
    title: 'city schema',
    description: 'City blablablablablabla',
    version: 0,
    type: 'object',
    properties: {
        "cityName" : {
            type: "string"
        },
        "region" : {
            type: "string"
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