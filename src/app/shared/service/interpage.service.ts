import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterpageService {

  constructor() { }
  private idSubject = new BehaviorSubject<number>(0); // You can set an initial value if needed
  public id$ = this.idSubject.asObservable();

  setId(id: number) {
    this.idSubject.next(id);
  }

}
