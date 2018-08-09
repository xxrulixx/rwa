import '../rxjs-extensions';

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';

import { Category } from './../model/category';

@Injectable()
export class CategoryService {
    private _serviceUrl = 'http://localhost:3000/categories';

    constructor(private http: Http) { }

    getCategories(): Observable<Category[]> {
      const url = this._serviceUrl;
      return this.http.get(url)
                 .map(res => res.json() );
    }
}
