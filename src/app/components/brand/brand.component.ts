import { Component, inject, OnInit } from '@angular/core';
import { BrandService } from '../../core/services/brand.service';
import { Ibrand } from '../../core/interface/ibrand';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../core/pipes/search.pipe';

@Component({
  selector: 'app-brand',
  standalone: true,
  imports: [FormsModule , SearchPipe],
  templateUrl: './brand.component.html',
  styleUrl: './brand.component.scss'
})
export class BrandComponent implements OnInit {
  private readonly _BrandService=inject(BrandService)
text:string=''
  allBrands:Ibrand[]=[]

  ngOnInit(): void {
      this._BrandService.getAllBrands().subscribe({
        next:(res)=>{
          console.log(res)
          this.allBrands=res.data
        },
        error:(err)=>{
        }
      })
  }
}
