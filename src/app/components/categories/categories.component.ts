import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { CategoriesService } from '../../core/services/categories.service';
import { Icategory } from '../../core/interface/icategory';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [RouterLink , FormsModule ,SearchPipe],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {
  private readonly _CategoriesService=inject(CategoriesService)

  allCategories:Icategory[]=[]
  ngOnInit(): void {
      this._CategoriesService.getAllCategories().subscribe({
        next:(res)=>{
          console.log(res)
          this.allCategories=res.data
        },
        error:(err)=>{
          console.log(err)

        },

      })
  }
}
