const faunadb = require('faunadb');
require('dotenv').config();
const q = faunadb.query;

//regex returns just the id
function getKey(path) {
    return path.match(/([^\/]*)\/*$/)[0];
}
exports.handler = async (event, context) => {
    const client = new faunadb.Client({
        secret: process.env.FAUNADB_SECRET,
        domain: 'db.us.fauna.com',
        port: 443,
        scheme: 'https',
    });

    const data = JSON.parse(event.body);
    const id = getKey(event.path);
    console.log('Function edit invoked.', id);

    return client
        .query(q.Update(q.Ref(q.Collection('recipes'), id), data))
        .then((response) => {
            console.log('success', response);
            return {
                statusCode: 200,
                body: JSON.stringify(response),
            };
        })
        .catch((error) => {
            console.log('error', error);
            return {
                statusCode: 400,
                body: JSON.stringify(error),
            };
        });
};
