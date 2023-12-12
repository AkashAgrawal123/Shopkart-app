import { rest } from "msw";
import { productMockData } from "../Data/productMock";
import { productDataType, productFilterData } from "../Data/productType";

export const handlers = [
  rest.get("/products", (req, res, ctx) => {
    console.log(req);
    return res(ctx.status(200), ctx.json(productMockData));
  }),
  rest.get("/products/datatype", (req, res, ctx) => {
    console.log(req);
    return res(ctx.status(200), ctx.json(productDataType));
  }),
  rest.get("/products/filtertype", (req, res, ctx) => {
    console.log(req);
    return res(ctx.status(200), ctx.json(productFilterData));
  }),
];
