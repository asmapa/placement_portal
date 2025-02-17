import pg from "pg";

const db = new pg.Pool({
    user: "postgres",
    host: "localhost",
    database: "placementPortal",
    password: "Shajeera@1981",
    port: 5432,
});

// Handling unexpected errors
db.on("error", (err) => {
    console.error("Unexpected error on idle client", err);
});

// Query function using the pool
export const query = (text, params) => db.query(text, params);