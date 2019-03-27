export const schema = {
    title: 'user schema',
    description: 'Blablablablablabla',
    version: 0,
    type: 'object',
    properties: {
      cities: {
        type: 'array',
        items : {
            type: "object",
            properties:{
                "cityName" : {
                    type: "string"
                },
                "cityRef" : {
                    type: "string"
                }
            }
        }
      }
    }
}