import { http, HttpResponse } from 'msw';
import { productMockData } from "../Data/productMock";
import { productDataType, productFilterData } from "../Data/productType";

export const handlers = [
  http.get("/products", ({ request }) => {
    console.log(request);
    return HttpResponse.json(productMockData, { status: 200 });
  }),
  http.get("/products/datatype", ({ request }) => {
    console.log(request);
    return HttpResponse.json(productDataType, { status: 200 });
  }),
  http.get("/products/filtertype", ({ request }) => {
    console.log(request);
    return HttpResponse.json(productFilterData, { status: 200 });
  }),
];
