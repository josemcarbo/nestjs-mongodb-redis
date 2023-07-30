import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import * as request from "supertest";
import { AppModule } from "../../src/app.module";
import * as clientMock from "./mock/client";

describe("Clients", () => {
  let moduleRef: TestingModule;
  let app: INestApplication;
  let client;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/POST /clients`, async () => {
    const response = await request(app.getHttpServer())
      .post("/clients")
      .send(clientMock.CLIENT_DATA);

    expect(response.status).toEqual(201);
    expect(response.body).toEqual(
      expect.objectContaining(clientMock.CLIENT_DATA)
    );

    client = response.body;
  });

  it(`/GET /clients/:id`, async () => {
    const response = await request(app.getHttpServer())
      .get(`/clients/${client.id}`)
      .send();

    expect(response.status).toEqual(200);
    expect(response.body).toEqual(
      expect.objectContaining(clientMock.CLIENT_DATA)
    );
  });

  it(`/DELETE /clients/:id`, async () => {
    const response = await request(app.getHttpServer())
      .delete(`/clients/${client.id}`)
      .send();

    expect(response.status).toEqual(200);
    expect(response.body).toEqual(
      expect.objectContaining(clientMock.CLIENT_DATA)
    );
  });

  afterAll(async () => {
    moduleRef.close();
  });
});
