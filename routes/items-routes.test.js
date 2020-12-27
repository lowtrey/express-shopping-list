process.env.NODE_ENV = "test";
const app = require("../app");
const items = require("../fakeDb");
const request = require("supertest");

describe("Test Items Routes", () => {
    let testItemOne = { name: "Brush", price: 9.99 };
    let testItemTwo = { name: "Comb", price: 11.99 };
    let testUpdate = { name: " New Comb", price: 14.99 };

    beforeEach(() => items.push(testItemOne));
    afterEach(() => items.length = 0);

    test("Test GET /items", async () => {
        const response = await request(app).get("/items");
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual([testItemOne]);
    });

    test("Test GET /items/:name", async () => {
        const response = await request(app).get(`/items/${testItemOne.name}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(testItemOne);
    });

    test("Test POST /items", async () => {
        const response = await request(app).post("/items").send(testItemTwo);
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ added: testItemTwo });
    });

    test("Test PATCH /items/:name", async () => {
        const response = await request(app).patch(`/items/${testItemTwo.name}`).send(testUpdate);
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ updated: testUpdate });
    });

    test("Test DELETE /items/:name", async () => {
        const response = await request(app).delete(`/items/${testItemOne.name}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ message: `Item: '${testItemOne.name}' deleted.` });
    });
});