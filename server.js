import { createServer } from "node:http";
import { hostname } from "node:os";
import Fastify from "fastify";
import fastifyStatic from "@fastify/static";
import next from "next";
import wisp from "wisp-server-node";
import { uvPath } from "@titaniumnetwork-dev/ultraviolet";
import { epoxyPath } from "@mercuryworkshop/epoxy-transport";
import { baremuxPath } from "@mercuryworkshop/bare-mux/node";
//import { Server } from "socket.io";
//import { initNodeMailer, sendVerificationEmail } from "./lib/nodemailer.js";
//import { checkTableExists, getDbConnection, findUser, setupDB, addUser } from "./lib/db.js";
//import { hashPassword } from "./lib/hash.js"

const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

const fastify = Fastify({
    serverFactory: (handler) => {
        return createServer()
            .on("request", (req, res) => {
                res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
                res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
                handler(req, res);
            })
            .on("upgrade", (req, socket, head) => {
                if (req.url.endsWith("/wisp/")) wisp.routeRequest(req, socket, head);
                else socket.end();
            });
    },
});

// Initialize Socket.IO
/*const io = new Server(fastify.server);

// Socket.IO connection handler
io.on("connection", (socket) => {
    console.log("A user connected");

    // Handle new message
    socket.on("new message", (message) => {
        console.log("New message received:", message);
        // Broadcast the message to all connected clients
        io.emit("chat message", message);
    });

    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });
});

fastify.post("/signup", async (req, res) => {
    let body = req.body;
    let email = body.email;
    let displayName = body.username;
    let username = body.username.toString().toLowerCase();
    let password = body.password;
    const db = getDbConnection();
    if (!email || !username || !password) {
        return res.status(400).send({ "error": "Missing parameters" });
    }
    if (await findUser(db, username, null)) {
        console.log("found");
        return res.status(409).send({ "error": "Username taken." })
    } else if (await findUser(db, null, email)) {
        console.log("found");
        return res.status(409).send({ "error": "Email taken." })
    }
    let passwordHash = await hashPassword(password);
    addUser(db, displayName, username, email, passwordHash);
    sendVerificationEmail(email);
    return res.status(200).send("success");
});

fastify.post("/login", async (req, res) => {
    let body = req.body;
    let username = body.username;
    let password = body.password;
})*/

fastify.get("/uv/uv.config.js", async (req, res) => {
    await handle(req.raw, res.raw);
    res.sent = true;
});

fastify.register(fastifyStatic, {
    root: uvPath,
    prefix: "/uv/",
    decorateReply: false,
});

fastify.register(fastifyStatic, {
    root: epoxyPath,
    prefix: "/epoxy/",
    decorateReply: false
});

fastify.register(fastifyStatic, {
    root: baremuxPath,
    prefix: "/baremux/",
    decorateReply: false
});

fastify.all("/*", async (req, res) => {
    await handle(req.raw, res.raw);
    res.sent = true;
});

fastify.server.on("listening", async () => {
    /*await initNodeMailer();
    const db = getDbConnection();
    if (!(await checkTableExists(db, "users")) || !(await checkTableExists(db, "messages"))) {
        setupDB(db);
    }*/
    const address = fastify.server.address();
    console.log("Listening on:");
    console.log(`\thttp://localhost:${address.port}`);
    console.log(`\thttp://${hostname()}:${address.port}`);
});

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

function shutdown() {
    console.log("SIGTERM signal received: closing HTTP server");
    fastify.close();
    process.exit(0);
}

nextApp.prepare().then(() => {
    fastify.listen({ port: 8080, host: "0.0.0.0" });
});

