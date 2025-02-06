import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environment/environment.development";
import { Observable } from "rxjs";
import {
  ICreateProduct,
  IGetProduct,
  IProductCreateCombined,
} from "../interfaces/IProduct";

const productController = "Products/";

const productEndpoints = {
  addCompleteProduct: productController + "AddCompleteProduct",
  getAllProducts: productController + "GetAllProducts",
  getProductById: productController + "GetProductById/",
  createProduct: productController + "CreateProduct",
  updateProduct: productController + "UpdateProduct/",
  deleteProduct: productController + "DeleteProduct/",
};

@Injectable({
  providedIn: "root",
})
export class ProductService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Add a complete product with images and variations
   */
  addCompleteProduct(
    productData: IProductCreateCombined
  ): Observable<IGetProduct> {
    const url = `${this.baseUrl}${productEndpoints.addCompleteProduct}`;
    return this.http.post<IGetProduct>(url, productData);
  }

  /**
   * Get all products
   */
  getAllProducts(): Observable<any> {
    const url = `${this.baseUrl}${productEndpoints.getAllProducts}`;
    return this.http.get<IGetProduct[]>(url);
  }

  /**
   * Get product by ID
   */
  getProductById(productId: number): Observable<IGetProduct> {
    const url = `${this.baseUrl}${productEndpoints.getProductById}${productId}`;
    return this.http.get<IGetProduct>(url);
  }

  /**
   * Create a new product
   */
  createProduct(productData: ICreateProduct): Observable<IGetProduct> {
    const url = `${this.baseUrl}${productEndpoints.createProduct}`;
    return this.http.post<IGetProduct>(url, productData);
  }

  /**
   * Update product by ID
   */
  updateProduct(
    productId: number,
    productData: Partial<ICreateProduct>
  ): Observable<IGetProduct> {
    const url = `${this.baseUrl}${productEndpoints.updateProduct}${productId}`;
    return this.http.put<IGetProduct>(url, productData);
  }

  /**
   * Delete product by ID
   */
  deleteProduct(productId: number): Observable<void> {
    const url = `${this.baseUrl}${productEndpoints.deleteProduct}${productId}`;
    return this.http.delete<void>(url);
  }
}
