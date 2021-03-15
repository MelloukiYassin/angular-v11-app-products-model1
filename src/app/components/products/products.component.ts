import { AppDataState, DataStateEnum } from './../../state/product.state';
import { Observable, of } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';
import { ProductsService } from './../../services/products.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product.model';
import { Router } from '@angular/router';
import { faSpinner, faTrashAlt, faSearch, faEdit } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products$: Observable<AppDataState<Product[]>> | null = null;
  readonly DataStateEnum = DataStateEnum;
  faSpinner = faSpinner;
  faTrashAlt = faTrashAlt;
  faSearch = faSearch;
  faEdit = faEdit;

  constructor(private productsService: ProductsService,
              private router: Router) { }

  ngOnInit(): void {
  }

  onGetAllProducts(){
    this.products$ = this.productsService.getAllProducts().pipe(
      map(data=>{
        return ({dataState:DataStateEnum.LOADED, data:data})
        }
      ),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(error=>of({dataState:DataStateEnum.ERROR, errorMessage:error.message}))
    );
  }

  onGetSelectedProducts(){
    this.products$ = this.productsService.getSelectedProducts().pipe(
      map(data=>{
        return ({dataState:DataStateEnum.LOADED, data:data})
      }),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(error=>of({dataState:DataStateEnum.ERROR, errorMessage: error.message}))
    )
  }

  onGetAvailableProducts(){
    this.products$ = this.productsService.getAvailableProducts().pipe(
      map(data=>{
        return ({dataState:DataStateEnum.LOADED, data:data})
      }),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(error=>of({dataState:DataStateEnum.ERROR, errorMessage: error.message}))
    )
  }

  onSearch(dataForm: any){
    this.products$= this.productsService.searchProducts(dataForm.keyword).pipe(
      map(data=>{
        console.log(data);
        return ({dataState:DataStateEnum.LOADED,data:data})
      }),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
    );
  }

  onSelect(product: Product) {
    this.productsService.select(product)
    .subscribe(data=>{
      console.log(data);
      product.selected=data.selected;
    })
  }

  onDelete(product: Product) {
    let v=confirm("Etes vous sûre?");
    console.log(v);
    if(v==true){
      this.productsService.deleteProduct(product)
     .subscribe(data=>{
       this.onGetAllProducts();
     })
    }
  }

  onNewProducts(){
    this.router.navigateByUrl("/newProduct");
  }

  onEdit(product: Product){
    this.router.navigateByUrl("/editProduct/"+product.id);
  }



}
