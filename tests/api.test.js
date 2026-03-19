const http = require('http');
const app = require('../server');
const assert = require('assert');

const PORT = 3001;
const server = http.createServer(app);

server.listen(PORT, async () => {
    console.log("integration testing starting...");
    try {
        const response = await fetch(`http://localhost:${PORT}/sum`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ a: 10, b: 20 })
        });

        const data = await response.json();
        if (data.result !== 30) {
            console.error(`expected 30, got ${data.result}`);
            process.exit(1);
        }

        console.log("integration test passed: 10 + 20 = 30 via API");
        server.close(() => process.exit(0));

    } catch (err) {
        console.error("test failed with error", err);
        server.close(() => process.exit(1));
    }
});
