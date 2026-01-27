import { FormControl, FormGroup } from '@angular/forms';

export interface Authors {
  id: string;
  name: string;
}

export type AuthorFormGroup = FormGroup<{
  author: FormControl<Authors | null>;
}>;
