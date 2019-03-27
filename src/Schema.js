export const schema = {
    title: 'User Schema',
    description: 'Blablablablablabla',
    version: 0,
    type: 'object',
    properties: {
      id: {
        type: 'string',
        primary: true
      },
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