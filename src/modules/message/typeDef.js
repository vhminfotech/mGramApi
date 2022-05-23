const { Operator } = require("./contract");

const typeDef = `
${Operator}

type Query{
    getOperator(operatorId: ID): Operator
}

type Mutation {
    createOperator(name: String, operatorId: ID): Operator
}
`;

module.exports = typeDef;
