const faunadb = require('faunadb');
const q = faunadb.query;

exports.handler = async (event, context) => {
    const client = new faunadb.Client({
        secret: process.env.FAUNADB_SECRET,
        domain: 'db.us.fauna.com',
        port: 443,
        scheme: 'https',
    });

    const data = JSON.parse(event.body);
    const rec = {
        data: data,
    };
    console.log('Create function invoked ', rec);

    return client
        .query(q.Create(q.Collection('recipes'), rec))
        .then((response) => {
            console.log('Success', response);
            /* Victory! */
            return {
                statusCode: 200,
                body: JSON.stringify(response),
            };
        })
        .catch((error) => {
            console.log('Error', error);
            /* D'aw crap */
            return {
                statusCode: 400,
                body: JSON.stringify(error),
            };
        });
};
