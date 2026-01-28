import { FormControl, FormGroup } from '@angular/forms';

export interface Authors {
  id: string;
  firstName?: string;
  lastName?: string;
  name?: string;
}

export type AuthorFormGroup = FormGroup<{
  author: FormControl<Authors | null>;
}>;
