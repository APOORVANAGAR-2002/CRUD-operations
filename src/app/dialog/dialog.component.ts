import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  addProductForm = new FormGroup({
    productName: new FormControl(''),
    date: new FormControl(''),
    price: new FormControl(''),
    comment: new FormControl(''),
    category: new FormControl(''),
  })
  actionBtn: string = "Save";

  constructor(
    private api: ApiService,
    private dialog: MatDialogRef<DialogComponent>,
    @Inject( MAT_DIALOG_DATA) public editData: any
  ) { }

  ngOnInit(): void {
    // console.log(this.editData);
    if (this.editData) {
      this.addProductForm.controls['productName'].setValue(this.editData.productName);
      this.addProductForm.controls['date'].setValue(this.editData.date);
      this.addProductForm.controls['price'].setValue(this.editData.price);
      this.addProductForm.controls['comment'].setValue(this.editData.comment);
      this.addProductForm.controls['category'].setValue(this.editData.category);
      this.actionBtn = 'Update';
    }
  }

  addProduct() {
    if (!this.editData) {
      if (this.addProductForm) {
        this.api.postProduct(this.addProductForm.value).subscribe((res) => {
          // console.log(res);
          alert('Product added successfully');
          this.dialog.close('save');
        })
        this.addProductForm.reset();
      }
    }
    else {
      this.updateProduct();
    }
  }

  updateProduct() {
    this.api.putProduct(this.addProductForm.value, this.editData.id).subscribe((res) => {
      alert("Product updated successfully");
      this.dialog.close('update');
    })
  }
}
