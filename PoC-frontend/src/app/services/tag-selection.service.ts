import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TagSelectionService {
  private selectedTags: string[] = [];
  private selectedTagsSubject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  constructor() {}

  getSelectedTags(): Observable<string[]> {
    return this.selectedTagsSubject.asObservable();
  }

  toggleTagSelection(tag: string): void {
    const index = this.selectedTags.indexOf(tag);
    if (index !== -1) {
      this.selectedTags.splice(index, 1);
    } else {
      this.selectedTags.push(tag);
    }
    this.selectedTagsSubject.next(this.selectedTags);
  }
}