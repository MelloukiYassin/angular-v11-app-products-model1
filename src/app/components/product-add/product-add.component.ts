import { ProductsService } from './../../services/products.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faSave } from '@fortawesome/free-solid-svg-icons';




@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  faSave = faSave;

  productFormGroup: FormGroup | null = null;

  submitted:boolean=false;

  constructor(private formBuilder: FormBuilder,
              private productsService: ProductsService) { }

  ngOnInit(): void {
    this.productFormGroup = this.formBuilder.group(
      {
        name: [null,Validators.required],
        price: [null, Validators.required],
        quantity: [null, Validators.required],
        selected: [false],
        available: [false]
      }
    );
  }

  onSaveProduct(){
    console.log();
    this.submitted=true;
    if(this.productFormGroup?.invalid) return;
    this.productsService.save(this.productFormGroup?.value)
      .subscribe(data=>{
        alert("Success Saving product");
      });
  }

}
