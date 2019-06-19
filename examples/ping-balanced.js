var straw = require('../lib/straw.js');

var opts = {
    nodes_dir: __dirname + '/nodes',
    redis: {
        host: '127.0.0.1',
        port: 6379,
        prefix: 'straw-example'
    }
};

var topo = straw.create(opts);

topo.add([{
    id: 'ping',
    node: 'ping',
    output: 'ping-out',
    processOpts: { execArgv: ['--max-old-space-size=2048'] }
}, {
    id: 'count-1',
    node: 'count',
    input: 'ping-out',
    output: 'count-out'
}, {
    id: 'count-2',
    node: 'count',
    input: 'ping-out',
    output: 'count-out'
}, {
    id: 'print',
    node: 'print',
    input: 'count-out'
}], function () {
    topo.start({ purge: true });
});

process.on('SIGINT', function () {
    topo.destroy(function () {
        console.log('Finished.');
    });
});
