import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerHeaderComponent } from '../customer-header/customer-header.component';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-customer-rodizio',
  standalone: true,
  imports: [CommonModule, CustomerHeaderComponent],
  templateUrl: './customer-rodizio.component.html',
  styleUrl: './customer-rodizio.component.scss'
})
export class CustomerRodizioComponent implements OnInit {
  categoriesName: string[] = [];

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit(): void {

    this.categoryService.getCategoriesName()
      .subscribe({
        next: (response) => {
          this.categoriesName = response.data;
          this.categoriesName.forEach(element => {
          console.log(`category: ${element}`);
          });
        }
      });
  }

}
