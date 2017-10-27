var redis = require('redis');
var client = redis.createClient(); //creates a new client

client.on('connect', function() {
    console.log('connected');
});

//Storing Key-Value Pairs

client.set('framework', 'AngularJS');

//or 

client.set(['framework', 'AngularJS']);

// set the value 

client.set('framework', 'AngularJS', function(err, reply) {
    console.log(reply);
});

// get the value 

client.get('framework', function(err, reply) {
    console.log(reply);
});

//Storing Hash

client.hmset('frameworks', 'javascript', 'AngularJS', 'css', 'Bootstrap', 'node', 'Express');

client.hgetall('frameworks', function(err, object) {
    console.log(object);
});

// The above snippet stores a hash in Redis that maps each technology to its framework.  


/* Note that Redis doesn’t support nested objects. All the property values in the object will be coerced into strings before getting stored. */


//You can also use the following syntax to store objects in Redis:

client.hmset('frameworks', {
    'javascript': 'AngularJS',
    'css': 'Bootstrap',
    'node': 'Express'
});


//Storing Lists

//If you want to store a list of items, you can use Redis lists. To store a list use the following syntax:

client.rpush(['frameworks', 'angularjs', 'backbone'], function(err, reply) {
    console.log(reply); //prints 2
});
// You can also use lpush() instead of rpush() to push the elements to the left.

//To retrieve the elements of the list you can use the lrange() function as following:
client.lrange('frameworks', 0, -1, function(err, reply) {
    console.log(reply); // ['angularjs', 'backbone']
});


//Storing Sets

//Sets are similar to lists, but the difference is that they don’t allow duplicates. So, if you don’t want any duplicate elements in your list you can use a set. Here is how we can modify our previous snippet to use a set instead of list.

client.sadd(['tags', 'angularjs', 'backbonejs', 'emberjs'], function(err, reply) {
    console.log(reply); // 3
});

// To retrieve the members of the set, use the smembers() function as following:

client.smembers('tags', function(err, reply) {
    console.log(reply);
});

/* Checking the Existence of Keys */
//
//Sometimes you may need to check if a key already exists and proceed accordingly. To do so you can use exists() function as shown below:

client.exists('key', function(err, reply) {
    if (reply === 1) {
        console.log('exists');
    } else {
        console.log('doesn\'t exist');
    }
});


//Deleting and Expiring Keys

//At times you will need to clear some keys and reinitialize them. To clear the keys, you can use del command as shown below:

client.del('frameworks', function(err, reply) {
    console.log(reply);
});


//You can also give an expiration time to an existing key as following:

client.set('key1', 'val1');
client.expire('key1', 30);
//
//The above snippet assigns an expiration time of 30 seconds to the key key1


/* Incrementing and Decrementing */
//Redis also supports incrementing and decrementing keys. To increment a key use incr() function as shown below:

client.set('key1', 10, function() {
    client.incr('key1', function(err, reply) {
        console.log(reply); // 11
    });
});