import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffSidemenuComponent } from '../staff-sidemenu/staff-sidemenu.component';
import { MenuItemService } from '../../services/menu-item.service';
import { CategoryService } from '../../services/category.service';
import { IngredientService } from '../../services/ingredient.service';
import { Router } from '@angular/router';
import { CategoryResult } from '../../models/category';
import { IngredientResult } from '../../models/ingredient';
import { FormControl, Validators, FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CurrencyMaskModule } from "ng2-currency-mask";

@Component({
  selector: 'app-staff-create-menu-item',
  standalone: true,
  imports: [CommonModule, StaffSidemenuComponent, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatSelectModule, MatButtonModule, CurrencyMaskModule],
  templateUrl: './staff-create-menu-item.component.html',
  styleUrl: './staff-create-menu-item.component.scss'
})
export class StaffCreateMenuItemComponent {

  errorMessage: string = '';
  categories: CategoryResult[] = [];
  ingredients: IngredientResult[] = [];

  menuItemForm: FormGroup;

  constructor(private fb: FormBuilder, private route: Router, private menuItemService: MenuItemService, private categoryService: CategoryService, private ingredientService: IngredientService) {
    this.loadCategories();
    this.loadIngredients();
    this.menuItemForm = this.fb.group({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      imageUrl: new FormControl('', Validators.required),
      ingredientsName: new FormControl('', Validators.required),
      categoryName: new FormControl('', Validators.required),
      isRodizioItem: new FormControl('', Validators.required),
      isAvailable: new FormControl('', Validators.required)
    });
  }

  submit() {
    console.log("--->>>", this.menuItemForm.value);
    this.menuItemService.createMenuItem(this.menuItemForm.value)
      .subscribe({
        next: (response) => {
          console.log(response);
          this.route.navigate(['staff/list-menuitems']);
        },
        error: (error) => {
          console.error('Erro no componente:', error);
          if (error.status === 401) {
            console.log('authentication error => :')
            this.route.navigate(['staff/unauthorized']);

          } else {
            console.error('Erro HTTP no componente:', error);
            this.errorMessage = error.error.errorMessages[0];
          }
        }
      });
  }

  loadCategories() {
    this.categoryService.getAllCategories(0, 100)
      .subscribe({
        next: (response) => {
          console.log('--->>> categories:',response);
          this.categories = response.data.items;
        },
        error: (error) => {
          console.error('Erro no componente:', error);
          if (error.status === 401) {
            console.log('authentication error => :')
            this.route.navigate(['staff/unauthorized']);

          } else {
            console.error('Erro HTTP no componente:', error);
            this.errorMessage = error.error.errorMessages[0];
          }
        }
      });
  }

  loadIngredients() {
    this.ingredientService.getAllIngredients(0, 100)
      .subscribe({
        next: (response) => {
          console.log('--->>> ingredients:',response);
          this.ingredients = response.data.items;
        },
        error: (error) => {
          console.error('Erro no componente:', error);
          if (error.status === 401) {
            console.log('authentication error => :')
            this.route.navigate(['staff/unauthorized']);
          } else {
            console.error('Erro HTTP no componente:', error);
            this.errorMessage = error.error.errorMessages[0];
          }
        }
      });
  }
}
